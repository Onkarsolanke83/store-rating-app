import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Load environment variables
dotenv.config();

// Create Expressss
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Database connection
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Session and Passport middleware (for Google OAuth
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    let result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    let user = result.rows[0];
    if (!user) {
      // Create user if not exists
      const insert = await pool.query(
        'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *',
        [profile.displayName, email, 'user']
      );
      user = insert.rows[0];
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth routes
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to dashboard based on user role
    let dashboard = '/user/dashboard';
    if (req.user && req.user.role === 'admin') {
      dashboard = '/admin/dashboard';
    } else if (req.user && req.user.role === 'store-owner') {
      dashboard = '/store-owner/dashboard';
    }
    res.redirect(`http://localhost:5173${dashboard}`);
  }
);

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
};

// Helper middleware to check admin role
function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Admins only' });
  }
}

// Routes

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Remove password from user object before sending
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, address, password } = req.body;
  try {
    // Check if user exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password and insert user
    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, address, 'user']
    );
    const user = result.rows[0];

    // Generate token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Remove password from user object before sending
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({ user: userWithoutPassword, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

// User routes
app.get('/api/users/me', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, address, role FROM users WHERE id = $1', [req.user.userId]);
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

app.put('/api/users/password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    // Get user from DB
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.userId]);
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check current password
    if (!bcrypt.compareSync(currentPassword, user.password)) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    // Update password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, user.id]);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

// Sentiment analysis function using HuggingFace Inference API
async function analyzeSentiment(text) {
  const HF_API_KEY = process.env.HF_API_KEY;
  const response = await fetch(
    'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: text })
    }
  );
  const result = await response.json();
  return result[0]?.label || 'NEUTRAL';
}

// SQL to create the reviews tablee
app.post('/api/ratings', authenticateToken, async (req, res) => {
  const { storeId, rating, review } = req.body;
  try {
    const sentiment = await analyzeSentiment(review);
    await pool.query(
      'INSERT INTO reviews (store_id, user_id, rating, review, sentiment) VALUES ($1, $2, $3, $4, $5)',
      [storeId, req.user.userId, rating, review, sentiment]
    );
    res.json({ message: 'Rating submitted successfully', sentiment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error analyzing sentiment or saving review' });
  }
});

// Admin creates a new user (e.g., store owner)
app.post('/api/users', authenticateToken, requireAdmin, async (req, res) => {
  const { name, email, address, password, role } = req.body;
  console.log('Received request to add user:', { name, email, address, role }); // <-- Add this line

  const allowedRoles = ['admin', 'user', 'store-owner'];
  if (!allowedRoles.includes(role)) {
    console.log('Invalid role:', role); // <-- Add this line
    return res.status(400).json({ message: 'Invalid role' });
  }
  try {
    // Check if user exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      console.log('Email already in use:', email); // <-- Add this line
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password and insert user
    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, address, role',
      [name, email, hashedPassword, address, role]
    );
    const user = result.rows[0];

    console.log('User added successfully:', user); // <-- Add this line
    res.status(201).json({ user });
  } catch (err) {
    console.error('Error adding user:', err); // <-- Add this line
    res.status(500).json({ message: 'Database error' });
  }
});

// Endpoint to get current authenticated user (works for session and JWT)
app.get('/api/auth/me', (req, res) => {
  // For session-based (Google OAuth)
  if (req.isAuthenticated && req.isAuthenticated()) {
    const { password, ...userWithoutPassword } = req.user;
    return res.json({ user: userWithoutPassword });
  }
  // For JWT-based
  if (req.user && req.user.userId) {
    pool.query('SELECT id, name, email, address, role FROM users WHERE id = $1', [req.user.userId])
      .then(result => {
        if (result.rows.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user: result.rows[0] });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Database error' });
      });
    return;
  }
  res.status(401).json({ message: 'Not authenticated' });
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

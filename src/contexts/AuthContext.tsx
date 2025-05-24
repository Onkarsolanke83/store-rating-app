import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  address?: string;
}

interface DecodedToken {
  userId: number;
  role: string;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  address: string;
  password: string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  initialized: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  checkAuth: () => {},
  updatePassword: async () => {},
});

const API_URL = 'http://localhost:5000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // Check if token is expired
        const decoded = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          localStorage.removeItem('token');
          setUser(null);
          setIsAuthenticated(false);
          setInitialized(true);
          return;
        }
        
        // Set axios default headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Get user data
        const response = await axios.get(`${API_URL}/users/me`);
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth error:', error);
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      }
    }
    
    setInitialized(true);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      setIsAuthenticated(true);
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      setIsAuthenticated(true);
      
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await axios.put(`${API_URL}/users/password`, { 
        currentPassword, 
        newPassword 
      });
    } catch (error) {
      console.error('Password update error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        initialized,
        login,
        register,
        logout,
        checkAuth,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
import React, { useEffect, useState } from 'react';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/me', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch user info');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading user info...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>Not authenticated</div>;

  return (
    <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 8, marginTop: 16 }}>
      <h3>Logged in as:</h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default UserInfo; 
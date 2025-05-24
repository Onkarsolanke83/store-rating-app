import React from 'react';

const LoginWithGoogleButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <button onClick={handleGoogleLogin} style={{ padding: '10px 20px', background: '#4285F4', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" style={{ width: 20, marginRight: 8, verticalAlign: 'middle' }} />
      Login with Google
    </button>
  );
};

export default LoginWithGoogleButton; 
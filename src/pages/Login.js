import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Make sure this path is correct
import susanooImage from '../assets/forest.jpg'; // Make sure this path is correct

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const apiUrl = 'http://localhost:3001/api/auth/login'; // Change the port if necessary

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl, { email, password });
      localStorage.setItem('token', response.data.token);
      login(); // Update the authentication state
      navigate('/dashboard'); // Redirect to dashboard upon successful login
    } catch (error) {
      console.error(error);
      setError('Invalid email or password'); // Display error message
    }
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${susanooImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container
        maxWidth="sm"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add a slight transparency to make the form stand out
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            {error && (
              <Typography color="error" variant="body2" style={{ marginTop: '8px' }}>
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
              Login
            </Button>
          </form>
          <Button variant="outlined" color="primary" style={{ marginTop: '16px' }}>
            Don't have an account? <Link to="/register">Register</Link>
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;

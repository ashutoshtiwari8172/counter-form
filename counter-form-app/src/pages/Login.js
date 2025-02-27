// src/pages/Login.js
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../utils/auth';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Alert,
  CircularProgress,
  TextField,
  Divider,
  Tabs,
  Tab
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  
  const from = location.state?.from?.pathname || '/';
  
  const handleGoogleSignIn = () => {
    setLoading(true);
    setError('');
    
    auth.signInWithGoogle()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch(err => {
        setError('Authentication failed. Please try again.');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
  };
  
  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    auth.signIn(formData.email, formData.password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch(err => {
        setError('Invalid email or password. Please try again.');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const handleSignUp = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError('');
    
    auth.signUp(formData.name, formData.email, formData.password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch(err => {
        setError(err.message || 'Registration failed. Please try again.');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 3 }}>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {tabValue === 0 ? (
          // Sign In Form
          <Box component="form" onSubmit={handleSignIn} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
            
            <Divider sx={{ my: 2 }}>OR</Divider>
            
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              disabled={loading}
              fullWidth
              sx={{ py: 1.5 }}
            >
              Sign in with Google
            </Button>
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Try one of our mock users:
              </Typography>
              <Typography variant="body2" color="primary">
                Email: emma.johnson@example.com<br />
                Password: password123
              </Typography>
            </Box>
          </Box>
        ) : (
          // Sign Up Form
          <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
            
            <Divider sx={{ my: 2 }}>OR</Divider>
            
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              disabled={loading}
              fullWidth
              sx={{ py: 1.5 }}
            >
              Sign up with Google
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default Login;
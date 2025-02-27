import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/auth';
import { Button, Typography, Box, Avatar } from '@mui/material';

function AuthStatus() {
  const navigate = useNavigate();
  auth.checkAuth();
  
  if (!auth.isAuthenticated) {
    return (
      <Button 
        color="inherit" 
        onClick={() => navigate('/login')}
      >
        Login
      </Button>
    );
  }
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar 
        src={auth.user.photoURL}
        alt={auth.user.name}
        sx={{ width: 32, height: 32, mr: 1 }}
      />
      <Typography variant="body2" sx={{ mr: 2 }}>
        {auth.user.name}
      </Typography>
      <Button 
        color="inherit" 
        onClick={() => {
          auth.signOut(() => navigate('/'));
        }}
        size="small"
      >
        Logout
      </Button>
    </Box>
  );
}

export default AuthStatus;
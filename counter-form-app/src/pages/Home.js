import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to React Project
        </Typography>
        <Typography variant="body1" paragraph>
          This project includes a counter with animated background, user data form, and rich text editor.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button variant="contained" component={Link} to="/counter">
            Try Counter
          </Button>
          <Button variant="contained" component={Link} to="/user-form">
            User Form
          </Button>
          <Button variant="contained" component={Link} to="/text-editor">
            Text Editor
          </Button>
          <Button variant="contained" component={Link} to="/dashboard">
            Dashboard
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Home;
import { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Typography, 
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

function UserForm() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [initialFormData, setInitialFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  
  // Generate ID on first render
  useEffect(() => {
    const userId = `USER-${Math.floor(Math.random() * 1000000)}`;
    setFormData(prev => ({ ...prev, id: userId }));
    
    // Load saved data if exists
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setFormData(parsedData);
    }
    
    // Set initial data to detect changes
    setInitialFormData(formData);
    
    // Add beforeunload event listener
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  // Check for unsaved changes
  const hasUnsavedChanges = () => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  };
  
  // Handle beforeunload event
  const handleBeforeUnload = (e) => {
    if (hasUnsavedChanges()) {
      e.preventDefault();
      e.returnValue = '';
      return '';
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(formData));
    setInitialFormData(formData);
    alert('User data saved successfully!');
  };
  
  const handleReset = () => {
    if (hasUnsavedChanges()) {
      setOpenDialog(true);
    } else {
      resetForm();
    }
  };
  
  const resetForm = () => {
    const userId = `USER-${Math.floor(Math.random() * 1000000)}`;
    setFormData({
      id: userId,
      name: '',
      email: '',
      phone: '',
      address: ''
    });
    setInitialFormData({
      id: userId,
      name: '',
      email: '',
      phone: '',
      address: ''
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          User Data Form
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled
                label="User ID"
                value={formData.id}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={1}
              />
            </Grid>
            
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      {/* Unsaved Changes Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Discard Changes?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have unsaved changes. Are you sure you want to reset the form?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={() => {
              setOpenDialog(false);
              resetForm();
            }} 
            color="secondary"
          >
            Reset Anyway
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default UserForm;
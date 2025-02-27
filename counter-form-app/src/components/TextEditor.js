import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, Paper, Container, Typography, Button } from '@mui/material';

function TextEditor() {
  const [content, setContent] = useState('');
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      
      // Load saved editor content if exists
      const savedContent = localStorage.getItem('editorContent');
      if (savedContent) {
        setContent(savedContent);
      } else {
        // Create initial content with user data
        const userDataObj = JSON.parse(savedUserData);
        const initialContent = `
          <h2>User Profile</h2>
          <p><strong>Name:</strong> ${userDataObj.name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${userDataObj.email || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${userDataObj.phone || 'Not provided'}</p>
          <p><strong>Address:</strong> ${userDataObj.address || 'Not provided'}</p>
        `;
        setContent(initialContent);
      }
    }
  }, []);
  
  // Handle content change
  const handleChange = (value) => {
    setContent(value);
    localStorage.setItem('editorContent', value);
  };
  
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];
  
  // Reset editor to initial state with user data
  const resetEditor = () => {
    if (userData) {
      const initialContent = `
        <h2>User Profile</h2>
        <p><strong>Name:</strong> ${userData.name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${userData.email || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${userData.phone || 'Not provided'}</p>
        <p><strong>Address:</strong> ${userData.address || 'Not provided'}</p>
      `;
      setContent(initialContent);
      localStorage.setItem('editorContent', initialContent);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Rich Text Editor
        </Typography>
        
        {!userData ? (
          <Typography color="error">
            No user data found. Please fill out the user form first.
          </Typography>
        ) : (
          <>
            <Box sx={{ height: 400, mb: 2 }}>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                style={{ height: '350px' }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={resetEditor}>
                Reset to Default
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default TextEditor;
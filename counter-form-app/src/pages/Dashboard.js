import { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography
 
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    // Load count data
    const savedCount = localStorage.getItem('count');
    if (savedCount) {
      setCount(parseInt(savedCount));
    }
    
    // Load user data
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
    
    // Create mock chart data
    const mockData = [
      { name: 'Profile Views', value: Math.floor(Math.random() * 100) + 20 },
      { name: 'Form Submissions', value: Math.floor(Math.random() * 50) + 5 },
      { name: 'Text Edits', value: Math.floor(Math.random() * 30) + 10 },
      { name: 'Counter Clicks', value: savedCount ? parseInt(savedCount) : 0 }
    ];
    setChartData(mockData);
  }, []);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Counter Card */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 200 }}>
            <Typography variant="h6" gutterBottom>
              Counter Value
            </Typography>
            <Typography variant="h2" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {count}
            </Typography>
          </Paper>
        </Grid>
        
        {/* User Profile Card */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 200 }}>
            <Typography variant="h6" gutterBottom>
              User Profile
            </Typography>
            {userData ? (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography><strong>ID:</strong> {userData.id}</Typography>
                  <Typography><strong>Name:</strong> {userData.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Email:</strong> {userData.email}</Typography>
                  <Typography><strong>Phone:</strong> {userData.phone}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><strong>Address:</strong> {userData.address}</Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography color="text.secondary">No user data available</Typography>
            )}
          </Paper>
        </Grid>
        
        {/* Chart */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
            <Typography variant="h6" gutterBottom>
              User Activity
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
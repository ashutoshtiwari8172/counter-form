import { useState, useEffect } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useSpring, animated } from 'react-spring';

function Counter() {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('count');
    return savedCount ? parseInt(savedCount) : 0;
  });

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);

  // Background animation based on count
  const animatedBackground = useSpring({
    height: `${Math.min(count * 5, 100)}%`, // Limiting to 100%
    config: { tension: 120, friction: 14, precision: 0.1 },
  });

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCount(0);

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          height: '400px', 
          position: 'relative', 
          overflow: 'hidden',
          border: '1px solid #ccc',
          borderRadius: '8px',
          mt: 4,
          mb: 2
        }}
      >
        <animated.div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            background: 'linear-gradient(0deg, #4dabf5 0%, #1976d2 100%)',
            ...animatedBackground
          }}
        />
        <Box 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
          }}
        >
          <Typography variant="h2" component="div" sx={{ color: count > 10 ? 'white' : 'black' }}>
            {count}
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        <Button variant="contained" onClick={increment}>Increment</Button>
        <Button variant="contained" color="secondary" onClick={decrement}>Decrement</Button>
        <Button variant="outlined" onClick={reset}>Reset</Button>
      </Box>
    </Container>
  );
}

export default Counter;
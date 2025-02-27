// import { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// import { Link } from 'react-router-dom';
// import AuthStatus from './AuthStatus';
// import { auth } from '../utils/auth';

// function Navbar() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     auth.checkAuth();
//     setIsAuthenticated(auth.isAuthenticated);
//   }, []);

//   console.log(isAuthenticated);

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           React App
//         </Typography>
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           {/* Only show these navigation items when logged in */}
//           {isAuthenticated && (
//             <>
//               <Button color="inherit" component={Link} to="/counter">Counter</Button>
//               <Button color="inherit" component={Link} to="/user-form">User Form</Button>
//               <Button color="inherit" component={Link} to="/text-editor">Text Editor</Button>
//               <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
//             </>
//           )}
//           <AuthStatus />
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Navbar;

import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthStatus from './AuthStatus';
import { auth } from '../utils/auth';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(auth.checkAuth()); // Ensure initial state is correct

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(auth.checkAuth()); // Update state when auth changes
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  console.log(isAuthenticated);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          React App
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button color="inherit" component={Link} to="/counter">Counter</Button>
          {/* Only show these navigation items when logged in */}
          {isAuthenticated && (
            <>
                
              <Button color="inherit" component={Link} to="/user-form">User Form</Button>
              <Button color="inherit" component={Link} to="/text-editor">Text Editor</Button>
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            </>
          )}
          <AuthStatus />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;


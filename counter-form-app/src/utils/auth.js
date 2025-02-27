// import { mockUsers } from './mockUsers';

// export const auth = {
//     isAuthenticated: false,
//     user: null,
    
//     // Mock sign in with Google
//     signInWithGoogle: (callback) => {
//       // Simulate successful authentication
//       auth.isAuthenticated = true;
//       auth.user = {
//         id: `user_${Math.floor(Math.random() * 1000000)}`,
//         name: 'Test User',
//         email: 'testuser@example.com',
//         photoURL: 'https://via.placeholder.com/150'
//       };
//       localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: auth.user }));
//       if (callback) callback();
//       return Promise.resolve(auth.user);
//     },
    
//     // Sign out
//     signOut: (callback) => {
//       auth.isAuthenticated = false;
//       auth.user = null;
//       localStorage.removeItem('auth');
//       if (callback) callback();
//       return Promise.resolve();
//     },
    
//     // Check if user is authenticated
//     checkAuth: () => {
//       const authData = localStorage.getItem('auth');
//       if (authData) {
//         const parsed = JSON.parse(authData);
//         auth.isAuthenticated = parsed.isAuthenticated;
//         auth.user = parsed.user;
//       }
//       return auth.isAuthenticated;
//     },

// // Sign in with email and password
// signIn: (email, password) => {
//     const user = mockUsers.find(u => 
//       u.email === email && u.password === password
//     );
    
//     if (user) {
//       const { password, ...userWithoutPassword } = user;
//       auth.isAuthenticated = true;
//       auth.user = userWithoutPassword;
//       localStorage.setItem('auth', JSON.stringify({ 
//         isAuthenticated: true, 
//         user: userWithoutPassword 
//       }));
//       return Promise.resolve(userWithoutPassword);
//     }
    
//     return Promise.reject(new Error('Invalid email or password'));
//   },
  
//   // Sign up (simulate adding a new user)
//   signUp: (name, email, password) => {
//     // Check if email already exists
//     if (mockUsers.some(u => u.email === email)) {
//       return Promise.reject(new Error('Email already exists'));
//     }
    
//     // Create new user
//     const newUser = {
//       id: `user_${Math.floor(Math.random() * 1000000)}`,
//       name,
//       email,
//       password,
//       photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
//     };
    
//     // In a real app, you would add to database
//     // Here we just pretend it was successful
//     const { password: _, ...userWithoutPassword } = newUser;
    
//     auth.isAuthenticated = true;
//     auth.user = userWithoutPassword;
//     localStorage.setItem('auth', JSON.stringify({ 
//       isAuthenticated: true, 
//       user: userWithoutPassword 
//     }));
    
//     return Promise.resolve(userWithoutPassword);
//   }
//   };

import { mockUsers } from './mockUsers';

export const auth = {
    isAuthenticated: false,
    user: null,
    
    // Mock sign in with Google
    signInWithGoogle: (callback) => {
      auth.isAuthenticated = true;
      auth.user = {
        id: `user_${Math.floor(Math.random() * 1000000)}`,
        name: 'Test User',
        email: 'testuser@example.com',
        photoURL: 'https://via.placeholder.com/150'
      };
      localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: auth.user }));
      
      window.dispatchEvent(new Event('authChange')); // Notify Navbar

      if (callback) callback();
      return Promise.resolve(auth.user);
    },
    
    // Sign out
    signOut: (callback) => {
      auth.isAuthenticated = false;
      auth.user = null;
      localStorage.removeItem('auth');
      
      window.dispatchEvent(new Event('authChange')); // Notify Navbar

      if (callback) callback();
      return Promise.resolve();
    },
    
    // Check if user is authenticated
    checkAuth: () => {
      const authData = localStorage.getItem('auth');
      if (authData) {
        const parsed = JSON.parse(authData);
        auth.isAuthenticated = parsed.isAuthenticated;
        auth.user = parsed.user;
      }
      return auth.isAuthenticated;
    },

    // Sign in with email and password
    signIn: (email, password) => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        auth.isAuthenticated = true;
        auth.user = userWithoutPassword;
        localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: userWithoutPassword }));

        window.dispatchEvent(new Event('authChange')); // Notify Navbar
        
        return Promise.resolve(userWithoutPassword);
      }
      
      return Promise.reject(new Error('Invalid email or password'));
    },
  
    // Sign up (simulate adding a new user)
    signUp: (name, email, password) => {
      if (mockUsers.some(u => u.email === email)) {
        return Promise.reject(new Error('Email already exists'));
      }
      
      const newUser = {
        id: `user_${Math.floor(Math.random() * 1000000)}`,
        name,
        email,
        password,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
      };
      
      const { password: _, ...userWithoutPassword } = newUser;
      
      auth.isAuthenticated = true;
      auth.user = userWithoutPassword;
      localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: userWithoutPassword }));

      window.dispatchEvent(new Event('authChange')); // Notify Navbar
      
      return Promise.resolve(userWithoutPassword);
    }
};

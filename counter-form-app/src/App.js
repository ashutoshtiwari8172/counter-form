import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CounterPage from './pages/CounterPage';
import UserFormPage from './pages/UserFormPage';
import TextEditorPage from './pages/TextEditorPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/counter" element={<CounterPage />} />
          
          {/* Protected Routes */}
          <Route path="/user-form" element={
            <PrivateRoute>
              <UserFormPage />
            </PrivateRoute>
          } />
          
          <Route path="/text-editor" element={
            <PrivateRoute>
              <TextEditorPage />
            </PrivateRoute>
          } />
          
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
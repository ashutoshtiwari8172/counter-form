import { Navigate } from 'react-router-dom';
import { auth } from '../utils/auth';

function PrivateRoute({ children }) {
  auth.checkAuth();
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
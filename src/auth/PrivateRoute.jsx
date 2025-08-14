// src/auth/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = () => {
  const { user } = useAuth();
  const isAuthenticated = user || localStorage.getItem('isAuthenticated');

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
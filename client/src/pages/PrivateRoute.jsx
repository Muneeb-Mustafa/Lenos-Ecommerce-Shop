import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ Component }) => {
  const { auth } = useAuth();
  if (!auth.user || !auth.token) {
    return <Navigate to="/auth/login" />;
  }
  return <Component />;
};

export default PrivateRoute;




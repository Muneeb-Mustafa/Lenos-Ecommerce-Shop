import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Frontend from './pages/Frontend';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/PrivateRoute';
import { useAuth } from './context/AuthContext';

const Index = () => {
  const { auth } = useAuth();
  return (
    <Routes>
      <Route path='/*' element={<Frontend />} />
      <Route path='/auth/*' element={!auth.user ? <Auth /> : <Navigate to="/dashboard/users" />} />
      <Route path='/dashboard/*' element={<PrivateRoute Component={Dashboard} />} />
    </Routes>
  );
};

export default Index;

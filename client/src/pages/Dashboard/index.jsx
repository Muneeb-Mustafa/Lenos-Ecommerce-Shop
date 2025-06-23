import React, { useEffect } from 'react';
import Header from '../../components/Header/Header'; 
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom'; 
import Sidebar from '../../components/Sidebar/Sidebar'; 
import UserSidebar from '../../components/UserSidebar/UserSidebar';
import Pagenotfound from '../../components/Pagenotfound';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './Admin/AdminDashboard';
import CreateProduct from './Admin/CreateProduct';
import CreateCategory from './Admin/CreateCategory';
import User from './Admin/User';
import { useAuth } from '../../context/AuthContext';
import Profile from './user/Profile';
import Orders from './user/Orders';
import Products from './Admin/Products';
import UpdateProduct from './Admin/UpdateProduct';  

const Dashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      if (auth?.user) {
        if (auth.user.role === 'admin') {
          navigate('/dashboard/admin');
        } else {
          navigate('/dashboard/users');
        }
      } else {
        navigate('/auth/login');
      }
    }
  }, [auth, location.pathname, navigate]);

  return (
    <>
      <Header />
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}> 
        {auth?.user?.role === 'admin' && (
          <Sidebar/>
        )}
        {auth?.user?.role !== 'admin' && (
          <UserSidebar/>
        )}
        
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <Routes>
            <Route
              path="/admin/*"
              element={auth?.user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/auth/login" />}
            />
            {auth?.user?.role === 'admin' && (
              <>
                <Route path='/admin/create-product' element={<CreateProduct />} />
                <Route path='/admin/create-category' element={<CreateCategory />} />
                <Route path='/admin/products' element={<Products />} />
                <Route path='/admin/product/:slug' element={<UpdateProduct />} />
                <Route path='/admin/users' element={<User />} />
                <Route path='*' element={<Pagenotfound />} />
              </>
            )}
            <Route
              path='/users'
              element={auth?.user?.role !== 'admin' ? <UserDashboard /> : <Navigate to="/dashboard/admin" />}
            />
            {auth?.user?.role !== 'admin' && (
              <>
                <Route path='/users/profile' element={<Profile />} />
                <Route path='/users/orders' element={<Orders />} /> 
                <Route path='*' element={<Pagenotfound />} />
              </>
            )} 
          </Routes>
        </div>
      </div> 
    </>
  );
};

export default Dashboard;

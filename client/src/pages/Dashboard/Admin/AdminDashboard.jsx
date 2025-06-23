import React from 'react'
import { useAuth } from '../../../context/AuthContext';
import { Helmet } from 'react-helmet-async';

const AdminDashboard = () => {
  const {auth} = useAuth()
  return (
    <>
    <Helmet>
          <title>Admin Dashboard - Ecommerce Shop</title>
          <meta
            name="Admin Dashboard"
            content="Discover the best deals on electronics, fashion, and home goods. Shop top-quality products at unbeatable prices. Fast shipping and great customer service."
          />
          <meta name="keywords" content="eCommerce, online shopping, best deals, electronics, fashion, home goods, discount store, free shipping" />
    </Helmet>
    <main className='text-center mt-5'>
        <h1 className='mb-5'>Admin Dashboard</h1>
        <h2>Admin Name: {auth.user.name}</h2>
        <h3>Admin Email: {auth.user.email}</h3> 
    </main>
    </>
  )
}

export default AdminDashboard;
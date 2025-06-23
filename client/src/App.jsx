import React from 'react';
import './App.scss';
import Index from './Routes';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import { Helmet } from 'react-helmet-async';  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 



function App() {
  return (
    <>
      <Helmet>
        <title>Lenos Shop - Best Deals on Watches, Fashion & More</title>
        <meta 
          name="description" 
          content="Shop top-quality electronics, fashion, home goods, and more at unbeatable prices. Fast shipping and 24/7 customer support available."
        />
        <meta 
          name="keywords" 
          content="ecommerce, online shopping, electronics, fashion, home goods, discount store, best deals, free shipping" 
        />
        <meta 
          property="og:title" 
          content="Ecommerce Shop - Best Deals on Electronics, Fashion & More" 
        /> 
      </Helmet>
      <Index />
      <ToastContainer />
    </>
  );
}

export default App;

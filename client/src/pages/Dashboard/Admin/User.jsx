import React from 'react'
import { Helmet } from 'react-helmet-async';

const User = () => {
  return (
    <>
    <Helmet>
        <title>Dashboard-Users</title>
        <meta
          name="Admin Dashboard"
          content="Discover the best deals on electronics, fashion, and home goods. Shop top-quality products at unbeatable prices. Fast shipping and great customer service."
        />
        <meta
          name="keywords"
          content="eCommerce, online shopping, best deals, electronics, fashion, home goods, discount store, free shipping"
        />
      </Helmet>
    <div>User</div>
    </>
  )
}

export default User;
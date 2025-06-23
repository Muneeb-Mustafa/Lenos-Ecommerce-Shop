import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Home from './Home'  
import Pagenotfound from '../../components/Pagenotfound'
import ProductDetail from './ProductDetail'
import Categories from './Categories'
import CategoryProduct from './CategoryProduct'
import Cart from './Cart'
import Home2 from './Home2'
import About from './About'
import Contact from './Contact'

const Frontend = () => {
  return (
    <>
    <Header/>
    <Routes>
        <Route path="/" element={<Home2 />} />
        <Route path="/products" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="*" element={<Pagenotfound/>} /> 
    </Routes>
    <Footer/>
    </>
  )
}

export default Frontend

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Pagenotfound from '../../components/Pagenotfound'
import ForgetPassword from './ForgetPassword'

const Auth = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="*" element={<Pagenotfound/>} /> 
    </Routes>
  )
}

export default Auth

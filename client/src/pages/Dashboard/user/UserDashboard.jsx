import React from 'react'
import { useAuth } from '../../../context/AuthContext'

const UserDashboard = () => {
  const {auth} = useAuth()
  return (
    <>
      <div className="dash text-center">
      <h1 className='mb-5'>User Dashboard</h1>
        <h3>Name: {auth.user.name}</h3>
        <h3>Email: {auth.user.email}</h3> 
        <h3>Role: {auth.user.role}</h3> 
      </div>
    </>
  )
}

export default UserDashboard
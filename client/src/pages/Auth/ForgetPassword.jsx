import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import { API_URL } from '../../config';

const initialState = { email: '', newPassword: '', answer:'' };

const ForgetPassword = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false); 
  const {auth, setAuth} = useAuth();

  const handleChange = (e) => setInput((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form inputs
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email, newPassword, answer } = input;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }
    if (newPassword.trim().length < 6) {
        return toast.error("Password must be at least 6 characters.");
    }
    if (!answer) {
      return toast.error("Please enter your favorite sports team");
    }
    try {
      const response = await axios.post(`${API_URL}/api/auth/forget-password`, input)
      toast.success("Password reset successfully");
      navigate('/auth/login') 
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Login failed');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <Helmet>
          <title>Forget Password - Ecommerce Shop</title>
          <meta
            name="description"
            content="Discover the best deals on electronics, fashion, and home goods. Shop top-quality products at unbeatable prices. Fast shipping and great customer service."
          />
          <meta name="keywords" content="eCommerce, online shopping, best deals, electronics, fashion, home goods, discount store, free shipping" />
        </Helmet>
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Login to your account</h2>

                  <form onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        className="form-control form-control-lg"
                        value={input.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3">
                      <label className="form-label">Your Favourite Sports team?</label>
                      <input
                        type="text"
                        name="answer" 
                        className="form-control form-control-lg"
                        value={input.answer}
                        onChange={handleChange}
                      />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label">Password</label>
                      <div className="input-group">
                        <input
                          type={showPassword ? 'text' : 'password'} // Toggle between text and password
                          name="newPassword"
                          autoComplete="current-password"
                          className="form-control form-control-lg"
                          value={input.newPassword}
                          onChange={handleChange}
                        />
                        <span
                          className="input-group-text"
                          style={{ cursor: 'pointer' }}
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? '🙈' : '👁️'}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        style={{color: '#fff',backgroundColor: '#ae845f', border: "none"}}
                      >
                        Reset Password
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Don't have an account?{' '}
                      <Link to="/auth/register" className="fw-bold text-body" style={{textDecoration: 'none'}}>
                        Register here
                      </Link>
                    </p> 
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ForgetPassword;

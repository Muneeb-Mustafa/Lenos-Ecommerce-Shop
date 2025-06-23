import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'
import { Helmet } from 'react-helmet-async';
import { API_URL } from '../../config';

const initialState = { name: '', email: '', password: '', phone: '', address: '', answer: '', termsAccepted: false };

const Register = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleChange = (e) => setInput((s) => ({ ...s, [e.target.name]: e.target.value }));
  
  const handleCheckboxChange = (e) => {
    setInput((s) => ({
      ...s,
      termsAccepted: e.target.checked,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form inputs
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    
    const {name, email, password, phone, answer, termsAccepted} = input;
    if (!name) return toast.error("Please enter your full name");
    if (name.trim().length < 3) {
      return toast.error("Please enter your full name");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Please enter valid email address");
    }
    if (password.trim().length < 6) {
      return toast.error("Password must be atleast 6 chars");
    }
    if (!phoneRegex.test(phone)) {
      return toast.error("Please enter a valid 10-digit phone number");
    }
    if(!answer){
      return toast.error("You must anwer the question");
    }
    if (!termsAccepted) {
      return toast.error("You must accept the terms of service.");
    }
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, input) 
      toast.success("User has been successfully submitted");
      navigate("/auth/login") 
    } catch (error) {
      console.error('Error during form submission:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <Helmet>
          <title>Register - Ecommerce Shop</title>
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
                  <h2 className="text-uppercase text-center mb-2">Create an account</h2>

                  <form onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline mb-2">
                      <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control form-control-lg"
                        value={input.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-2">
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

                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label">Password</label>
                      <div className="input-group">
                        <input
                          type={showPassword ? 'text' : 'password'} // Toggle between text and password
                          name="password"
                          autoComplete="current-password"
                          className="form-control form-control-lg"
                          value={input.password}
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

                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label">Phone</label>
                      <input
                        type="number"
                        name="phone"
                        className="form-control form-control-lg"
                        value={input.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div data-mdb-input-init className="form-outline mb-2">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        name="address"
                        className="form-control form-control-lg"
                        value={input.address}
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

                    <div className="form-check  mb-2">
                      <input
                        className="form-check-input custom-checkbox me-2"
                        type="checkbox"
                        checked={input.termsAccepted}
                        onChange={handleCheckboxChange}
                        id="customCheck"
                      />
                      <label className="form-check-label" htmlFor="customCheck">
                        I agree to all statements in{' '}
                        <Link to="#" className="text-body" >Terms of service</Link>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg register text-body"
                        style={{color: '#fff',backgroundColor: '#ae845f', border: "none"}}
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-3 mt-2">
                      Already have an account?{' '}
                      <Link to="/auth/login" className="fw-bold text-body" style={{textDecoration: 'none'}}>
                        Login here
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

export default Register;

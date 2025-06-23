import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios' 
import { toast } from 'react-toastify';
import { API_URL } from "../../../config";


const initialState = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: ""   
};
const Profile = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleChange = (e) =>
    setInput((s) => ({ ...s, [e.target.name]: e.target.value })); 

  useEffect(()=>{
    const {name, email, password } = auth?.user;
    setInput({name, email, password})
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    const { name, email } = input;
    if (!name) return toast.error("Please enter your full name");
    if (name.trim().length < 3) {
      return toast.error("Please enter your full name");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Please enter valid email address");
    }    
    try {
      const storedData = localStorage.getItem("auth");
      const parsedData = storedData ? JSON.parse(storedData) : null;

      if (!parsedData || !parsedData.token) {
        throw new Error("User is not authenticated.");
      }

      const token = parsedData.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const {data} = await axios.put(
        `${API_URL}api/auth/update-profile`,
        input,
        config
      );
      console.log(`Sending PUT request to: ${API_URL}/api/auth/update-profile`);
      if(data?.error){
        toast.error(data.error);
        return;
      }else{
        setAuth({...auth, user: data?.updatedUser})
        let ls = JSON.parse(localStorage.getItem('auth'))
         ls.user = data.updatedUser;
         localStorage.setItem('auth', JSON.stringify(ls))
         toast.success("Profile Updated successfully")
      } 
      toast.success("User have been Updated successfully");
      navigate("/auth/login"); 
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Helmet>
        <title>User Dashboard - Ecommerce Shop</title>
        <meta
          name="Admin Dashboard"
          content="Discover the best deals on electronics, fashion, and home goods. Shop top-quality products at unbeatable prices. Fast shipping and great customer service."
        />
        <meta
          name="keywords"
          content="eCommerce, online shopping, best deals, electronics, fashion, home goods, discount store, free shipping"
        />
      </Helmet>
      <main className="text-center">
        <section className="vh-100">
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card" style={{ borderRadius: "15px" }}>
                    <div className="card-body p-5">
                      <h2 className="text-uppercase text-center mb-2">
                        Update Profile
                      </h2>

                      <form onSubmit={handleSubmit}>
                        <div
                          data-mdb-input-init
                          className="form-outline mb-2 text-start"
                        >
                          <label
                            className="form-label"
                            htmlFor="form3Example1cg"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control form-control-lg"
                            value={input.name}
                            onChange={handleChange}
                          />
                        </div>

                        <div
                          data-mdb-input-init
                          className="form-outline mb-2 text-start"
                        >
                          <label
                            className="form-label"
                            htmlFor="form3Example3cg"
                          >
                            Your Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            disabled
                            autoComplete="email"
                            className="form-control form-control-lg"
                            value={input.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div
                          data-mdb-input-init
                          className="form-outline text-start"
                        >
                          <label className="form-label">Password</label>
                          <div className="input-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              autoComplete="current-password"
                              className="form-control form-control-lg"
                              value={input.password}
                              onChange={handleChange}
                            />
                            <span
                              className="input-group-text"
                              style={{ cursor: "pointer" }}
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? "🙈" : "👁️"}
                            </span>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mt-3">
                          <button
                            type="submit"
                            className="btn btn-success btn-block btn-lg register text-body"
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;

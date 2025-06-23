import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import useCategory from "../../hooks/useCategory";
import { IoLocationSharp } from "react-icons/io5";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import headerLogo from "../../assets/Images/headerLogo.png" 

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { categories } = useCategory();
  const { cart, setCart } = useCart();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navbarRef = useRef(null)
  

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/auth/login");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleNavLinkClick = () => {
    if (window.innerWidth < 576) { 
      const navbar = navbarRef.current;
      if (navbar && navbar.classList.contains("show")) {
        navbar.classList.remove("show");
      }
    }
  };

  return (
    <> 
      <div className="bar1" style={{ backgroundColor: "#1A1A1A", color: "#C5C5C5" }}>
        <div className="container mt-3 mb-3">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-3 loc">
              <IoLocationSharp /> 283 N. Glenwood Street, Levittown, NY
            </div>
            <div className="col-6 deal text-center">
              Best special offers every week!{" "}
              <span style={{ color: "#ae845f" }}>40%</span> Off!
            </div>
            <div className="col-3 social-icons text-end">
              <Link to="https://www.facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook className="social-icon" />
              </Link>
              <Link to="https://www.twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter className="social-icon" />
              </Link>
              <Link to="https://www.instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram className="social-icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-secondary navbar-light p-3">
        <div className="container">
          <Link to="/">
            <img
              src={headerLogo}
              alt="Lenox Logo"
              width="130px"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={navbarRef}>
            <ul className="navbar-nav mx-auto text-center mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page" onClick={handleNavLinkClick}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link active" aria-current="page"  onClick={handleNavLinkClick}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link active" aria-current="page"  onClick={handleNavLinkClick}>
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link active" aria-current="page"  onClick={handleNavLinkClick}>
                  Contact
                </Link>
              </li>
              
            </ul>
 
            <div className="d-flex justify-content-center align-items-center"> 
              {auth.user ? (
                <div
                  className="icons text-dark p-3 position-relative"
                  style={{ cursor: "pointer" }}
                >
                  <FiUser size={24} onClick={toggleDropdown} />
                  {dropdownVisible && (
                    <div
                      className="dropdown-menu show"
                      style={{ right: 0, left: "auto", position: "absolute" }}
                    >
                      <Link
                        className="dropdown-item"
                        to={
                          auth.user.role === "admin"
                            ? "/dashboard/admin"
                            : "/dashboard/users"
                        }
                        onClick={handleNavLinkClick}
                      >
                        Dashboard
                      </Link>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/auth/login">
                  <button className="btn login" type="submit">
                    Login
                  </button>
                </Link>
              )}

              <div className="icons text-dark p-3 position-relative">
                <Link to="/cart">
                  <FiShoppingCart size={24} onClick={handleNavLinkClick}/>
                  <span
                    className="badge position-absolute"
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.3em 0.5em",
                      borderRadius: "50%",
                      backgroundColor: "#AE845F"
                    }}
                  >
                    {cart?.length}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

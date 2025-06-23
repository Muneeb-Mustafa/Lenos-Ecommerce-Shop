import React from 'react';
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="sectionStyles"
      style={{
        backgroundImage: "url('/images/contact.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "80px 20px",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h4
        style={{
          fontFamily: "Playfair-Display",
          fontSize: "60px",
          marginBottom: "20px",
        }}
      >
        Contact Us
      </h4>

      <Breadcrumb>
        <Breadcrumb.Item as={Link} to="/" style={{ color: "#fff" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active style={{ color: "#ddd" }}>
          Contact
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default Hero;

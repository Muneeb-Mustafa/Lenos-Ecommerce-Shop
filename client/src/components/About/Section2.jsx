import React from "react";
import section2 from "../../assets/Images/About/section2.jpg" 

const Section2 = () => {
  return (
    <div className="container sect-2">
      <div className="row">
        <div className="col-md-6">
          <img
            src={section2}
            alt="Spring Winter 2022"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center flex-column align-items-md-start">
          <h3 style={{fontFamily: "Playfair-Display", fontSize: "50px"}} className="mb-3">Spring Winter 2024</h3>
          <p className="mt-3 mb-4">
            Upgrade your wardrobe with our exclusive collection, designed to
            bring you both style and comfort. Shop now and enjoy the perfect
            balance of elegance and functionality. Don't miss out on these limited-time
            offers—grab your favorites before they're gone!
          </p>
          <button className="btn1">Shop the Look</button>
        </div>
      </div>
    </div>
  );
};

export default Section2;

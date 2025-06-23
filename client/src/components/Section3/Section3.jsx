import React from "react";
import section3 from "../../assets/Images/Home/section3.jpg"
const Section3 = () => {
  return (
    <div className="container sect-3">
      <div className="row">
        <div className="col-md-6">
          <img
            src={section3}
            alt="Spring Winter 2022"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="sec-3 col-md-6 d-flex justify-content-center align-items-center flex-column align-items-md-start">
          <h3 className="mb-lg-3">Spring Winter 2024</h3>
          <p className="mt-lg-3 mb-lg-4">
            Upgrade your wardrobe with our exclusive collection, designed to
            bring you both style and comfort. Shop now and enjoy the perfect
            balance of elegance and functionality. Don't miss out on these limited-time
            offers—grab your favorites before they're gone!
          </p>
          <button className="btn1">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Section3;

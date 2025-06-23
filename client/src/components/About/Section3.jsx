import React from "react";
import logo1 from "../../assets/Images/About/logo1.png" 
import logo2 from "../../assets/Images/About/logo2.png" 



const Section3 = () => {
  return (
    <div
      className="section3 text-center"
      style={{
        backgroundColor: "#F5F3F2", 
      }}
    >
      <div className="mb-5">
        <p>
          “We are community-led, with a continued commitment to be the most
          responsible <br /> version of ourselves – and we never rest on our
          laurels.”
        </p>
      </div>
      <div className="row justify-content-center mt-4"> 
        <div className="col-md-2 col-6 mb-4">
          <img
            src={logo1}
            alt="Company Logo 1"
            className="img-fluid" 
            style={{ maxWidth: "100%", height: "auto" }} 
          />
        </div>
        <div className="col-md-2 col-6 mb-4">
          <img
            src={logo2}
            alt="Company Logo 2"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-md-2 col-6 mb-4">
          <img
            src={logo1}
            alt="Company Logo 3"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-md-2 col-6 mb-4">
          <img
            src={logo2}
            alt="Company Logo 4"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Section3;

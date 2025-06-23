import React from "react";
import Carousel from "react-bootstrap/Carousel"; 
import ExampleCarouselImage from "./ExampleCarouselImage";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import banner1 from "../../assets/Images/Home/banner1.jpg"
import banner2 from "../../assets/Images/Home/banner2.jpg"
import banner3 from "../../assets/Images/Home/banner3.jpg"
import banner4 from "../../assets/Images/Home/banner4.jpg"

const slides = [
  {
    src: banner1,
    subtitle: "Up To 60% Off Now",
    label: "Mid Season Sale 40%",
    description: "Final Clearance: Take 20% off Sale Must-Haves.",
  },
  {
    src: banner2,
    subtitle: "Fall Summer Clearance",
    label: "Enjoy The Season Sale",
    description: "Final Clearance: Take 20% off Sale Must-Haves.",
  },
  {
    src: banner3,
    subtitle: "Fall Summer Clearance",
    label: "Enjoy The Season Sale",
    description: "Final Clearance: Take 20% off Sale Must-Haves.",
  }, 
  {
    src: banner4,
    subtitle: "Up To 60% Off Now",
    label: "Enjoy The Season Sale",
    description: "Final Clearance: Take 20% off Sale Must-Haves.",
  },
];

function Hero() {
  return (
    <Carousel className="carousels">
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <ExampleCarouselImage imageSrc={slide.src} /> 
          <Carousel.Caption className="carousel-caption-center">
            <p id="des">{slide.subtitle}</p>
            <h1>{slide.label}</h1>
            <p>{slide.description}</p>
            <Link to="/products">
              <button className="btn btn-danger">
                Start Shopping<FaArrowRight style={{ paddingLeft: "5px" }} />
              </button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Hero;

import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import slide1 from "../../assets/Images/Home/slide1.png";
import slide2 from "../../assets/Images/Home/slide2.png";
import slide3 from "../../assets/Images/Home/slide3.png";
import slide4 from "../../assets/Images/Home/slide4.png";
import slide5 from "../../assets/Images/Home/slide5.jpg";
import slide6 from "../../assets/Images/Home/slide6.png";
import slide7 from "../../assets/Images/Home/slide7.jpg";
import slide8 from "../../assets/Images/Home/slide8.png";

const CardImageSlider = () => {
  const images = [
    { src: slide1 },
    { src: slide2 },
    { src: slide3 },
    { src: slide4 },
    { src: slide5 },
    { src: slide6 },
    { src: slide7 },
    { src: slide8 },
  ];

  const [items, setItems] = useState([]);
  const [imagesPerSlide, setImagesPerSlide] = useState(4); 

  const updateItems = () => {
    const newItems = [];
    for (let i = 0; i < images.length; i += imagesPerSlide) {
      newItems.push(images.slice(i, i + imagesPerSlide));
    }
    setItems(newItems);
  };

  // Update the number of images per slide based on the screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setImagesPerSlide(1); // Show 1 image per slide on mobile
      } else {
        setImagesPerSlide(4); // Default to 4 images per slide on larger screens
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    updateItems();
  }, [imagesPerSlide]); // Update items whenever imagesPerSlide changes

  return (
    <div className="container mb-5 imgSlider">
      <h1 className="mb-3">@lenos.store</h1>
      <p className='mb-5'>Follow us on Instagram</p>
      <Carousel controls={false} indicators={false}>
        {items.map((item, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center">
              {item.map((image, imgIndex) => (
                <div className="image-container" key={imgIndex}>
                  <img
                    className="img-fluid mb-4"
                    src={image.src}
                    alt={`Slide ${index * imagesPerSlide + imgIndex + 1}`}
                  />
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CardImageSlider;

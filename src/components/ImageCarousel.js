import React from 'react';
import { Carousel } from 'react-bootstrap';
import image1 from '../images/image1.webp';
import image8 from '../images/image8.jpeg';
import image4 from '../images/image4.jpg';
import image9 from '../images/image9.jpg';

function ImageCarousel() {
  return (
    <Carousel className="carousel" style={{ width: '100%',height:'auto' }}>
          <Carousel.Item className="carousel-item">
      <img
          className="d-block w-100"
          src={image8}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img
          className="d-block w-100"
          src={image1}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img
          className="d-block w-100"
          src={image9}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img
          className="d-block w-100"
          src={image4}
          alt="Fourth slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageCarousel;
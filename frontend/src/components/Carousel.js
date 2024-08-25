import React, { useState, useEffect } from 'react';
import carousel1 from '../images/stega-1.png';
import carousel2 from '../images/stega-2.png';
import carousel3 from '../images/stega-3.jpg';
import carousel4 from '../images/stega-4.png';
import carousel5 from '../images/stega-5.png';

const Carousel = () => {
  const slides = [carousel1, carousel2, carousel3, carousel4, carousel5];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically move to the next slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [slides.length]); // Run effect whenever slides.length changes

  // const goToPreviousSlide = () => {
  //   setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  // };

  // const goToNextSlide = () => {
  //   setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  // };

  return (
    <div className="relative h-custom-350">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-[870px] h-[350px] object-cover transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        />


      ))}
      {/* <button
        onClick={goToPreviousSlide}
        className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-transparent p-2 rounded-full shadow-lg z-10 focus:outline-none"
      >
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-transparent p-2 rounded-full shadow-lg z-10 focus:outline-none"
      >
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button> */}
    </div>
  );
};

export default Carousel;

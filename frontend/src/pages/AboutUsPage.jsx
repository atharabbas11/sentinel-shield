// src/pages/AboutUsPage.js
import React, { useState, useRef, useEffect } from 'react';
import backgroundImage1 from '../images/doted6.png'
import aboutus from '../images/aboutus.png'; // Adjust the path
// import LoadingBar from './LoadingBar'; // Ensure the path is correct based on your project structure
import { RiTeamLine } from "react-icons/ri";

const AboutUsPage = () => {

  // const [loading, setLoading] = useState(false);

  
  // Intersection Observer setup
  const [isVisible, setIsVisible] = useState({
    about: false
  });
  
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  
  useEffect(() => {
      const featuresElement = featuresRef.current;
      const aboutElement = aboutRef.current;
      const contactElement = contactRef.current;
    
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
        }
      );
    
      if (featuresElement) observer.observe(featuresElement);
      if (aboutElement) observer.observe(aboutElement);
      if (contactElement) observer.observe(contactElement);
    
      return () => {
        if (featuresElement) observer.unobserve(featuresElement);
        if (aboutElement) observer.unobserve(aboutElement);
        if (contactElement) observer.unobserve(contactElement);
      };
  }, []);

  return (
    <div className="min-h-screen relative bg-custom-bg">
      {/* Initial image */}
      {/* <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh', // Ensure it covers the full viewport height
        }}
      ></div> */}

      {/* <LoadingBar loading={loading} /> */}
      <section style={{ backgroundImage: `url(${backgroundImage1})`, backgroundSize: 'auto', backgroundPosition: 'bottom', backgroundRepeat: 'repeat', height: '100vh' }}>
        <main className="relative z-10 container mx-auto mt-8 p-4">
        {/* <section id="about" className="my-12 mt-20" ref={aboutRef}>
          <h1 className="text-5xl font-semibold text-center mb-8 text-white">About</h1>
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-3/5 mb-8 md:mb-0 md:pl-8 md:pr-28 lg:pl-14 xl:pl-44">
              <img src={aboutus} alt="About Us" />
            </div>
            <div className={`w-full md:w-2/5 text-center md:text-left p-2 ${isVisible.about ? 'slide-in-right' : ''}`}>
              <h2 className="text-4xl font-semibold mb-6 text-gray-300">About Us</h2>
              <p className="text-lg mb-4 xl:pr-20 text-white">
                We are passionate about the art and science of steganography. Our mission is to provide powerful tools that help you communicate securely and privately.
              </p>
              <button className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition">
                Learn More
              </button>
            </div>
          </div>
        </section> */}
        <section id="aboutus" className="my-12 mt-20" ref={featuresRef}>
          {/* About Section */}
          <div className="relative">
            <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
              <div className={`my-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:px-0 ${isVisible.about ? 'slide-in-right' : ''}`}>
                <div>
                  <div className='lg:mx-auto lg:flex lg:justify-end mb-6'>
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-purple-500">
                      <RiTeamLine size={32} color='white' />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2 className="xl:text-right lg:text-right md:text-left text-4xl font-semibold mb-6 text-white">About Us</h2>
                    <p className="xl:text-right lg:text-right md:text-left inline-flex justify-end mt-4 text-lg text-gray-300">We are passionate about the art and science of steganography. Our mission is to provide powerful tools that help you communicate securely and privately.</p>
                    <div className="lg:mx-auto lg:flex lg:justify-end mt-6">
                      <button className="inline-flex justify-end rounded bg-blue-600 text-white px-4 py-2 text-base font-semibold leading-7 hover:bg-blue-700 " href="#">Learn More</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="flex justify-center mx-auto">
                  <img width="647" height="486" style={{ color: "transparent" }} alt='aboutusimg' src={aboutus}/>
                </div>
              </div>
            </div>
          </div>
        </section>
        </main>
      </section>
    </div>
  );
};

export default AboutUsPage;

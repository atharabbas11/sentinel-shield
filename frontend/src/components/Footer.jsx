import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="relative z-10 container mx-auto mt-8 p-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between mb-8 gap-1">

            {/* Company Information */}
            <div className="w-full md:w-2/6 mb-6 md:mb-0">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold cursor-pointer mb-4" onClick={() => { navigate('/'); window.scrollTo(0, 0); }}>
                Sentinel Shield
              </h1>
              <p className="text-gray-400">
                Sentinel Shield is a web application designed to offer advanced steganography services. Our application provides users with the ability to securely encrypt and hide data within images, as well as decrypt data from images.
              </p>
            </div>

            {/* Footer Navigation Links */}
            <div className="w-full md:w-1/5 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="flex flex-col space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white" onClick={() => handleNavigation('/')}>Home</Link></li>
                <li><Link to="/features" className="text-gray-400 hover:text-white" onClick={() => handleNavigation('/')}>Features</Link></li>
                <li><Link to="/aboutus" className="text-gray-400 hover:text-white" onClick={() => handleNavigation('/')}>About Us</Link></li>
                <li><Link to="/contactus" className="text-gray-400 hover:text-white" onClick={() => handleNavigation('/')}>Contact</Link></li>
              </ul>
            </div>

            {/* Social Media Icons */}
            <div className="w-full md:w-1/5">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="space-x-4">
                <div className='flex flex-col'>
                  <a href="https://facebook.com" className="text-gray-400 hover:text-white flex items-center">
                    <FaFacebook size={20} className="mr-2" /> SentinalSheild
                  </a>
                  <a href="https://twitter.com" className="text-gray-400 hover:text-white flex items-center">
                    <FaTwitter size={20} className="mr-2" /> SentinalSheild
                  </a>
                  <a href="https://instagram.com" className="text-gray-400 hover:text-white flex items-center">
                    <FaInstagram size={20} className="mr-2" /> Sentinal_Sheild
                  </a>
                  <a href="https://linkedin.com" className="text-gray-400 hover:text-white flex items-center">
                    <FaLinkedin size={20} className="mr-2" /> SentinalSheild
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className='flex justify-between flex-wrap'>
            <p className="text-gray-400">&copy; 2024 Sentinel Shield. All rights reserved.</p>
            <div className="flex flex-wrap">
              <p className="text-gray-400 mr-5">Privacy Policy</p>
              <p className="text-gray-400">Terms & Conditions</p>
           </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

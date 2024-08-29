import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import profilePlaceholder from '../images/default-profile.jpg'; // Add a placeholder image if user doesn't have one
import LoadingBar from './LoadingBar';

const apiUrl = process.env.REACT_APP_API_URL;


const Navbar = ({ isLoggedIn, onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const menuRef = useRef(null);

  const handleSignOutClick = async () => {
    setLoading(true); // Show loading indicator
    
    await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for 500 milliseconds

    try {
      // Call the backend to perform sign-out operations
      await fetch('/api/users/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any required authentication headers, if necessary
        },
      });

      // Perform any additional cleanup (like clearing user data in the application)
      onSignOut(); // Example of custom cleanup function

      // Clear user data from local storage
      localStorage.removeItem('authToken'); // Make sure this is the correct key used to store the token

      // Clear cookies or other application state if needed
      // Cookies.remove('sessionCookie'); // Example for removing cookies, if applicable

      setLoading(false);
      navigate('/'); // Redirect to the homepage
      window.location.reload(); // Reload the page after sign-out

    } catch (error) {
      console.error('Error during sign-out:', error);
      setLoading(false); // Stop loading animation in case of an error
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    window.scrollTo(0,0);
  };

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!accountMenuOpen);
  };


  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setAccountMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const fetchUserProfile = async () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) { // Check if the token exists
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          };
          const { data } = await axios.get(`${apiUrl}/api/users/profile`, config);
          setProfileImageUrl(data.profileImage); // Assuming profileImage contains the URL
          setLoading(false);
        } catch (error) {
          setError('Failed to load profile data');
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, []);

  
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };


  return (
    <div>
      <LoadingBar loading={loading} /> {/* Ensure the LoadingBar is rendered */}
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-6 fixed top-0 w-full z-50">
        <div className="mx-auto flex justify-between items-center px-4">

          {/* Left Section: Logo */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold cursor-pointer" onClick={() => handleNavigation('/')}>
            Sentinel Shield
          </h1>

          {/* Middle Section: Navigation Links */}
          <nav className="hidden lg:flex items-center lg:mr-10 xl:mr-20 space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/" className="text-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-medium" onClick={() => handleNavigation('/')}>
                  Home
                </Link>
                <Link to="/features" className="text-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-medium" onClick={() => handleNavigation('/')}>
                  Features
                </Link>
                <Link to="/aboutus" className="text-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-medium" onClick={() => handleNavigation('/')}>
                  About
                </Link>
                <Link to="/contactus" className="text-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-medium" onClick={() => handleNavigation('/')}>
                  Contact
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-medium" onClick={() => handleNavigation('/')}>
                  Home
                </Link>
                <Link to="/features" className="text-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-medium" onClick={() => handleNavigation('/')}>
                  Features
                </Link>
                <Link to="/aboutus" className="text-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-medium" onClick={() => handleNavigation('/')}>
                  About
                </Link>
                <Link to="/contactus" className="text-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-medium" onClick={() => handleNavigation('/')}>
                  Contact
                </Link>
                <Link to="/steganography" className="text-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-medium" onClick={() => handleNavigation('/')}>
                  Steganography
                </Link>
              </>
            )}
          </nav>

          {/* Right Section: Authentication Links */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-gray-200 bg-blue-500 hover:bg-blue-600 transition duration-300 px-3 py-2 rounded-md text-center text-sm font-medium min-w-16">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-200 bg-blue-500 hover:bg-blue-600 transition duration-300 px-3 py-2 rounded-md text-sm font-medium max-w-20">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="relative">
                  <button
                    onClick={toggleAccountMenu}
                    className="text-gray-200 bg-blue-500 hover:bg-blue-600 transition duration-300 px-4 py-2 rounded-md flex items-center"
                  >
                    {profileImageUrl ? (
                      <img
                        src={profileImageUrl}
                        alt="Profile"
                        className="w-7 h-7 mr-2 rounded-full border-2 border-white"
                      />
                    ) : (
                      <div className="w-7 h-7 mr-2 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img src={profilePlaceholder} alt="Placeholder" />
                      </div>
                    )}
                    Account Info
                  </button>
                  {accountMenuOpen && (
                    <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                      <Link
                        to="/account"
                        className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md flex items-center"
                        onClick={() => toggleAccountMenu()} // Close the menu on click
                      >
                        {profileImageUrl ? (
                          <img
                            src={profileImageUrl}
                            alt="Profile"
                            className="w-7 h-7 mr-2 rounded-full border-2 border-white"
                          />
                        ) : (
                          <div className="w-7 h7 mr-2 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            <img src={profilePlaceholder} alt="Placeholder" />
                            {error}
                          </div>
                        )}
                        <span>Profile</span>
                      </Link>

                      <button
                        onClick={() => {
                          handleSignOutClick(); // Trigger sign-out process
                          toggleAccountMenu(); // Close the menu after sign out
                        }}
                        className="w-full text-left text-gray-700 hover:bg-red-500 hover:text-white px-4 py-2 rounded-b-md flex items-center"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-800 px-2 py-2 fixed top-[4.5rem] left-0 w-full z-40 pt-5">
          <Link to="/" className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/features" className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" onClick={toggleMenu}>
            Features
          </Link>
          <Link to="/aboutus" className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/contactus" className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" onClick={toggleMenu}>
            Contact
          </Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" onClick={toggleMenu}>
                Login
              </Link>
              <Link to="/signup" className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" onClick={toggleMenu}>
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/steganography" className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" onClick={toggleMenu}>
                Steganography
              </Link>
              <Link
                to="/account"
                className="block text-gray-300 hover:bg-gray-100 px-3 py-2 flex items-center"
                onClick={() => toggleMenu()} // Close the menu on click
              >
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="w-5 h-5 mr-2 rounded-full border-2 border-white"
                  />
                ) : (
                  <div className="w-7 h7 mr-2 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                     <div className="loading-spinner"></div>
                    <img src={profilePlaceholder} alt="Placeholder"/>
                    {error}
                  </div>
                )}
                <span>Profile</span>
              </Link>
              <button
                onClick={() => {
                  handleSignOutClick();
                  toggleMenu();
                }}
                className="w-full text-left text-gray-300 hover:bg-red-500 hover:text-white px-3 py-2 flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

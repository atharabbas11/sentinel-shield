import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountInfoPage from './pages/AccountInfoPage'; // Correct import name
import SteganographyPage from './pages/SteganographyPage';
import EncryptionImagePage from './pages/EncryptionImagePage';
import DecryptionImagePage from './pages/DecryptionImagePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import Footer from './components/Footer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token); // Convert token to boolean to set isLoggedIn
  }, []);

  const handleSignOut = () => {
    setIsLoggedIn(false); // Update state to reflect logged out state
    localStorage.removeItem('authToken'); // Clear the authentication token
  };

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/login" /> : <SignupPage />}/>
          <Route path="/account" element={<AccountInfoPage/>} // element={isLoggedIn ? <AccountInfoPage /> : <Navigate to="/login" />}
          />
          <Route path="/steganography" element={<SteganographyPage/>} />
          <Route path="/encryption" element={<EncryptionImagePage/>} />
          <Route path="/decryption" element={<DecryptionImagePage/>} />

          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/contactus" element={<ContactUsPage />} />
          
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
};

export default App;

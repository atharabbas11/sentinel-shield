import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);

  // Function to check if the user is logged in (stub implementation)
  const isLoggedIn = () => {
    return !!localStorage.getItem('authToken');
  };

  useEffect(() => {
    // Check if the user is logged in
    setLoggedIn(isLoggedIn());
}, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${apiUrl}/api/users/forgot-password`, { email });
      setMessage(data.message);
      localStorage.setItem('resetEmail', email); // Save email to local storage
      setTimeout(() => navigate('/reset-password'), 2000); // Redirect after a short delay
    } catch (error) {
      setError('Failed to send OTP: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        {/* <h2 className="text-2xl mb-6">Forgot Password</h2> */}
        <h2 className="text-3xl mb-3 font-bold text-center">Forgot Password</h2>
        {/* <div className="mt-4 mb-6 text-sm text-gray-500 font-semibold text-center">
          Remember your password?
          <a href="/login" className="text-l text-blue-400"> login here</a>
        </div> */}
        {!loggedIn && (
          <div className="mt-4 mb-6 text-sm text-gray-500 font-semibold text-center">
            Remember your password?
            <a href="/login" className="text-l text-blue-400"> login here</a>
          </div>
        )}
        {message && <div className="text-green-500 mb-4">{message}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

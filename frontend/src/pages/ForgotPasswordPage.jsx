import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/bglogin5.png';
import LoadingBar from '../components/LoadingBar'; // Ensure the path is correct based on your project structure

const apiUrl = process.env.REACT_APP_API_URL;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const { data } = await axios.post(`${apiUrl}/api/users/forgot-password`, { email });
      setMessage(data.message);
      localStorage.setItem('resetEmail', email); // Save email to local storage
      setLoading(false);
      setTimeout(() => navigate('/reset-password'), 2000); // Redirect after a short delay
    } catch (error) {
      setError('Failed to send OTP: ' + (error.response?.data?.message || 'Unknown error'));
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-custom-bg">
      <LoadingBar loading={loading} />
      <section>
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'bottom',
            backgroundRepeat: 'repeat',
            opacity: '50%',
            height: '100vh',
            width: '100%',
            backgroundSize: 'cover'
          }}
        ></div>
        <div className="relative z-10 min-h-screen flex items-center justify-center">
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
    </section>
    </div>
  );
};

export default ForgotPasswordPage;

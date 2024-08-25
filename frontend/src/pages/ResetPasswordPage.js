import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { BarLoader } from 'react-spinners';
import LoadingBar from '../components/LoadingBar'; // Ensure the path is correct based on your project structure

const apiUrl = process.env.REACT_APP_API_URL;

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('resetEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      console.error('No email found in local storage');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${apiUrl}/api/users/reset-password`, { email, otp, newPassword });
      setMessage(data.message);
      setError('');
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 2000); // Redirect to login page after a short delay
    } catch (error) {
      setError('Failed to reset password: ' + (error.response?.data?.message || 'Unknown error'));
      setMessage('');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* {loading && (
        <div className="fixed top-0 left-0 w-full z-50">
          <BarLoader color="#1a202c" width="100%" />
        </div>
      )} */}
      <LoadingBar loading={loading} />
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl mb-6">Reset Password</h2>
        {message && <div className="text-green-500 mb-4">{message}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">OTP</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded"
            disabled={loading}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;


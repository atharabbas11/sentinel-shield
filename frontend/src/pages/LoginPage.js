// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import LoadingBar from '../components/LoadingBar'; // Ensure the path is correct based on your project structure

// const LoginPage = ({ setIsLoggedIn }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Start showing the loading animation

//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };

//       const { data } = await axios.post('/api/users/login', { email, password }, config);

//       // Store the token and set login state
//       localStorage.setItem('authToken', data.token);
//       setIsLoggedIn(true);
//       setMessage(data.message);
//       setError('');

//       // Delay the redirect to allow the loading animation to be visible
//       setTimeout(() => {
//         setLoading(false);
//         // Redirect to the homepage and reload the page
//         // window.location.href = '/';
//         navigate('/');
//       }, 2000); // Delay duration in milliseconds

//     } catch (error) {
//       setError('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
//       setMessage('');
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <LoadingBar loading={loading} />
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded shadow-md w-custom-340">
//           <h2 className="text-3xl mb-6 font-bold text-center">Login</h2>
//           {message && <div className="text-green-500 mb-4">{message}</div>}
//           {error && <div className="text-red-500 mb-4">{error}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <input
//                 type="email"
//                 className="w-full px-3 py-2 border rounded"
//                 value={email}
//                 placeholder='Email'
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="mb-4">
//               <input
//                 type="password"
//                 className="w-full px-3 py-2 border rounded"
//                 value={password}
//                 placeholder='Password'
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <div className="mb-4 text-sm font-semibold text-right">
//               <a href="/forgot-password" className="text-blue-400">
//                 Forgotten your password?
//               </a>
//             </div>
//             <button type="submit" className="w-full h-11 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
//               Login
//             </button>
//           </form>
//           <div className="mt-4 text-sm text-gray-500 font-semibold text-right">
//             Don't have an account?
//             <a href="/signup" className="text-l text-blue-400"> sign up</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBar from '../components/LoadingBar'; // Ensure the path is correct based on your project structure

const apiUrl = process.env.REACT_APP_API_URL;

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile function after login
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const { data } = await axios.get(`${apiUrl}api/users/profile`, config);
      // You can store the fetched user profile in context or state, as per your needs.
      console.log('User Profile:', data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start showing the loading animation

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(`${apiUrl}/api/users/login`, { email, password }, config);

      // Store the token and set login state
      localStorage.setItem('authToken', data.token);
      setIsLoggedIn(true);
      setMessage(data.message);
      setError('');

      // Fetch user profile immediately after login
      await fetchUserProfile();

      // Delay the redirect to allow the loading animation to be visible
      setTimeout(() => {
        setLoading(false);
        navigate('/'); // Redirect to the homepage
        window.location.reload(); // Reload the page to ensure navbar updates with profile info
      }, 100); // Delay duration in milliseconds

    } catch (error) {
      setError('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
      setMessage('');
      setLoading(false);
    }
  };

  return (
    <div>
      <LoadingBar loading={loading} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-custom-340">
          <h2 className="text-3xl mb-6 font-bold text-center">Login</h2>
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
            <div className="mb-4">
              <input
                type="password"
                className="w-full px-3 py-2 border rounded"
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4 text-sm font-semibold text-right">
              <a href="/forgot-password" className="text-blue-400">
                Forgotten your password?
              </a>
            </div>
            <button type="submit" className="w-full h-11 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Login
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-500 font-semibold text-right">
            Don't have an account?
            <a href="/signup" className="text-l text-blue-400"> sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

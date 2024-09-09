import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/bglogin5.png';
import LoadingBar from '../components/LoadingBar'; // Import the LoadingBar component

const apiUrl = process.env.REACT_APP_API_URL;

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start showing the loading animation

    try {
      const { data } = await axios.post(`${apiUrl}/api/users`, {
        name,
        email,
        password,
      });

      // Assuming the response contains a message for success
      setMessage(data.message);
      setError('');
      
      // Delay the redirect to allow the loading animation to be visible
      setTimeout(() => {
        setLoading(false);
        navigate('/login'); // Redirect to login page after the delay
      }, 1000); // Adjust the delay duration as needed (e.g., 1000ms for 1 second)
    } catch (error) {
      setError('Registration failed:\n' + (error.response?.data?.message || 'Unknown error'));
      setMessage('');
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-custom-bg">
      <LoadingBar loading={loading} /> {/* Show the loading bar when loading */}
      <section>
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'bottom', backgroundRepeat: 'repeat', opacity: '50%', height: '100vh', width: '100%', backgroundSize: 'cover'}}></div>
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-custom-340">
            <h2 className="text-3xl mb-6 font-bold text-center">Sign Up</h2>
            {message && <div className="text-green-500 mb-4 text-center font-semibold">{message}</div>}
            {error && <div className="text-red-500 mb-4 text-center font-semibold">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                {/* <label className="block mb-1 font-semibold" htmlFor="name">Name</label> */}
                <input
                  type="text"
                  id="name"
                  value={name}
                  placeholder='Username'
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                {/* <label className="block mb-1 font-semibold" htmlFor="email">Email</label> */}
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="mb-6">
                {/* <label className="block mb-1 font-semibold" htmlFor="password">Password</label> */}
                <input
                  type="password"
                  id="password"
                  value={password}
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  autocomplete="current-password"
                  required
                />
              </div>
              <button type="submit" className="w-full h-11 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Sign Up
              </button>
            </form>
            <div className="mt-4 text-sm text-gray-500 font-semibold text-right">
              have an account?
              <a href="/login" className="text-l text-blue-400"> login</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;

{/* // return (
//   <div>
//     <LoadingBar loading={loading} /> {/* Show the loading bar when loading */}
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-custom-340">
//         <h2 className="text-3xl mb-6 font-bold text-center">Sign Up</h2>
//         {message && <div className="text-green-500 mb-4 text-center font-semibold">{message}</div>}
//         {error && <div className="text-red-500 mb-4 text-center font-semibold">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             {/* <label className="block mb-1 font-semibold" htmlFor="name">Name</label> */}
//             <input
//               type="text"
//               id="name"
//               value={name}
//               placeholder='Username'
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             {/* <label className="block mb-1 font-semibold" htmlFor="email">Email</label> */}
//             <input
//               type="email"
//               id="email"
//               value={email}
//               placeholder='Email'
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             {/* <label className="block mb-1 font-semibold" htmlFor="password">Password</label> */}
//             <input
//               type="password"
//               id="password"
//               value={password}
//               placeholder='Password'
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//           <button type="submit" className="w-full h-11 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
//             Sign Up
//           </button>
//         </form>
//         <div className="mt-4 text-sm text-gray-500 font-semibold text-right">
//           have an account?
//           <a href="/login" className="text-l text-blue-400"> login</a>
//         </div>
//       </div>
//     </div>
//   </div>
// );
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/bg-1.png'; // Adjust path
import profilePlaceholder from '../images/default-profile.jpg'; // Add a placeholder image if user doesn't have one

const apiUrl = process.env.REACT_APP_API_URL;

const AccountInfoPage = () => {
  const [user, setUser] = useState(null); // Initialize as null
  const [selectedImage, setSelectedImage] = useState(null); // Store the selected image
  const [profileImage, setProfileImage] = useState(''); // Store the user's profile image URL
  const [showUpdateOptions, setShowUpdateOptions] = useState(false); // Toggle visibility of update options
  const [showEmailChange, setShowEmailChange] = useState(false); // Toggle visibility of email change options
  const [newEmail, setNewEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [emailChangeError, setEmailChangeError] = useState('');
  const [fileInputRef, setFileInputRef] = useState(useRef(null)); // Create a ref for file input

  const [fileName, setFileName] = useState('');

  const [showNameEdit, setShowNameEdit] = useState(false);
  const [newName, setNewName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          navigate('/login');
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
        const { data } = await axios.get(`${apiUrl}/api/users/profile`, config);
        console.log('Fetched user data:', data); // Log fetched data
        setUser(data);
        setProfileImage(data.profileImage); // Ensure this is set from the fetched user data
      } catch (error) {
        console.error('Error fetching profile:', error);
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);


  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Set selected image
    setFileName(e.target.files[0].name);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage); // Append the selected image to FormData

    try {
      const authToken = localStorage.getItem('authToken');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      };

      const { data } = await axios.post(`${apiUrl}/api/users/upload-profile-image`, formData, config);
      setProfileImage(data.profileImage); // Update profile image on successful upload
      setSelectedImage(null);
      setFileName('');

      // Assuming the upload is successful, reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


  const handleEmailChange = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      // const { data } = await axios.post('/api/users/request-email-change', { newEmail }, config);
      await axios.post(`${apiUrl}/api/users/request-email-change`, { newEmail }, config);
      setOtpSent(true);
      setEmailChangeError('');
    } catch (error) {
      setEmailChangeError(error.response.data.message || 'Server error');
    }
  };




  const handleOtpVerification = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };


      // Log OTP and new email being sent
      console.log('Sending OTP:', otp);
      console.log('New Email:', newEmail);

      await axios.post(`${apiUrl}/api/users/verify-email-change`, { otp }, config);

      setEmailChangeError('');
      alert('Email updated successfully!');
      setNewEmail('');
      setOtp('');
      setOtpSent(false);
      setShowEmailChange(false);
    } catch (error) {
      // setOtpError(error.response?.data?.message || 'Server error');
      // Log the error response
      console.error('Error response:', error.response);
      setOtpError(error.response?.data?.message || 'Server error');
    }
  };


  const handleUpdateName = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      };

      await axios.put(`${apiUrl}/api/users/update-name`, { name: newName }, config);
      setUser((prevUser) => ({ ...prevUser, name: newName }));
      setShowNameEdit(false);

      // Assuming the upload is successful, reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };


  const maskUserId = (userId) => {
    if (!userId) return ''; // Return empty string if userId is not available
    const length = userId.length;
    const visiblePart = Math.ceil(length / 3);
    const maskedPart = '*'.repeat(length - visiblePart);
    return maskedPart + userId.slice(-visiblePart);
  };

  const toggleUpdateOptions = () => {
    setShowUpdateOptions(!showUpdateOptions);
  };

  const toggleNameChange = () => {
    setShowNameEdit(true);
    setShowNameEdit(!showNameEdit);
  };


  const toggleEmailChange = () => {
    setShowEmailChange(!showEmailChange);
    setOtpSent(false); // Reset OTP state when toggling email change form
  };

  return (
    <div className="min-h-screen relative bg-custom-bg">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
        }}
      ></div>
      <main className="relative z-10 container mx-auto mt-8 p-4">
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-80 relative">
            {user ? (
              <>
                <div className="flex justify-center mb-4 relative">
                  {/* {profileImage ? (
                    <img
                      src={`${profileImage}`}
                      alt="Profile"
                      className="w-28 h-28 rounded-full absolute bottom-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = profilePlaceholder;
                      }}
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
                      <img src={profilePlaceholder} alt="Placeholder" />
                    </div>
                  )}  */}
                  <img
                    src={profileImage || profilePlaceholder}
                    alt={profileImage ? "Profile" : "Placeholder"}
                    className="w-28 h-28 rounded-full absolute bottom-0"
                    onError={(e) => {
                      if (profileImage) {
                        e.target.onerror = null;
                        e.target.src = profilePlaceholder;
                      }
                    }}
                  />

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => {
                      handleImageChange(e);
                      handleImageUpload();
                    }}
                  />
                </div>

                {/* </div> */}
                {/* User Info */}
                <div className="mt-6 mb-4 text-center">
                  <label className="block mb-1 font-semibold">User ID</label>
                  <p>{maskUserId(user._id)}</p>
                </div>
                <div className="mb-4 text-center">
                  <label className="block mb-1 font-semibold">Name</label>
                  <p>{user.name}</p>
                </div>
                <div className="mb-4 text-center">
                  <label className="block mb-1 font-semibold">Email</label>
                  <p>{user.email}</p>
                </div>

                {/* Toggle Button */}
                <button onClick={toggleUpdateOptions} className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  {showUpdateOptions ? 'Hide Update Options' : 'Update Options'}
                </button>

                {/* Update Options */}
                {showUpdateOptions && (
                  <div className="mt-4">
                    <button onClick={() => fileInputRef.current.click()} className="w-full py-2 mb-2 bg-violet-500 text-white rounded hover:bg-violet-600">
                      Update Photo
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    {fileName && (
                      <p className="mb-2 text-gray-600">Selected file: {fileName}</p>
                    )}

                    {fileName && (
                      <button onClick={handleImageUpload} className="w-2/3 py-2 mb-2 bg-blue-600 text-white rounded mx-auto block hover:bg-blue-700">
                        Upload New Photo
                      </button>
                    )}

                    {/* <button onClick={() => setShowNameEdit(true)} className="w-full py-2 mb-2 bg-violet-500 text-white rounded hover:bg-violet-600"> */}
                    <button onClick={toggleNameChange} className="w-full py-2 mb-2 bg-violet-500 text-white rounded hover:bg-violet-600">
                      Update Name
                    </button>

                    {/* Name Edit Section */}
                    {showNameEdit && showUpdateOptions && (
                      <div className="mt-4">
                        <input
                          type="text"
                          value={newName}
                          onChange={handleNameChange}
                          className="w-full px-3 py-2 border rounded"
                          placeholder="Enter new name"
                        />
                        <button onClick={handleUpdateName} className="w-full py-2 mt-2 mb-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                          Save Name
                        </button>
                      </div>
                    )}


                    <button onClick={toggleEmailChange} className="w-full py-2 mb-2 bg-violet-500 text-white rounded hover:bg-violet-600">
                      Update Email
                    </button>
                  </div>
                )}

                {/* Email Change Form */}
                {showEmailChange && showUpdateOptions && (
                  <div className="mt-4">
                    {!otpSent ? (
                      <>
                        <div className="mb-4">
                          <label className="block mb-1 font-semibold">New Email</label>
                          <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="px-3 py-2 border rounded w-full"
                            placeholder="Enter new email"
                          />
                        </div>
                        <button onClick={handleEmailChange} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                          Request Email Change
                        </button>
                        {emailChangeError && <p className="text-red-500 mt-2">{emailChangeError}</p>}
                      </>
                    ) : (
                      <>
                        <div className="mb-4">
                          <label className="block mb-1 font-semibold">Enter OTP</label>
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="px-3 py-2 border rounded w-full"
                            placeholder="Enter OTP"
                          />
                        </div>
                        <button onClick={handleOtpVerification} className="w-full py-2 bg-green-500 text-white rounded">
                          Verify OTP
                        </button>
                        {otpError && <p className="text-red-500 mt-2">{otpError}</p>}
                      </>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="loading-container">
                <p className="loading">Loading...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );

};

export default AccountInfoPage;
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/bg-1.png'; 
import encr from '../images/encr.png';
import decr from '../images/decr.png';

const apiUrl = process.env.REACT_APP_API_URL;

const SteganographyPage = () => {
  const [user, setUser] = useState(null); 
  const [profileImage, setProfileImage] = useState(''); 
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
        setUser(data);
        setProfileImage(data.profileImage); 
      } catch (error) {
        console.error('Error fetching profile:', error);
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);


  const navigateToEncryption = () => {
      navigate('/encryption');
      window.scrollTo(0, 0);
  };

  const navigateToDecryption = () => {
    navigate('/decryption');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-custom-bg">
        <main className="relative z-10 container mx-auto mt-8 p-4">
          <div className="container mx-auto pt-32 p-4">
            <h1 className="xl:text-5xl md:text-5xl text-3xl  text-center font-bold mb-10 text-white">Steganography</h1>
            <div className="flex flex-col md:flex-row justify-around gap-8">
              <div className="w-full md:w-1/2 lg:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300" onClick={navigateToEncryption}>
                <img src={encr} className="w-full h-64 object-cover" alt="Encrypt" />
                <div className="p-6">
                  <h2 className="text-3xl font-semibold mb-4">Encrypt and Hide Data in Image</h2>
                  <p className="text-gray-600">Go to the encryption page to encrypt and hide data in an image.</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300" onClick={navigateToDecryption}>
                <img src={decr} className="w-full h-64 object-cover" alt="Decrypt" />
                <div className="p-6">
                  <h2 className="text-3xl font-semibold mb-4">Decrypt Data from Image</h2>
                  <p className="text-gray-600">Go to the decryption page to decrypt data from an image.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
    </div>
  );
};



export default SteganographyPage;

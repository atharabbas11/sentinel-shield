import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/bg-1.png'; // Adjust the path according to your project structure
import encr from '../images/encr.png';
import decr from '../images/decr.png';

const SteganographyPage = () => {
  const [user, setUser] = useState(null); // Initialize as null
  const [profileImage, setProfileImage] = useState(''); // Store the user's profile image URL
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

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
        setProfileImage(data.profileImage); // Ensure this is set from the fetched user data
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
      {/* Initial image */}
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
        <div className="container mx-auto pt-32 p-4">
          <h1 className="xl:text-5xl md:text-5xl text-3xl  text-center font-bold mb-10 text-white">Steganography</h1>
          <div className="flex flex-col md:flex-row justify-around gap-8">
            <div className="w-full md:w-1/2 lg:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300" onClick={navigateToEncryption}>
              <img src={encr} className="w-full h-64 object-cover" alt="Encrypt" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Encrypt and Hide Data in Image</h2>
                <p className="text-gray-600">Go to the encryption page to encrypt and hide data in an image.</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300" onClick={navigateToDecryption}>
              <img src={decr} className="w-full h-64 object-cover" alt="Decrypt" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Decrypt Data from Image</h2>
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




























// src/components/SteganographyPage.js

// import React, { useState } from 'react';
// import CryptoJS from 'crypto-js';

// const SteganographyPage = () => {
//   const [encryptedImageURL, setEncryptedImageURL] = useState('');
//   const [encryptionResult, setEncryptionResult] = useState('');
//   const [decryptionResult, setDecryptionResult] = useState('');
//   const [warning, setWarning] = useState(false);

//   const handleEncrypt = (event) => {
//     event.preventDefault();

//     const text = event.target.text.value;
//     const privateKey = localStorage.getItem('userId'); // Use userId from localStorage
//     const imageFile = event.target.image.files[0];

//     if (text && privateKey && imageFile) {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         const imageData = e.target.result;

//         const encryptedData = encryptData(text, privateKey);

//         const image = new Image();
//         image.onload = () => {
//           const canvas = document.createElement('canvas');
//           const context = canvas.getContext('2d');
//           canvas.width = image.width;
//           canvas.height = image.height;
//           context.drawImage(image, 0, 0);

//           hideDataInImage(context, encryptedData, image.width, image.height);

//           const encryptedImageURL = canvas.toDataURL();
//           setEncryptedImageURL(encryptedImageURL);
//           setEncryptionResult(`Encrypted Data: ${encryptedData}`);
//         };
//         image.src = imageData;
//       };

//       reader.readAsDataURL(imageFile);
//     }
//   };

//   const handleDecrypt = (event) => {
//     event.preventDefault();

//     const encryptedImageFile = event.target.encryptedImage.files[0];
//     const decryptionKey = localStorage.getItem('userId'); // Use userId from localStorage

//     if (encryptedImageFile && decryptionKey) {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         const imageData = e.target.result;

//         const image = new Image();
//         image.onload = () => {
//           const canvas = document.createElement('canvas');
//           const context = canvas.getContext('2d');
//           canvas.width = image.width;
//           canvas.height = image.height;
//           context.drawImage(image, 0, 0);

//           const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//           const binaryData = extractDataFromImage(imageData);
          
//           const decryptedText = decryptData(binaryData, decryptionKey);
//           if (decryptedText === null) {
//             setWarning(true);
//             setDecryptionResult('Decryption failed. Ensure you have the correct key.');
//           } else {
//             setWarning(false);
//             setDecryptionResult(`Decrypted Data: ${decryptedText}`);
//           }
//         };
//         image.src = imageData;
//       };

//       reader.readAsDataURL(encryptedImageFile);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Encrypt and Hide Data in Image</h1>

//       {/* Encryption Form */}
//       <div id="encryptionSection">
//         <h2>Encrypt Data</h2>
//         <form onSubmit={handleEncrypt}>
//           <label htmlFor="text">Enter your text:</label>
//           <textarea id="text" name="text" required></textarea>
//           <label htmlFor="image">Upload an image:</label>
//           <input type="file" id="image" name="image" accept="image/*" required />
//           <button type="submit">Encrypt and Hide</button>
//         </form>
//         <div id="encryptionResult">{encryptionResult}</div>
//         {encryptedImageURL && (
//           <div id="encryptedImageDownload">
//             <a href={encryptedImageURL} download="encrypted_image.png">
//               <button>Download Encrypted Image</button>
//             </a>
//           </div>
//         )}
//       </div>

//       {/* Decryption Form */}
//       <div id="separateDecryptionSection">
//         <h2>Separate Decryption</h2>
//         <form onSubmit={handleDecrypt}>
//           <label htmlFor="encryptedImage">Upload the encrypted image:</label>
//           <input type="file" id="encryptedImage" name="encryptedImage" accept="image/*" required />
//           <button type="submit">Decrypt Image</button>
//         </form>
//         <div id="separateDecryptionResult">{decryptionResult}</div>
//         {warning && (
//           <div id="separateDecryptWarning" className="warning">
//             <p><strong>Warning:</strong> The entered private key does not match the one used for encryption.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Function to encrypt text using AES encryption
// function encryptData(text, key) {
//   return CryptoJS.AES.encrypt(text, key).toString();
// }

// // Function to decrypt binary data using AES decryption
// function decryptData(binaryData, key) {
//   try {
//     const text = fromBinary(binaryData);
//     const bytes = CryptoJS.AES.decrypt(text, key);
//     const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
//     if (!decryptedText) {
//       throw new Error('Decryption failed');
//     }
//     return decryptedText;
//   } catch (error) {
//     console.error('Error during decryption:', error);
//     return null;
//   }
// }

// // Function to convert text data to binary format
// function toBinary(data) {
//   let binary = '';
//   for (let i = 0; i < data.length; i++) {
//     binary += data.charCodeAt(i).toString(2).padStart(8, '0');
//   }
//   return binary;
// }

// // Function to convert binary data to text
// function fromBinary(binaryData) {
//   let text = '';
//   for (let i = 0; i < binaryData.length; i += 8) {
//     const byte = parseInt(binaryData.substr(i, 8), 2);
//     text += String.fromCharCode(byte);
//   }
//   return text;
// }

// // Function to hide encrypted data within an image using LSB steganography
// function hideDataInImage(context, data, width, height) {
//   const binaryData = toBinary(data);
//   let dataIndex = 0;

//   for (let y = 0; y < height; y++) {
//     for (let x = 0; x < width; x++) {
//       const pixelData = context.getImageData(x, y, 1, 1);
//       const r = pixelData.data[0];
//       const g = pixelData.data[1];
//       const b = pixelData.data[2];

//       if (dataIndex < binaryData.length) {
//         pixelData.data[0] = (r & 254) | parseInt(binaryData[dataIndex++], 2);
//       }
//       if (dataIndex < binaryData.length) {
//         pixelData.data[1] = (g & 254) | parseInt(binaryData[dataIndex++], 2);
//       }
//       if (dataIndex < binaryData.length) {
//         pixelData.data[2] = (b & 254) | parseInt(binaryData[dataIndex++], 2);
//       }

//       context.putImageData(pixelData, x, y);
//     }
//   }
// }

// // Function to extract hidden binary data from an image
// function extractDataFromImage(imageData) {
//   let binaryData = '';
//   for (let i = 0; i < imageData.data.length; i += 4) {
//     binaryData += (imageData.data[i] & 1);
//     binaryData += (imageData.data[i + 1] & 1);
//     binaryData += (imageData.data[i + 2] & 1);
//   }
//   return binaryData;
// }

// export default SteganographyPage;

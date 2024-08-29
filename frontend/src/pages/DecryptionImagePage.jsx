// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import CryptoJS from 'crypto-js';
// import { FaCopy } from 'react-icons/fa'; // Importing Font Awesome copy icon
// import backgroundImage from '../images/bg-1.png'; // Adjust the path according to your project structure

// const apiUrl = process.env.REACT_APP_API_URL;

// const DecryptionImagePage = () => {
//     const [userId, setUserId] = useState('');
//     const [encryptedImage, setEncryptedImage] = useState(null);
//     const [decryptedText, setDecryptedText] = useState('');
//     const [decryptionError, setDecryptionError] = useState(''); // State to store the error message
//     const [copySuccess, setCopySuccess] = useState(''); // For showing copy success message

//     const [loading, setLoading] = useState(false); // Add loading state for loading 

//     const navigate = useNavigate();

//     // const handleCopyText = () => {
//     //     if (decryptedText) {
//     //         navigator.clipboard.writeText(decryptedText)
//     //             .then(() => {
//     //                 setCopySuccess('Text copied!');
//     //                 setTimeout(() => setCopySuccess(''), 2000); // Hide message after 2 seconds
//     //             })
//     //             .catch((err) => {
//     //                 console.error('Failed to copy text: ', err);
//     //             });
//     //     }
//     // };

//     const handleCopyText = () => {
//         if (decryptedText) {
//             if (navigator.clipboard) {
//                 // Use Clipboard API if available
//                 navigator.clipboard.writeText(decryptedText)
//                     .then(() => {
//                         setCopySuccess('Text copied!');
//                         setTimeout(() => setCopySuccess(''), 2000); // Hide message after 2 seconds
//                     })
//                     .catch((err) => {
//                         console.error('Failed to copy text: ', err);
//                         // Optionally handle the error case, e.g., show a different message or fallback
//                     });
//             } else {
//                 // Fallback for browsers without Clipboard API support
//                 const textarea = document.createElement('textarea');
//                 textarea.value = decryptedText;
//                 document.body.appendChild(textarea);
//                 textarea.select();
//                 try {
//                     document.execCommand('copy');
//                     setCopySuccess('Text copied!');
//                     setTimeout(() => setCopySuccess(''), 2000); // Hide message after 2 seconds
//                 } catch (err) {
//                     console.error('Failed to copy text (fallback): ', err);
//                 }
//                 document.body.removeChild(textarea);
//             }
//         }
//     };
    


//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const authToken = localStorage.getItem('authToken');
//                 if (!authToken) {
//                     // window.location.href = '/login';
//                     navigate('/login');
//                     return;
//                 }
//                 const config = {
//                     headers: {
//                         Authorization: `Bearer ${authToken}`,
//                     },
//                 };
//                 const { data } = await axios.get(`${apiUrl}/api/users/profile`, config);
//                 console.log('User Profile Data:', data); // Debugging line
//                 setUserId(data._id); // Set user ID from profile data
//             } catch (error) {
//                 console.error('Error fetching profile:', error);
//                 localStorage.removeItem('authToken');
//                 window.location.href = '/login';
//             }
//         };

//         fetchUserProfile();
//     }, [navigate]);

//     const handleDecrypt = (e) => {
//         e.preventDefault();
//         if (!userId) {
//             console.error('User ID is not available.');
//             return;
//         }

//         setLoading(true); // Set loading to true when process starts for loading

//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const imageData = e.target.result;
//             const image = new Image();
//             image.onload = () => {
//                 const canvas = document.createElement('canvas');
//                 const context = canvas.getContext('2d');
//                 canvas.width = image.width;
//                 canvas.height = image.height;
//                 context.drawImage(image, 0, 0);
//                 const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//                 const binaryData = extractDataFromImage(imageData);
//                 const decryptedText = decryptData(binaryData, userId);
//                 setDecryptedText(decryptedText);
//                 setLoading(false); // Set loading to false when image processing is done for loading
//             };
//             image.src = imageData;
//         };
//         reader.readAsDataURL(encryptedImage);
//     };

//     const decryptData = (binaryData, key) => {
//         // added try and catch
//         try {

//             // Extract the length prefix first
//             const lengthPrefix = parseInt(binaryData.substr(0, 32), 2); // The first 32 bits (4 bytes) represent the length
//             const encryptedTextBinary = binaryData.substr(32, lengthPrefix * 8); // Extract exactly the encrypted text length

//             let encryptedText = '';
//             for (let i = 0; i < encryptedTextBinary.length; i += 8) {
//                 const byte = parseInt(encryptedTextBinary.substr(i, 8), 2);
//                 encryptedText += String.fromCharCode(byte);
//             }

//             const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, key);
//             const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

//             if (!decryptedText) {
//                 console.error('Decryption failed. Invalid key or corrupted data.');
//                 setDecryptionError('Decryption failed. Invalid key or corrupted data.');
//                 return '';
//             }

//             return decryptedText;
//         } catch (error) {
//             console.error('Error during decryption:', error);
//             setDecryptionError('Error during decryption: Malformed data.');
//             return '';
//         }
//     };

//     const extractDataFromImage = (imageData) => {
//         let binaryData = '';
//         for (let i = 0; i < imageData.data.length; i += 4) {
//             binaryData += (imageData.data[i] & 1);
//             binaryData += (imageData.data[i + 1] & 1);
//             binaryData += (imageData.data[i + 2] & 1);
//         }

//         // Added
//         // Ensure binaryData length is a multiple of 8
//         // const paddingLength = 8 - (binaryData.length % 8);
//         // if (paddingLength < 8) {
//         //     binaryData = binaryData.padEnd(binaryData.length + paddingLength, '0');
//         // }

//         return binaryData;
//     };

//     const maskUserId = (userId) => {
//         const length = userId.length;
//         const visiblePart = Math.ceil(length / 3);
//         const maskedPart = '*'.repeat(length - visiblePart);
//         return maskedPart + userId.slice(-visiblePart);
//     };

//     return (
//         <div className="min-h-screen bg-custom-bg">
//             {/* Initial image */}
//             <div
//                 className="fixed inset-0 z-0"
//                 style={{
//                     backgroundImage: `url(${backgroundImage})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     height: '100vh', // Ensure it covers the full viewport height
//                 }}
//             ></div>
//             <main className="relative z-10 container mx-auto mt-8 p-4">
//                 <div className="container mx-auto pt-32 p-4">
//                     <h1 className="text-5xl font-bold mb-8 text-white text-center">Decrypt Data from Image</h1>
//                     <div id="decryptionSection" className="mb-8">
//                         <h2 className="text-xl font-semibold mb-4 text-white">Decrypt Data</h2>
//                         <form onSubmit={handleDecrypt} className="space-y-4">
//                             <div>
//                                 <label htmlFor="encryptedImage" className="block font-medium text-white mb-3">Upload the encrypted image:</label>
//                                 <input
//                                     type="file"
//                                     id="encryptedImage"
//                                     name="encryptedImage"
//                                     accept="image/*"
//                                     onChange={(e) => setEncryptedImage(e.target.files[0])}
//                                     required
//                                     className="w-full p-2 border border-gray-300 rounded"
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                             >
//                                 Decrypt Image
//                             </button>
//                         </form>
                        
//                         {/* normal decrypt */}  
//                         {loading && (
//                             <div className="loading-container">
//                                 <div className="loading-spinner mb-12"></div>
//                                 <p className="mt-2 text-white">Processing...</p>
//                             </div>
//                         )}    
//                         <div id="decryptionResult" className="mt-4">
//                             {decryptedText && !loading && (
//                                 <div className="flex items-center space-x-2">
//                                     <p className="font-medium text-green-500">Decrypted Data: {decryptedText}</p>
//                                     <button
//                                         onClick={handleCopyText}
//                                         className="text-white hover:text-blue-400 focus:outline-none"
//                                     >
//                                         <FaCopy className="inline w-5 h-5" />
//                                     </button>
//                                 </div>
//                             )}
//                             {decryptionError && !loading && !decryptedText && (
//                                 <p className="font-medium text-red-500">Error: {decryptionError}</p>
//                             )}
//                             {copySuccess && !loading && (
//                                 <p className="font-medium text-blue-500">{copySuccess}</p>
//                             )}
//                         </div>


//                     </div>
//                     <div id="userIdBox">
//                         <label htmlFor="userId" className="block font-medium text-white mb-2">User ID (Private Key):</label>
//                         <input
//                             type="text"
//                             id="userId"
//                             value={maskUserId(userId)}
//                             readOnly
//                             className="w-full p-2 border border-gray-300 rounded"
//                         />
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default DecryptionImagePage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import CryptoJS from 'crypto-js';
// import backgroundImage from '../images/bg-1.png'; // Adjust the path according to your project structure

// const apiUrl = process.env.REACT_APP_API_URL;

// const DecryptionImagePage = () => {
//     const [userId, setUserId] = useState('');
//     const [decryptedData, setDecryptedData] = useState('');
//     const [image, setImage] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const authToken = localStorage.getItem('authToken');
//                 if (!authToken) {
//                     navigate('/login');
//                     return;
//                 }
//                 const config = {
//                     headers: {
//                         Authorization: `Bearer ${authToken}`,
//                     },
//                 };
//                 const { data } = await axios.get(`${apiUrl}/api/users/profile`, config);
//                 setUserId(data._id);
//             } catch (error) {
//                 console.error('Error fetching profile:', error);
//                 localStorage.removeItem('authToken');
//                 navigate('/login');
//             }
//         };

//         fetchUserProfile();
//     }, [navigate]);

//     const handleDecrypt = (e) => {
//         e.preventDefault();
//         if (!userId) {
//             console.error('User ID is not available.');
//             return;
//         }

//         setLoading(true);

//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const imageData = e.target.result;
//             const image = new Image();
//             image.onload = () => {
//                 const canvas = document.createElement('canvas');
//                 const context = canvas.getContext('2d');
//                 canvas.width = image.width;
//                 canvas.height = image.height;
//                 context.drawImage(image, 0, 0);
//                 const hiddenData = extractDataFromImage(context, image.width, image.height);
//                 const decryptedText = decryptData(hiddenData, userId);
//                 setDecryptedData(decryptedText);
//                 setLoading(false);
//             };
//             image.src = imageData;
//         };
//         reader.readAsDataURL(image);
//     };

//     const extractDataFromImage = (context, width, height) => {
//         let binaryData = '';
//         for (let y = 0; y < height; y++) {
//             for (let x = 0; x < width; x++) {
//                 const pixelData = context.getImageData(x, y, 1, 1);
//                 const r = pixelData.data[0];
//                 const g = pixelData.data[1];
//                 const b = pixelData.data[2];
//                 binaryData += (r & 1).toString();
//                 binaryData += (g & 1).toString();
//                 binaryData += (b & 1).toString();
//             }
//         }

//         const charArray = [];
//         for (let i = 0; i < binaryData.length; i += 8) {
//             const byte = binaryData.slice(i, i + 8);
//             charArray.push(String.fromCharCode(parseInt(byte, 2)));
//         }

//         return charArray.join('');
//     };

//     const decryptData = (encryptedText, key) => {
//         try {
//             const lengthPrefix = encryptedText.slice(0, 4);
//             const encrypted = encryptedText.slice(4, 4 + parseInt(lengthPrefix, 10));
//             const decrypted = CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
//             return decrypted;
//         } catch (error) {
//             console.error('Decryption failed:', error);
//             return '';
//         }
//     };

//     const maskUserId = (userId) => {
//         const length = userId.length;
//         const visiblePart = Math.ceil(length / 3);
//         const maskedPart = '*'.repeat(length - visiblePart);
//         return maskedPart + userId.slice(-visiblePart);
//     };

//     return (
//         <div className="min-h-screen bg-custom-bg">
//             <div
//                 className="fixed inset-0 z-0"
//                 style={{
//                     backgroundImage: `url(${backgroundImage})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     height: '100vh',
//                 }}
//             ></div>
//             <main className="relative z-10 container mx-auto mt-8 p-4">
//                 <div className="container mx-auto pt-32 p-4">
//                     <h1 className="text-5xl font-bold mb-8 text-white text-center">Decrypt Data from Image</h1>
//                     <div id="decryptionSection" className="mb-8">
//                         <h2 className="text-xl font-semibold mb-4 text-white">Decrypt Data</h2>
//                         <form onSubmit={handleDecrypt} className="space-y-4">
//                             <div>
//                                 <label htmlFor="image" className="block font-medium text-white mb-3">Upload the encrypted image:</label>
//                                 <input
//                                     type="file"
//                                     id="image"
//                                     name="image"
//                                     accept="image/*"
//                                     onChange={(e) => setImage(e.target.files[0])}
//                                     required
//                                     className="w-full p-2 border border-gray-300 rounded"
//                                 />
//                             </div>
//                             <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                                 Decrypt
//                             </button>
//                         </form>
//                         {loading && (
//                             <div className="loading-container">
//                                 <div className="loading-spinner mb-12"></div>
//                                 <p className="mt-2 text-white">Decrypting...</p>
//                             </div>
//                         )}
//                         {decryptedData && !loading && (
//                             <div id="decryptionResult" className="mt-4">
//                                 <p className="font-medium text-white">Decrypted Data:</p>
//                                 <textarea
//                                     readOnly
//                                     value={decryptedData}
//                                     className="w-full p-2 border border-gray-300 rounded"
//                                 />
//                             </div>
//                         )}

//                           {/* normal decrypt */}  
//                          {loading && (
//                             <div className="loading-container">
//                                 <div className="loading-spinner mb-12"></div>
//                                 <p className="mt-2 text-white">Processing...</p>
//                             </div>
//                         )}   

//                     </div>
//                     <div id="userIdBox">
//                         <label htmlFor="userId" className="block font-medium text-white mb-2">User ID (Private Key):</label>
//                         <input
//                             type="text"
//                             id="userId"
//                             value={maskUserId(userId)}
//                             readOnly
//                             className="w-full p-2 border border-gray-300 rounded"
//                         />
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default DecryptionImagePage;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { FaCopy } from 'react-icons/fa';
import backgroundImage from '../images/bg-1.png'; // Adjust the path according to your project structure

const apiUrl = process.env.REACT_APP_API_URL;

const DecryptionImagePage = () => {
    const [userId, setUserId] = useState('');
    const [decryptedData, setDecryptedData] = useState('');
    const [decryptionError, setDecryptionError] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

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
                setUserId(data._id);
            } catch (error) {
                console.error('Error fetching profile:', error);
                localStorage.removeItem('authToken');
                navigate('/login');
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const decryptData = (encryptedText, key) => {
        try {
            const lengthPrefix = encryptedText.slice(0, 4);
            const encrypted = encryptedText.slice(4, 4 + parseInt(lengthPrefix, 10));
            const decrypted = CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
            return decrypted;
        } catch (error) {
            console.error('Decryption failed:', error);
            return '';
        }
    };

    const extractDataFromImage = (context, width, height) => {
        let binaryData = '';
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const pixelData = context.getImageData(x, y, 1, 1);
                const r = pixelData.data[0];
                const g = pixelData.data[1];
                const b = pixelData.data[2];
                binaryData += (r & 1).toString();
                binaryData += (g & 1).toString();
                binaryData += (b & 1).toString();
            }
        }

        const charArray = [];
        for (let i = 0; i < binaryData.length; i += 8) {
            const byte = binaryData.slice(i, i + 8);
            charArray.push(String.fromCharCode(parseInt(byte, 2)));
        }

        return charArray.join('');
    };

    const handleDecrypt = (e) => {
        e.preventDefault();
        if (!userId) {
            console.error('User ID is not available.');
            return;
        }

        setLoading(true);
        setDecryptionError('');
        setCopySuccess('');

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            const image = new Image();
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
                const hiddenData = extractDataFromImage(context, image.width, image.height);
                const decryptedText = decryptData(hiddenData, userId);
                if (decryptedText) {
                    setDecryptedData(decryptedText);
                } else {
                    setDecryptionError('Failed to decrypt data. Please check the image and try again.');
                }
                setLoading(false);
            };
            image.src = imageData;
        };
        reader.readAsDataURL(image);
    };

    const handleCopyText = () => {
        navigator.clipboard.writeText(decryptedData)
            .then(() => setCopySuccess('Text copied!'))
            .catch(() => setCopySuccess('Failed to copy text.'));
    };

    const maskUserId = (userId) => {
        const length = userId.length;
        const visiblePart = Math.ceil(length / 3);
        const maskedPart = '*'.repeat(length - visiblePart);
        return maskedPart + userId.slice(-visiblePart);
    };

    return (
        <div className="min-h-screen bg-custom-bg">
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
                    <h1 className="text-5xl font-bold mb-8 text-white text-center">Decrypt Data from Image</h1>
                    <div id="decryptionSection" className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-white">Decrypt Data</h2>
                        <form onSubmit={handleDecrypt} className="space-y-4">
                            <div>
                                <label htmlFor="image" className="block font-medium text-white mb-3">Upload the encrypted image:</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Decrypt
                            </button>
                        </form>
                        {loading && (
                            <div className="loading-container">
                                <div className="loading-spinner mb-12"></div>
                                <p className="mt-2 text-white">Decrypting...</p>
                            </div>
                        )}
                        {!loading && (
                            <div id="decryptionResult" className="mt-4">
                                {decryptedData && (
                                    <div className="flex items-center space-x-2">
                                        <p className="font-medium text-green-500">Decrypted Data: {decryptedData}</p>
                                        <button
                                            onClick={handleCopyText}
                                            className="text-white hover:text-blue-400 focus:outline-none"
                                        >
                                            <FaCopy className="inline w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                                {decryptionError && !decryptedData && (
                                    <p className="font-medium text-red-500">Error: {decryptionError}</p>
                                )}
                                {copySuccess && (
                                    <p className="font-medium text-blue-500">{copySuccess}</p>
                                )}
                            </div>
                        )}
                    </div>
                    <div id="userIdBox">
                        <label htmlFor="userId" className="block font-medium text-white mb-2">User ID (Private Key):</label>
                        <input
                            type="text"
                            id="userId"
                            value={maskUserId(userId)}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DecryptionImagePage;

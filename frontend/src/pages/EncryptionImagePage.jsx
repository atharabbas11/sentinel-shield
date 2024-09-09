import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import backgroundImage from '../images/bg-1.png';

const apiUrl = process.env.REACT_APP_API_URL;

const EncryptionImagePage = () => {
    const [userId, setUserId] = useState('');
    const [text, setText] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [image, setImage] = useState(null);
    const [encryptedImageUrl, setEncryptedImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleTextChange = (e) => {
        const inputText = e.target.value;
        const words = inputText.trim().split(/\s+/);
        const currentWordCount = words.filter(word => word !== "").length;

        if (currentWordCount <= 175) {
            setText(inputText);
            setWordCount(currentWordCount);
        }
    };

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


    const toBinary = (data) => {
        let binary = '';
        for (let i = 0; i < data.length; i++) {
            binary += data.charCodeAt(i).toString(2).padStart(8, '0');
        }
        return binary;
    };

    const hideDataInImage = (context, data, width, height) => {
        const binaryData = toBinary(data);
        let dataIndex = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const pixelData = context.getImageData(x, y, 1, 1);
                const r = pixelData.data[0];
                const g = pixelData.data[1];
                const b = pixelData.data[2];
                if (dataIndex < binaryData.length) {
                    pixelData.data[0] = (r & 254) | parseInt(binaryData[dataIndex++], 2);
                }
                if (dataIndex < binaryData.length) {
                    pixelData.data[1] = (g & 254) | parseInt(binaryData[dataIndex++], 2);
                }
                if (dataIndex < binaryData.length) {
                    pixelData.data[2] = (b & 254) | parseInt(binaryData[dataIndex++], 2);
                }
                context.putImageData(pixelData, x, y);
            }
        }
    };

    const encryptData = (text, key) => {
        const cipher = CryptoJS.AES.encrypt(text, key).toString();
        const cipherTextLength = cipher.length.toString().padStart(4, '0'); // 4-digit length prefix
        return cipherTextLength + cipher; // Concatenate length prefix with the encrypted text
    };

    const handleEncrypt = (e) => {
        e.preventDefault(); // typically triggered by form submission
        if (!userId) {
            console.error('User ID is not available.');
            return;
        }

        setLoading(true); // this is for loading animation which began here 

        const reader = new FileReader(); 
        reader.onload = (e) => {
            const imageData = e.target.result;
            const encryptedData = encryptData(text, userId);
            const image = new Image();
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
                hideDataInImage(context, encryptedData, image.width, image.height);
                const encryptedImageURL = canvas.toDataURL();
                setEncryptedImageUrl(encryptedImageURL);
                setLoading(false); // this is for loading animation which ends here 
            };
            image.src = imageData;
        };
        reader.readAsDataURL(image);
    };


    // showing the masked userid to the user
    const maskUserId = (userId) => {
        const length = userId.length;
        const visiblePart = Math.ceil(length / 3);
        const maskedPart = '*'.repeat(length - visiblePart);
        return maskedPart + userId.slice(-visiblePart);
    };

    return (
        <div className="min-h-screen bg-custom-bg">
            <section style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'auto', backgroundPosition: 'bottom', backgroundRepeat: 'repeat', minHeight: '100vh' }}>
                <main className="relative z-10 container mx-auto mt-8 p-4">
                <div className="container mx-auto pt-32 p-4">
                    <h1 className="text-5xl font-bold mb-8 text-white text-center">Encrypt and Hide Data in Image</h1>
                    <div id="encryptionSection" className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-white">Encrypt Data</h2>
                        <form onSubmit={handleEncrypt} className="space-y-4">
                            <div>
                                <label htmlFor="text" className="block font-medium text-white mb-3">Enter your text:</label>
                                {wordCount === 175 && (
                                    <div className="mb-4 p-3 bg-red-500 text-white rounded font-semibold">
                                        {/* <p className="text-sm font-semibold text-white mb-3"> */}
                                            <p>*Note: 🚨 Oops! You have reached the maximum word count of 175 words.</p>
                                        {/* </p> */}
                                    </div>
                                )}
                                <textarea
                                    id="text"
                                    name="text"
                                    value={text}
                                    onChange={handleTextChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                ></textarea>
                                <p className={`text-sm mt-1 ${wordCount > 175 ? 'text-red-500' : 'text-gray-500'}`}>
                                    Word Count: {wordCount}/175
                                </p>
                            </div>
                            <div>
                                <label htmlFor="image" className="block font-medium text-white mb-3">Upload an image:</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    color='white'
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                    style={{color:'white'}}
                                />
                            </div>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Encrypt and Hide
                            </button>
                        </form>
                        {loading && (
                            <div className="loading-container mt-10">
                                <div className="loading-spinner mb-12"></div>
                                <p className="mt-2 text-white">Encrypting...</p>
                            </div>
                        )}
                        {encryptedImageUrl && !loading && (
                            <div id="encryptionResult" className="mt-4">
                                <p className="font-medium text-white">Encrypted Image:</p>
                                <img src={encryptedImageUrl} alt="Encrypted" className="w-full max-w-sm" />
                                <a href={encryptedImageUrl} download="encrypted_image.png" className="mt-2 inline-block">
                                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                        Download Encrypted Image
                                    </button>
                                </a>
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
            </section>
        </div>
    );
};

export default EncryptionImagePage;

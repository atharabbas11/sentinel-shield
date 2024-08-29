import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { FaCopy } from 'react-icons/fa';
import backgroundImage from '../images/bg-1.png';

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

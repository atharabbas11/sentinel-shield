import React, { useState, useEffect } from 'react';
import BackgroundImageModal from './BackgroundImageModel'; 
export default function BackgroundImageUpdater() {
  const [backgrounds, setBackgrounds] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch available images from the backend
    fetch('/api/images')
      .then(response => response.json())
      .then(data => setBackgrounds(data))
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  function handleSelect(image) {
    setSelectedImage(image);
    setIsModalOpen(false); // Close the modal after selecting an image
  }

  function handleUpdate() {
    fetch('/api/update-background', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'USER_ID', // Replace with actual user ID
        imagePath: selectedImage,
      }),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        // Optionally refresh user profile or image
      })
      .catch(error => console.error('Error updating background photo:', error));
  }

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Choose Background Image
      </button>
      
      {selectedImage && (
        <div>
          <p>Selected Image:</p>
          <img src={selectedImage} alt="Selected" className="w-full h-36 opacity-90 rounded-tl-md rounded-tr-md rounded-bl-none rounded-br-none"/>
          <button onClick={handleUpdate} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
            Update Background Photo
          </button>
        </div>
      )}

      {isModalOpen && (
        <BackgroundImageModal
          backgrounds={backgrounds}
          onSelect={handleSelect}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

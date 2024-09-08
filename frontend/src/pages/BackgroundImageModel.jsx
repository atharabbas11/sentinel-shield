import React from 'react';
import PropTypes from 'prop-types';

const BackgroundImageModal = ({ isOpen, onClose, onImageSelect, images }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-150 mt-24 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
      <div className="bg-white rounded p-4 max-w-screen-2xl max-h-[90vh] overflow-y-auto z-50">
        <h2 className="text-2xl text-center mb-4 font-sans font-bold">Select Cover Image</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative">
              <img
                src={imageUrl}
                alt={`Background ${index + 1}`}
                className="w-full h-24 object-cover cursor-pointer rounded"
                onClick={() => onImageSelect(imageUrl)}
              />
            </div>
          ))}
        </div>
        <div className='flex justify-center'>
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
            Close
          </button>
        </div>
      </div>
    </div>

  );
};

BackgroundImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onImageSelect: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BackgroundImageModal;

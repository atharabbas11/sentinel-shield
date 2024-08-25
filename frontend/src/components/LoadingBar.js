// LoadingBar.js
import React from 'react';
import { BarLoader } from 'react-spinners';

const LoadingBar = ({ loading }) => {
  return (
    loading && (
      <div className="fixed top-0 left-0 w-full z-50">
        <BarLoader color="#FF0000" width="100%" />
      </div>
    )
  );
};

export default LoadingBar;

import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

// Create a root container
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  // document.getElementById('root')
);

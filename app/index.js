import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import global styles (optional)
import App from './App'; // Import the main App component

// Render the App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Connect to the root element in index.html
);

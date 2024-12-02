import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Weather from './components/weather';

function App() {
  const [activePage, setActivePage] = useState('forecast'); // Default to forecast page

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar onPageChange={handlePageChange} />

      {/* Main content */}
      <div className="main-content">
        {activePage === 'forecast' && <Weather />}
      </div>
    </div>
  );
}

export default App;

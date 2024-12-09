"use client"

import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import Weather from './components/weather';

function App() {
  const [activePage, setActivePage] = useState('forecast');

  const handlePageChange = (page) => setActivePage(page);

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <Sidebar onPageChange={handlePageChange} />

      {/* Main content */}
      <div className="flex-1 bg-green-500 text-white p-6 flex justify-center items-center">
    {/* Navigation Buttons */}
    <div className="mb-6 flex space-x-4">
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handlePageChange("forecast")}
          >
            Weekly Forecast
          </button>
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handlePageChange("news")}
          >
            Weather News
          </button>
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handlePageChange("contact")}
          >
            Contact Us
          </button>
        </div>

        {/* Page Content */}
        <div className="flex-1 w-full">
          {activePage === "forecast" && <Weather />}
          {activePage === "news" && <div>News content will be added here!</div>}
          {activePage === "contact" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
              <p>This is where the contact form will be placed!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

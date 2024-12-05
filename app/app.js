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
        {activePage === 'forecast' && <Weather />}
        {activePage === 'news' && <div>News content will be added here!</div>}
      </div>
    </div>
  );
}

export default App;

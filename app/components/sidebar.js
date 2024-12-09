import React from 'react';

const Sidebar = ({ onPageChange }) => {
  return (
    <div className="w-60 bg-gray-200 border-r border-gray-300 flex flex-col items-center py-4">
      <button
        className="w-full py-2 px-4 my-2 bg-gray-700 text-white text-lg rounded hover:bg-gray-600"
        onClick={() => onPageChange('forecast')}
      >
        Weather Forecast
      </button>
      <button
        className="w-full py-2 px-4 my-2 bg-gray-700 text-white text-lg rounded hover:bg-gray-600"
        onClick={() => onPageChange('news')}
      >
        Weather News
      </button>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import './Sidebar.css';

const Sidebar = ({ onPageChange }) => {
  return (
    <div className="sidebar">
      <button onClick={() => onPageChange('forecast')}>Weather Forecast</button>
    </div>
  );
};

export default Sidebar;

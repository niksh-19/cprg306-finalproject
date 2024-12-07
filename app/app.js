import React, { useState } from 'react';
import './app.css';
import Sidebar from './components/sidebar';
import Weather from './components/weather';
import Contact from "./components/contact";
import LogIn from './logIn';
import { getAuth, onAuthStateChanged } from "firebase/auth";
function App() {
 console.log("here")
  const [activePage, setActivePage] = useState('forecast'); // Default to forecast page
  const [isAuthenticated, setisAuthenticated]=useState(false);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const auth = getAuth();
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setisAuthenticated(true)
     
    } else {
      setisAuthenticated(false)
    }
  });

  return (
    <div className="app-container">
      {isAuthenticated&&(
        <>

      {/* Sidebar */}
      <Sidebar onPageChange={handlePageChange} />

      {/* Main content */}
      <div className="main-content">
        {activePage === 'forecast' && <Weather />}
      </div>
      </>
)}
    {!isAuthenticated&&(
  <>
<LogIn>

</LogIn>
  </>
    )
  }
      </div>

    );
  }

export default App;

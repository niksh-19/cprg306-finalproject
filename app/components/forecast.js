import React, { useState } from 'react';
import './content.css';

const API_KEY = 'bb51fd375a29408781b164808240512';
const API_BASE = 'http://api.weatherapi.com/v1';

const Forecast = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE}/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('City not found. Please try again.');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setCity(e.target.value);

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeatherData();
    } else {
      setError('Please enter a city name.');
    }
  };

  return (
    <div className="content">
      <h1>Weather Forecast</h1>
      <p>Get the latest weather forecasts for your location.</p>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          className="text-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && <p>Loading weather data...</p>}

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Weather Data Display */}
      {weatherData && (
        <div className="weather-details">
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Forecast;

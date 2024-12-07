import React, { useState } from 'react';
import './weather.css';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [forecastType, setForecastType] = useState('7day');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/weather?location=${location}`);
      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const renderForecast = () => {
    if (!weatherData) return <p>No data yet. Search for a location to view weather.</p>;

    switch (forecastType) {
      case '24hour':
        return (
          <ul>
            {weatherData.hourly.slice(0, 24).map((hour, index) => (
              <li key={index}>
                <strong>{new Date(hour.dt * 1000).toLocaleTimeString()}</strong>: {hour.temp}°C, {hour.weather[0].description}
              </li>
            ))}
          </ul>
        );
      case '7day':
        return (
          <ul>
            {weatherData.daily.slice(0, 7).map((day, index) => (
              <li key={index}>
                <strong>{new Date(day.dt * 1000).toLocaleDateString()}</strong>: {day.temp.day}°C, {day.weather[0].description}
              </li>
            ))}
          </ul>
        );
      default:
        return <p>Select a valid forecast type.</p>;
    }
  };

  return (
    <div className="weather-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Search</button>
      </div>

      <div className="forecast-buttons">
        <button onClick={() => setForecastType('24hour')}>24 Hour</button>
        <button onClick={() => setForecastType('7day')}>7 Day</button>
      </div>

      <div className="weather-data">{renderForecast()}</div>
    </div>
  );
};

export default Weather;

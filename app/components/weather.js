import React, { useState } from 'react';

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

    return (
      <ul className="list-disc space-y-2">
        {forecastType === '24hour' &&
          weatherData.hourly.slice(0, 24).map((hour, index) => (
            <li key={index} className="text-left">
              <strong>{new Date(hour.dt * 1000).toLocaleTimeString()}</strong>: {hour.temp}°C,{' '}
              {hour.weather[0].description}
            </li>
          ))}
        {forecastType === '7day' &&
          weatherData.daily.slice(0, 7).map((day, index) => (
            <li key={index} className="text-left">
              <strong>{new Date(day.dt * 1000).toLocaleDateString()}</strong>: {day.temp.day}°C,{' '}
              {day.weather[0].description}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div className="w-4/5 mx-auto text-center text-gray-800">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border border-gray-300 rounded-l w-3/4"
        />
        <button onClick={fetchWeatherData} className="p-2 bg-gray-700 text-white rounded-r">
          Search
        </button>
      </div>

      {/* Forecast Type Buttons */}
      <div className="mb-6 space-x-4">
        <button
          onClick={() => setForecastType('24hour')}
          className={`py-2 px-4 rounded ${
            forecastType === '24hour' ? 'bg-green-600' : 'bg-gray-700'
          } text-white`}
        >
          24 Hour
        </button>
        <button
          onClick={() => setForecastType('7day')}
          className={`py-2 px-4 rounded ${
            forecastType === '7day' ? 'bg-green-600' : 'bg-gray-700'
          } text-white`}
        >
          7 Day
        </button>
      </div>

      {/* Weather Data */}
      <div className="bg-gray-100 p-6 rounded shadow">{renderForecast()}</div>
    </div>
  );
};

export default Weather;

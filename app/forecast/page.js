"use client";
import { useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export default function Forecast() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading

  const fetchWeather = async () => {
    if (location.trim() === "") {
      setError("Please enter a location to get the weather forecast.");
      return;
    }

    setWeather(null);
    setForecast([]);
    setLoading(true); // Set loading to true

    try {
      setError(""); // Reset error message on each fetch

      // Fetch geocode data
      const geocodeResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`);
      if (!geocodeResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const [geocodeData] = await geocodeResponse.json();

      // Validate geocodeData
      if (!geocodeData || Object.keys(geocodeData).length === 0) {
        setError("We couldn't find your location. Please refine your search (e.g., add state or country).");
        setLoading(false); // Set loading to false
        return;
      }

      const { lat, lon } = geocodeData;

      // Fetch current weather data
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      if (!weatherResponse.ok) {
        throw new Error("Weather data fetch failed.");
      }
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);

      // Fetch forecast data
      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      if (!forecastResponse.ok) {
        throw new Error("Forecast data fetch failed.");
      }
      const forecastData = await forecastResponse.json();
      setForecast(forecastData.list);
      setLocation("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM"; 
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour 0 should be 12
    const strTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
    return strTime;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Weather Forecast
        </h2>

        {/* Input field for the location */}
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search for cities"
          className="w-full px-4 py-2 mb-4 border-none rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring focus:ring-blue-500"
        />

        {/* Button to fetch weather */}
        <button
          onClick={fetchWeather}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Get Weather
        </button>

        {/* Display loading indicator */}
        {loading && (
          <div className="mt-4 text-center">
            <p className="text-lg text-white">Loading...</p>
          </div>
        )}

        {/* Display error message */}
        {error && (
          <div className="mt-4 bg-red-500 text-white p-3 text-center rounded-lg">
            {error}
          </div>
        )}

        {weather && !loading && (
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold text-white">{weather.name}</h3>
            <p className="text-lg text-gray-300">Chance of rain: {Math.round(weather.main.humidity)}%</p>
            <p className="text-5xl font-bold text-yellow-500 mt-2">{Math.round(weather.main.temp - 273.15)}&deg;C</p>
          </div>
        )}
        {forecast.length > 0 && !loading && (
          <div className="mt-8">
            <h4 className="text-lg font-bold mb-4 text-white text-center">Hourly Forecast</h4>
            <div className="grid grid-cols-3 gap-4">
              {forecast.slice(0, 6).map((hour, index) => (
                <div key={index} className="p-4 bg-gray-700 rounded-lg text-center shadow-md">
                  <p className="text-sm font-bold text-gray-200 mb-2">{formatTime(hour.dt)}</p>
                  <p className="text-3xl font-bold text-yellow-500">{Math.round(hour.main.temp - 273.15)}&deg;C</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export default function Forecast() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Weather Forecast</h2>
        <input 
          type = "text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder = "Enter location"
          className="w-full px-3 py-2 mb-3 border rounded-md text-gray-700"
        />
        <button 
          onClick={fetchWeather}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
          >Get Weather</button>
        {weather && (
          <div className="mt-4 text-center">
            <h3 className="text-xl font-bold">{weather.name}</h3>
            <p>{weather.weather[0].description}</p>
            <p className="text-2xl">Temperature: {Math.round(weather.main.temp - 273.15)}&deg;C</p>
          </div>
        )}
      </div>
    </div>
  );
}
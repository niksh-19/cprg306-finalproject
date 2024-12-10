"use client";
import React, { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import ForecastInput from "./forecastInput";
import ForecastWeather from "./forecastWeather";
import ForecastHourly from "./forecastHourly";

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export default function Forecast() {
  const { user, firebaseSignOut } = useUserAuth();
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    if (!user) {
      router.push("/"); // Redirect to home if not logged in
    }
  }, [user, router]);

  const fetchWeather = async () => {
    if (location.trim() === "") {
      setError("Please enter a location to get the weather forecast.");
      return;
    }

    // Clear previous data
    setWeather(null);
    setForecast([]);
    setError('');
    setLoading(true); // Set loading to true

    try {
      // Fetch geocode data
      const geocodeResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`);
      if (!geocodeResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const [geocodeData] = await geocodeResponse.json();

      // Validate geocodeData
      if (!geocodeData || geocodeData.length === 0) {
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
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Weather Forecast</h2>
          <button
            onClick={firebaseSignOut}
            className="bg-red-600 text-white px-4 py-2 rounded font-semibold text-sm hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Display user information */}
        {user && (
          <div className="mb-6">
            <p className="text-xl font-semibold text-white">Welcome! {user.displayName}..</p>
          </div>
        )}

        {/* Forecast Input Component */}
        <ForecastInput
          location={location}
          setLocation={setLocation}
          fetchWeather={fetchWeather}
        />

        {/* Display loading indicator */}
        {loading && (
          <div className="mt-4 text-center">
            <p className="text-lg text-white">Loading...</p>
          </div>
        )}

        {/* Display error message */}
        {error && (
          <div className="mt-4 bg-red-600 text-white p-3 text-center rounded-lg">
            {error}
          </div>
        )}

        {/* Forecast Weather Component */}
        {weather && !loading && (
          <ForecastWeather weather={weather} />
        )}

        {/* Forecast Hourly Component */}
        {forecast.length > 0 && !loading && (
          <ForecastHourly forecast={forecast} formatTime={formatTime} />
        )}
      </div>
    </div>
  );
}

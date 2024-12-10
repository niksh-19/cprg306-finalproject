"use client";
import React from "react";

export default function ForecastInput({ location, setLocation, fetchWeather }) {
  return (
    <div>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Search for cities"
        className="w-full px-4 py-2 mb-4 border-none rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring focus:ring-blue-500"
      />
      <button
        onClick={fetchWeather}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
      >
        Get Weather
      </button>
    </div>
  );
}

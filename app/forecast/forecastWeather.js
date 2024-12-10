"use client";
import React from "react";

export default function ForecastWeather({ weather }) {
  return (
    <div className="mt-6 text-center">
      <h3 className="text-2xl font-bold text-white">{weather.name}</h3>
      <p className="text-lg text-gray-300">Chance of rain: {Math.round(weather.main.humidity)}%</p>
      <p className="text-5xl font-bold text-yellow-500 mt-2">{Math.round(weather.main.temp - 273.15)}&deg;C</p>
    </div>
  );
}

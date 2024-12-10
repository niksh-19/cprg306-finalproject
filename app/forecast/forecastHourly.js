"use client";
import React from "react";

export default function ForecastHourly({ forecast, formatTime }) {
  return (
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
  );
}

"use client"
import Forecast from "./forecast";

export default function Home() {
  return(
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Welcome to WeatherWise</h1>
        <p className="text-base mb-6 text-gray-700">Get the latest weaher updates for any location.</p>
        <Forecast />
      </div>
    </div>
  );
}
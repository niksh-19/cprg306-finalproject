"use client"
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-800 to-black flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">WeatherWise</h1>
        <p className="text-lg mb-6 text-gray-400">Your go-to app for real-time weather updates and forecasts.</p>
        <Link href="/forecast">
          <button className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-semibold text-lg hover:bg-yellow-600">
            Check Weather Forecast
          </button>
        </Link>
      </div>
    </div>
  );
}
"use client"
import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Home() {

  const {user, gitHubSignIn, firebaseSignOut} = useUserAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-800 to-black flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">WeatherWise</h1>
        <p className="text-lg mb-6 text-gray-400">Your go-to app for real-time weather updates and forecasts.</p>
        {user ? (
          <div>
            <p className="text-xl font-semibold text-white mb-4">Welcome, {user.displayName} ({user.email})</p>
            <div className="flex justify-center space-x-4">
              <Link href="/forecast">
                <button className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-semibold text-lg hover:bg-yellow-600">
                  Go to Weather Forecast
                </button>
              </Link>
              <button
                onClick={firebaseSignOut}
                className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={gitHubSignIn}
              className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-semibold text-lg hover:bg-yellow-600"
            >
              Login with GitHub
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
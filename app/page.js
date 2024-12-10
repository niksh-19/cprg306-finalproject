"use client";
import { useUserAuth } from "./_utils/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, gitHubSignIn } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/forecast");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-800 to-black flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">WeatherWise</h1>
        <p className="text-lg mb-6 text-gray-400">Your go-to weather app</p>
        <div>
          <button
            onClick={gitHubSignIn}
            className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-semibold text-lg hover:bg-yellow-600"
          >
            Login with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

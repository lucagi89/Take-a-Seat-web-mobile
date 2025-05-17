import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-white text-gray-800">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        Welcome to Take a Seat
      </h1>
      <p className="text-lg md:text-xl mb-10 text-center max-w-xl">
        This platform is for restaurant owners only. If you&#39;re a customer,
        please use our mobile app.
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <Link href="/login">
          <p className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold text-center">
            I&#39;m a Restaurant Owner
          </p>
        </Link>

        <Link href="/apply">
          <p className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg text-lg font-semibold text-center">
            I Want to Join as a New Restaurant
          </p>
        </Link>
      </div>

      <div className="mt-10 text-sm text-gray-500 text-center max-w-sm">
        Not a restaurant owner? To book tables and explore restaurants, please
        use the <span className="font-semibold">Take a Seat</span> mobile app
        available on iOS and Android.
      </div>
    </main>
  );
}

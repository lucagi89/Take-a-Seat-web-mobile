"use client";
import React, { useState } from "react";

export default function SignupPage() {
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate signup logic here
    console.log("Registering restaurant", restaurantName, email);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-white text-gray-800">
      <form onSubmit={handleSignup} className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Sign up as a Restaurant
        </h1>

        <div>
          <label className="block text-sm mb-1">Restaurant Name</label>
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg font-semibold"
        >
          Sign up
        </button>
      </form>
    </main>
  );
}

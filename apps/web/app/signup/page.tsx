"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "../../../../general-services/auth";

export default function SignupPage() {
  // const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate signup logic here
    console.log("Registering restaurant", email);
    signUp(email, password)
      .then((response) => {
        console.log("Signup successful:", response);
        // Handle successful signup (e.g., redirect to dashboard)
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Signup error:", error);
        // Handle signup error (e.g., show error message)
        alert("Signup failed. Please check your credentials.");
      });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-white text-gray-800">
      <form onSubmit={handleSignup} className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Sign up as a Restaurant
        </h1>

        {/* <div>
          <label className="block text-sm mb-1">Restaurant Name</label>
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            required
          />
        </div> */}

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
          onSubmit={() => handleSignup}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg font-semibold"
        >
          Sign up
        </button>
      </form>
    </main>
  );
}

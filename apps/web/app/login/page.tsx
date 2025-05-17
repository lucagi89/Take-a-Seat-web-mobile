"use client";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate login logic here
    console.log("Logging in with", email, password);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-white text-gray-800">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">Log in</h1>

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
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-lg font-semibold"
        >
          Log in
        </button>
      </form>
    </main>
  );
}

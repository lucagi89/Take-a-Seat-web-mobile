"use client";
import React, { useState } from "react";
import { handleUser } from "../../../../general-services/auth";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";

export default function LoginPage() {
  const { user, loading, setLoading } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    handleUser(email, password)
      .then((response) => {
        console.log("Login successful:", response);
        // Handle successful login (e.g., redirect to dashboard)
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Login error:", error);
        // Handle login error (e.g., show error message)
        alert("Login failed. Please check your credentials.");
      });
    setLoading(false);
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
          disabled={loading}
        >
          Log in
        </button>
      </form>
    </main>
  );
}

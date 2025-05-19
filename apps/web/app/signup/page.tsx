"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "../../services/auth";
import Styles from "../../styles/login-signup.module.scss";
import { useUser } from "@/contexts/userContext";

export default function SignupPage() {
  // const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { user } = useUser();

  if (user) {
    router.push("/dashboard");
  }

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
    <>
      <form onSubmit={handleSignup} className={Styles.form}>
        <h1 className={Styles.title}>Sign up</h1>

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
            className={Styles.input}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={Styles.input}
            required
          />
        </div>

        <button
          type="submit"
          onSubmit={() => handleSignup}
          className={Styles.button}
        >
          Sign up
        </button>
      </form>
    </>
  );
}

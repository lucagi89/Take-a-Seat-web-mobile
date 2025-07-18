"use client";
import React, { useState, useEffect } from "react";
import { handleUser } from "../../services/auth";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import Styles from "../../styles/login-signup.module.scss";
import Link from "next/link";

export default function LoginPage() {
  const { user, loading, setLoading, userRestaurants } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!loading && user) {
      if (userRestaurants && userRestaurants.length > 0) {
        router.push(`/dashboard/${userRestaurants[0].id}`);
      }
    }
  }, [user, loading, userRestaurants]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    handleUser(email, password)
      .then(() => {
        // Successful login — user & restaurants will be updated by context
        if (!userRestaurants || userRestaurants.length === 0) {
          router.push(`/create-restaurant`);
        } else {
          router.push(`/dashboard/${userRestaurants[0].id}`);
        }
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed. Please check your credentials.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleLogin} className={Styles.form}>
        <h1 className={Styles.title}>Log in</h1>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={Styles.input}
            required
            autoComplete="email"
            placeholder="my@email.com"
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
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className={Styles.button} disabled={loading}>
          Log in
        </button>

        <p className="text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/create-profile"
            className="text-blue-500 hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>
    </>
  );
}

"use client";
import React, { useState, useEffect } from "react";
// import { handleUser } from "../../services/auth";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import Styles from "../../styles/login-signup.module.scss";
import { signUp } from "../../services/auth";

export default function CreateProfilePage() {
  const { user, loading, setLoading, userRestaurants } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // useEffect(() => {
  //   if (!loading && user) {
  //     if (userRestaurants && userRestaurants.length > 0) {
  //       router.push(`/dashboard/${userRestaurants[0].id}`);
  //     }
  //   }
  // }, [user, loading, userRestaurants]);

  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   handleUser(email, password)
  //     .then(() => {
  //       // Successful login — user & restaurants will be updated by context
  //       setEmail("");
  //       setPassword("");
  //     })
  //     .catch((error) => {
  //       console.error("Login error:", error);
  //       alert("Login failed. Please check your credentials.");
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      await signUp(email, password);
      // Successful signup — user & restaurants will be updated by context
      setEmail("");
      setPassword("");
      router.push("/complete-profile");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
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
      <form onSubmit={handleSubmit} className={Styles.form}>
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
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Repeat Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={Styles.input}
            required
          />
        </div>

        <button type="submit" className={Styles.button} disabled={loading}>
          {loading ? "Creating profile..." : "Create Profile"}
        </button>
      </form>
    </>
  );
}

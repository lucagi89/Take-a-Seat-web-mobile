"use client";
import React, { useState } from "react";
import { handleUser } from "../../services/auth";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import Styles from "../../styles/login-signup.module.scss";

export default function LoginPage() {
  const { user, loading, setLoading } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    router.push("/dashboard");
  }

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

        <button type="submit" className={Styles.button} disabled={loading}>
          Log in
        </button>
      </form>
    </>
  );
}

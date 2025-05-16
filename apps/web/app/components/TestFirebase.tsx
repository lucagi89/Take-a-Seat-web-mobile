"use client";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { app } from "@firebase"; // Adjust the path to your firebaseConfig

const auth = getAuth(app);
const db = getFirestore(app);

export default function TestFirebase() {
  const [status, setStatus] = useState("⏳ Testing...");

  useEffect(() => {
    try {
      const user = auth.currentUser;
      const dbCheck = !!db;

      if (dbCheck) {
        console.log("✅ Firebase loaded successfully");
        console.log("API KEY:", process.env.EXPO_PUBLIC_FIREBASE_API_KEY);
        console.log(
          "AUTH DOMAIN:",
          process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
        );
        console.log("Current User:", user);
        setStatus("✅ Firebase ready");
      } else {
        setStatus("❌ Firebase DB not available");
      }
    } catch (err) {
      console.error("Firebase Error:", err);
      setStatus("❌ Firebase error – check console");
    }
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ fontSize: 16 }}>{status}</h1>
    </div>
  );
}

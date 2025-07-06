"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import Styles from "../../styles/login-signup.module.scss";
import { addDocument } from "../../lib/databaseActions";
// import { profile } from "console";

export default function CompleteProfilePage() {
  const { user, loading, setLoading } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: user?.email || "",
    houseNumber: "",
    street: "",
    city: "",
    zipCode: "",
    country: "",
    phone: "",
    profilePicture: "",
  });

  // useEffect(() => {
  //   if (!loading && user) {
  //     // Redirect to dashboard or another page if user is already logged in
  //     router.push(`/dashboard/${user.uid}`);
  //   }
  // }, [user, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDocument(userData, "users", user?.uid);

      // Here you would typically save the user's profile data to your database
      // console.log("Profile data submitted:", { name, phone });
      // Redirect to dashboard or another page after successful profile completion
      router.push(`/create-restaurant`);
    } catch (error) {
      console.error("Error completing profile:", error);
      alert("Failed to complete profile. Please try again.");
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
    <form onSubmit={handleSubmit} className={Styles.form}>
      <h1 className={Styles.title}>Complete Your Profile</h1>

      <div>
        <label className="block text-sm mb-1">First Name</label>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className={Styles.input}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Last Name</label>
        <input
          type="text"
          value={userData.lastName}
          onChange={(e) =>
            setUserData({ ...userData, lastName: e.target.value })
          }
          className={Styles.input}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className={Styles.input}
          required
          disabled
        />
      </div>

      <div>
        <label className="block text-sm mb-1">House Number</label>
        <input
          type="text"
          value={userData.houseNumber}
          onChange={(e) =>
            setUserData({ ...userData, houseNumber: e.target.value })
          }
          className={Styles.input}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Street</label>
        <input
          type="text"
          value={userData.street}
          onChange={(e) => setUserData({ ...userData, street: e.target.value })}
          className={Styles.input}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">City</label>
        <input
          type="text"
          value={userData.city}
          onChange={(e) => setUserData({ ...userData, city: e.target.value })}
          className={Styles.input}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Zip Code</label>
        <input
          type="text"
          value={userData.zipCode}
          onChange={(e) =>
            setUserData({ ...userData, zipCode: e.target.value })
          }
          className={Styles.input}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Country</label>
        <input
          type="text"
          value={userData.country}
          onChange={(e) =>
            setUserData({ ...userData, country: e.target.value })
          }
          className={Styles.input}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Phone</label>
        <input
          type="tel"
          value={userData.phone}
          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
          className={Styles.input}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Profile Picture URL</label>
        <input
          type="url"
          value={userData.profilePicture}
          onChange={(e) =>
            setUserData({ ...userData, profilePicture: e.target.value })
          }
          className={Styles.input}
          placeholder="https://example.com/profile.jpg"
        />
      </div>
      <p className="text-sm mb-4">
        Please fill out your profile to help us serve you better.
      </p>

      <button type="submit" className={Styles.button} disabled={loading}>
        Complete Profile
      </button>
    </form>
  );
}

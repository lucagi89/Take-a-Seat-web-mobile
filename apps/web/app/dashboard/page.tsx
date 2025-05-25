"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../contexts/userContext";
import Styles from "../../styles/dashboard.module.scss";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  return (
    <main className={Styles.dashboardContainer}>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : user ? (
        <p className="text-center">Hello, {user.email}</p>
      ) : (
        <p className="text-center">Please log in to access your dashboard.</p>
      )}
      <h2 className="">Go to Home</h2>
    </main>
  );
}

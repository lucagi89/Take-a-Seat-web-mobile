"use client";
import { useRouter } from "next/navigation";
import { useUser } from "../../contexts/userContext";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-white text-gray-800 display flex-col">
      <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      <p className="mt-4 text-center">Welcome to the dashboard!</p>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : user ? (
        <p className="text-center">Hello, {user.email}</p>
      ) : (
        <p className="text-center">Please log in to access your dashboard.</p>
      )}
      <button
        onClick={() => router.push("/")}
        className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-lg font-semibold"
      >
        Go
      </button>
    </main>
  );
}

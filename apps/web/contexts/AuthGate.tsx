"use client";

import React, { useEffect } from "react";
import { useUser } from "@/contexts/userContext";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      console.log("User not logged in, redirecting to /login");
      router.replace("/login");
    }
  }, [user, loading, isLoginPage, router]);

  if ((loading || !user) && !isLoginPage) {
    //return a loading spinner here
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}

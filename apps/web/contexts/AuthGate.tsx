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
    return null; // You can also return a loading spinner here
  }

  return <>{children}</>;
}

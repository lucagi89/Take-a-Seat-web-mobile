"use client";
import { useEffect } from "react";
import Link from "next/link";
import styles from "../styles/home-page.module.scss";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);
  return (
    <>
      <h1 className={styles.title}>Take a Seat</h1>

      <div className={styles.buttons}>
        <Link href="/login">
          <p className={styles.button}>I&#39;m a Restaurant Owner</p>
        </Link>

        <Link href="/signup">
          <p className={styles.button}>I Want to Add my Restaurant</p>
        </Link>
      </div>

      <div className={styles.message}>
        Not a restaurant owner? To book tables and explore restaurants, please
        use the <span className="font-semibold">Take a Seat</span> mobile app
        available on iOS and Android.
      </div>
    </>
  );
}

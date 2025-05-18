import React from "react";
import Link from "next/link";
import styles from "../styles/home-page.module.scss";

export default function HomePage() {
  return (
    <>
      <h1 className={styles.title}>Take a Seat</h1>
      <p className={styles.message}>
        This platform is for restaurant owners only. If you&#39;re a customer,
        please use our mobile app.
      </p>

      <div className={styles.buttons}>
        <Link href="/login">
          <p className={styles.button}>I&#39;m a Restaurant Owner</p>
        </Link>

        <Link href="/signup">
          <p className={styles.button}>I Want to Join as a New Restaurant</p>
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

// import Image from "next/image";
import Navbar from "./components/Navbar";
import TestFirebase from "./components/TestFirebase";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  .border-2">
      <Navbar />
      <TestFirebase />
    </main>
  );
}

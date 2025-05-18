"use client";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/contexts/userContext";

export default function Navbar() {
  const { user } = useUser();
  const isLoggedIn = Boolean(user);
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo2.png"
              alt="Logo"
              width={40}
              height={40}
              className="mr-2 rounded-3xl"
            />
            Take a Seat
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-300 hover:text-white">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-300 hover:text-white">
              Contact
            </Link>
          </li>
          <li>
            {!isLoggedIn ? (
              <Link href="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
            ) : (
              <Link href="/profile" className="text-gray-300 hover:text-white">
                Profile
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

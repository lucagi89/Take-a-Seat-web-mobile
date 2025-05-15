import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";

export default function Navbar() {
  const user = null; // Replace with actual user state or context
  return (
    <nav className="flex items-center justify-between py-4 px-20 bg-blue-900 text-white w-full h-2/4">
      <div className="text-lg font-bold">
        <Image
          src={logo}
          alt="Logo"
          width={50}
          height={50}
          className="inline-block mr-2 rounded-full"
        />
      </div>
      <ul className="flex space-x-10">
        <li>
          <Link href="/about" className="hover:text-gray-400">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-gray-400">
            Contact
          </Link>
        </li>
        {user ? (
          <li>
            <Link href="/profile" className="hover:text-gray-400">
              Profile
            </Link>
          </li>
        ) : (
          <li>
            <Link href="/login" className="hover:text-gray-400">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

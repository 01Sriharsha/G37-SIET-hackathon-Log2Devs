"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Import Button from ShadCN if available
import Image from "next/image";
import { useAuthStore } from "@/state/auth";

const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
  return (
    <header className="bg-green-400 p-2 fixed inset-0 shadow-sm h-20">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.webp"
            alt="AgriWise logo"
            width={60}
            height={60}
            className="rounded-full"
          />
          <span className="text-white text-4xl font-semibold">AgriWise</span>
        </Link>
        {isAuthenticated ? (
          <div className="flex justify-center gap-4 items-center">
            <Link
              href={"/inventory"}
              className="bg-white rounded-lg p-2.5 text-green-600 hover:underline"
            >
              Inventory
            </Link>
            <Link
              href="/weather"
              className="bg-white rounded-lg p-2.5 text-green-600 hover:underline"
            >
              Weather
            </Link>
            <Link
              href="/marketprice"
              className="bg-white rounded-lg p-2.5 text-green-600 hover:underline"
            >
              Market Price
            </Link>
            <Button onClick={logout}>Logout</Button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Button
              asChild
              variant="primary"
              className="bg-white text-green-500 hover:bg-gray-100"
            >
              <Link
                href="/login"
                className="text-green-500 hover:text-green-600"
              >
                Login
              </Link>
            </Button>
            <Button
              asChild
              variant="primary"
              className="bg-white text-green-500 hover:bg-gray-100"
            >
              <Link
                href="/register"
                className="text-green-500 hover:text-green-600"
              >
                Register
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

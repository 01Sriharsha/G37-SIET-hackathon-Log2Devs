import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Import Button from ShadCN if available
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-green-400 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.webp"
            alt="AgriWise logo"
            width={120}
            height={120}
            className="rounded-full"
          />
          <span className="text-white text-5xl font-semibold">AgriWise</span>
        </Link>
        <div className="flex space-x-4">
          <Button
            asChild
            variant="primary"
            className="bg-white text-green-500 hover:bg-gray-100"
          >
            <Link href="/login" className="text-green-500 hover:text-green-600">
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
      </div>
    </header>
  );
};

export default Header;

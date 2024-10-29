import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Importing icons from lucide-react

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="mb-4 md:mb-0">
          <Image
            src="/logo.webp"
            alt="Company Logo"
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>

        {/* Contact Us */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <p className="mt-2">AgriWise, Inc.</p>
          <p>
            Email:{" "}
            <a href="mailto:support@agriwise.com" className="underline">
              support@agriwise.com
            </a>
          </p>
          <p>Phone: +123-456-7890</p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6">
          <Link href="https://facebook.com" aria-label="Facebook">
            <Facebook className="w-6 h-6 hover:text-green-400" />
          </Link>
          <Link href="https://twitter.com" aria-label="Twitter">
            <Twitter className="w-6 h-6 hover:text-green-400" />
          </Link>
          <Link href="https://instagram.com" aria-label="Instagram">
            <Instagram className="w-6 h-6 hover:text-green-400" />
          </Link>
          <Link href="https://linkedin.com" aria-label="LinkedIn">
            <Linkedin className="w-6 h-6 hover:text-green-400" />
          </Link>
        </div>
      </div>
      <div className="text-center mt-6 text-sm text-gray-300">
        &copy; {new Date().getFullYear()} AgriWise, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

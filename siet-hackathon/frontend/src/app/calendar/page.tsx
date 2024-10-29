"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-b from-green-100 to-green-200">
      {/* Centered container with white background */}
      <div className="flex w-full md:w-1/2 flex-col justify-center items-center bg-white p-10 md:p-20 rounded-lg shadow-lg mx-4 md:mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Log in to your account.</h2>

        {/* Email Input */}
        <Label className="w-full mb-2 text-gray-700" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          className="mb-4 w-full"
        />

        {/* Password Input */}
        <Label className="w-full mb-2 text-gray-700" htmlFor="password">
          Password
        </Label>
        <div className="relative w-full mb-4">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <div className="text-right w-full mb-6 text-sm text-gray-500 cursor-pointer">
          Forgot your password?
        </div>

        <Button className="w-full bg-lime-400 text-white hover:bg-green-600 mb-6">
          Login
        </Button>

        <div className="text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="#" className="text-lime-400">
            Create Account
          </a>
        </div>
      </div>

      {/* Right side decorative background with SVG curve */}
      <div className="relative hidden md:block w-1/2 bg-lime-400 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 0 0 Q 50 100 100 0 V 100 H 0 Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

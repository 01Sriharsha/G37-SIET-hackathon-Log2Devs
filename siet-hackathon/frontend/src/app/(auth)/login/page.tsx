"use client";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Apple, Facebook, Phone, EyeOff, Eye } from "lucide-react";
import axios from "axios";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/login", { phone, password });
      console.log("Login successful", response.data);
      // Handle success (e.g., navigate to dashboard or show message)
    } catch (error) {
      console.error("Login failed", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg p-8 sm:p-10 bg-white rounded-xl shadow-2xl">
        <CardContent>
          <h1 className="text-4xl font-extrabold mb-8 text-center">
            Log in to your account
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-12 pr-4 py-4 w-full bg-gray-50 rounded-md text-lg"
                required
              />
              <Phone
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={24}
              />
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 pr-4 py-4 w-full bg-gray-50 rounded-md text-lg"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </Button>
            </div>
            <Button
              type="submit"
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white text-xl font-semibold rounded-lg"
            >
              Login
            </Button>
          </form>
          {/* <div className="mt-8 text-center">
            <p className="text-lg text-gray-500 mb-4">Or login with</p>
            <div className="flex justify-center space-x-6">
              <Button variant="outline" size="icon" className="p-4 rounded-full">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-red-500"
                  fill="currentColor"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072..." />
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="p-4 rounded-full">
                <Facebook className="w-6 h-6 text-blue-600" />
              </Button>
              <Button variant="outline" size="icon" className="p-4 rounded-full">
                <Apple className="w-6 h-6" />
              </Button>
            </div>
          </div> */}
          <p className="mt-8 text-center text-lg text-gray-500">
            Don't have an account?
            <a href="#" className="text-green-500 hover:text-green-600 ml-2">
              Create Account
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Phone, EyeOff, Eye } from "lucide-react";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuthStore } from "@/state/auth";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const { authenticate } = useAuthStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        method: "post",
        endpoint: "/auth/login",
        body: { phone, password },
        showErrorToast: true,
      });

      if (data && data.data) {
        console.log(data);
        authenticate(data.data);
        toast.success(data.message);
        router.replace("/");
      }
    },
  });

  return (
    <div className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg p-8 sm:p-10 bg-white rounded-xl shadow-2xl">
        <CardContent>
          <h1 className="text-4xl font-extrabold mb-8 text-center">
            Log in to your account
          </h1>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
            }}
          >
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
              isLoading={isPending}
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
            {/*  eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?
            <Link href="/register" className="text-green-500 hover:text-green-600 ml-2">
              Create Account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

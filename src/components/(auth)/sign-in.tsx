"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useSignIn } from "@/hooks/auth/useSignIn";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response: any = await useSignIn(email, password);

      if (response.status == 200) {
        toast.success("Login success");
        setLoading(false);

        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setLoading(false);

        toast.error("Login failed");
      }
    } catch (error) {
      setLoading(false);

      console.log("Error", error);
    }
  };
  return (
    <Card className="w-full max-w-md bg-gray-800 text-gray-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center text-gray-400">
          Sign in to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                type="email"
                required
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <Button className="w-full mt-4" type="submit">
          {loading?  "Sign In...":"Sign In"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <a
          href="#"
          className="text-sm text-blue-400 hover:text-blue-300 text-center"
        >
          Forgot your password?
        </a>
      </CardFooter>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
// import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
// import { useSignInAccount } from "@/hooks/auth/add-user";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import useAuthStore from "@/store/Auth";

// Define schema using Zod
const signInSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormValues = z.infer<typeof signInSchema>;



export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { signIn } = useAuthStore();
  // React Hook Form integration with Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Form submission handler
  const onSubmit: SubmitHandler<SignInFormValues> = async (values) => {
    try {
      // Send the sign-in request with the form values
      const response: any = await axios.post("/api/user/sign-in", values);

      // Handle the response on success
      if (response.data.success) {
        // Successful sign-in logic (e.g., store the token, redirect the user)
        const user = response.data.user;
        signIn(user.email, user.role, user.name);
        toast({
          description: "Sign-in successful",
        });

        // Redirect the user to a protected page or dashboard
        // Modify as needed
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        // Handle case where server response indicates failure (e.g., invalid credentials)
        // toast.error(response.data.error || "Invalid email or password");
        toast({
          description: response.data.error && response.data.error,
        });
      }
    } catch (err: any) {

      // Handle errors that occur during the API call (network errors, etc.)
      const msg = err?.response.data.error
      toast({
        description: msg || "An unexpected error occurred",
      });
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                disabled={isSubmitting}
                {...register("email")}
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  disabled={isSubmitting}
                  {...register("password")}
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
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <Button disabled={isSubmitting} className="w-full mt-4" type="submit">
            {isSubmitting ? "Signing In..." : "Sign In"}
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

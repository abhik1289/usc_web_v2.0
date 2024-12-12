"use client";

import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Define validation schema
const setupSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  cPassword: z.string()
}).refine((data) => data.password === data.cPassword, {
  message: "Passwords don't match",
  path: ["cPassword"],
});

type SetupFormData = z.infer<typeof setupSchema>;

// Define a type for the input data
interface UserCredentials {
  first_name: string;
  last_name: string;
  isActive: boolean;
  password: string;
  cPassword: string;
  token: string;
}

export const updateUserCredentials = async (infos: UserCredentials) => {
  try {
    // Send the POST request
    const { data } = await axios.post("/api/user/set-up-profile", infos);
    return { success: true, data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      const message = error.response?.data?.message || "An error occurred";
      return { error: true, message, status: error.response?.status };
    }
    // Generic error handling
    return { error: true, message: "An unexpected error occurred" };
  }
};

const AccountSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const token = searchParams.get('token');

  const form = useForm<SetupFormData>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      password: "",
      cPassword: ""
    }
  });

  const onSubmit = async (data: SetupFormData) => {
    if (!token) {
      toast({
        description: "Setup token is missing",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const credentials: UserCredentials = {
        ...data,
        isActive: true,
        token
      };

      const result = await updateUserCredentials(credentials);
      
      if (result.success) {
        toast({
          description: "Account setup successful"
        });
        // Redirect to login or dashboard
      } else {
        toast({
          description: result.message || "Setup failed",
          variant: "destructive"
        });
      }
    } catch {
      toast({
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Complete Your Account Setup</h1>
        <p className="text-gray-600">Please fill in your details to complete the setup</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            {...form.register("first_name")}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {form.formState.errors.first_name && (
            <p className="text-red-500 text-sm">{form.formState.errors.first_name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            {...form.register("last_name")}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {form.formState.errors.last_name && (
            <p className="text-red-500 text-sm">{form.formState.errors.last_name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...form.register("password")}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            {...form.register("cPassword")}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {form.formState.errors.cPassword && (
            <p className="text-red-500 text-sm">{form.formState.errors.cPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Setting up..." : "Complete Setup"}
        </button>
      </form>
    </div>
  );
};

export { AccountSetup };
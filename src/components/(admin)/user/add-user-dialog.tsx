"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addUser, ROLES } from "@/schemas/auth/user.schema";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface AddUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({ open, setOpen }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Initialize form with react-hook-form and zod
  const form = useForm<z.infer<typeof addUser>>({
    resolver: zodResolver(addUser),
    defaultValues: {
      email: "",
      firstName: "",
      role: "SUPERADMIN",
    },
  });

  const onSubmit = async (data: z.infer<typeof addUser>) => {
    setLoading(true);
    try {
      const { email, role, firstName } = data;

      // Send the request to the server
      const res = await axios.post("/api/user/add-user", { email, role, firstName });

      if (res.data.success) {
        toast({
          description: "Invitation sent successfully",
          duration: 3000,
        });
      } else {
        console.log(res)
        toast({
          description: res.data.error || "An error occurred",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      // console.log(error.response.data.error);
      toast({
        description: error.response.data.error || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Enter the details of the new user below. Click *Invite User* to proceed.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name Field */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Json" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="ab@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role Field */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((item, i) => (
                          <SelectItem key={i} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <DialogFooter>
              <Button disabled={loading} className="w-full" type="submit">
                Invite User
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;

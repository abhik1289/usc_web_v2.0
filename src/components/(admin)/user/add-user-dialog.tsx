"use client";

import React from "react";
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
  FormDescription,
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
import { AddUser } from "@/actions/user/addUser";
import toast from "react-hot-toast";

interface AddUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({ open, setOpen }) => {
  // Define form schema using Zod
  // const formSchema = z.object({
  //   username: z
  //     .string()
  //     .min(2, { message: "Username must be at least 2 characters long." }),
  // });

  // Initialize form with react-hook-form and zod
  const form = useForm<z.infer<typeof addUser>>({
    resolver: zodResolver(addUser),
    defaultValues: {
      email: "",
      firstName: "",
      role: "MODERATOR",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof addUser>) => {
    try {
      const res: any = await AddUser(data.firstName, data.email, data.role);
      if (res.status == 200 && res.data.success) {
        toast.success("Invitation Send !");
      } else {
        toast.success(res.error);
      }
    } catch (e) {
      console.log("Error Occurred", e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Enter the details of the new user below. Click *Invite User* to
            proceed.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fisrt Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Json" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="ab@gmail.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="ADMIN" />
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
              <Button className="w-full" type="submit">
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

"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Role } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
interface FormErrors {
  title?: string;
}

interface AddRoleDialogProps {
  onClose: () => void;
  onAddRole: (role: Role) => void;
  editingRole?: Role | null;
  onEditRole?: (role: Role) => void;
}

const formSchema = z.object({
  role: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
});

export default function AddRoleDialog({
  onClose,
  onAddRole,
  editingRole,
  onEditRole,
}: AddRoleDialogProps) {
  const [loading,setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
    },
  });
  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await axios.post("/api/domain/add-role", {
        title: values.role,
      });
      if (res.status == 201 && res.data.success) {
        toast({
          description: "Role added successfully",
        });
      setLoading(false);

      } else {
        toast({
          description: res.data.error || "An error occurred",
          variant: "destructive",
        });
      setLoading(false);

      }
    } catch (error:any) {
      toast({
        description: error.response.data.error || "An unexpected error occurred",
        variant: "destructive",
      });
      setLoading(false);

    }
  }
  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingRole ? "Edit Role" : "Add Role"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

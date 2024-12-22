"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { Role } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface AddRoleDialogProps {
  onClose: () => void;
  onAddRole?: () => void;
  editingRole?: boolean | null;
  showEditDialog?: boolean;
  onEditRole?: () => void;
  selectedEditRoleTitle?: string | null;
  selectedEditRoleId?: string | null;
}

const formSchema = z.object({
  role: z.string().min(4, {
    message: "Role must be at least 4 characters.",
  }),
});

const addRoleHandler = async (role: string) => {
  const res = await axios.post("/api/domain/add-role", { title: role });
  return res.data;
};

export default function AddRoleDialog({
  onClose,
  onAddRole,
  editingRole,
  onEditRole,
  showEditDialog,
  selectedEditRoleTitle,
  selectedEditRoleId,
}: AddRoleDialogProps) {
  const editRoleHandler = async (role: string) => {
    const res = await axios.post(
      `/api/domain/update-role/${selectedEditRoleId}`,{
        title: role
      }
    );
    return res.data;
  };
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { role: selectedEditRoleTitle ? selectedEditRoleTitle : "" },
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addRoleHandler,
    onMutate: () => setLoading(true),
    onSuccess: () => {
      toast({
        description: "Role added successfully!",
      });
      queryClient.invalidateQueries(["roles"]); // Optional: Invalidate roles query to refetch data
      setLoading(false);
      onClose();
    },
    onError: (error: any) => {
      toast({
        description: error.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
      setLoading(false);
    },
  });

  const editMutation = useMutation({
    mutationFn: editRoleHandler,
    onMutate: () => setLoading(true),
    onSuccess: () => {
      toast({
        description: "Role Modified successfully!",
      });
      queryClient.invalidateQueries(["roles"]); // Optional: Invalidate roles query to refetch data
      setLoading(false);
      onClose();
    },
    onError: (error: any) => {
      toast({
        description: error.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
      setLoading(false);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (editingRole) {
      editMutation.mutate(values.role);
    } else {
      mutation.mutate(values.role); // Trigger the mutation with the role
    }
  };

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
                    <Input
                      disabled={loading}
                      placeholder="Enter role"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {editingRole ? (
              <Button disabled={loading} type="submit">
                {loading ? "Editing..." : "Edit"}
              </Button>
            ) : (
              <Button disabled={loading} type="submit">
                {loading ? "Submitting..." : "Submit"}
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

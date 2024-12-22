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
import useGetAddRole from "@/hooks/api/role/useGetAddRole";
import useEditRole from "@/hooks/api/role/useEditRole";

interface AddRoleDialogProps {
  onClose: () => void;
  onAddRole?: () => void;
  editingRole?: boolean | null;
  showEditDialog?: boolean;
  onEditRole?: () => void;
  selectedEditRoleTitle?: string | null;
  selectedEditRoleId?: string;
}

const formSchema = z.object({
  role: z.string().min(4, {
    message: "Role must be at least 4 characters.",
  }),
});



export default function AddRoleDialog({
  onClose,
  onAddRole,
  editingRole,
  onEditRole,
  showEditDialog,
  selectedEditRoleTitle,
  selectedEditRoleId,
}: AddRoleDialogProps) {
 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { role: selectedEditRoleTitle ? selectedEditRoleTitle : "" },
  });


  const mutation = useGetAddRole();

  const editMutation = useEditRole(selectedEditRoleId);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (editingRole) {
      editMutation.mutate({ role: values.role });
      onClose();
    } else {
      mutation.mutate({ role: values.role }); // Trigger the mutation with the role
      onClose();

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
                      disabled={editMutation.isLoading || mutation.isLoading}
                      placeholder="Enter role"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {editingRole ? (
              <Button disabled={editMutation.isLoading || mutation.isLoading} type="submit">
                {editMutation.isLoading || mutation.isLoading ? "Editing..." : "Edit"}
              </Button>
            ) : (
              <Button disabled={editMutation.isLoading || mutation.isLoading} type="submit">
                {editMutation.isLoading || mutation.isLoading ? "Submitting..." : "Submit"}
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

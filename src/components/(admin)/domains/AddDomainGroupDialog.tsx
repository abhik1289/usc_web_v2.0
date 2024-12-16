"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { domainGroupSchema } from "./schemas";
import { DomainGroup } from "./type";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
interface AddDomainGroupDialogProps {
  onClose: () => void;
  onAddDomainGroup: (group: DomainGroup) => void;
  editingGroup?: DomainGroup | null;
  onEditDomainGroup?: (group: DomainGroup) => void;
}

export default function AddDomainGroupDialog({
  onClose,
  onAddDomainGroup,
  editingGroup,
  onEditDomainGroup,
}: AddDomainGroupDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const getDomainGroup = async (role: string) => {
    const res = await axios.post(`/api/domain/add-domain-group`, {
      title: role,
    });
    return res.data;
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: getDomainGroup,
    onMutate: () => setLoading(true),
    onSuccess: () => {
      toast({
        description: "Role added successfully!",
      });
      queryClient.invalidateQueries(["domainGroup"]); // Optional: Invalidate roles query to refetch data
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

  const form = useForm({
    resolver: zodResolver(domainGroupSchema),
    defaultValues: {
      name: editingGroup ? editingGroup.name : "",
    },
  });

  const handleSubmit = async (data: { name: string }) => {
    mutation.mutate(data.name);
  };

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingGroup ? "Edit Domain Group" : "Add Domain Group"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Group Name</Label>
            <Input
              id="name"
              placeholder="Enter group name"
              {...form.register("name")}
              disabled={loading}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : editingGroup ? "Update" : "Add"}
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
            className="w-full mt-2"
            disabled={loading}
          >
            Cancel
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React, { useState } from "react";
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
// import { DomainGroup } from "./type";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
interface AddDomainGroupDialogProps {
  onClose: () => void;
  onAddDomainGroup?: (group: any) => void;
  editingGroup?: any | null;
  onEditDomainGroup?: (group: any) => void;
  selectedEditRoleId?: string | null;
  selectedEditRoleTitle?: string | null;
}

export default function AddDomainGroupDialog({
  onClose,
  selectedEditRoleId,
  selectedEditRoleTitle,
}: AddDomainGroupDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const getDomainGroup = async (role: string) => {
    const res = await axios.post(`/api/domain/add-domain-group`, {
      title: role,
    });
    return res.data;
  };
  const updateDomainGroup = async (role: string) => {
    const res = await axios.post(`/api/domain/update/${selectedEditRoleId}`, {
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
        description: "Domain Group added successfully!",
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
  const updateMutation = useMutation({
    mutationFn: updateDomainGroup,
    onMutate: () => setLoading(true),
    onSuccess: () => {
      toast({
        description: "Domain Group update successfully!",
      });
      queryClient.invalidateQueries(["domainGroup"]);
      // selectedEditRoleId(null);
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
      name: selectedEditRoleTitle ? selectedEditRoleTitle : "",
    },
  });
  


  const handleSubmit = async (data: { name: string }) => {
    if (selectedEditRoleTitle) {
      updateMutation.mutate(data.name);
    } else {
      mutation.mutate(data.name);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedEditRoleTitle ? "Edit Domain Group" : "Add Domain Group"}
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
          {selectedEditRoleTitle ? (
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Updating..." : "Update"}
            </Button>
          ) : (
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Add"}
            </Button>
          )}
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

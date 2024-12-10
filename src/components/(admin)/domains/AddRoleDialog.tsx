"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { roleSchema } from "./schemas";
import { Role } from "./type";

interface FormErrors {
  title?: string;
}

interface AddRoleDialogProps {
  onClose: () => void;
  onAddRole: (role: Role) => void;
  editingRole?: Role | null;
  onEditRole?: (role: Role) => void;
}

export default function AddRoleDialog({
  onClose,
  onAddRole,
  editingRole,
  onEditRole,
}: AddRoleDialogProps) {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (editingRole) {
      setTitle(editingRole.title);
    }
  }, [editingRole]);

  const validateForm = () => {
    try {
      roleSchema.parse({ title });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: FormErrors = {};
        error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0] as keyof FormErrors] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editingRole && onEditRole) {
      onEditRole({ id: editingRole.id, title });
    } else {
      onAddRole({ id: Date.now(), title });
    }
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingRole ? "Edit Role" : "Add Role"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="role-title">Role Title</Label>
            <Input
              id="role-title"
              placeholder="Enter role title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>
          <Button onClick={handleSubmit} className="w-full">
            {editingRole ? "Update" : "Add"}
          </Button>
          <Button variant="secondary" onClick={onClose} className="w-full mt-2">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

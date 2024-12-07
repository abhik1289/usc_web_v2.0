"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Role {
  id: number;
  title: string;
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

  useEffect(() => {
    if (editingRole) {
      setTitle(editingRole.title);
    }
  }, [editingRole]);

  const handleSubmit = () => {
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

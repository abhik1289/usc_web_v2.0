"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DomainGroup {
  id: number;
  name: string;
}

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
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingGroup) {
      setName(editingGroup.name);
    }
  }, [editingGroup]);

  const handleSubmit = () => {
    if (editingGroup && onEditDomainGroup) {
      onEditDomainGroup({ id: editingGroup.id, name });
    } else {
      onAddDomainGroup({ id: Date.now(), name });
    }
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingGroup ? "Edit Domain Group" : "Add Domain Group"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Group Name</Label>
            <Input
              id="name"
              placeholder="Enter group name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            {editingGroup ? "Update" : "Add"}
          </Button>
          <Button variant="secondary" onClick={onClose} className="w-full mt-2">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

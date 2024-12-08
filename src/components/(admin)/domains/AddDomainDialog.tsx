"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Domain {
  id: number;
  type: string;
  name: string;
}

interface AddDomainDialogProps {
  onClose: () => void;
  onAddDomain: (domain: Domain) => void;
}

export default function AddDomainDialog({ onClose, onAddDomain }: AddDomainDialogProps) {
  const [type, setType] = useState("tech");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Please enter a valid domain name.");
      return;
    }
    const newDomain = {
      id: Date.now(),
      type,
      name,
    };
    onAddDomain(newDomain);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Domain</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Domain Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="type">Domain Type</Label>
            <Select value={type} onValueChange={(value) => setType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select domain type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="nonTech">Non-Tech</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Domain Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name">Domain Name</Label>
            <Input
              id="name"
              placeholder="Enter domain name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <DialogFooter className="mt-4 space-y-2">
          <Button onClick={handleSubmit} className="w-full">
            Add
          </Button>
          <Button variant="secondary" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

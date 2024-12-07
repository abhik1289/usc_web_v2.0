"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
          <div>
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
          <div>
            <Label htmlFor="name">Domain Name</Label>
            <Input
              id="name"
              placeholder="Enter domain name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Button onClick={handleSubmit} className="w-full">
            Add
          </Button>
          <Button variant="secondary" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { domainSchema } from "./schemas";
import { Domain } from "./type";
import { useQuery } from "@tanstack/react-query";
import { getDomainGroups } from "./domainGroup-table";
// import {}

interface FormErrors {
  type?: string;
  name?: string;
}

interface AddDomainDialogProps {
  onClose: () => void;
  onAddDomain: (domain: Domain) => void;
}

export default function AddDomainDialog({
  onClose,
  onAddDomain,
}: AddDomainDialogProps) {
  const [type, setType] = useState("tech");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    try {
      domainSchema.parse({ type, name });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: FormErrors = error.errors.reduce((acc, err) => {
          if (err.path.length) {
            acc[err.path[0] as keyof FormErrors] = err.message;
          }
          return acc;
        }, {} as FormErrors);
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = (): void => {
    if (!validateForm()) return;

    const newDomain: Domain = {
      id: Date.now(),
      type,
      name,
    };

    onAddDomain(newDomain);
    onClose();
  };
  const {
    isLoading: domainGroupLoading,
    error: domainGroupError,
    data: domainGroup,
  } = useQuery({
    queryKey: ["domainGroup"],
    queryFn: () => getDomainGroups("/api/domain/get-domain-groups"),
  });
  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Domain</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Domain Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Domain Type</Label>
            {domainGroupError?<p>Error Occurred</p>:<Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Domain Group" />
              </SelectTrigger>
              <SelectContent>
                
                {domainGroupLoading? <SelectItem value="">
                  Loading...
                </SelectItem> :
                  domainGroup &&
                  domainGroup.map(
                    (item: { id: string; title: string }, i: number) => (
                      <SelectItem key={i} value={item.id}>
                        {item.title}
                      </SelectItem>
                    )
                  )}
              </SelectContent>
            </Select>}
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type}</p>
            )}
          </div>

          {/* Domain Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Domain Name</Label>
            <Input
              id="name"
              placeholder="Enter domain name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-4">
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

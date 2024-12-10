import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { z } from "zod";

// Add validation schema
const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  domainType: z.enum(["Tech", "Non-Tech"], {
    errorMap: () => ({ message: "Please select a valid domain type" }),
  }),
  domainName: z.string().min(2, "Domain name must be at least 2 characters"),
  socials: z.string(),
  photo: z.instanceof(File).nullable(),
});

interface Lead {
  id: number;
  name: string;
  domainType: string;
  domainName: string;
  socials: string;
  photo: File | null;
}

// Add error state interface
interface FormErrors {
  name?: string;
  domainType?: string;
  domainName?: string;
  socials?: string;
  photo?: string;
}

interface LeadsDialogProps {
  onClose: () => void;
  onAddLead: (lead: Lead) => void;
  onEditLead?: (lead: Lead) => void;
  editingLead?: Lead | null;
}

export default function LeadsDialog({
  onClose,
  onAddLead,
  onEditLead,
  editingLead,
}: LeadsDialogProps) {
  const [name, setName] = useState("");
  const [domainType, setDomainType] = useState("");
  const [domainName, setDomainName] = useState("");
  const [socials, setSocials] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (editingLead) {
      setName(editingLead.name);
      setDomainType(editingLead.domainType);
      setDomainName(editingLead.domainName);
      setSocials(editingLead.socials);
      setPhoto(editingLead.photo);
    }
  }, [editingLead]);

  const validateForm = () => {
    try {
      leadSchema.parse({
        name,
        domainType,
        domainName,
        socials,
        photo,
      });
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

    const leadData = {
      id: editingLead?.id || Date.now(),
      name,
      domainType,
      domainName,
      socials,
      photo,
    };

    if (editingLead && onEditLead) {
      onEditLead(leadData);
    } else {
      onAddLead(leadData);
    }
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>{editingLead ? "Edit Lead" : "Add Lead"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="photo">Photo</Label>
            <Input
              id="photo"
              type="file"
              onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
            />
            {errors.photo && <p className="text-sm text-red-500">{errors.photo}</p>}
          </div>

          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="domainType">Domain Type</Label>
            <Select
              value={domainType}
              onValueChange={(value) => setDomainType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Domain Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tech">Tech</SelectItem>
                <SelectItem value="Non-Tech">Non-Tech</SelectItem>
              </SelectContent>
            </Select>
            {errors.domainType && <p className="text-sm text-red-500">{errors.domainType}</p>}
          </div>

          <div>
            <Label htmlFor="domainName">Domain Name</Label>
            <Input
              id="domainName"
              type="text"
              placeholder="Domain Name"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
            />
            {errors.domainName && <p className="text-sm text-red-500">{errors.domainName}</p>}
          </div>

          <div>
            <Label htmlFor="socials">Socials</Label>
            <Input
              id="socials"
              type="text"
              placeholder="Socials (URL)"
              value={socials}
              onChange={(e) => setSocials(e.target.value)}
            />
            {errors.socials && <p className="text-sm text-red-500">{errors.socials}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            {editingLead ? "Update" : "Add"}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

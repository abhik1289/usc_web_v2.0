import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Lead {
  id: number;
  name: string;
  domainType: string;
  domainName: string;
  socials: string;
  photo: File | null;
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

  useEffect(() => {
    if (editingLead) {
      setName(editingLead.name);
      setDomainType(editingLead.domainType);
      setDomainName(editingLead.domainName);
      setSocials(editingLead.socials);
      setPhoto(editingLead.photo);
    }
  }, [editingLead]);

  const handleSubmit = () => {
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
          <Label htmlFor="photo">Photo</Label>
          <Input
            id="photo"
            type="file"
            onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
          />

          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <Label htmlFor="domainName">Domain Name</Label>
          <Input
            id="domainName"
            type="text"
            placeholder="Domain Name"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
          />

          <Label htmlFor="socials">Socials</Label>
          <Input
            id="socials"
            type="text"
            placeholder="Socials"
            value={socials}
            onChange={(e) => setSocials(e.target.value)}
          />
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

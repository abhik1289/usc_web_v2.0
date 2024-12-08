import React, { useState, useEffect } from "react";
import { AdvisorMember, AdvisorDialogProps } from "./type";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

export default function AdvisorDialog({
  onClose,
  onSubmit,
  editingMember,
}: AdvisorDialogProps) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"advisor" | "mentor">("advisor");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  useEffect(() => {
    if (editingMember) {
      setName(editingMember.name);
      setTitle(editingMember.title);
      setType(editingMember.type);
      setAdditionalInfo(editingMember.additionalInfo || "");
      setPhoto(editingMember.photo);
    }
  }, [editingMember]);

  const handleSubmit = () => {
    const memberData: AdvisorMember = {
      id: editingMember?.id || Date.now(),
      name,
      title,
      type,
      photo,
      ...(additionalInfo && { additionalInfo }),
    };

    onSubmit(memberData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingMember ? "Edit Member" : "Add Member"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Photo Upload */}
          <div>
            <Label htmlFor="photo">Upload Photo</Label>
            <Input
              id="photo"
              type="file"
              onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
            />
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Member Type */}
          <div>
            <Label>Member Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as "advisor" | "mentor")}>
              <SelectTrigger>
                <span>{type === "advisor" ? "Advisor" : "Mentor"}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="advisor">Advisor</SelectItem>
                <SelectItem value="mentor">Mentor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">{type === "advisor" ? "School" : "Custom Title"}</Label>
            <Input
              id="title"
              placeholder={type === "advisor" ? "Enter school" : "Enter custom title"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Additional Information (for mentors) */}
          {type === "mentor" && (
            <div>
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Enter additional information"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                rows={3}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>{editingMember ? "Update" : "Add"}</Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

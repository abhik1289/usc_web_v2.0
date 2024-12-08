"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Testimonial, TestimonialDialogProps } from "./type";

export default function TestimonialDialog({
  onClose,
  onAddTestimonial,
  onEditTestimonial,
  editingTestimonial,
}: TestimonialDialogProps) {
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [opinion, setOpinion] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (editingTestimonial) {
      setName(editingTestimonial.name);
      setPosition(editingTestimonial.position);
      setOpinion(editingTestimonial.opinion);
      setImage(editingTestimonial.image);
    }
  }, [editingTestimonial]);

  const handleSubmit = () => {
    const testimonialData: Testimonial = {
      id: editingTestimonial?.id || Date.now(),
      name,
      position,
      opinion,
      image,
    };

    if (editingTestimonial && onEditTestimonial) {
      onEditTestimonial(testimonialData);
    } else {
      onAddTestimonial(testimonialData);
    }
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              placeholder="Enter position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="opinion">Opinion</Label>
            <Textarea
              id="opinion"
              placeholder="Enter opinion"
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            {editingTestimonial ? "Update" : "Add"}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

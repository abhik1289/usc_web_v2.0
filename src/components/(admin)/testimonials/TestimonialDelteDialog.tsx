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
// import { Testimonial, TestimonialDialogProps } from "./type";
import { z } from "zod";

// Add validation schema
const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  opinion: z.string().min(10, "Opinion must be at least 10 characters"),
  image: z.instanceof(File).nullable(),
});

// Add error state interface
interface FormErrors {
  name?: string;
  position?: string;
  opinion?: string;
  image?: string;
}



export default function TestimonialDialog({
  onClose,
  onAddTestimonial,
  onEditTestimonial,
  editingTestimonial,
}: {
  onClose: () => void;
  onAddTestimonial: (testimonial: any) => void;
  onEditTestimonial: (testimonial: any) => void;
  editingTestimonial: any | null;
}) {
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [opinion, setOpinion] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (editingTestimonial) {
      setName(editingTestimonial.name);
      setPosition(editingTestimonial.position);
      setOpinion(editingTestimonial.opinion);
      setImage(editingTestimonial.image);
    }
  }, [editingTestimonial]);

  const validateForm = () => {
    try {
      testimonialSchema.parse({
        name,
        position,
        opinion,
        image,
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

    const testimonialData: any = {
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
            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              placeholder="Enter position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
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
            {errors.opinion && <p className="text-sm text-red-500">{errors.opinion}</p>}
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

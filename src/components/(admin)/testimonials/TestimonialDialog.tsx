import React, { useState, useEffect } from 'react';
import { Testimonial, TestimonialDialogProps } from './type';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileInput } from "@/components/ui/file-input";

export default function TestimonialDialog({ 
  onClose, 
  onAddTestimonial,
  onEditTestimonial,
  editingTestimonial 
}: TestimonialDialogProps) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [opinion, setOpinion] = useState('');
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
    const testimonialData = {
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
    <Dialog open onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent className="w-[500px] p-6">
        <DialogHeader>
          <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
          <DialogDescription>
            {editingTestimonial ? 'Edit the testimonial details below.' : 'Add a new testimonial below.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Upload Image</Label>
            <FileInput
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              className="w-full"
            />
          </div>
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Label>Position</Label>
            <Input
              type="text"
              placeholder="Enter position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Label>Opinion</Label>
            <Textarea
              placeholder="Enter opinion"
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>
          <div className="space-x-2">
            <Button
              onClick={handleSubmit}
              className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
            >
              {editingTestimonial ? 'Update' : 'Add'}
            </Button>
            <Button
              onClick={onClose}
              className="w-full bg-gray-700 text-white hover:bg-gray-800 transition-colors"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React, { useState } from "react";
import { Testimonial } from "@/components/(admin)/testimonials/type";
import TestimonialDialog from "@/components/(admin)/testimonials/TestimonialDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const handleAddTestimonial = (newTestimonial: Testimonial) => {
    setTestimonials([...testimonials, newTestimonial]);
  };

  const handleEditTestimonial = (updatedTestimonial: Testimonial) => {
    setTestimonials(testimonials.map((testimonial) =>
      testimonial.id === updatedTestimonial.id ? updatedTestimonial : testimonial
    ));
  };

  const handleDeleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <Button
          onClick={() => {
            setEditingTestimonial(null);
            setIsDialogOpen(true);
          }}
          className="bg-black text-white hover:bg-gray-800 transition-colors"
        >
          Add Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              {testimonial.image && (
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={URL.createObjectURL(testimonial.image)}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <blockquote className="text-gray-600 text-center mb-4 italic">
                "{testimonial.opinion}"
              </blockquote>
              <div className="text-center">
                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                <p className="text-gray-500">{testimonial.position}</p>
              </div>
              <div className="flex justify-center space-x-3 mt-4 pt-4 border-t">
                <Button
                  onClick={() => {
                    setEditingTestimonial(testimonial);
                    setIsDialogOpen(true);
                  }}
                  variant="link"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                  variant="link"
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No testimonials added yet. Add your first testimonial!</p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
            <DialogDescription>
              {editingTestimonial
                ? "Edit the testimonial details below."
                : "Add a new testimonial below."}
            </DialogDescription>
          </DialogHeader>
          <TestimonialDialog
            onClose={() => {
              setIsDialogOpen(false);
              setEditingTestimonial(null);
            }}
            onAddTestimonial={handleAddTestimonial}
            onEditTestimonial={handleEditTestimonial}
            editingTestimonial={editingTestimonial}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

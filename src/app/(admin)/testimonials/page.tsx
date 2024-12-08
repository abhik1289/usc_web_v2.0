"use client";

import React, { useState } from "react";
import TestimonialDialog from "@/components/(admin)/testimonials/TestimonialDialog";
import { Testimonial } from "@/components/(admin)/testimonials/type";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const handleAddTestimonial = (newTestimonial: Testimonial) => {
    setTestimonials((prev) => [...prev, newTestimonial]);
  };

  const handleEditTestimonial = (updatedTestimonial: Testimonial) => {
    setTestimonials((prev) =>
      prev.map((testimonial) =>
        testimonial.id === updatedTestimonial.id ? updatedTestimonial : testimonial
      )
    );
  };

  const handleDeleteTestimonial = (id: number) => {
    setTestimonials((prev) => prev.filter((testimonial) => testimonial.id !== id));
  };

  return (
    <div className="space-y-6 p-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <Button
          onClick={() => {
            setEditingTestimonial(null);
            setIsDialogOpen(true);
          }}
        >
          Add Testimonial
        </Button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              {testimonial.image && (
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={URL.createObjectURL(testimonial.image)}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <blockquote className="text-muted-foreground italic">"{testimonial.opinion}"</blockquote>
              <CardTitle>{testimonial.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{testimonial.position}</p>
            </CardHeader>
            <CardFooter className="flex justify-center space-x-3">
              <Button
                variant="link"
                onClick={() => {
                  setEditingTestimonial(testimonial);
                  setIsDialogOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="link"
                className="text-red-500"
                onClick={() => handleDeleteTestimonial(testimonial.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      {testimonials.length === 0 && (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-muted-foreground">No testimonials added yet. Add your first testimonial!</p>
        </div>
      )}

      {isDialogOpen && (
        <TestimonialDialog
          onClose={() => {
            setIsDialogOpen(false);
            setEditingTestimonial(null);
          }}
          onAddTestimonial={handleAddTestimonial}
          onEditTestimonial={handleEditTestimonial}
          editingTestimonial={editingTestimonial}
        />
      )}
    </div>
  );
}

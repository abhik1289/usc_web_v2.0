"use client";

import React, { useState } from 'react';
import TestimonialDialog from '@/components/(admin)/testimonials/TestimonialDialog';
import { Testimonial } from '@/components/(admin)/testimonials/type';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const handleAddTestimonial = (newTestimonial: Testimonial) => {
    setTestimonials([...testimonials, newTestimonial]);
  };

  const handleEditTestimonial = (updatedTestimonial: Testimonial) => {
    setTestimonials(testimonials.map(testimonial => 
      testimonial.id === updatedTestimonial.id ? updatedTestimonial : testimonial
    ));
  };

  const handleDeleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <button
          onClick={() => {
            setEditingTestimonial(null);
            setIsDialogOpen(true);
          }}
          className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
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
                <button
                  onClick={() => {
                    setEditingTestimonial(testimonial);
                    setIsDialogOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No testimonials added yet. Add your first testimonial!</p>
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

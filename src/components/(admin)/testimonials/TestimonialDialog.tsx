import React, { useState, useEffect } from 'react';
import { Testimonial, TestimonialDialogProps } from './type';

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              title="Upload Image"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              type="text"
              placeholder="Enter position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opinion
            </label>
            <textarea
              placeholder="Enter opinion"
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            {editingTestimonial ? 'Update' : 'Add'}
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 
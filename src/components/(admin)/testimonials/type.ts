export interface Testimonial {
  id: number;
  name: string;
  position: string;
  opinion: string;
  image: File | null;
}

export interface TestimonialDialogProps {
  onClose: () => void;
  onAddTestimonial: (testimonial: Testimonial) => void;
  onEditTestimonial?: (testimonial: Testimonial) => void;
  editingTestimonial?: Testimonial | null;
}

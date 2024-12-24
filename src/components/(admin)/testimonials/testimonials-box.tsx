"use client";
import useGetTestimonials from "@/hooks/api/testimonials/useGetTestimonials";
import TestimonialsSkeletonCard from "./testimonials-card-skeleton";

import TestimonialsCard, { TestimonialCardInterface } from "./TestimonialsCard";

export default function TestimonialsBox() {


  const testimonials = useGetTestimonials();

  return (
    <div>
      {testimonials.isError ? (
        <p>Error Occurs</p>
      ) : testimonials.isLoading ? (
        [1, 2].map((_, i) => <TestimonialsSkeletonCard key={i} />)
      ) : testimonials.data.length === 0 ? (
        <p>No Record found</p>
      ) : (
        testimonials.data &&
        testimonials.data.map((testimonial: TestimonialCardInterface, i: number) => <TestimonialsCard
          key={i}
          index={testimonial.index}
          fullName={testimonial.fullName}
          text={testimonial.text}
          photoUrl={testimonial.photoUrl}
          position={{ title: testimonial.position.title }}
          id={testimonial.id}
        />)
      )}

    </div>
  );
}

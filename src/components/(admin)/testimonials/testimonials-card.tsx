"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useGetTestimonials from "@/hooks/api/testimonials/useGetTestimonials";
import TestimonialsSkeletonCard from "./testimonials-card-skeleton";
import { useDeleteTestimonials } from "@/hooks/api/testimonials/useDeleteTestimonials";
import AlertDialogBox from "../AlertDialog.tsx/AlertDialog";
// import testimonials from './../../../app/api/[[...route]]/testimonials';

export default function TestimonialsCard() {
  //   const [testimonials, setTestimonials] = useState([]);
  const [selectedDeletedId, setSelectedDeletedId] = useState<string | null>();
  const [showDialog, setShowDialog] = useState(false);

  const testimonials = useGetTestimonials();
  const deleteTestimonialsMutation = useDeleteTestimonials(
    selectedDeletedId || ""
  );

  const handleDeleteTestimonial = (id: string) => {
    setSelectedDeletedId(id);
    setShowDialog(true);
  };
  const handleConfirmDeleteTestimonial = () => {
    if (selectedDeletedId) {
      deleteTestimonialsMutation.mutate(selectedDeletedId);
    }
  };
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
        testimonials.data.map((testimonial: any) => {
          return (
            <Card
              key={testimonial.id}
              className="hover:shadow-xl transition-shadow my-4 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
            >
              <CardHeader className="text-center p-6">
                {testimonial.photoUrl && (
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                    <Image
                      width={96}
                      height={96}
                      src={testimonial.photoUrl}
                      alt={testimonial.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <blockquote className="text-gray-300 italic mb-4">
                  "{testimonial.text}"
                </blockquote>
                <CardTitle className="text-lg font-semibold text-gray-100">
                  {testimonial.fullName}
                </CardTitle>
                <p className="text-sm text-gray-400">{testimonial.position}</p>
              </CardHeader>
              <CardFooter className="flex justify-center space-x-4 p-4 border-t border-gray-700 bg-gray-900">
                <Button
                  variant="ghost"
                  className="text-blue-400 hover:text-blue-300"
                  onClick={() => {
                    // setEditingTestimonial(testimonial);
                    // setIsDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-400 hover:text-red-300"
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          );
        })
      )}
      <AlertDialogBox
        show={showDialog}
        setShow={() => setShowDialog(false)}
        title="Delete Testimonial"
        description="Are you sure you want to delete this testimonial? This action cannot be undone."
        onConfirm={handleConfirmDeleteTestimonial}
      />
    </div>
  );
}

"use client";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddTestimonialsForm } from "./AddTestimonialsForm";
import { useSearchParams } from "next/navigation";
import useGetTestimonial from "@/hooks/api/testimonials/useGetTestimonial";
import { EditTestimonialsForm } from "./EditTestimonialsForm";

export const AddTestimonials = () => {

  const param = useSearchParams();
  const id = param.get("id") || "";
  const testimonials = useGetTestimonial(id);


  return (
    <div className="p-4">
      <Card className="">
        <CardHeader>
          <CardTitle>
            {testimonials.data ? "Update Testimonial" : "Add New Testimonial"}
          </CardTitle>
          <CardDescription>
            {testimonials.data
              ? "Refine your experience by updating a testimonial to inspire and inform others."
              : " Share your experience by adding a testimonial that inspires and informs others."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {id && testimonials.data ? (
            <EditTestimonialsForm
              isLoading={testimonials.isLoading}
              isEdit={true}
              editId={testimonials.data && testimonials.data.id}
              defaultValues={{
                fullName: testimonials.data && testimonials.data.fullName,
                rolesId: testimonials.data && testimonials.data.rolesId,
                text: testimonials.data && testimonials.data.text,
                index: testimonials.data && testimonials.data.index.toString(),
                photoUrl: testimonials.data && testimonials.data.photoUrl,
              }}
            />
          ) : (
            <AddTestimonialsForm
              isEdit={false}
              defaultValues={{
                fullName: "",
                rolesId: "",
                text: "",
                photoUrl: "https://avatar.iran.liara.run/public/1",
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

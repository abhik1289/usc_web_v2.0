"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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

export const AddTestimonials = () => {
  const param = useSearchParams();
  const [data, setData] = useState();
  const id = param.get("id");
  // useEffect(() => {
  //   if (id) {
  //     const testimonials = useGetTestimonial(id);
  //     if (testimonials.data) {
  //       setData(testimonials.data);
  //     }
  //   }
  // }, [id]);

  console.log(data);
  return (
    <div className="p-4">
      <Card className="">
        <CardHeader>
          <CardTitle>Add New Testimonial</CardTitle>
          <CardDescription>
            Share your experience by adding a testimonial that inspires and
            informs others.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddTestimonialsForm
            isEdit={false}
            defaultValues={{
              fullName: "",
              rolesId: "",
              text: "",
              photoUrl: "https://avatar.iran.liara.run/public/1",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import TestimonialDialog from "@/components/(admin)/testimonials/TestimonialDialog";
// import { Testimonial } from "@/components/(admin)/testimonials/type";

import { Button } from "@/components/ui/button";
// import TestimonialsCard from "@/components/(admin)/testimonials/testimonials-box";
import { useRouter } from "next/navigation";
import TestimonialsBox from "@/components/(admin)/testimonials/testimonials-box";
export default function TestimonialsPage() {



  const router = useRouter();
 

  return (
    <div className="space-y-6 p-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <Button
          onClick={() => router.push("/testimonials/add")}
        >
          Add Testimonial
        </Button>
      </header>

      <TestimonialsBox/>

      

      
    </div>
  );
}

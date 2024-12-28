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

export const EditTestimonial = () => {
  const param = useSearchParams();
  // const [data, setData] = useState();
  const id = param.get("id") || "";

  const { data } = useGetTestimonial(id);

  console.log(data);
  return (
    <div className="p-4">
      <Card className="">
        <CardHeader>
          <CardTitle>Update Testimonial</CardTitle>
          <CardDescription>
            Refine your experience by updating a testimonial to inspire and inform others.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data && <AddTestimonialsForm
            isEdit={true}
            defaultValues={{
              fullName: data.fullName,
              rolesId: "",
              text: "",
              photoUrl: "https://avatar.iran.liara.run/public/1",
            }}
          />}
        </CardContent>
      </Card>
    </div>
  );
};

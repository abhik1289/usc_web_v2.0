"use client";

import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useEditTestimonial(id: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const insertMutation = useMutation({
    mutationFn: async (data: any) => {
      const formData = data;
      const url = `/api/testimonials/update/${id}`;

      const res = await fetch(url, {
        method: 'POST',
        body: formData
      })
      return res;
    },
    onSuccess: () => {
      toast({
        description: "Testimonial updated successfully!",
      });
      queryClient.invalidateQueries(["testimonials"]);
      router.push("/testimonials");
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        description: error.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
    },
  });
  return insertMutation;
}

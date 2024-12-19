import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useGetTestimonial() {
  const queryClient = useQueryClient();
  const insertMutation = useMutation({
    mutationFn: async (data: any) => {
      const { fullName, photoUrl, position, text } = data;
      const url = `/api/testimonials/add`;

      const res = await axios.post(url, {
        fullName,
        photoUrl,
        position,
        text,
      });
      return res.data;
    },
    onSuccess: () => {
      toast({
        description: "Testimonial added successfully!",
      });
      queryClient.invalidateQueries(["testimonials"]);
    },
    onError: (error: any) => {
      toast({
        description: error.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
    },
  });
  return insertMutation;
}

import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteTestimonials = (id: string) => {
  const queryClient = useQueryClient();
  const modifyMutation = useMutation({
    mutationFn: async (data) => {
      const url = `/api/testimonials/delete/${id}`;

      const res = await axios.get(url);
      return res;
    },
    onSuccess: () => {
      toast({
        description: "Testimonials Deleted successfully!",
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
  return modifyMutation;
};

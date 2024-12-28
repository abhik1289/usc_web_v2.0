import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useDeleteUser(id: string) {
  const queryClient = useQueryClient();
  const deleteUser = useMutation({
    
    mutationFn: async () => {
      const url = `/api/user/delete-user/${id}`;

      const res = await axios.get(url);
      return res.data;
    },
    onSuccess: () => {
      toast({
        description: "User Deleted successfully!",
      });
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error: any) => {
      toast({
        description: error.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
    },
  });
  return deleteUser;
}

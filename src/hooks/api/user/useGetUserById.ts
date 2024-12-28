import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetUserById(id: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["users", id],
    queryFn: async () => {
      const res = await axios.get(`/api/user/${id}`);
      return res.data.user;
    },
  });
  return query;
}




export function useGetUserByIdMutation() {
  const deleteUser = useMutation({

    mutationFn: async (data: { id: string }) => {
      const { id } = data;
      const url = `/api/user/${id}`;

      const res = await axios.get(url);
      return res.data;
    },
    onSuccess: () => {

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

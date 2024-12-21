import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


export default function useDeleteChampion(id:string) {
    const queryClient = useQueryClient();
    const modifyMutation = useMutation({
      mutationFn: async (data: any) => {
        const url = `/api/champions/delete/${id}`;
  
        const res = await axios.get(url);
        return res;
      },
      onSuccess: () => {
        toast({
          description: "Champion Deleted successfully!",
        });
        queryClient.invalidateQueries(["champions"]);
      },
      onError: (error: any) => {
        toast({
          description: error.response?.data?.error || "An error occurred",
          variant: "destructive",
        });
      },
    });
    return modifyMutation;
}

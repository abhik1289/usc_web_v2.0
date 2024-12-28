import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


export default function useDeleteRole(id: string) {
    const queryClient = useQueryClient();
    const modifyMutation = useMutation({
        mutationFn: async () => {
            const url = `/api/domain/delete-role/${id}`;

            const res = await axios.get(url);
            return res;
        },
        onSuccess: () => {
            toast({
                description: "Role Deleted Successfully",
            });
            queryClient.invalidateQueries(["roles"]);
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

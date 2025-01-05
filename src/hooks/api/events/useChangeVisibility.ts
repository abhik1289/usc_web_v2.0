import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useChangeVisibility = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: {
            id: string;
        }) => {
            const { id } = data;
            
            const url = `/api/event/change-view/${id}`;

            const res = await axios.get(url);
            return res;
        },
        onSuccess: () => {
            toast({
                description: "Updated",
            });
            queryClient.invalidateQueries(["events"]);
        },
        onError: (error: any) => {
            toast({
                description: error.response?.data?.error || "An error occurred",
                variant: "destructive",
            });
        },
    });
    return mutation;
};

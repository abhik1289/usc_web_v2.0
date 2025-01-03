import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


export default function useDeleteTeacher() {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: async (data: { id: string }) => {
            const { id } = data;
            const url = `/api/event/delete-event/${id}`;

            const res = await axios.get(url);
            return res;
        },
        onSuccess: () => {
            toast({
                description: "Event Deleted successfully!",
            });
            queryClient.invalidateQueries(["mentor"]);
        },
        onError: (error: any) => {
            toast({
                description: error.response?.data?.error || "An error occurred",
                variant: "destructive",
            });
        },
    });
    return deleteMutation;
}

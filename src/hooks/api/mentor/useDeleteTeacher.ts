import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


export default function useDeleteTeacher({ mType }: { mType: string }) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: async (data: { id: string }) => {
            const { id } = data;
            const url = `/api/mentor/delete/${id}`;

            const res = await axios.get(url);
            return res.data;
        },
        onSuccess: () => {
            const isMentor = mType === "mentor";
            toast({
                description: `${isMentor ? "Mentor" : "Advisor"} deleted successfully!`,
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

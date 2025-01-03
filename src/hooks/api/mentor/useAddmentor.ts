import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function useAddmentor() {
    const queryClient = useQueryClient();
    const insertMutation = useMutation({
        mutationFn: async (data: any) => {
            const formData = data;

            const url = `/api/mentor/add-member`;

            const res = await fetch(url, {
                method: "POST",
                body: formData,
            });
            return res;
        },
        onSuccess: () => {
            toast({
                description: "Added successfully!",
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
    return insertMutation;
}

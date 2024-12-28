import { toast } from "@/hooks/use-toast";
import { Role } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const updateMutation = useMutation({

        mutationFn: async (data: { role: Role, isBan: boolean, id: string }) => {
            const { role, isBan, id } = data;
            const url = `/api/user/update-user/${id}`;

            const res = await axios.post(url, { role, isBan });
            return res.data;
        },
        onSuccess: () => {
            toast({
                description: "Sucessfully updated user!",
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
    return updateMutation;
}

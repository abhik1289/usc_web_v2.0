import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateEvent = (id: string) => {
    const queryClient = useQueryClient();
    const insertMutation = useMutation({
        mutationFn: async (data: any) => {
            const formData =
                data;
            const url = `/api/event/update-event/${id}`;

            const res = await fetch(url, {
                method: "POST",
                body: formData
            })
            return res;
        },
        onSuccess: () => {
            toast({
                description: "Event successfully updated",
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
    return insertMutation;
};

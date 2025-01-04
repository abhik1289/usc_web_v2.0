import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddEvents = () => {
    const queryClient = useQueryClient();
    const insertMutation = useMutation({
        mutationFn: async (data: any) => {
            const formData =
                data;
            const url = `/api/event/add-event`;

            const res = await fetch(url, {
                method: "POST",
                body: formData
            })
            return res;
        },
        onSuccess: () => {
            toast({
                description: "Event added successfully!",
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

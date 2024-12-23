import { toast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useDeleteLead() {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({

        mutationFn: async (data: { id: string }) => {
            const { id } = data;
            const url = `/api/leads/delete-lead/${id}`;

            const res = await axios.get(url);
            return res;
        },
        onSuccess: () => {
            toast({
                description: "Lead Deleted successfully!",
            });
            queryClient.invalidateQueries(["leads"]);
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

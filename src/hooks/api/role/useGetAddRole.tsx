import { toast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useGetAddRole() {
    const queryClient = useQueryClient();
    const modifyMutation = useMutation({
        mutationFn: async (data: { role: string }) => {
            const { role } = data;
            const res = await axios.post("/api/domain/add-role", { title: role });
            return res.data;
        },
        onSuccess: () => {
            toast({
                description: "Role added successfully!",
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

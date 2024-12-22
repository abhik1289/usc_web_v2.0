import { toast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useEditRole(selectedEditRoleId?: string) {
    const queryClient = useQueryClient();
    const modifyMutation = useMutation({
        mutationFn: async (data: { role: string }) => {
            const res = await axios.post(
                `/api/domain/update-role/${selectedEditRoleId}`, {
                title: data.role
            }
            );
            return res.data;
        },
        onSuccess: () => {
            toast({
                description: "Role Modified successfully!",
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

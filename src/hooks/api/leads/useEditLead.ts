import { toast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

function useEditLead(id: string) {
    console.log("first")
    const queryClient = useQueryClient();
    const modifyMutation = useMutation({
        mutationFn: async (data: any) => {
            const { fullName, isCoreMember, isCurrent, profilePhoto, domainGroupId, domainNameId, Social,  index } =
                data;
            const convertInt = parseInt(index)
            const url = `/api/leads/update-lead/${id}`;

            const res = await axios.post(url, {
                fullName, isCoreMember, isCurrent, profilePhoto, domainGroupId, domainNameId, Social, index: convertInt
            });
            return res.data;
        },
        onSuccess: () => {
            toast({
                description: "Leads Updated successfully!",
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
    return modifyMutation;
}

export default useEditLead
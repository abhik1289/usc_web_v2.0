import { toast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


function useEditLead(id: string) {
    console.log("first")
    const queryClient = useQueryClient();
    const modifyMutation = useMutation({
        mutationFn: async (data: any) => {

            const formData = data;
            // const convertInt = parseInt(index)
            const url = `/api/leads/update-lead/${id}`;

            const res = await fetch(url, {
                method: "POST",
                body: formData
            });

            return res;
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
import { AddLeadFormProps } from "@/components/(admin)/leads/AddLeadForm";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddLead = () => {
    const queryClient = useQueryClient();
    const insertMutation = useMutation({
        mutationFn: async (data: any) => {
            const { fullName, isCoreMember, isCurrent, profilePhoto, domainGroupId, domainNameId, Social } =
                data.defaultValues;
         
            const url = `/api/leads/add-lead`;

            const res = await axios.post(url, {
                fullName, isCoreMember, isCurrent, profilePhoto, domainGroupId, domainNameId,
                Social
            });
            return res.data;
        },
        onSuccess: () => {
            toast({
                description: "Lead added successfully!",
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
    return insertMutation;
};

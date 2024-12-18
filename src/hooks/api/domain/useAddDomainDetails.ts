import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddDomainDetails = () => {
  const queryClient = useQueryClient();
  const insertMutation = useMutation({
    mutationFn: async (data: any) => {
      const { title, description, bannerUrl, resourcesUrl, domainGroupId } =
        data;
      const url = `/api/domain/add-domainDetails`;

      const res = await axios.post(url, {
        title,
        description,
        bannerUrl,
        url: resourcesUrl,
        groupOf: domainGroupId,
      });
      return res.data;
    },
    onSuccess: () => {
      toast({
        description: "Domain added successfully!",
      });
      queryClient.invalidateQueries(["domainGroups"]);
      queryClient.invalidateQueries(["domain"]);
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

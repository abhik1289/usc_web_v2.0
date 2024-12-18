import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useEditDomainDetails = (id:string) => {
  const queryClient = useQueryClient();
  const modifyMutation = useMutation({
    mutationFn: async (data: any) => {
      const { title, description, bannerUrl, resourcesUrl, domainGroupId } =
        data;
      const url = `/api/domain/update-domainDetails/${id}`;

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
        description: "Domain Updated successfully!",
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
  return modifyMutation;
};

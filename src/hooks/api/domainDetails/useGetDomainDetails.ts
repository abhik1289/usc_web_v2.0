import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetDomainDetails = () => {
  const query = useQuery({
    queryKey: ["domainDetails"],
    queryFn: async () => {
      const res = await axios.get("/api/domain/get-domains");
      return res.data.domainGroups;
    },
  });
  return query;
};

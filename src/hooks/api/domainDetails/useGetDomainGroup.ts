import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetDomainGroup = () => {
  const query = useQuery({
    queryKey: ["domainGroups"],
    queryFn: async () => {
      const res = await axios.get("/api/domain/get-domain-groups");
      return res.data.domainGroups;
    },
  });
  return query;
};

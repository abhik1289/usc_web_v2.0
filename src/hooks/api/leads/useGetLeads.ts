import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetLeads = () => {
  const query = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const res = await axios.get("/api/leads");
      return res.data.leads;
    },
  });
  return query;
};

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useBasic = () => {
  const query = useQuery({
    queryKey: ["basic"],
    queryFn: async () => {
      const res = await axios.get("/api/basic");
      return res.data.data;
    },
  });
  return query;
};

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetChampions = () => {
  const query = useQuery({
    queryKey: ["champions"],
    queryFn: async () => {
      const res = await axios.get("/api/champions");
      return res.data.champions;
    },
  });
  return query;
};

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetUserById(id: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["users", id],
    queryFn: async () => {
      const res = await axios.get(`/api/user/${id}`);
      return res.data.user;
    },
  });
  return query;
}

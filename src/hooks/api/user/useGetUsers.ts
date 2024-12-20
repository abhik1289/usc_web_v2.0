import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetUsers() {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("/api/user/get-users");
      return res.data.users;
    },
    
  });
  return query;
}

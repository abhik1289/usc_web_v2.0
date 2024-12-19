import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetRoles() {
  const roles = useQuery({
    queryKey: ["roles"],
    queryFn: () => axios.get("/api/domain/get-roles").then((res)=>{
        return res.data.roles
    }),
  });
  return roles;
}

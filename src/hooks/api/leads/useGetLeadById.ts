import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetLeadById = (id: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["leads", id],
        queryFn: async () => {
            const res = await axios.get(`/api/leads/${id}`);
            return res.data.lead;
        },
    });
    return query;
};

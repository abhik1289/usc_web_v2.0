import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function useGetAdvisorById(id?: string|null) {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["advisor", id],
        queryFn: async () => {
            const res = await axios.get(`/api/mentor/advisor/${id}`);
            return res.data.advisor;
        },
    });
    return query;
}

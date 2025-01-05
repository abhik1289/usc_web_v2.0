import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


export default function useGetEventById(id?: string | null) {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["events"],
        queryFn: () => axios.get(`/api/event/${id}`).then((res) => res.data.event),
    });
    return query;
}

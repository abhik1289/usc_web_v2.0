import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useGetEvents() {
    const query = useQuery({
        queryKey: ["events"],
        queryFn: () => axios.get("/api/event/all-events").then((res) => res.data.events),
    });
    return query;
}

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useGetMentor() {

    const query = useQuery({
        queryKey: ["leads"],
        queryFn: async () => {
            const res = await axios.get("/api/mentor/advisors");
            return res.data.advisors;
        },
    });
    return query;


}

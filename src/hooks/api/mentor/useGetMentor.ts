import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useGetMentor() {

    const query = useQuery({
        queryKey: ["mentor"],
        queryFn: async () => {
            const res = await axios.get("/api/mentor/mentors");
            return res.data.mentors;
        },
    });
    return query;


}

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useGetRoles() {
    const roles = useQuery({
        queryKey: ["roles"],
        queryFn: () => axios.get("/api/domain/get-roles").then((res) => res.data.roles),
    });
    return roles;
}

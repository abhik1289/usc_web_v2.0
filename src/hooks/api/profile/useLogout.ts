import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function useLogout() {
    const mutation = useMutation({
        mutationFn: async () => {
            const res = await axios.get(`/api/user/logout`);
            return res.data;
        },
        onSuccess: () => {
            toast({
                description: "Successfully logged out!",
            });
        },
        onError: (error: any) => {
            toast({
                description: error.response?.data?.error || "An error occurred",
                variant: "destructive",
            });
        },
    });
    return mutation;
}

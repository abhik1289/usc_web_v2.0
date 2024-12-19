import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// interface TestimonialsData {
//   fullName: string;
//   index: number;
//   text: string;
//   photoUrl: string;
//   id: string;
//   position: {
//     title: string;
//   };
// }

export default function useGetTestimonial(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["testimonials",id],
    queryFn: async () => {
      const res = await axios.get(`/api/testimonials/${id}`);
      return res.data.message;
    },
  });
  return query;
}

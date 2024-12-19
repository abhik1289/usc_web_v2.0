import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetTestimonials() {
  const query = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axios.get("/api/testimonials");
      return res.data.message;
    },
  });
  return query;
}

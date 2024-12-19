import { useQuery } from "@tanstack/react-query";
import axios from "axios";



 interface TestimonialsData {
    fullName: string;
    index:number;
    text:string;
    photoUrl:string;
    id:string;
    position:{
      title:string
    }
  }


export default function useGetTestimonials() {
  const query = useQuery<TestimonialsData[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axios.get("/api/testimonials");
      return res.data.message;
    },
  });
  return query;
}

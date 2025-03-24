import axios from "@/lib/axios";
import { homeInfo } from "@/types/homeInfo";
import { useQuery } from "@tanstack/react-query";

export const getCarousel = async () => {
  const response = await axios.get<Array<homeInfo>>(
    "/app/home/info/getCarousel",
    {}
  );
  return response.data;
};

export const useGetCarousel = () => {
  return useQuery({
    queryKey: ["carousel"],
    queryFn: getCarousel,
  });
};

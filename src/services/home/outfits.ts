import axios from "@/lib/axios";
import { outfits } from "@/types/outfits";
import { useQuery } from "@tanstack/react-query";

export const getOutfits = async () => {
  const response = await axios.get<Array<outfits>>(
    "/app/outfits/info/getOutfitsRec",
    {}
  );
  return response.data;
};

export const useGetOutfits = () => {
  return useQuery({
    queryKey: ['outfitsRec'],
    queryFn: getOutfits,
  });
};

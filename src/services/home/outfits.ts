import axios from "@/lib/axios";
import { outfits } from "@/types/outfits";
import { useQuery } from "@tanstack/react-query";

export const getOutfits = async (type: number) => {
  const response = await axios.get<Array<outfits>>(
    `/app/outfits/info/getOutfitsRec?type=${type}`,
    {}
  );
  return response.data;
};

export const useGetOutfitsRec = () => {
  return useQuery({
    queryKey: ["outfitsRec"],
    queryFn: async () => {
      return await getOutfits(0);
    },
  });
};

export const useGetOutfitsFea = () => {
  return useQuery({
    queryKey: ["outfitsFea"],
    queryFn: async () => {
      return await getOutfits(1);
    },
  });
};

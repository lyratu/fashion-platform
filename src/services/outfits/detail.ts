import axios from "@/lib/axios";
import { outfits } from "@/types/outfits";
import { useQuery } from "@tanstack/react-query";

export const getOutfitsDet = async (id: string) => {
  const response = await axios.get<outfits>(
    `/app/outfits/info/info?id=${id}`,
    {}
  );
  return response.data;
};

export const useGetOutfitsDet = (id: string) => {
  return useQuery({
    queryKey: [`outfitsDet${id}`],
    queryFn: async () => {
      return await getOutfitsDet(id);
    },
  });
};

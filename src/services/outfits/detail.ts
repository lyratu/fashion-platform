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
    queryKey: [`outfitsDet`,id],
    queryFn: async () => {
      return await getOutfitsDet(id);
    },
  });
};

export const getRelatedArticles = async (id: string) => {
  const response = await axios.get<Array<outfits>>(
    `/app/outfits/info/getRelatedArticles?id=${id}`,
    {}
  );
  return response.data;
};

export const useGetRelatedArticles = (id: string) => {
  return useQuery({
    queryKey: [`outfitsRel`,id],
    queryFn: async () => {
      return await getRelatedArticles(id);
    },
  });
};

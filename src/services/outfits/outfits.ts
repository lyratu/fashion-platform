import axios from "@/lib/axios";
import { outfits } from "@/types/outfits";
import { pageQuery, pageQueryResponse } from "@/types/pageQuery";
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

export const getOutfitsPage = async (data: pageQuery) => {
  const response = await axios.post<pageQueryResponse<outfits>>(
    `/app/outfits/info/page`,
    data
  );
  return response.data;
};

export const useGetOutfitsPage = (data: pageQuery) => {
  return useQuery({
    queryKey: ["outfitsPage"],
    queryFn: async () => {
      return await getOutfitsPage(data);
    },
  });
};

import axios from "@/lib/axios";
import { outfits } from "@/types/outfits";
import { pageQuery, pageQueryResponse } from "@/types/pageQuery";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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
  if (data.category == "0") delete data.category;
  const response = await axios.post<pageQueryResponse<outfits>>(
    `/app/outfits/info/page`,
    data
  );
  return response.data;
};

export const useGetOutfitsPage = (data: pageQuery) => {
  return useInfiniteQuery<pageQueryResponse<outfits>, Error>({
    queryKey: ["outfitsPage", data],
    queryFn: ({ pageParam }) =>
      getOutfitsPage({ ...data, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedArticles = allPages.reduce(
        (acc, page) => acc + page.list.length,
        0
      );
      if (loadedArticles < lastPage.pagination.total) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });
};

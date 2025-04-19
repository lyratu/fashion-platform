import axios from "@/lib/axios";
import { goods } from "@/types/goods";
import { goodsCollect } from "@/types/goodsCollect";
import { pageQuery, pageQueryResponse } from "@/types/pageQuery";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const getMyGoodsCollect = async () => {
  const response = await axios.get<Array<goodsCollect>>(
    `/app/goods/collect/myCollect`,
    {}
  );
  return response.data;
};

export const useGetMyGoodsCollect = () => {
  return useQuery({
    queryKey: [`getMyGoodsCollect`],
    queryFn: getMyGoodsCollect,
    staleTime: 0,
  });
};

export const getGoodsCollect = async (data: pageQuery) => {
  const response = await axios.post<pageQueryResponse<goodsCollect>>(
    `/app/goods/collect/page`,
    data
  );
  return response.data;
};

export const useGetGoodsCollect = (data: pageQuery) => {
  return useInfiniteQuery<pageQueryResponse<goodsCollect>, Error>({
    queryKey: ["goodsPage", data],
    queryFn: ({ pageParam }) =>
      getGoodsCollect({ ...data, page: pageParam as number }),
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

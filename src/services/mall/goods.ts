import axios from "@/lib/axios";
import { goods } from "@/types/goods";
import { pageQuery, pageQueryResponse } from "@/types/pageQuery";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const getGoodsRec = async () => {
  const response = await axios.get<Array<goods>>(
    "/app/goods/info/getGoodsRec",
    {}
  );
  return response.data;
};

export const useGetGoodsRec = () => {
  return useQuery({
    queryKey: ["goodsRec"],
    queryFn: getGoodsRec,
  });
};

export const getGoods = async (data: pageQuery) => {
  if (data.type == "0") delete data.type;
  const response = await axios.post<pageQueryResponse<goods>>(
    "/app/goods/info/page",
    data
  );
  return response.data;
};

export const useGetGoods = (data: pageQuery) => {
  return useInfiniteQuery<pageQueryResponse<goods>, Error>({
    queryKey: ["goodsPage", data],
    queryFn: ({ pageParam }) =>
      getGoods({ ...data, page: pageParam as number }),
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

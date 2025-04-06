import axios from "@/lib/axios";
import { goods } from "@/types/goods";
import { useQuery } from "@tanstack/react-query";

export const getGoodsRec = async () => {
  const response = await axios.get<Array<goods>>(
    "/app/goods/info/getGoodsRec",
    {}
  );
  return response.data;
};

export const getGoods = async (page: number, size: number, order: string) => {
  const response = await axios.post<{ list: Array<goods> }>(
    "/app/goods/info/page",
    {
      page,
      size,
      order,
      sort: "desc",
    }
  );
  return response.data;
};

export const useGetGoodsRec = () => {
  return useQuery({
    queryKey: ["goodsRec"],
    queryFn: getGoodsRec,
  });
};

export const useGetGoods = (page: number, size: number, order: string) => {
  return useQuery({
    queryKey: ["goods", page, size, order],
    queryFn: () => getGoods(page, size, order),
  });
};

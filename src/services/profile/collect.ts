import axios from "@/lib/axios";
import { goodsCollect } from "@/types/goodsCollect";
import { useQuery } from "@tanstack/react-query";

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
  });
};

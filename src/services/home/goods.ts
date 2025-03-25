import axios from "@/lib/axios";
import { goods } from "@/types/goods";
import { useQuery } from "@tanstack/react-query";

export const getGoods = async () => {
  const response = await axios.get<Array<goods>>(
    "/app/goods/info/getGoodsRec",
    {}
  );
  return response.data;
};

export const useGetGoods = () => {
  return useQuery({
    queryKey: ["goodsRec"],
    queryFn: getGoods,
  });
};

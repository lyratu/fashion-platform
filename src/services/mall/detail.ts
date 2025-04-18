import { ApiResponse } from "@/types/apiResponse";
import { goods } from "@/types/goods";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getGoodsDet = async (id: string, userId: number) => {
  const response = await axios.get<ApiResponse<goods>>(
    `/app/goods/info/getInfo?id=${id}&userId=${userId}`,
    {}
  );
  return response.data.data;
};
export const useGetGoodsDet = (id: string, userId: number) => {
  return useQuery({
    queryKey: [`goodsDet`, id],
    queryFn: () => getGoodsDet(id, userId),
  });
};

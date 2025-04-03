import { ApiResponse } from "@/types/apiResponse";
import { goods } from "@/types/goods";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getGoodsDet = async (id: string) => {
  const response = await axios.get<ApiResponse<goods>>(
    `/app/goods/info/info?id=${id}`,
    {}
  );
  return response.data.data;
};
export const useGetGoodsDet = (id: string) => {
  return useQuery({
    queryKey: [`goodsDet${id}`],
    queryFn: () => getGoodsDet(id),
  });
};

import axios from "@/lib/axios";
import { address } from "@/types/address";
import { useQuery } from "@tanstack/react-query";

export const getMyAddress = async () => {
  const response = await axios.post<Array<address>>(
    `/app/user/address/list`,
    {}
  );
  return response.data;
};

export const useGetMyAddress = () => {
  return useQuery({
    queryKey: [`getMyAddress`],
    queryFn: getMyAddress,
  });
};

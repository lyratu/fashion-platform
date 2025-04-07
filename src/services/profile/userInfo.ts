import axios from "@/lib/axios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const getMyInfo = async () => {
  const response = await axios.get<User>(`/app/user/info/person`, {});
  return response.data;
};

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: [`getMyInfo`],
    queryFn: getMyInfo,
  });
};

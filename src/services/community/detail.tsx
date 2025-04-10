import axios from "@/lib/axios";
import { post } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

export const getPostDet = async (id: string) => {
  const response = await axios.get<post>(`/app/community/post/info?id=${id}`);
  return response.data;
};

export const useGetPostDet = (id: string) => {
  return useQuery({
    queryKey: ["postDet", id],
    queryFn: async () => await getPostDet(id),
    staleTime: 0,
  });
};

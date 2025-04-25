import axios from "@/lib/axios";
import { like } from "@/types/like";
import { useMutation, useQuery } from "@tanstack/react-query";

export const likeOrUnlike = async (postId: number) => {
  const response = await axios.post<like>(
    `/app/community/like/likeOrUnlike?postId=${postId}`,
    {}
  );
  return response.data;
};

export const useLikeOrUnlike = () => {
  const {
    error,
    data,
    mutateAsync: likeOrUnlikeFn,
  } = useMutation({
    mutationFn: likeOrUnlike,
  });

  return { likeOrUnlikeFn, data, error };
};

export const likeCount = async (id: number) => {
  const response = await axios.get<{ count: number }>(
    `/app/community/like/likeCount?id=${id}`,
    {}
  );
  return response.data;
};

export const useLikeCount = (id: number) => {
  return useQuery({
    queryKey: ["likeCount"],
    queryFn: () => likeCount(id),
    staleTime: 0,
  });
};

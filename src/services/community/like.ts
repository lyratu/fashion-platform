import axios from "@/lib/axios";
import { like } from "@/types/like";
import { useMutation } from "@tanstack/react-query";

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

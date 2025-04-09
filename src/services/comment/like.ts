import axios from "@/lib/axios";
import { like } from "@/types/like";
import { useMutation } from "@tanstack/react-query";

export const doLike = async (commentId: number) => {
  const response = await axios.post<like>(
    `/app/comment/like/likeOrUnlike?commentId=${commentId}`,
    {}
  );
  return response.data;
};

export const useDoLike = () => {
  const {
    error,
    data,
    mutateAsync: doLikeFn,
  } = useMutation({
    mutationFn: doLike,
  });
  return { doLikeFn, data, error };
};

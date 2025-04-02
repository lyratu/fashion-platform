import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { like } from "@/types/like";
import { collect } from "@/types/collect";

export const doLike = async (data: like) => {
  const response = await axios.post<unknown>(
    "/app/outfits/like/likeOrUnlike",
    data
  );
  return response;
};

export const doCollect = async (data: collect) => {
  const response = await axios.post<unknown>(
    "/app/outfits/collect/collectOrUncollect",
    data
  );
  return response;
};

export const useDoLike = () => {
  const {
    error,
    isPending: likeLoading,
    data,
    mutateAsync: doLikeFn,
  } = useMutation({
    mutationFn: doLike,
    onSuccess: () => {},
    onError: () => {},
  });

  return { doLikeFn, likeLoading, data, error };
};

export const useDoCollect = () => {
  const {
    error,
    isPending: collectLoading,
    data,
    mutateAsync: doCollectFn,
  } = useMutation({
    mutationFn: doCollect,
    onSuccess: () => {},
    onError: () => {},
  });

  return { doCollectFn, collectLoading, data, error };
};

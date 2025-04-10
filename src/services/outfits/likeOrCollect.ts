import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { collect } from "@/types/collect";
import { like } from "@/types/like";

export const doLike = async (id: number) => {
  const response = await axios.post<like>(
    `/app/outfits/like/likeOrUnlike?outfitsId=${id}`,
    {}
  );
  return response.data;
};

export const useDoLike = () => {
  const {
    error,
    isPending: likeLoading,
    data,
    mutateAsync: doLikeFn,
  } = useMutation({
    mutationFn: doLike,
  });

  return { doLikeFn, likeLoading, data, error };
};

export const doCollect = async (id: number) => {
  const response = await axios.post<collect>(
    `/app/outfits/collect/collectOrUncollect?outfitsId=${id}`,
    {}
  );
  return response.data;
};

export const useDoCollect = () => {
  const {
    error,
    isPending: collectLoading,
    data,
    mutateAsync: doCollectFn,
  } = useMutation({
    mutationFn: doCollect,
  });

  return { doCollectFn, collectLoading, data, error };
};

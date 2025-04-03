import axios from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
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
    onSuccess: () => {},
    onError: () => {},
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
    onSuccess: () => {},
    onError: () => {},
  });

  return { doCollectFn, collectLoading, data, error };
};

export const getLikeRecord = async (id: string) => {
  const response = await axios.get<like>(
    `/app/outfits/like/getLikeRecord?outfitsId=${id}`,
    {}
  );
  return response.data || { likeStatus: 0 };
};

export const useGetLikeRecord = (id: string) => {
  return useQuery({
    queryKey: [`likeRec${id}`],
    queryFn: async () => {
      return await getLikeRecord(id);
    },
  });
};

export const getCollectRecord = async (id: string) => {
  const response = await axios.get<collect>(
    `/app/outfits/collect/getCollectRecord?outfitsId=${id}`,
    {}
  );
  return response.data || { collectStatus: 0 };
};

export const useGetCollectRecord = (id: string) => {
  return useQuery({
    queryKey: [`collectRec${id}`],
    queryFn: async () => {
      return await getCollectRecord(id);
    },
  });
};

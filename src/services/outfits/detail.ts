import axios from "@/lib/axios";
import { comment, commentForm, pageComment } from "@/types/comment";
import { outfits } from "@/types/outfits";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const getOutfitsDet = async (id: string) => {
  const response = await axios.get<outfits>(
    `/app/outfits/info/info?id=${id}`,
    {}
  );
  return response.data;
};

export const useGetOutfitsDet = (id: string) => {
  return useQuery({
    queryKey: [`outfitsDet`, id],
    queryFn: async () => {
      return await getOutfitsDet(id);
    },
  });
};

export const getRelatedArticles = async (id: string) => {
  const response = await axios.get<Array<outfits>>(
    `/app/outfits/info/getRelatedArticles?id=${id}`,
    {}
  );
  return response.data;
};

export const useGetRelatedArticles = (id: string) => {
  return useQuery({
    queryKey: [`outfitsRel`, id],
    queryFn: async () => {
      return await getRelatedArticles(id);
    },
  });
};

/* 获取穿搭分享评论列表 */
export const getPageComment = async (
  id: string,
  page: number | unknown,
  limit: number
) => {
  const response = await axios.get<pageComment>(
    `/app/outfits/info/getPageComment?id=${id}&page=${page}&limit=${limit}`,
    {}
  );
  return response.data;
};

export const useGetPageComment = (id: string, limit: number) => {
  return useInfiniteQuery<pageComment, Error>({
    queryKey: [`commentPage`, id, limit],
    queryFn: ({ pageParam }) => getPageComment(id, pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedComments = allPages.reduce(
        (acc, page) => acc + (page.list?.length || 0),
        0
      );
      if (loadedComments < lastPage.total) {
        return (allPages?.length || 0) + 1;
      }
      return undefined;
    },
  });
};

/* 穿搭分享发送评论 */
export const sendComment = async (form: commentForm) => {
  const response = await axios.post<Array<comment>>(
    `/app/outfits/info/sendComment`,
    form
  );
  return response.data;
};

export const useSend = () => {
  const {
    error,
    isPending: sendLoading,
    data,
    mutateAsync: sendFn,
  } = useMutation({
    mutationFn: sendComment,
  });
  return { sendFn, sendLoading, data, error };
};

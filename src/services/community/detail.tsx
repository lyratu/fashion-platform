import axios from "@/lib/axios";
import { comment, commentForm, pageComment } from "@/types/comment";
import { post } from "@/types/post";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

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

/* 获取社区评论列表 */
export const getPageComment = async (
  id: string,
  page: number | unknown,
  limit: number
) => {
  const response = await axios.get<pageComment>(
    `/app/community/post/getPageComment?id=${id}&page=${page}&limit=${limit}`,
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
    `/app/community/post/sendComment`,
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

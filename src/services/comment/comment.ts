import axios from "@/lib/axios";
import { comment, commentForm } from "@/types/comment";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const getCommentRec = async () => {
  const response = await axios.get<Array<comment>>(
    "/app/comment/info/getCommentRec",
    {}
  );
  return response.data;
};

export const useGetCommentRec = () => {
  return useQuery({
    queryKey: ["commentRec"],
    queryFn: getCommentRec,
  });
};

type pageComment = {
  list: Array<comment>;
  total: number;
};

export const getPageComment = async (
  id: string,
  page: number | unknown,
  limit: number
) => {
  const response = await axios.get<pageComment>(
    `/app/comment/info/getPageComment?id=${id}&page=${page}&limit=${limit}`,
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
        (acc, page) => acc + page.list.length,
        0
      );
      if (loadedComments < lastPage.total) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });
};

export const sendComment = async (form: commentForm) => {
  const response = await axios.post<Array<comment>>(
    `/app/comment/info/sendComment`,
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

export const delComment = async (id: number) => {
  const response = await axios.post<Array<comment>>(
    `/app/comment/info/delComment?id=${id}`,
    {}
  );
  return response.data;
};

export const useDel = () => {
  const {
    error,
    data,
    mutateAsync: delFn,
  } = useMutation({
    mutationFn: delComment,
  });
  return { delFn, data, error };
};

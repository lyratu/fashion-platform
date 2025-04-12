import axios from "@/lib/axios";
import { comment } from "@/types/comment";
import { useMutation, useQuery } from "@tanstack/react-query";

/* 获取社区高赞评论 */
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

/* 删除评论 */
export const delComment = async (params: { id: number; type: number }) => {
  const { id, type } = params;
  const response = await axios.post<Array<comment>>(
    `/app/comment/info/delComment?id=${id}&type=${type}`,
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

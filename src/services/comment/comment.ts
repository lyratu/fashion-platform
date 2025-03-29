import axios from "@/lib/axios";
import { comment } from "@/types/comment";
import { useQuery } from "@tanstack/react-query";

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

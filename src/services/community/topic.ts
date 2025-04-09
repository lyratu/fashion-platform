import axios from "@/lib/axios";
import { pageQueryResponse } from "@/types/pageQuery";
import { topic } from "@/types/topic";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getTopic = async (name: string) => {
  const response = await axios.post<pageQueryResponse<topic>>(
    "/app/community/topic/page",
    { keyword: name }
  );
  return response.data;
};

export const useGetTopic = (name: string) => {
  return useQuery({
    queryKey: ["topic", name],
    queryFn: async () => await getTopic(name),
  });
};

export const addTopic = async (name: string) => {
  const response = await axios.post<topic>("/app/community/topic/add", {
    name,
  });
  return response.data;
};

export const useAddTopic = () => {
  const {
    error,
    data,
    mutateAsync: addTopicFn,
  } = useMutation({
    mutationFn: addTopic,
  });

  return { addTopicFn, data, error };
};

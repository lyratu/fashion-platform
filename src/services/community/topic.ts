import axios from "@/lib/axios";
import { pageQueryResponse } from "@/types/pageQuery";
import { topic } from "@/types/topic";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getTopic = async (name: string) => {
  const response = await axios.post<pageQueryResponse<topic>>(
    "/app/community/topic/page",
    { keyWord: name, size: 6 }
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

export const getTrend = async () => {
  const response = await axios.get<Array<topic>>(
    "/app/community/topic/trend",
    {}
  );
  return response.data;
};

export const useGetTrend = () => {
  return useQuery({
    queryKey: ["topicTrend"],
    queryFn: getTrend,
  });
};

import axios from "@/lib/axios";
import { dict, dictTypes } from "@/types/dict";
import { useQuery } from "@tanstack/react-query";

export const getDictTypes = async () => {
  const { data: list } = await axios.get<Array<dictTypes>>(
    "/app/dict/info/types",
    {}
  );
  return list;
};

export const getDictInfo = async (types: Array<string>) => {
  const { data: list } = await axios.post<dict>("/app/dict/info/data", {
    types,
  });
  return list;
};

export const getDictValues = async (value: string | string[], key: string) => {
  const { data: list } = await axios.post<Array<string>>(
    "/app/dict/info/values",
    {
      value,
      key,
    }
  );
  return list;
};

export const useGetDictTypes = () => {
  return useQuery({
    queryKey: ["dictTypes"],
    queryFn: getDictTypes,
  });
};

export const useGetDictInfo = (types: Array<string>) => {
  return useQuery({
    queryKey: ["dictInfo"],
    queryFn: () => getDictInfo(types),
  });
};

export const useGetDictValues = (value: string | string[], key: string) => {
  return useQuery({
    queryKey: ["dictValues"],
    queryFn: () => getDictValues(value, key),
  });
};

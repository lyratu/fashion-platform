import axios from "@/lib/axios";
import { DictEntry } from "@/types/dict";
import { useQuery } from "@tanstack/react-query";

export const getDictTypes = async () => {
  const { data: list } = await axios.get<Array<DictEntry>>(
    "/app/dict/info/types",
    {}
  );
  return list;
};

export const useGetDictTypes = () => {
  return useQuery({
    queryKey: ["dictTypes"],
    queryFn: getDictTypes,
  });
};

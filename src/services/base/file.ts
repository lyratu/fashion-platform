import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const upload = async (form: FormData) => {
  const response = await axios.post<string>("/app/base/comm/upload", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useUpload = () => {
  const {
    error,
    data,
    isPending,
    mutateAsync: uploadFn,
  } = useMutation({
    mutationFn: upload,
  });

  return { uploadFn, isLoading: isPending, data, error };
};

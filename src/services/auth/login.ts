import { useMutation } from "@tanstack/react-query";
// import type { AxiosResponse } from "axios";
// import { useNavigate } from "react-router";

import axios from "@/lib/axios";
import { queryClient } from "@/lib/query-client";
// import { useAuthStore } from "@/stores/auth";
import { response } from "@/types/response";
import { loginForm } from "@/types/auth";

export const login = async (data: loginForm) => {
  const response = await axios.post<response>("/user/login/password", data);

  return response.data;
};

export const useLogin = () => {
  // const navigate = useNavigate();
  // const setUser = useAuthStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    mutateAsync: loginFn,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.code === 1001) {
        return;
      }

      // setUser(data);
      queryClient.setQueryData(["user"], data);
    },
  });

  return { login: loginFn, loading, error };
};

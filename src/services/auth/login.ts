import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axios from "@/lib/axios";
import { queryClient } from "@/lib/query-client";
import { useAuthStore } from "@/stores/auth";
import { loginForm, loginResponse } from "@/types/auth";
import { User } from "@/types/user";
export const login = async (data: loginForm) => {
  const response = await axios.post<loginResponse>(
    "/app/user/login/password",
    data
  );

  return response.data;
};
export const fetchUserInfo = async () => {
  const response = await axios.get<User>("/app/user/info/person");
  return response.data;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore.getState();

  const {
    error,
    isPending: logLoading,
    mutateAsync: loginFn,
  } = useMutation({
    mutationFn: async (data: loginForm) => {
      const res = await login(data);
      const { token } = res;
      localStorage.setItem("token", token);
      const userInfo = await fetchUserInfo();
      return { token, userInfo };
    },
    onSuccess: (data) => {
      setUser(data.userInfo);
      setToken(data.token);
      queryClient.setQueryData(["user"], data.userInfo);
      navigate("/");
    },
    onError: () => {
      // 登录失败时清理状态
      localStorage.removeItem("token");
      queryClient.removeQueries({ queryKey: ["user"] });
      setUser(null);
    },
  });

  return { login: loginFn, logLoading, error };
};

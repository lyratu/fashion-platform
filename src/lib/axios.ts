import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/apiResponse";

// 创建axios实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      (config.headers as AxiosHeaders).set("Authorization", `${token}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
let flag = 0;
// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response;
    // 业务状态码判断
    if (data.code === 1000) {
      // 返回重构后的 AxiosResponse 对象
      return Promise.resolve({
        ...response,
        data: data.data, // 将业务数据提升到顶层
      });
    } else if (data.message == "登录失效~") {
      const token = localStorage.getItem("token");
      if (!flag) {
        flag = 1;
        if (token) {
          localStorage.removeItem("token");
          toast.error("登录状态已过期，请重新登录", {
            duration: 1500,
          });
        } else {
          toast.error("您还未登录，请登录！", {
            duration: 1500,
          });
        }
        setTimeout(() => {
          location.href = "/auth";
        }, 1500);
      }
      return Promise.reject(response); // Ensure a valid return type
    } else {
      // handleBusinessError(data.code, data.message);
      toast.error(data.message || "请求失败", { duration: 1500 });
      return Promise.reject(new Error(data.message || "请求失败"));
    }
  },
  (error: AxiosError) => {
    // handleNetworkError(error);
    // toast.error(`服务器请求异常，错误信息：${error.message}`, {
    //   duration: 2000,
    // });
    return Promise.reject(error);
  }
);

export default instance;

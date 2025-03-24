// 定义严格的响应类型
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

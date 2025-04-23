import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const apiKey = "2a44656b116e4beb868faad52d4190b6.1zDgdBIEm42ZfPn2";
const token = localStorage.getItem("token");
const http = axios.create({
  baseURL: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  timeout: 1000 * 10,
});

interface TextContent {
  type: "text";
  text: string;
}

interface ImageUrlContent {
  type: "image_url";
  image_url: {
    url: string;
  };
}
type ContentItem = TextContent | ImageUrlContent;
export interface message {
  role: "user" | "assistant";
  content: ContentItem[];
}
export const send = async (messages: message[]) => {
  const response = await http.post("", {
    model: "GLM-4V-PLUS",
    messages,
    // request_id: token?.substring(0, 8),
  });
  return response.data;
};

export const useSend = () => {
  const {
    error,
    data,
    mutateAsync: sendFn,
  } = useMutation({
    mutationFn: send,
  });

  return { sendFn, data, error };
};

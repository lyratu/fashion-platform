import { useMutation } from "@tanstack/react-query";
const apiKey = import.meta.env.VITE_GLM_API_KEY;
const baseURL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
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
  const res = await fetch(baseURL, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: "POST",
    body: JSON.stringify({
      model: "GLM-4V-PLUS",
      messages,
      stream: true,
    }),
  });
  if (!res.ok) {
    new Error("网络请求失败，请稍后再试,status: " + res.status);
    return null;
  }
  return res.body;
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

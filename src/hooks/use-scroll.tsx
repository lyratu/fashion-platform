import { useEffect } from "react";
const useScrollToBottom = (
  callback: (scrollTop: number, scrollHeight: number) => void
) => {
  useEffect(() => {
    const handleScroll = () => {
      // 获取页面滚动的高度、可视区高度、整个文档的高度
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = window.innerHeight;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      // 当滚动高度 + 可视区高度 大于等于 文档总高度时，表示已触底
      if (windowHeight + scrollTop >= scrollHeight) {
        if (callback) callback(scrollTop, scrollHeight);
      }
    };
    // 添加滚动事件监听器
    window.addEventListener("scroll", handleScroll);
    // 清除事件监听器
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback]);
};
export default useScrollToBottom;

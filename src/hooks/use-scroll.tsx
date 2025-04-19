import { useEffect, RefObject } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * 当 targetRef 对应的元素进入视口时，调用 callback
 */
function useIntersectionObserver(
  targetRef: RefObject<Element>,
  callback: () => void,
  options?: IntersectionObserverOptions
) {
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    // 创建 IntersectionObserver 实例
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 当目标进入视口时触发回调函数
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, options);

    observer.observe(target);

    // 清理函数，卸载监听器
    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [targetRef, callback, options]);
}

export default useIntersectionObserver;

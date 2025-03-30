import { DictEntry } from "@/types/dict";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type DictStore = {
  entries: DictEntry[]; // 只读状态
  setEntries: (entries: DictEntry[]) => void; // 唯一写入方法
  clearEntries: () => void; // 清空方法
};

export const useDictStore = create<DictStore>()(
  persist(
    (set) => ({
      entries: [], // 初始状态
      setEntries: (entries) => set({ entries }), // 全量更新
      clearEntries: () => set({ entries: [] }), // 重置为空数组
    }),
    { name: "dict-store" } // 持久化配置
  )
);

export interface ListItem {
  name: string;
  value: string; // 可替换为更具体的类型
}
export interface DictEntry {
  id: number;
  name: string;
  key: string;
  list: ListItem[];
}

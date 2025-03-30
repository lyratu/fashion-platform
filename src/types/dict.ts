export interface dictInfo {
  id: number;
  typeId: number;

  name: string;

  value: string;

  orderNum: number;

  remark: string;

  parentId: number;
}
export interface dictTypes {
  name: string;

  key: string;
}
export interface dict {
  [key: string]: dictInfo[]; // 使用索引签名来表示字典类型，可以根据key获取对应的值
}

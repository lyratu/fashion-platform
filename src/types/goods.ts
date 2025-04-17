export interface goods {
  id: number;
  title: string;

  price: number;

  description: string;

  detail: string;

  mainImage: string;

  type: number;

  status: number;

  stock: number;

  collectCount: number;

  sales: number;
  subPics: Array<string>;

  size: Array<{ label: string; value: string }>;
  color: Array<{ label: string; value: string }>;
  collectStatus: number;
}

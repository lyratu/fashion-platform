export interface pageQuery {
  order: string;
  page: number;
  size: number;
  sort: string;
  title?: string;
  category?: string;
  type?: string;
}

export interface pageQueryResponse<T> {
  list: Array<T>;
  pagination: {
    page: number;
    size: number;
    total: number;
  };
}

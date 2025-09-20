export interface Page<T> {
  content: T[];
  page: Pagination;
}

export type Pagination = Partial<_Pagination>;

export const DEFAULT_PAGINATION: Pagination = {
  page: 0,
  size: 10,
};

interface _Pagination {
  page: number;
  size: number;
  sort: string;
  direction: 'asc' | 'desc';
}

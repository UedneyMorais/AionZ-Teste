export interface PaginatedResponseDto<T> {
  data: T[];
  page: number;
  totalItems: number;
  totalPages: number;
}

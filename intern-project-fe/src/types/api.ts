// API response types matching backend structure

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface PagedResponse<T> {
  status: string;
  message: string;
  data: T[];
  meta: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    pageSize: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  timestamp?: string;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  errors?: string[]; // Validation errors array
}

export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}

export interface SearchParams extends PaginationParams {
  keyword: string;
}

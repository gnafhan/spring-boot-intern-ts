// Student API service methods
import { apiClient } from './client';
import type { Student, StudentListItem, StudentFormData } from '@/types/student';
import type { ApiResponse, PagedResponse, PaginationParams, SearchParams } from '@/types/api';

export const studentsApi = {
  // GET /api/students?page=0&size=10&sort=namaDepan,asc
  getAll: async (params: PaginationParams = {}): Promise<PagedResponse<StudentListItem>> => {
    const { page = 0, size = 10, sort = 'nomorInduk,asc' } = params;
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort,
    });
    return apiClient.get<PagedResponse<StudentListItem>>(`/students?${queryParams}`);
  },
  
  // GET /api/students/{nomorInduk}
  getByNomorInduk: async (nomorInduk: string): Promise<ApiResponse<Student>> => {
    return apiClient.get<ApiResponse<Student>>(`/students/${nomorInduk}`);
  },
  
  // POST /api/students
  create: async (data: StudentFormData): Promise<ApiResponse<Student>> => {
    return apiClient.post<ApiResponse<Student>>('/students', data);
  },
  
  // PUT /api/students/{nomorInduk}
  update: async (nomorInduk: string, data: StudentFormData): Promise<ApiResponse<Student>> => {
    return apiClient.put<ApiResponse<Student>>(`/students/${nomorInduk}`, data);
  },
  
  // DELETE /api/students/{nomorInduk}
  delete: async (nomorInduk: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(`/students/${nomorInduk}`);
  },
  
  // GET /api/students/search?keyword=budi&page=0&size=10
  search: async (params: SearchParams): Promise<PagedResponse<StudentListItem>> => {
    const { keyword, page = 0, size = 10, sort = 'namaDepan,asc' } = params;
    const queryParams = new URLSearchParams({
      keyword,
      page: page.toString(),
      size: size.toString(),
      sort,
    });
    return apiClient.get<PagedResponse<StudentListItem>>(`/students/search?${queryParams}`);
  },
};

// Query hook: fetch paginated students
import { useQuery } from '@tanstack/react-query';
import { studentsApi } from '@/api/students';
import { QUERY_KEYS } from '@/lib/constants';
import type { PaginationParams } from '@/types/api';

export function useStudents(params: PaginationParams = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.students, params],
    queryFn: () => studentsApi.getAll(params),
    staleTime: 30000, // 30 seconds
  });
}

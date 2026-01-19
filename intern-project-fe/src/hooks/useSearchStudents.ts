// Query hook: search students
import { useQuery } from '@tanstack/react-query';
import { studentsApi } from '@/api/students';
import { QUERY_KEYS } from '@/lib/constants';
import type { SearchParams } from '@/types/api';

export function useSearchStudents(params: SearchParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.searchStudents, params],
    queryFn: () => studentsApi.search(params),
    enabled: !!params.keyword && params.keyword.length > 0,
    staleTime: 30000, // 30 seconds
  });
}

// Query hook: fetch single student
import { useQuery } from '@tanstack/react-query';
import { studentsApi } from '@/api/students';
import { QUERY_KEYS } from '@/lib/constants';

export function useStudent(nomorInduk: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.student, nomorInduk],
    queryFn: () => studentsApi.getByNomorInduk(nomorInduk),
    enabled: !!nomorInduk,
    staleTime: 30000, // 30 seconds
  });
}

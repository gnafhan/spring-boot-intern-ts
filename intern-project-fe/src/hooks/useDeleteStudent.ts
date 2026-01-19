// Mutation hook: delete student
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { studentsApi } from '@/api/students';
import { QUERY_KEYS } from '@/lib/constants';

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (nomorInduk: string) => studentsApi.delete(nomorInduk),
    onSuccess: () => {
      // Invalidate students list to refetch
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.students] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.searchStudents] });
    },
  });
}

// Mutation hook: create student
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { studentsApi } from '@/api/students';
import { QUERY_KEYS } from '@/lib/constants';
import type { StudentFormData } from '@/types/student';

export function useCreateStudent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: StudentFormData) => studentsApi.create(data),
    onSuccess: () => {
      // Invalidate students list to refetch
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.students] });
    },
  });
}

// Mutation hook: update student
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { studentsApi } from '@/api/students';
import { QUERY_KEYS } from '@/lib/constants';
import type { StudentFormData } from '@/types/student';

interface UpdateStudentParams {
  nomorInduk: string;
  data: StudentFormData;
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ nomorInduk, data }: UpdateStudentParams) => 
      studentsApi.update(nomorInduk, data),
    onSuccess: (_, variables) => {
      // Invalidate both the specific student and the list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.student, variables.nomorInduk] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.students] });
    },
  });
}

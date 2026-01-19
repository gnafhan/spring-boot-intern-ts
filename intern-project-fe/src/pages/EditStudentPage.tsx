// Edit student page
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { StudentForm } from '@/components/students/StudentForm';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorAlert } from '@/components/common/ErrorAlert';
import { useStudent } from '@/hooks/useStudent';
import { useUpdateStudent } from '@/hooks/useUpdateStudent';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ApiError } from '@/api/client';
import type { StudentFormSchema } from '@/types/form';

export function EditStudentPage() {
  const { nomorInduk } = useParams<{ nomorInduk: string }>();
  const navigate = useNavigate();
  
  const { data, isLoading, isError, error } = useStudent(nomorInduk || '');
  const updateMutation = useUpdateStudent();
  
  const handleSubmit = async (formData: StudentFormSchema) => {
    if (!nomorInduk) return;
    
    try {
      await updateMutation.mutateAsync({
        nomorInduk,
        data: formData,
      });
      toast.success('Student updated successfully');
      navigate(`/students/${nomorInduk}`);
    } catch (error) {
      // Error will be displayed in the form area
      console.error('Failed to update student:', error);
    }
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (isError || !data) {
    return (
      <div className="space-y-6">
        <PageHeader title="Edit Student" />
        <ErrorAlert
          title="Failed to Load Data"
          message={
            error instanceof ApiError
              ? error.message
              : 'Student not found or an error occurred'
          }
        />
        <Button variant="outline" onClick={() => navigate('/')}>
          <span className="mr-2">←</span>
          Back to List
        </Button>
      </div>
    );
  }
  
  const student = data.data;
  
  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader
        title="Edit Student"
        description={`Edit student data for ${student.namaLengkap}`}
        action={
          <Button variant="outline" onClick={() => navigate(`/students/${nomorInduk}`)}>
            <span className="mr-2">←</span>
            Back
          </Button>
        }
      />
      
      {updateMutation.isError && (
        <ErrorAlert
          title="Failed to Update Student"
          message={
            updateMutation.error instanceof ApiError
              ? updateMutation.error.message
              : 'An error occurred while updating student'
          }
          errors={
            updateMutation.error instanceof ApiError
              ? updateMutation.error.errors
              : undefined
          }
        />
      )}
      
      <StudentForm
        defaultValues={student}
        onSubmit={handleSubmit}
        isLoading={updateMutation.isPending}
        isEdit
      />
    </div>
  );
}

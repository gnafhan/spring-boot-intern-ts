// Student detail page
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { StudentCard } from '@/components/students/StudentCard';
import { DeleteDialog } from '@/components/students/DeleteDialog';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorAlert } from '@/components/common/ErrorAlert';
import { useStudent } from '@/hooks/useStudent';
import { useDeleteStudent } from '@/hooks/useDeleteStudent';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ApiError } from '@/api/client';

export function StudentDetailPage() {
  const { nomorInduk } = useParams<{ nomorInduk: string }>();
  const navigate = useNavigate();
  const [deleteDialog, setDeleteDialog] = useState(false);
  
  const { data, isLoading, isError, error } = useStudent(nomorInduk || '');
  const deleteMutation = useDeleteStudent();
  
  const handleDelete = async () => {
    if (!nomorInduk) return;
    
    try {
      await deleteMutation.mutateAsync(nomorInduk);
      toast.success('Student deleted successfully');
      navigate('/');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Failed to delete student');
      }
      setDeleteDialog(false);
    }
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (isError || !data) {
    return (
      <div className="space-y-6">
        <PageHeader title="Student Details" />
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
    <div className="space-y-6 max-w-3xl">
      <PageHeader
        title="Student Details"
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>
              <span className="mr-2">←</span>
              Back
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/students/${nomorInduk}/edit`)}
            >
              <span className="mr-2">✏️</span>
              Edit
            </Button>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog(true)}
              className="text-destructive hover:text-destructive"
            >
              <span className="mr-2">🗑️</span>
              Delete
            </Button>
          </div>
        }
      />
      
      <StudentCard student={student} />
      
      <DeleteDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        onConfirm={handleDelete}
        studentName={student.namaLengkap}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

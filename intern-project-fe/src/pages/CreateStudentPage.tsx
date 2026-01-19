// Create student page
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { StudentForm } from '@/components/students/StudentForm';
import { ErrorAlert } from '@/components/common/ErrorAlert';
import { useCreateStudent } from '@/hooks/useCreateStudent';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ApiError } from '@/api/client';
import type { StudentFormSchema } from '@/types/form';

export function CreateStudentPage() {
  const navigate = useNavigate();
  const createMutation = useCreateStudent();
  
  const handleSubmit = async (data: StudentFormSchema) => {
    try {
      const result = await createMutation.mutateAsync(data);
      toast.success(`Mahasiswa berhasil dibuat dengan Nomor Induk: ${result.data.nomorInduk}`);
      navigate(`/students/${result.data.nomorInduk}`);
    } catch (error) {
      // Error will be displayed in the form area
      console.error('Failed to create student:', error);
    }
  };
  
  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader
        title="Tambah Mahasiswa Baru"
        description="Isi formulir di bawah untuk menambahkan mahasiswa baru"
        action={
          <Button variant="outline" onClick={() => navigate('/')}>
            <span className="mr-2">←</span>
            Kembali
          </Button>
        }
      />
      
      {createMutation.isError && (
        <ErrorAlert
          title="Gagal Membuat Mahasiswa"
          message={
            createMutation.error instanceof ApiError
              ? createMutation.error.message
              : 'Terjadi kesalahan saat membuat mahasiswa'
          }
          errors={
            createMutation.error instanceof ApiError
              ? createMutation.error.errors
              : undefined
          }
        />
      )}
      
      <StudentForm
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending}
      />
    </div>
  );
}

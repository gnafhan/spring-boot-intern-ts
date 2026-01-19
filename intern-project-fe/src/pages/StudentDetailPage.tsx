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
      toast.success('Mahasiswa berhasil dihapus');
      navigate('/');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Gagal menghapus mahasiswa');
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
        <PageHeader title="Detail Mahasiswa" />
        <ErrorAlert
          title="Gagal Memuat Data"
          message={
            error instanceof ApiError
              ? error.message
              : 'Mahasiswa tidak ditemukan atau terjadi kesalahan'
          }
        />
        <Button variant="outline" onClick={() => navigate('/')}>
          <span className="mr-2">←</span>
          Kembali ke Daftar
        </Button>
      </div>
    );
  }
  
  const student = data.data;
  
  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader
        title="Detail Mahasiswa"
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>
              <span className="mr-2">←</span>
              Kembali
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
              Hapus
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

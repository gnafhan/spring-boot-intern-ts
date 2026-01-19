// Student list page with pagination and search
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/PageHeader';
import { StudentTable } from '@/components/students/StudentTable';
import { SearchBar } from '@/components/students/SearchBar';
import { DeleteDialog } from '@/components/students/DeleteDialog';
import { Pagination } from '@/components/common/Pagination';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorAlert } from '@/components/common/ErrorAlert';
import { EmptyState } from '@/components/common/EmptyState';
import { useStudents } from '@/hooks/useStudents';
import { useSearchStudents } from '@/hooks/useSearchStudents';
import { useDeleteStudent } from '@/hooks/useDeleteStudent';
import { toast } from 'sonner';
import { ApiError } from '@/api/client';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';

export function StudentsPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('nomorInduk,asc');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    nomorInduk: string;
    namaLengkap: string;
  }>({ open: false, nomorInduk: '', namaLengkap: '' });
  
  // Use search query if there's a keyword, otherwise use regular list query
  const isSearching = searchKeyword.length > 0;
  
  const listQuery = useStudents({
    page,
    size: DEFAULT_PAGE_SIZE,
    sort,
  });
  
  const searchQuery = useSearchStudents({
    keyword: searchKeyword,
    page,
    size: DEFAULT_PAGE_SIZE,
    sort,
  });
  
  const query = isSearching ? searchQuery : listQuery;
  const deleteMutation = useDeleteStudent();
  
  const handleSort = (field: string) => {
    const currentField = sort.split(',')[0];
    const currentDirection = sort.split(',')[1];
    
    if (currentField === field) {
      const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
      setSort(`${field},${newDirection}`);
    } else {
      setSort(`${field},asc`);
    }
    setPage(0); // Reset to first page when sorting changes
  };
  
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setPage(0); // Reset to first page when search changes
  };
  
  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(deleteDialog.nomorInduk);
      toast.success('Student deleted successfully');
      setDeleteDialog({ open: false, nomorInduk: '', namaLengkap: '' });
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Failed to delete student');
      }
    }
  };
  
  if (query.isLoading) {
    return <LoadingSpinner />;
  }
  
  if (query.isError) {
    const error = query.error;
    return (
      <div className="space-y-6">
        <PageHeader
          title="Student List"
          description="Manage your student data"
        />
        <ErrorAlert
          title="Failed to Load Data"
          message={error instanceof ApiError ? error.message : 'An error occurred while loading student data'}
        />
      </div>
    );
  }
  
  const students = query.data?.data || [];
  const pageData = query.data?.meta;
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Student List"
        description={`Total ${pageData?.totalItems || 0} students registered`}
        action={
          <Button onClick={() => navigate('/students/create')}>
            <span className="mr-2">➕</span>
            Add Student
          </Button>
        }
      />
      
      <div className="flex items-center gap-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {students.length === 0 ? (
        <EmptyState
          title={isSearching ? 'No results' : 'No students yet'}
          description={
            isSearching
              ? `No students match the search "${searchKeyword}"`
              : 'Start adding new students by clicking "Add Student" button'
          }
          action={
            !isSearching && (
              <Button onClick={() => navigate('/students/create')}>
            <span className="mr-2">➕</span>
            Add Student
              </Button>
            )
          }
        />
      ) : (
        <>
          <StudentTable
            students={students}
            onView={(nomorInduk) => navigate(`/students/${nomorInduk}`)}
            onEdit={(nomorInduk) => navigate(`/students/${nomorInduk}/edit`)}
            onDelete={(nomorInduk, namaLengkap) =>
              setDeleteDialog({ open: true, nomorInduk, namaLengkap })
            }
            onSort={handleSort}
          />
          
          {pageData && (
            <Pagination
              currentPage={pageData.currentPage}
              totalPages={pageData.totalPages}
              hasNext={pageData.hasNext}
              hasPrevious={pageData.hasPrevious}
              onPageChange={setPage}
              totalItems={pageData.totalItems}
            />
          )}
        </>
      )}
      
      <DeleteDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog({ ...deleteDialog, open })
        }
        onConfirm={handleDelete}
        studentName={deleteDialog.namaLengkap}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

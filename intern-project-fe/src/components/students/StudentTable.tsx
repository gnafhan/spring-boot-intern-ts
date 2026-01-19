// Student table component with sorting
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { StudentListItem } from '@/types/student';

interface StudentTableProps {
  students: StudentListItem[];
  onView: (nomorInduk: string) => void;
  onEdit: (nomorInduk: string) => void;
  onDelete: (nomorInduk: string, namaLengkap: string) => void;
  onSort?: (field: string) => void;
}

export function StudentTable({
  students,
  onView,
  onEdit,
  onDelete,
  onSort,
}: StudentTableProps) {
  const SortButton = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <button
      onClick={() => onSort?.(field)}
      className="flex items-center gap-1 hover:text-foreground transition-colors"
    >
      {children}
      <span className="text-xs">↕</span>
    </button>
  );
  
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                {onSort ? (
                  <SortButton field="nomorInduk">Student ID</SortButton>
                ) : (
                  'Student ID'
                )}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                {onSort ? (
                  <SortButton field="namaLengkap">Full Name</SortButton>
                ) : (
                  'Full Name'
                )}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                {onSort ? <SortButton field="usia">Age</SortButton> : 'Age'}
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {students.map((student) => (
              <tr key={student.nomorInduk} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium">{student.nomorInduk}</td>
                <td className="px-4 py-3 text-sm">{student.namaLengkap}</td>
                <td className="px-4 py-3 text-sm">
                  <Badge variant="outline">{student.usia} years</Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(student.nomorInduk)}
                      title="View details"
                    >
                      <span>👁</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(student.nomorInduk)}
                      title="Edit student"
                    >
                      <span>✏️</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(student.nomorInduk, student.namaLengkap)}
                      title="Delete student"
                      className="text-destructive hover:text-destructive"
                    >
                      <span>🗑️</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

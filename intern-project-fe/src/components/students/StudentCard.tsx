// Student detail card component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import type { Student } from '@/types/student';

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl">{student.namaLengkap}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Student ID: {student.nomorInduk}
            </p>
          </div>
          <Badge variant="secondary" className="text-base px-3 py-1">
            {student.usia} years
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">First Name</dt>
            <dd className="mt-1 text-sm">{student.namaDepan}</dd>
          </div>
          
          {student.namaBelakang && (
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Last Name</dt>
              <dd className="mt-1 text-sm">{student.namaBelakang}</dd>
            </div>
          )}
          
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Date of Birth</dt>
            <dd className="mt-1 text-sm">
              {format(new Date(student.tanggalLahir), 'MMMM dd, yyyy')}
            </dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Age</dt>
            <dd className="mt-1 text-sm">{student.usia} years</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Created</dt>
            <dd className="mt-1 text-sm">
              {format(new Date(student.createdAt), 'MMM dd, yyyy, HH:mm')}
            </dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
            <dd className="mt-1 text-sm">
              {format(new Date(student.updatedAt), 'MMM dd, yyyy, HH:mm')}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

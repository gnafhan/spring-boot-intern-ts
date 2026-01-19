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
              Nomor Induk: {student.nomorInduk}
            </p>
          </div>
          <Badge variant="secondary" className="text-base px-3 py-1">
            {student.usia} tahun
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Nama Depan</dt>
            <dd className="mt-1 text-sm">{student.namaDepan}</dd>
          </div>
          
          {student.namaBelakang && (
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Nama Belakang</dt>
              <dd className="mt-1 text-sm">{student.namaBelakang}</dd>
            </div>
          )}
          
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Tanggal Lahir</dt>
            <dd className="mt-1 text-sm">
              {format(new Date(student.tanggalLahir), 'dd MMMM yyyy')}
            </dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Usia</dt>
            <dd className="mt-1 text-sm">{student.usia} tahun</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Dibuat</dt>
            <dd className="mt-1 text-sm">
              {format(new Date(student.createdAt), 'dd MMM yyyy, HH:mm')}
            </dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Terakhir Diubah</dt>
            <dd className="mt-1 text-sm">
              {format(new Date(student.updatedAt), 'dd MMM yyyy, HH:mm')}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

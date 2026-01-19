// Student form component for create/edit
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { studentFormSchema, type StudentFormSchema } from '@/types/form';
import type { Student } from '@/types/student';

interface StudentFormProps {
  defaultValues?: Partial<Student>;
  onSubmit: (data: StudentFormSchema) => void;
  isLoading?: boolean;
  isEdit?: boolean;
}

export function StudentForm({ 
  defaultValues, 
  onSubmit, 
  isLoading, 
  isEdit = false 
}: StudentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormSchema>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: defaultValues
      ? {
          namaDepan: defaultValues.namaDepan || '',
          namaBelakang: defaultValues.namaBelakang || '',
          tanggalLahir: defaultValues.tanggalLahir || '',
        }
      : undefined,
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Mahasiswa' : 'Tambah Mahasiswa Baru'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {isEdit && defaultValues?.nomorInduk && (
            <div className="space-y-2">
              <Label>Nomor Induk</Label>
              <Input
                value={defaultValues.nomorInduk}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Nomor induk tidak dapat diubah
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="namaDepan">
              Nama Depan <span className="text-destructive">*</span>
            </Label>
            <Input
              id="namaDepan"
              {...register('namaDepan')}
              placeholder="Masukkan nama depan"
              disabled={isLoading}
              aria-invalid={errors.namaDepan ? 'true' : 'false'}
            />
            {errors.namaDepan && (
              <p className="text-sm text-destructive">{errors.namaDepan.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              2-100 karakter, hanya huruf, spasi, dan tanda hubung
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="namaBelakang">Nama Belakang</Label>
            <Input
              id="namaBelakang"
              {...register('namaBelakang')}
              placeholder="Masukkan nama belakang (opsional)"
              disabled={isLoading}
              aria-invalid={errors.namaBelakang ? 'true' : 'false'}
            />
            {errors.namaBelakang && (
              <p className="text-sm text-destructive">{errors.namaBelakang.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Opsional, maksimal 100 karakter
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tanggalLahir">
              Tanggal Lahir <span className="text-destructive">*</span>
            </Label>
            <Input
              id="tanggalLahir"
              type="date"
              {...register('tanggalLahir')}
              disabled={isLoading}
              aria-invalid={errors.tanggalLahir ? 'true' : 'false'}
            />
            {errors.tanggalLahir && (
              <p className="text-sm text-destructive">{errors.tanggalLahir.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Usia harus antara 17-40 tahun
            </p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (isEdit ? 'Menyimpan...' : 'Membuat...') : (isEdit ? 'Simpan Perubahan' : 'Buat Mahasiswa')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

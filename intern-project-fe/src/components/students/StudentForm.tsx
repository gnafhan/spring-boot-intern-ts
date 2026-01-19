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
        <CardTitle>{isEdit ? 'Edit Student' : 'Add New Student'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {isEdit && defaultValues?.nomorInduk && (
            <div className="space-y-2">
              <Label>Student ID</Label>
              <Input
                value={defaultValues.nomorInduk}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Student ID cannot be changed
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="namaDepan">
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="namaDepan"
              {...register('namaDepan')}
              placeholder="Enter first name"
              disabled={isLoading}
              aria-invalid={errors.namaDepan ? 'true' : 'false'}
            />
            {errors.namaDepan && (
              <p className="text-sm text-destructive">{errors.namaDepan.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              2-100 characters, letters, spaces, and hyphens only
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="namaBelakang">Last Name</Label>
            <Input
              id="namaBelakang"
              {...register('namaBelakang')}
              placeholder="Enter last name (optional)"
              disabled={isLoading}
              aria-invalid={errors.namaBelakang ? 'true' : 'false'}
            />
            {errors.namaBelakang && (
              <p className="text-sm text-destructive">{errors.namaBelakang.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Optional, maximum 100 characters
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tanggalLahir">
              Date of Birth <span className="text-destructive">*</span>
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
              Age must be between 17-40 years
            </p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (isEdit ? 'Saving...' : 'Creating...') : (isEdit ? 'Save Changes' : 'Create Student')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

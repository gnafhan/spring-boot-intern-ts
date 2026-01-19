import { z } from 'zod';
import { differenceInYears, parse, isValid } from 'date-fns';

// Validation schema matching backend rules exactly
export const studentFormSchema = z.object({
  namaDepan: z
    .string()
    .min(1, 'Nama depan tidak boleh kosong')
    .min(2, 'Nama depan harus antara 2-100 karakter')
    .max(100, 'Nama depan harus antara 2-100 karakter')
    .regex(
      /^[a-zA-Z\s\-]+$/,
      'Nama depan hanya boleh mengandung huruf, spasi, dan tanda hubung'
    ),
  namaBelakang: z
    .string()
    .max(100, 'Nama belakang maksimal 100 karakter')
    .regex(
      /^[a-zA-Z\s\-]*$/,
      'Nama belakang hanya boleh mengandung huruf, spasi, dan tanda hubung'
    )
    .optional()
    .or(z.literal('')),
  tanggalLahir: z
    .string()
    .min(1, 'Tanggal lahir tidak boleh kosong')
    .refine(
      (dateStr) => {
        if (!dateStr) return false;
        const date = parse(dateStr, 'yyyy-MM-dd', new Date());
        return isValid(date);
      },
      { message: 'Format tanggal tidak valid' }
    )
    .refine(
      (dateStr) => {
        const date = parse(dateStr, 'yyyy-MM-dd', new Date());
        return date < new Date();
      },
      { message: 'Tanggal lahir harus di masa lalu' }
    )
    .refine(
      (dateStr) => {
        const date = parse(dateStr, 'yyyy-MM-dd', new Date());
        const age = differenceInYears(new Date(), date);
        return age >= 17;
      },
      { message: 'Usia minimal 17 tahun' }
    )
    .refine(
      (dateStr) => {
        const date = parse(dateStr, 'yyyy-MM-dd', new Date());
        const age = differenceInYears(new Date(), date);
        return age <= 40;
      },
      { message: 'Usia maksimal 40 tahun' }
    ),
});

export type StudentFormSchema = z.infer<typeof studentFormSchema>;

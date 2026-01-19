import { z } from 'zod';
import { differenceInYears, parse, isValid } from 'date-fns';

// Validation schema matching backend rules exactly
export const studentFormSchema = z.object({
  namaDepan: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be between 2-100 characters')
    .max(100, 'First name must be between 2-100 characters')
    .regex(
      /^[a-zA-Z\s\-]+$/,
      'First name can only contain letters, spaces, and hyphens'
    ),
  namaBelakang: z
    .string()
    .max(100, 'Last name maximum 100 characters')
    .regex(
      /^[a-zA-Z\s\-]*$/,
      'Last name can only contain letters, spaces, and hyphens'
    )
    .optional()
    .or(z.literal('')),
  tanggalLahir: z
    .string()
    .min(1, 'Date of birth is required')
    .refine(
      (dateStr) => {
        if (!dateStr) return false;
        const date = parse(dateStr, 'yyyy-MM-dd', new Date());
        return isValid(date);
      },
      { message: 'Invalid date format' }
    )
    .refine(
      (dateStr) => {
        const date = parse(dateStr, 'yyyy-MM-dd', new Date());
        return date < new Date();
      },
      { message: 'Date of birth must be in the past' }
    )
    .refine(
      (dateStr) => {
        const date = parse(dateStr, 'yyyy-MM-dd', new Date());
        const age = differenceInYears(new Date(), date);
        return age >= 17;
      },
      { message: 'Minimum age is 17 years' }
    )
    .refine(
      (dateStr) => {
        const date = parse(dateStr, 'yyyy-MM-dd', new Date());
        const age = differenceInYears(new Date(), date);
        return age <= 40;
      },
      { message: 'Maximum age is 40 years' }
    ),
});

export type StudentFormSchema = z.infer<typeof studentFormSchema>;

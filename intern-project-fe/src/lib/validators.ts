// Custom validation functions

import { differenceInYears } from 'date-fns';

export function validateAge(birthDate: Date): { valid: boolean; age: number; message?: string } {
  const age = differenceInYears(new Date(), birthDate);
  
  if (age < 17) {
    return { valid: false, age, message: 'Usia minimal 17 tahun' };
  }
  
  if (age > 40) {
    return { valid: false, age, message: 'Usia maksimal 40 tahun' };
  }
  
  return { valid: true, age };
}

export function isValidNameFormat(name: string): boolean {
  return /^[a-zA-Z\s\-]+$/.test(name);
}

// Custom validation functions

import { differenceInYears } from 'date-fns';

export function validateAge(birthDate: Date): { valid: boolean; age: number; message?: string } {
  const age = differenceInYears(new Date(), birthDate);
  
  if (age < 17) {
    return { valid: false, age, message: 'Minimum age is 17 years' };
  }
  
  if (age > 40) {
    return { valid: false, age, message: 'Maximum age is 40 years' };
  }
  
  return { valid: true, age };
}

export function isValidNameFormat(name: string): boolean {
  return /^[a-zA-Z\s\-]+$/.test(name);
}

// Application constants

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8712/api';

export const DEFAULT_PAGE_SIZE = 10;

export const QUERY_KEYS = {
  students: 'students',
  student: 'student',
  searchStudents: 'searchStudents',
} as const;

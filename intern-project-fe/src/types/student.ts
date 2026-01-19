// Student type definitions matching backend DTOs

export interface Student {
  nomorInduk: string;
  namaDepan: string;
  namaBelakang?: string;
  namaLengkap: string;
  tanggalLahir: string; // ISO date string (YYYY-MM-DD)
  usia: number;
  createdAt: string;
  updatedAt: string;
}

export interface StudentListItem {
  nomorInduk: string;
  namaLengkap: string;
  usia: number;
}

export interface StudentFormData {
  namaDepan: string;
  namaBelakang?: string;
  tanggalLahir: string; // YYYY-MM-DD
}

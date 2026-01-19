package com.xtramile.intern_project.exception;

public class StudentNotFoundException extends RuntimeException {
    
    public StudentNotFoundException(String nomorInduk) {
        super("Mahasiswa dengan nomor induk '" + nomorInduk + "' tidak ditemukan");
    }
    
    public StudentNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

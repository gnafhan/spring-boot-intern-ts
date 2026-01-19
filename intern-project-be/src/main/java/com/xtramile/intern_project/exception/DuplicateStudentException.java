package com.xtramile.intern_project.exception;

public class DuplicateStudentException extends RuntimeException {
    
    public DuplicateStudentException(String nomorInduk) {
        super("Mahasiswa dengan nomor induk '" + nomorInduk + "' sudah terdaftar");
    }
    
    public DuplicateStudentException(String message, Throwable cause) {
        super(message, cause);
    }
}

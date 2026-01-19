package com.xtramile.intern_project.dto;

import com.xtramile.intern_project.model.Student;

public class StudentResponseDTO {
    
    private String nomorInduk;
    private String namaLengkap;
    private Integer usia;
    
    // Constructors
    public StudentResponseDTO() {
    }
    
    public StudentResponseDTO(String nomorInduk, String namaLengkap, Integer usia) {
        this.nomorInduk = nomorInduk;
        this.namaLengkap = namaLengkap;
        this.usia = usia;
    }
    
    // Factory method from Entity
    public static StudentResponseDTO fromEntity(Student student) {
        return new StudentResponseDTO(
            student.getNomorInduk(),
            student.getNamaLengkap(),
            student.getUsia()
        );
    }
    
    // Getters and Setters
    public String getNomorInduk() {
        return nomorInduk;
    }
    
    public void setNomorInduk(String nomorInduk) {
        this.nomorInduk = nomorInduk;
    }
    
    public String getNamaLengkap() {
        return namaLengkap;
    }
    
    public void setNamaLengkap(String namaLengkap) {
        this.namaLengkap = namaLengkap;
    }
    
    public Integer getUsia() {
        return usia;
    }
    
    public void setUsia(Integer usia) {
        this.usia = usia;
    }
}

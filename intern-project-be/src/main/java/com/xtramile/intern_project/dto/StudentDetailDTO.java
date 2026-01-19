package com.xtramile.intern_project.dto;

import com.xtramile.intern_project.model.Student;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class StudentDetailDTO {
    
    private String nomorInduk;
    private String namaDepan;
    private String namaBelakang;
    private String namaLengkap;
    private LocalDate tanggalLahir;
    private Integer usia;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public StudentDetailDTO() {
    }
    
    public StudentDetailDTO(String nomorInduk, String namaDepan, String namaBelakang, 
                           String namaLengkap, LocalDate tanggalLahir, Integer usia,
                           LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.nomorInduk = nomorInduk;
        this.namaDepan = namaDepan;
        this.namaBelakang = namaBelakang;
        this.namaLengkap = namaLengkap;
        this.tanggalLahir = tanggalLahir;
        this.usia = usia;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    // Factory method from Entity
    public static StudentDetailDTO fromEntity(Student student) {
        return new StudentDetailDTO(
            student.getNomorInduk(),
            student.getNamaDepan(),
            student.getNamaBelakang(),
            student.getNamaLengkap(),
            student.getTanggalLahir(),
            student.getUsia(),
            student.getCreatedAt(),
            student.getUpdatedAt()
        );
    }
    
    // Getters and Setters
    public String getNomorInduk() {
        return nomorInduk;
    }
    
    public void setNomorInduk(String nomorInduk) {
        this.nomorInduk = nomorInduk;
    }
    
    public String getNamaDepan() {
        return namaDepan;
    }
    
    public void setNamaDepan(String namaDepan) {
        this.namaDepan = namaDepan;
    }
    
    public String getNamaBelakang() {
        return namaBelakang;
    }
    
    public void setNamaBelakang(String namaBelakang) {
        this.namaBelakang = namaBelakang;
    }
    
    public String getNamaLengkap() {
        return namaLengkap;
    }
    
    public void setNamaLengkap(String namaLengkap) {
        this.namaLengkap = namaLengkap;
    }
    
    public LocalDate getTanggalLahir() {
        return tanggalLahir;
    }
    
    public void setTanggalLahir(LocalDate tanggalLahir) {
        this.tanggalLahir = tanggalLahir;
    }
    
    public Integer getUsia() {
        return usia;
    }
    
    public void setUsia(Integer usia) {
        this.usia = usia;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

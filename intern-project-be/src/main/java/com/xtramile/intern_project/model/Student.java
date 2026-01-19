package com.xtramile.intern_project.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

@Entity
@Table(name = "students", indexes = {
    @Index(name = "idx_nomor_induk", columnList = "nomor_induk", unique = true)
})
public class Student {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "nomor_induk", nullable = false, unique = true, length = 20)
    private String nomorInduk;
    
    @Column(name = "nama_depan", nullable = false, length = 100)
    private String namaDepan;
    
    @Column(name = "nama_belakang", length = 100)
    private String namaBelakang;
    
    @Column(name = "tanggal_lahir", nullable = false)
    private LocalDate tanggalLahir;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Constructors
    public Student() {
    }
    
    public Student(String nomorInduk, String namaDepan, String namaBelakang, LocalDate tanggalLahir) {
        this.nomorInduk = nomorInduk;
        this.namaDepan = namaDepan;
        this.namaBelakang = namaBelakang;
        this.tanggalLahir = tanggalLahir;
    }
    
    // Computed Methods
    public String getNamaLengkap() {
        if (namaBelakang == null || namaBelakang.trim().isEmpty()) {
            return namaDepan;
        }
        return namaDepan + " " + namaBelakang;
    }
    
    public Integer getUsia() {
        if (tanggalLahir == null) {
            return null;
        }
        return Period.between(tanggalLahir, LocalDate.now()).getYears();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
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
    
    public LocalDate getTanggalLahir() {
        return tanggalLahir;
    }
    
    public void setTanggalLahir(LocalDate tanggalLahir) {
        this.tanggalLahir = tanggalLahir;
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

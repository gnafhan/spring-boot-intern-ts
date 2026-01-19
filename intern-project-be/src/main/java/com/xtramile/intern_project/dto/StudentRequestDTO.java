package com.xtramile.intern_project.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Schema(description = "Student request data for creating or updating a student")
public class StudentRequestDTO {
    
    @Schema(description = "Student's first name", example = "Budi", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Nama depan tidak boleh kosong")
    @Size(min = 2, max = 100, message = "Nama depan harus antara 2-100 karakter")
    @Pattern(regexp = "^[a-zA-Z\\s\\-]+$", message = "Nama depan hanya boleh mengandung huruf, spasi, dan tanda hubung")
    private String namaDepan;
    
    @Schema(description = "Student's last name (optional)", example = "Santoso", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @Size(max = 100, message = "Nama belakang maksimal 100 karakter")
    @Pattern(regexp = "^[a-zA-Z\\s\\-]*$", message = "Nama belakang hanya boleh mengandung huruf, spasi, dan tanda hubung")
    private String namaBelakang;
    
    @Schema(description = "Student's date of birth (must be 17-40 years old)", example = "2004-03-15", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "Tanggal lahir tidak boleh kosong")
    @Past(message = "Tanggal lahir harus di masa lalu")
    private LocalDate tanggalLahir;
    
    // Constructors
    public StudentRequestDTO() {
    }
    
    public StudentRequestDTO(String namaDepan, String namaBelakang, LocalDate tanggalLahir) {
        this.namaDepan = namaDepan;
        this.namaBelakang = namaBelakang;
        this.tanggalLahir = tanggalLahir;
    }
    
    // Getters and Setters
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
}

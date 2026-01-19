package com.xtramile.intern_project.service;

import com.xtramile.intern_project.dto.StudentDetailDTO;
import com.xtramile.intern_project.dto.StudentRequestDTO;
import com.xtramile.intern_project.dto.StudentResponseDTO;
import com.xtramile.intern_project.exception.DuplicateStudentException;
import com.xtramile.intern_project.exception.InvalidStudentDataException;
import com.xtramile.intern_project.exception.StudentNotFoundException;
import com.xtramile.intern_project.model.Student;
import com.xtramile.intern_project.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.time.Year;

@Service
@Transactional
public class StudentService {
    
    private final StudentRepository studentRepository;
    
    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }
    
    /**
     * Create new student with validation and auto-generated nomor induk
     */
    public StudentDetailDTO create(StudentRequestDTO request) {
        // Validate age
        validateAge(request.getTanggalLahir());
        
        // Generate nomor induk
        String nomorInduk = generateNomorInduk();
        
        // Create student entity
        Student student = new Student();
        student.setNomorInduk(nomorInduk);
        student.setNamaDepan(request.getNamaDepan());
        student.setNamaBelakang(request.getNamaBelakang());
        student.setTanggalLahir(request.getTanggalLahir());
        
        // Save to database
        Student savedStudent = studentRepository.save(student);
        
        return StudentDetailDTO.fromEntity(savedStudent);
    }
    
    /**
     * Update existing student
     */
    public StudentDetailDTO update(String nomorInduk, StudentRequestDTO request) {
        // Find existing student
        Student student = studentRepository.findByNomorInduk(nomorInduk)
            .orElseThrow(() -> new StudentNotFoundException(nomorInduk));
        
        // Validate age
        validateAge(request.getTanggalLahir());
        
        // Update fields
        student.setNamaDepan(request.getNamaDepan());
        student.setNamaBelakang(request.getNamaBelakang());
        student.setTanggalLahir(request.getTanggalLahir());
        
        // Save changes
        Student updatedStudent = studentRepository.save(student);
        
        return StudentDetailDTO.fromEntity(updatedStudent);
    }
    
    /**
     * Delete student by nomor induk
     */
    public void delete(String nomorInduk) {
        Student student = studentRepository.findByNomorInduk(nomorInduk)
            .orElseThrow(() -> new StudentNotFoundException(nomorInduk));
        
        studentRepository.delete(student);
    }
    
    /**
     * Find student by nomor induk
     */
    @Transactional(readOnly = true)
    public StudentDetailDTO findByNomorInduk(String nomorInduk) {
        Student student = studentRepository.findByNomorInduk(nomorInduk)
            .orElseThrow(() -> new StudentNotFoundException(nomorInduk));
        
        return StudentDetailDTO.fromEntity(student);
    }
    
    /**
     * Get all students with pagination (for list view)
     */
    @Transactional(readOnly = true)
    public Page<StudentResponseDTO> findAll(Pageable pageable) {
        Page<Student> students = studentRepository.findAll(pageable);
        return students.map(StudentResponseDTO::fromEntity);
    }
    
    /**
     * Search students by name with pagination
     */
    @Transactional(readOnly = true)
    public Page<StudentResponseDTO> search(String keyword, Pageable pageable) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return findAll(pageable);
        }
        
        Page<Student> students = studentRepository.searchByName(keyword.trim(), pageable);
        return students.map(StudentResponseDTO::fromEntity);
    }
    
    /**
     * Generate nomor induk with format: YYYY{sequence}
     * Example: 2026001, 2026002, etc.
     */
    private String generateNomorInduk() {
        int currentYear = Year.now().getValue();
        String yearPrefix = String.valueOf(currentYear);
        
        // Count existing students for this year
        Long count = studentRepository.countByNomorIndukStartingWith(yearPrefix);
        
        // Generate sequence number (3 digits)
        long sequence = (count != null ? count : 0) + 1;
        String sequenceStr = String.format("%03d", sequence);
        
        String nomorInduk = yearPrefix + sequenceStr;
        
        // Double check for uniqueness (in case of race condition)
        if (studentRepository.existsByNomorInduk(nomorInduk)) {
            throw new DuplicateStudentException(nomorInduk);
        }
        
        return nomorInduk;
    }
    
    /**
     * Validate student age (must be between 17-40 years)
     */
    private void validateAge(LocalDate tanggalLahir) {
        if (tanggalLahir == null) {
            throw new InvalidStudentDataException("Tanggal lahir tidak boleh kosong");
        }
        
        if (tanggalLahir.isAfter(LocalDate.now())) {
            throw new InvalidStudentDataException("Tanggal lahir tidak boleh di masa depan");
        }
        
        int age = Period.between(tanggalLahir, LocalDate.now()).getYears();
        
        if (age < 17) {
            throw new InvalidStudentDataException(
                "Usia mahasiswa minimal 17 tahun (usia saat ini: " + age + " tahun)");
        }
        
        if (age > 40) {
            throw new InvalidStudentDataException(
                "Usia mahasiswa maksimal 40 tahun (usia saat ini: " + age + " tahun)");
        }
    }
}

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
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
     * Reuses deleted nomor induk if available (finds gaps in sequence)
     */
    private String generateNomorInduk() {
        int currentYear = Year.now().getValue();
        String yearPrefix = String.valueOf(currentYear);
        
        // Get all existing nomor induk for this year
        List<String> existingNomorInduk = studentRepository.findAllNomorIndukByPrefix(yearPrefix);
        
        // Extract sequence numbers (last 3 digits)
        Set<Integer> usedSequences = existingNomorInduk.stream()
            .map(ni -> {
                if (ni.startsWith(yearPrefix) && ni.length() == yearPrefix.length() + 3) {
                    try {
                        return Integer.parseInt(ni.substring(yearPrefix.length()));
                    } catch (NumberFormatException e) {
                        return null;
                    }
                }
                return null;
            })
            .filter(seq -> seq != null && seq >= 1 && seq <= 999)
            .collect(Collectors.toSet());
        
        // Find first available sequence (1-999)
        int nextSequence = -1;
        for (int seq = 1; seq <= 999; seq++) {
            if (!usedSequences.contains(seq)) {
                nextSequence = seq;
                break;
            }
        }
        
        // If no gap found, use next sequence after max
        if (nextSequence == -1) {
            if (usedSequences.isEmpty()) {
                nextSequence = 1;
            } else {
                int maxSequence = usedSequences.stream().mapToInt(Integer::intValue).max().orElse(0);
                nextSequence = maxSequence + 1;
                if (nextSequence > 999) {
                    throw new InvalidStudentDataException(
                        "Maximum number of students for year " + currentYear + " has been reached (999)");
                }
            }
        }
        
        String sequenceStr = String.format("%03d", nextSequence);
        String nomorInduk = yearPrefix + sequenceStr;
        
        // Double check for uniqueness (in case of race condition)
        if (studentRepository.existsByNomorInduk(nomorInduk)) {
            // Retry with next sequence
            nextSequence++;
            if (nextSequence > 999) {
                throw new InvalidStudentDataException(
                    "Maximum number of students for year " + currentYear + " has been reached (999)");
            }
            sequenceStr = String.format("%03d", nextSequence);
            nomorInduk = yearPrefix + sequenceStr;
            
            if (studentRepository.existsByNomorInduk(nomorInduk)) {
                throw new DuplicateStudentException(nomorInduk);
            }
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

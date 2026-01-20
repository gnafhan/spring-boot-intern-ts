package com.xtramile.intern_project.repository;

import com.xtramile.intern_project.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    /**
     * Find student by nomor induk (unique identifier)
     */
    Optional<Student> findByNomorInduk(String nomorInduk);
    
    /**
     * Check if student with nomor induk exists
     */
    boolean existsByNomorInduk(String nomorInduk);
    
    /**
     * Search students by name (first name or last name)
     */
    @Query("SELECT s FROM Student s WHERE " +
           "LOWER(s.namaDepan) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.namaBelakang) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Student> searchByName(@Param("keyword") String keyword, Pageable pageable);
    
    /**
     * Count students with nomor induk starting with given prefix
     * Used for sequence generation
     */
    Long countByNomorIndukStartingWith(String prefix);
    
    /**
     * Get all nomor induk starting with given prefix, ordered by nomor induk
     * Used to find gaps in sequence for reuse
     */
    @Query("SELECT s.nomorInduk FROM Student s WHERE s.nomorInduk LIKE :prefix% ORDER BY s.nomorInduk")
    List<String> findAllNomorIndukByPrefix(@Param("prefix") String prefix);
    
    /**
     * Find all students with pagination
     */
    Page<Student> findAll(Pageable pageable);
}

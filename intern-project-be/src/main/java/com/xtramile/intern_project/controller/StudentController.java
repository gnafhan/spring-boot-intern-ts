package com.xtramile.intern_project.controller;

import com.xtramile.intern_project.dto.ApiResponse;
import com.xtramile.intern_project.dto.ErrorResponseDTO;
import com.xtramile.intern_project.dto.PagedResponse;
import com.xtramile.intern_project.dto.StudentDetailDTO;
import com.xtramile.intern_project.dto.StudentRequestDTO;
import com.xtramile.intern_project.dto.StudentResponseDTO;
import com.xtramile.intern_project.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@Tag(name = "Student Management", description = "APIs for managing college students")
public class StudentController {
    
    private final StudentService studentService;
    
    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }
    
    /**
     * Create new student
     * POST /api/students
     */
    @Operation(
        summary = "Create a new student",
        description = "Creates a new student with auto-generated Nomor Induk Mahasiswa (Student ID). " +
                     "The ID format is YYYY### (e.g., 2026001). Age must be between 17-40 years."
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "201",
            description = "Student created successfully"
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "400",
            description = "Invalid input data (validation failed)",
            content = @Content(schema = @Schema(implementation = ErrorResponseDTO.class))
        )
    })
    @PostMapping
    public ResponseEntity<ApiResponse<StudentDetailDTO>> createStudent(
            @Valid @RequestBody 
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Student data to create",
                required = true
            )
            StudentRequestDTO request) {
        StudentDetailDTO student = studentService.create(request);
        ApiResponse<StudentDetailDTO> response = ApiResponse.created(
            "Student created successfully", 
            student
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    /**
     * Get all students with pagination and sorting
     * GET /api/students?page=0&size=10&sort=namaDepan,asc
     */
    @Operation(
        summary = "Get all students",
        description = "Retrieves a paginated list of students. Shows Nomor Induk, Nama Lengkap, and Usia (age)."
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Successfully retrieved student list"
        )
    })
    @GetMapping
    public ResponseEntity<PagedResponse<StudentResponseDTO>> getAllStudents(
            @Parameter(description = "Page number (0-based)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            
            @Parameter(description = "Number of items per page", example = "10")
            @RequestParam(defaultValue = "10") int size,
            
            @Parameter(description = "Sort criteria in format: field,direction (e.g., namaDepan,asc)", example = "namaDepan,asc")
            @RequestParam(defaultValue = "nomorInduk,asc") String[] sort) {
        
        Pageable pageable = createPageable(page, size, sort);
        Page<StudentResponseDTO> studentsPage = studentService.findAll(pageable);
        
        PagedResponse<StudentResponseDTO> response = PagedResponse.success(
            "Students retrieved successfully",
            studentsPage.getContent(),
            studentsPage.getNumber(),
            studentsPage.getSize(),
            studentsPage.getTotalElements(),
            studentsPage.getTotalPages(),
            studentsPage.hasNext(),
            studentsPage.hasPrevious()
        );
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Get student by nomor induk
     * GET /api/students/{nomorInduk}
     */
    @Operation(
        summary = "Get student by Nomor Induk",
        description = "Retrieves detailed information of a single student by their Nomor Induk Mahasiswa."
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Student found"
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "404",
            description = "Student not found",
            content = @Content(schema = @Schema(implementation = ErrorResponseDTO.class))
        )
    })
    @GetMapping("/{nomorInduk}")
    public ResponseEntity<ApiResponse<StudentDetailDTO>> getStudentByNomorInduk(
            @Parameter(description = "Student's Nomor Induk Mahasiswa", example = "2026001", required = true)
            @PathVariable String nomorInduk) {
        StudentDetailDTO student = studentService.findByNomorInduk(nomorInduk);
        ApiResponse<StudentDetailDTO> response = ApiResponse.success(
            "Student found", 
            student
        );
        return ResponseEntity.ok(response);
    }
    
    /**
     * Update student
     * PUT /api/students/{nomorInduk}
     */
    @Operation(
        summary = "Update student",
        description = "Updates an existing student's information. Nomor Induk cannot be changed."
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Student updated successfully"
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "404",
            description = "Student not found",
            content = @Content(schema = @Schema(implementation = ErrorResponseDTO.class))
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "400",
            description = "Invalid input data",
            content = @Content(schema = @Schema(implementation = ErrorResponseDTO.class))
        )
    })
    @PutMapping("/{nomorInduk}")
    public ResponseEntity<ApiResponse<StudentDetailDTO>> updateStudent(
            @Parameter(description = "Student's Nomor Induk Mahasiswa", example = "2026001", required = true)
            @PathVariable String nomorInduk,
            
            @Valid @RequestBody
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Updated student data",
                required = true
            )
            StudentRequestDTO request) {
        StudentDetailDTO student = studentService.update(nomorInduk, request);
        ApiResponse<StudentDetailDTO> response = ApiResponse.success(
            "Student updated successfully", 
            student
        );
        return ResponseEntity.ok(response);
    }
    
    /**
     * Delete student
     * DELETE /api/students/{nomorInduk}
     */
    @Operation(
        summary = "Delete student",
        description = "Permanently deletes a student record from the system."
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Student deleted successfully"
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "404",
            description = "Student not found",
            content = @Content(schema = @Schema(implementation = ErrorResponseDTO.class))
        )
    })
    @DeleteMapping("/{nomorInduk}")
    public ResponseEntity<ApiResponse<Void>> deleteStudent(
            @Parameter(description = "Student's Nomor Induk Mahasiswa", example = "2026001", required = true)
            @PathVariable String nomorInduk) {
        studentService.delete(nomorInduk);
        ApiResponse<Void> response = ApiResponse.success(
            "Student deleted successfully", 
            null
        );
        return ResponseEntity.ok(response);
    }
    
    /**
     * Search students by name
     * GET /api/students/search?keyword=john&page=0&size=10
     */
    @Operation(
        summary = "Search students by name",
        description = "Searches for students by first name or last name (case-insensitive partial match)."
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Search completed successfully"
        )
    })
    @GetMapping("/search")
    public ResponseEntity<PagedResponse<StudentResponseDTO>> searchStudents(
            @Parameter(description = "Search keyword (searches in first and last name)", example = "Budi", required = true)
            @RequestParam String keyword,
            
            @Parameter(description = "Page number (0-based)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            
            @Parameter(description = "Number of items per page", example = "10")
            @RequestParam(defaultValue = "10") int size,
            
            @Parameter(description = "Sort criteria", example = "namaDepan,asc")
            @RequestParam(defaultValue = "namaDepan,asc") String[] sort) {
        
        Pageable pageable = createPageable(page, size, sort);
        Page<StudentResponseDTO> studentsPage = studentService.search(keyword, pageable);
        
        PagedResponse<StudentResponseDTO> response = PagedResponse.success(
            "Search completed successfully",
            studentsPage.getContent(),
            studentsPage.getNumber(),
            studentsPage.getSize(),
            studentsPage.getTotalElements(),
            studentsPage.getTotalPages(),
            studentsPage.hasNext(),
            studentsPage.hasPrevious()
        );
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Helper method to create Pageable with sorting
     */
    private Pageable createPageable(int page, int size, String[] sort) {
        // Parse sort parameter: "field,direction"
        String sortField = sort[0];
        String sortDirection = sort.length > 1 ? sort[1] : "asc";
        
        Sort.Direction direction = sortDirection.equalsIgnoreCase("desc") 
            ? Sort.Direction.DESC 
            : Sort.Direction.ASC;
        
        return PageRequest.of(page, size, Sort.by(direction, sortField));
    }
    
}

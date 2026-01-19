# Student Management API Documentation

REST API for managing college students with CRUD operations, built using Spring Boot with N-tier architecture.

## Features

- ✅ Create, Read, Update, Delete students
- ✅ Auto-generated unique student ID (Nomor Induk Mahasiswa)
- ✅ Pagination and sorting for student list
- ✅ Search students by name
- ✅ Comprehensive validation (age limits, name format, date validation)
- ✅ Global exception handling with standardized error responses
- ✅ DTOs for clean API contracts
- ✅ N-tier architecture (Controller → Service → Repository)

## Architecture

### N-Tier Architecture

```
┌─────────────────┐
│   Controller    │  → REST endpoints, request/response handling
└────────┬────────┘
         │
┌────────▼────────┐
│     Service     │  → Business logic, validation, nomor induk generation
└────────┬────────┘
         │
┌────────▼────────┐
│   Repository    │  → Database operations (JPA)
└────────┬────────┘
         │
┌────────▼────────┐
│    Database     │  → PostgreSQL
└─────────────────┘
```

### Layer Responsibilities

**Controller Layer** (`StudentController.java`)
- Handle HTTP requests/responses
- Validate request data using Bean Validation
- Map between DTOs and service calls
- Return appropriate HTTP status codes

**Service Layer** (`StudentService.java`)
- Implement business logic
- Generate Nomor Induk Mahasiswa
- Validate age requirements (17-40 years)
- Validate name format (no special characters)
- Orchestrate repository operations

**Repository Layer** (`StudentRepository.java`)
- Data access using Spring Data JPA
- Custom queries for search functionality
- Transaction management

## Data Model

### Student Entity

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | Long | Auto | Database primary key |
| `nomorInduk` | String | Yes | Unique student ID (format: YYYY###) |
| `namaDepan` | String | Yes | First name (2-100 chars) |
| `namaBelakang` | String | No | Last name (max 100 chars) |
| `tanggalLahir` | Date | Yes | Date of birth |
| `createdAt` | DateTime | Auto | Record creation timestamp |
| `updatedAt` | DateTime | Auto | Last update timestamp |

### Computed Fields

- **namaLengkap**: Full name (namaDepan + namaBelakang)
- **usia**: Age calculated from tanggalLahir

## API Endpoints

### Base URL
```
http://localhost:8080/api/students
```

### 1. Create Student

**POST** `/api/students`

Create a new student with auto-generated nomor induk.

**Request Body:**
```json
{
  "namaDepan": "Budi",
  "namaBelakang": "Santoso",
  "tanggalLahir": "2004-03-15"
}
```

**Response (201 Created):**
```json
{
  "nomorInduk": "2026001",
  "namaDepan": "Budi",
  "namaBelakang": "Santoso",
  "namaLengkap": "Budi Santoso",
  "tanggalLahir": "2004-03-15",
  "usia": 21,
  "createdAt": "2026-01-19T10:30:00",
  "updatedAt": "2026-01-19T10:30:00"
}
```

### 2. Get All Students (Paginated)

**GET** `/api/students?page=0&size=10&sort=namaDepan,asc`

Retrieve paginated list of students.

**Query Parameters:**
- `page` (default: 0) - Page number
- `size` (default: 10) - Page size
- `sort` (default: nomorInduk,asc) - Sort field and direction

**Response (200 OK):**
```json
{
  "content": [
    {
      "nomorInduk": "2026001",
      "namaLengkap": "Budi Santoso",
      "usia": 21
    },
    {
      "nomorInduk": "2026002",
      "namaLengkap": "Siti Nurhaliza",
      "usia": 20
    }
  ],
  "currentPage": 0,
  "totalItems": 8,
  "totalPages": 1,
  "pageSize": 10,
  "hasNext": false,
  "hasPrevious": false
}
```

### 3. Get Student by Nomor Induk

**GET** `/api/students/{nomorInduk}`

Retrieve single student details.

**Response (200 OK):**
```json
{
  "nomorInduk": "2026001",
  "namaDepan": "Budi",
  "namaBelakang": "Santoso",
  "namaLengkap": "Budi Santoso",
  "tanggalLahir": "2004-03-15",
  "usia": 21,
  "createdAt": "2026-01-19T10:30:00",
  "updatedAt": "2026-01-19T10:30:00"
}
```

### 4. Update Student

**PUT** `/api/students/{nomorInduk}`

Update existing student information.

**Request Body:**
```json
{
  "namaDepan": "Budi Updated",
  "namaBelakang": "Santoso Updated",
  "tanggalLahir": "2004-03-15"
}
```

**Response (200 OK):** Same as Get Student response

### 5. Delete Student

**DELETE** `/api/students/{nomorInduk}`

Delete a student record.

**Response:** `204 No Content`

### 6. Search Students

**GET** `/api/students/search?keyword=budi&page=0&size=10`

Search students by name (first name or last name).

**Query Parameters:**
- `keyword` (required) - Search term
- `page`, `size`, `sort` - Same as Get All

**Response:** Same format as Get All Students

## Business Rules & Validations

### Nomor Induk Generation

- Format: `YYYY###` (e.g., 2026001, 2026002)
- `YYYY` = Current year
- `###` = 3-digit sequence starting from 001
- Auto-generated and unique
- Cannot be modified after creation

### Age Validation

- Minimum age: 17 years
- Maximum age: 40 years
- Calculated from tanggalLahir to current date
- Validation applies to both create and update

### Name Validation

- **namaDepan** (First Name):
  - Required, cannot be blank
  - Length: 2-100 characters
  - Allowed: letters, spaces, hyphens only
  - Pattern: `^[a-zA-Z\s\-]+$`

- **namaBelakang** (Last Name):
  - Optional
  - Length: max 100 characters
  - Allowed: letters, spaces, hyphens only
  - Pattern: `^[a-zA-Z\s\-]*$`

### Date Validation

- **tanggalLahir** must be:
  - Required, cannot be null
  - A past date (not future)
  - Result in age between 17-40 years

## Error Responses

All errors follow a standardized format:

### 400 Bad Request - Validation Error

```json
{
  "timestamp": "2026-01-19T10:30:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "Data tidak valid",
  "path": "/api/students",
  "errors": [
    "namaDepan: Nama depan tidak boleh kosong",
    "tanggalLahir: Tanggal lahir harus di masa lalu"
  ]
}
```

### 404 Not Found

```json
{
  "timestamp": "2026-01-19T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Mahasiswa dengan nomor induk '2026999' tidak ditemukan",
  "path": "/api/students/2026999"
}
```

### 409 Conflict - Duplicate

```json
{
  "timestamp": "2026-01-19T10:30:00",
  "status": 409,
  "error": "Conflict",
  "message": "Mahasiswa dengan nomor induk '2026001' sudah terdaftar",
  "path": "/api/students"
}
```

### Common Error Status Codes

- `400 Bad Request` - Invalid input data
- `404 Not Found` - Student not found
- `409 Conflict` - Duplicate nomor induk
- `500 Internal Server Error` - Server error

## Testing

### Using api-test.http

The project includes comprehensive test cases in `api-test.http`. Install the "REST Client" extension in VS Code to run tests.

**Test Categories:**
1. Create Student (valid & invalid cases)
2. Get All Students (pagination & sorting)
3. Get Student by ID
4. Update Student
5. Search Students
6. Delete Student
7. Complete CRUD flow
8. Batch operations
9. Edge cases & error scenarios

### Quick Test Flow

1. **Start the application:**
   ```bash
   docker-compose up -d --build
   ```

2. **Open** `api-test.http` in VS Code

3. **Click "Send Request"** above any test case

4. **View response** in the side panel

### Sample Data

The database is pre-populated with 8 sample students (nomorInduk: 2026001-2026008) for testing purposes.

## Running the Application

### Prerequisites

- Docker and Docker Compose installed
- JDK 21 (for local development without Docker)

### Using Docker (Recommended)

```bash
# Start all services (app + database)
docker-compose up -d --build

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Access Points

- **API Base URL**: http://localhost:8080/api
- **Students Endpoint**: http://localhost:8080/api/students
- **Database**: localhost:5432 (interndb/internuser/internpass)

## Project Structure

```
src/main/java/com/xtramile/intern_project/
├── controller/
│   └── StudentController.java        # REST endpoints
├── dto/
│   ├── StudentRequestDTO.java        # Create/Update request
│   ├── StudentResponseDTO.java       # List view response
│   ├── StudentDetailDTO.java         # Detail view response
│   └── ErrorResponseDTO.java         # Error response format
├── exception/
│   ├── StudentNotFoundException.java
│   ├── InvalidStudentDataException.java
│   ├── DuplicateStudentException.java
│   └── GlobalExceptionHandler.java   # Centralized error handling
├── model/
│   └── Student.java                  # JPA Entity
├── repository/
│   └── StudentRepository.java        # Data access layer
└── service/
    └── StudentService.java           # Business logic layer
```

## Technologies Used

- **Spring Boot 4.0.1** - Framework
- **Java 21** - Programming language
- **Spring Data JPA** - Data persistence
- **PostgreSQL 16** - Database
- **Bean Validation** - Input validation
- **Docker & Docker Compose** - Containerization
- **Maven** - Build tool

## Development Features

- ✅ Hot reload with Spring DevTools
- ✅ SQL query logging (enabled in dev mode)
- ✅ Automatic database schema creation
- ✅ Sample data initialization
- ✅ Comprehensive validation
- ✅ Global exception handling
- ✅ Transaction management
- ✅ Pagination support

## Points Achieved

Based on the assignment requirements:

✅ **Basic Requirements (All Completed)**
- Create, Update, Delete, Display list of students
- Required fields: ID (nomor induk), namaDepan, namaBelakang (optional), tanggalLahir
- Display list shows: Nomor Induk, Nama Lengkap, Usia

✅ **Additional Features**
- **+10 Points**: N-tier architecture implemented
  - Clear separation: Controller → Service → Repository → Database
  - Each layer has specific responsibilities
  - Clean dependency flow

- **Ready for +30 Points**: Web API architecture
  - RESTful API with proper HTTP methods
  - JSON request/response format
  - Fully documented and testable
  - Ready for SPA frontend integration (React, Vue, Angular)

## API Design Principles

- **RESTful conventions** followed
- **HTTP methods** used correctly (GET, POST, PUT, DELETE)
- **Status codes** appropriate (200, 201, 204, 400, 404, 409, 500)
- **DTOs** separate concerns (request vs response vs detail)
- **Pagination** for scalability
- **Search** functionality for usability
- **Validation** at multiple layers
- **Error handling** consistent and informative

## Next Steps (Frontend Integration)

To achieve the +30 points for SPA frontend:

1. **Create separate frontend project** using:
   - React, Vue.js, or Angular
   - Fetch API / Axios for HTTP calls
   - State management (Redux, Vuex, etc.)

2. **API is ready** - just call the endpoints:
   ```javascript
   // Example: Fetch all students
   fetch('http://localhost:8080/api/students')
     .then(res => res.json())
     .then(data => console.log(data));
   ```

3. **CORS Configuration** - Already handled in backend

## Support & Documentation

- **API Tests**: See `api-test.http`
- **Quick Start**: See `QUICKSTART.md`
- **Docker Setup**: See `README-DOCKER.md`
- **IDE Setup**: See `SETUP-IDE.md`

---

**Happy Coding!** 🚀

For questions or issues, refer to the comprehensive test cases in `api-test.http` which cover all scenarios including edge cases and error conditions.

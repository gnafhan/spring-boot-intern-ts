# 📚 Swagger/OpenAPI Documentation Guide

Dokumentasi API interaktif menggunakan Swagger UI untuk Student Management API.

## 🎯 Quick Access

### Swagger UI (Interactive Documentation)
```
http://localhost:8080/swagger-ui/index.html
```
atau
```
http://localhost:8080/swagger-ui.html
```

### OpenAPI JSON Specification
```
http://localhost:8080/api-docs
```

### OpenAPI YAML Specification
```
http://localhost:8080/api-docs.yaml
```

## ✨ Features

### 1. Interactive API Testing
- ✅ **Try It Out** - Test endpoints langsung dari browser
- ✅ **Request/Response Examples** - Lihat contoh data
- ✅ **Parameter Documentation** - Deskripsi lengkap setiap parameter
- ✅ **Response Codes** - Semua kemungkinan HTTP status codes
- ✅ **Schema Documentation** - Model data lengkap

### 2. API Information
- **Title**: Student Management API
- **Version**: 1.0.0
- **Description**: REST API for managing college students
- **License**: MIT License
- **Contact**: support@xtramile.com

### 3. Available Servers
- **Development**: http://localhost:8080
- **Production**: https://api.production.com

## 📖 How to Use Swagger UI

### Step 1: Open Swagger UI
1. Buka browser
2. Navigate ke: `http://localhost:8080/swagger-ui/index.html`
3. Anda akan melihat interactive API documentation

### Step 2: Explore Endpoints
Swagger UI menampilkan semua endpoints yang dikelompokkan berdasarkan tag:

**Student Management** (6 endpoints):
- `POST /api/students` - Create new student
- `GET /api/students` - Get all students (paginated)
- `GET /api/students/{nomorInduk}` - Get student by ID
- `PUT /api/students/{nomorInduk}` - Update student
- `DELETE /api/students/{nomorInduk}` - Delete student
- `GET /api/students/search` - Search students by name

### Step 3: Test an Endpoint

#### Example: Create Student

1. **Expand** endpoint `POST /api/students`
2. **Click** "Try it out" button
3. **Edit** request body:
   ```json
   {
     "namaDepan": "Test",
     "namaBelakang": "User",
     "tanggalLahir": "2004-05-15"
   }
   ```
4. **Click** "Execute"
5. **View** response:
   - Response body
   - HTTP status code
   - Response headers

#### Example: Get All Students with Pagination

1. **Expand** endpoint `GET /api/students`
2. **Click** "Try it out"
3. **Set parameters**:
   - page: `0`
   - size: `10`
   - sort: `namaDepan,asc`
4. **Click** "Execute"
5. **View** paginated results

#### Example: Search Students

1. **Expand** endpoint `GET /api/students/search`
2. **Click** "Try it out"
3. **Enter** keyword: `Budi`
4. **Click** "Execute"
5. **View** search results

## 📋 Endpoint Documentation Details

### POST /api/students
**Summary**: Create a new student

**Description**: Creates a new student with auto-generated Nomor Induk Mahasiswa (Student ID). The ID format is YYYY### (e.g., 2026001). Age must be between 17-40 years.

**Request Body**:
```json
{
  "namaDepan": "string (required, 2-100 chars)",
  "namaBelakang": "string (optional, max 100 chars)",
  "tanggalLahir": "date (required, format: yyyy-MM-dd)"
}
```

**Responses**:
- `201 Created` - Student created successfully
- `400 Bad Request` - Validation failed

**Validation Rules**:
- namaDepan: Required, 2-100 characters, only letters/spaces/hyphens
- namaBelakang: Optional, max 100 characters, only letters/spaces/hyphens
- tanggalLahir: Required, past date, results in age 17-40 years

### GET /api/students
**Summary**: Get all students

**Description**: Retrieves a paginated list of students. Shows Nomor Induk, Nama Lengkap, and Usia (age).

**Parameters**:
- `page` (query, optional): Page number (0-based), default: 0
- `size` (query, optional): Items per page, default: 10
- `sort` (query, optional): Sort criteria (field,direction), default: nomorInduk,asc

**Response**:
```json
{
  "content": [
    {
      "nomorInduk": "2026001",
      "namaLengkap": "Budi Santoso",
      "usia": 21
    }
  ],
  "currentPage": 0,
  "totalItems": 1,
  "totalPages": 1,
  "pageSize": 10,
  "hasNext": false,
  "hasPrevious": false
}
```

### GET /api/students/{nomorInduk}
**Summary**: Get student by Nomor Induk

**Description**: Retrieves detailed information of a single student.

**Parameters**:
- `nomorInduk` (path, required): Student's Nomor Induk Mahasiswa (e.g., 2026001)

**Responses**:
- `200 OK` - Student found
- `404 Not Found` - Student not found

### PUT /api/students/{nomorInduk}
**Summary**: Update student

**Description**: Updates an existing student's information. Nomor Induk cannot be changed.

**Parameters**:
- `nomorInduk` (path, required): Student's Nomor Induk Mahasiswa

**Request Body**: Same as POST (StudentRequestDTO)

**Responses**:
- `200 OK` - Student updated successfully
- `404 Not Found` - Student not found
- `400 Bad Request` - Validation failed

### DELETE /api/students/{nomorInduk}
**Summary**: Delete student

**Description**: Permanently deletes a student record.

**Parameters**:
- `nomorInduk` (path, required): Student's Nomor Induk Mahasiswa

**Responses**:
- `204 No Content` - Student deleted successfully
- `404 Not Found` - Student not found

### GET /api/students/search
**Summary**: Search students by name

**Description**: Searches for students by first name or last name (case-insensitive partial match).

**Parameters**:
- `keyword` (query, required): Search term (e.g., "Budi")
- `page`, `size`, `sort`: Same as GET /api/students

**Response**: Same format as GET /api/students

## 🎨 Schemas (Data Models)

### StudentRequestDTO
```json
{
  "namaDepan": "string",
  "namaBelakang": "string",
  "tanggalLahir": "date (yyyy-MM-dd)"
}
```

### StudentResponseDTO (List View)
```json
{
  "nomorInduk": "string",
  "namaLengkap": "string",
  "usia": "integer"
}
```

### StudentDetailDTO (Detail View)
```json
{
  "nomorInduk": "string",
  "namaDepan": "string",
  "namaBelakang": "string",
  "namaLengkap": "string",
  "tanggalLahir": "date",
  "usia": "integer",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### ErrorResponseDTO
```json
{
  "timestamp": "datetime",
  "status": "integer",
  "error": "string",
  "message": "string",
  "path": "string",
  "errors": ["string"]
}
```

## 🔧 Configuration

Swagger configuration ada di:
- **Config Class**: `src/main/java/com/xtramile/intern_project/config/OpenApiConfig.java`
- **Properties**: `src/main/resources/application-dev.properties`

### Properties Configuration
```properties
# OpenAPI / Swagger Configuration
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.operationsSorter=method
springdoc.swagger-ui.tagsSorter=alpha
springdoc.swagger-ui.tryItOutEnabled=true
springdoc.show-actuator=false
```

## 🎯 Tips & Best Practices

### 1. Testing Flow
Gunakan Swagger UI untuk:
- ✅ Test API sebelum integrasi frontend
- ✅ Verify request/response format
- ✅ Check validation rules
- ✅ Test error scenarios
- ✅ Share dokumentasi dengan team

### 2. Export OpenAPI Spec
```bash
# JSON format
curl http://localhost:8080/api-docs > student-api-spec.json

# YAML format
curl http://localhost:8080/api-docs.yaml > student-api-spec.yaml
```

### 3. Generate Client Code
Gunakan OpenAPI spec untuk generate client libraries:
- **JavaScript/TypeScript**: openapi-generator, swagger-codegen
- **Java**: openapi-generator
- **Python**: openapi-generator
- **Other languages**: Swagger Codegen supports 40+ languages

### 4. Import to Postman
1. Copy OpenAPI JSON URL: `http://localhost:8080/api-docs`
2. Postman → Import → Link
3. Paste URL
4. Import as Postman Collection

### 5. Share Documentation
Swagger UI adalah dokumentasi yang live dan selalu up-to-date:
- No need untuk manual documentation
- Frontend team bisa langsung lihat endpoints
- QA team bisa test langsung
- Backend team bisa verify implementation

## 🚀 Advanced Features

### Customize Swagger UI
Edit `OpenApiConfig.java` untuk customize:
- API title, description, version
- Contact information
- License information
- Server URLs
- Tags and grouping

### Add Security Schema
Tambahkan authentication schema (untuk future):
```java
@Bean
public OpenAPI customOpenAPI() {
    return new OpenAPI()
        .components(new Components()
            .addSecuritySchemes("bearer-jwt",
                new SecurityScheme()
                    .type(SecurityScheme.Type.HTTP)
                    .scheme("bearer")
                    .bearerFormat("JWT")));
}
```

### Group Endpoints
Gunakan `@Tag` di controller untuk grouping:
```java
@Tag(name = "Student Management", description = "Student CRUD operations")
@Tag(name = "Authentication", description = "Login and register")
```

## 📚 Resources

- **SpringDoc OpenAPI**: https://springdoc.org/
- **OpenAPI Specification**: https://swagger.io/specification/
- **Swagger UI**: https://swagger.io/tools/swagger-ui/
- **OpenAPI Generator**: https://openapi-generator.tech/

## 🆘 Troubleshooting

### Swagger UI tidak muncul?
```bash
# Check if API docs endpoint works
curl http://localhost:8080/api-docs

# Check application logs
docker-compose logs app | grep -i swagger
```

### Endpoints tidak muncul di Swagger?
- Pastikan controller memiliki `@RestController`
- Pastikan endpoint memiliki mapping annotations (`@GetMapping`, dll)
- Restart application

### Validation constraints tidak muncul?
- Pastikan menggunakan Bean Validation annotations (`@NotNull`, dll)
- Pastikan dependency validation sudah ada di pom.xml

---

**Happy Documenting! 📚**

Swagger UI membuat API documentation menjadi interactive, always up-to-date, dan mudah di-share dengan team!

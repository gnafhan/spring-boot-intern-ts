# Student Management System

A full-stack student management application with Spring Boot REST API backend and React TypeScript frontend.

**Live Demo:** https://student-management.nafhan.com

## Features

- ✅ CRUD operations for student data
- ✅ Auto-generated Student ID (format: YYYY###)
- ✅ Pagination, sorting, and search
- ✅ Form validation (client & server side)
- ✅ Age validation (17-40 years)
- ✅ Responsive design with dark mode
- ✅ Docker containerized deployment
- ✅ Traefik reverse proxy with SSL

## Tech Stack

| Backend | Frontend |
|---------|----------|
| Java 21 | React 19 |
| Spring Boot 4.0.1 | TypeScript |
| Spring Data JPA | Vite |
| PostgreSQL 16 | TanStack Query |
| Maven | React Router v7 |
| Docker | Tailwind CSS v4 |
| | shadcn/ui |

## Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone <repo-url>
cd xtramile-intern

# Start all services
docker compose up -d --build

# View logs
docker compose logs -f
```

**Access:**
- Frontend: http://localhost:6173
- Backend API: http://localhost:8712/api
- Database: localhost:5432

### Manual Development

**Backend:**
```bash
cd intern-project-be
docker compose up -d --build
# API runs at http://localhost:8712
```

**Frontend:**
```bash
cd intern-project-fe
npm install
npm run dev
# App runs at http://localhost:5173
```

## API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | List students (paginated) |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Create student |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |
| GET | `/api/students/search?keyword={term}` | Search students |

### Query Parameters

- `page` (default: 0) - Page number
- `size` (default: 10) - Items per page
- `sort` (default: nomorInduk,asc) - Sort field and direction

### Request/Response Examples

**Create Student:**
```bash
curl -X POST http://localhost:8712/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "namaDepan": "John",
    "namaBelakang": "Doe",
    "tanggalLahir": "2002-05-15"
  }'
```

**Response:**
```json
{
  "status": "success",
  "message": "Student created successfully",
  "data": {
    "nomorInduk": "2026007",
    "namaDepan": "John",
    "namaBelakang": "Doe",
    "namaLengkap": "John Doe",
    "tanggalLahir": "2002-05-15",
    "usia": 23,
    "createdAt": "2026-01-19T15:30:00",
    "updatedAt": "2026-01-19T15:30:00"
  }
}
```

### Validation Rules

| Field | Rules |
|-------|-------|
| namaDepan | Required, 2-100 chars, letters/spaces/hyphens only |
| namaBelakang | Optional, max 100 chars |
| tanggalLahir | Required, age must be 17-40 years |

### Error Response Format

```json
{
  "timestamp": "2026-01-19T10:30:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "Invalid data",
  "path": "/api/students",
  "errors": ["First name is required"]
}
```

## Project Structure

```
xtramile-intern/
├── intern-project-be/           # Spring Boot Backend
│   ├── src/main/java/com/xtramile/intern_project/
│   │   ├── config/              # CORS, OpenAPI config
│   │   ├── controller/          # REST controllers
│   │   ├── dto/                 # Data transfer objects
│   │   ├── exception/           # Exception handlers
│   │   ├── model/               # JPA entities
│   │   ├── repository/          # Data access layer
│   │   └── service/             # Business logic
│   ├── Dockerfile
│   └── pom.xml
│
├── intern-project-fe/           # React Frontend
│   ├── src/
│   │   ├── api/                 # API client
│   │   ├── components/          # UI components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utilities
│   │   ├── pages/               # Page components
│   │   └── types/               # TypeScript types
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml           # Production stack
└── README.md
```

## Production Deployment

### With Traefik (Recommended)

1. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your domain settings
```

**.env example:**
```env
DOMAIN=yourdomain.com
FRONTEND_SUBDOMAIN=student-management
BACKEND_SUBDOMAIN=api-student
TRAEFIK_NETWORK=traefik_network
CERT_RESOLVER=mytlschallenge
POSTGRES_DB=interndb
POSTGRES_USER=internuser
POSTGRES_PASSWORD=your_secure_password
VITE_API_BASE_URL=https://api-student.yourdomain.com/api
BACKEND_DOMAIN=api-student.yourdomain.com
FRONTEND_DOMAIN=student-management.yourdomain.com
```

2. **Ensure DNS records point to your server:**
   - `student-management.yourdomain.com` → Server IP
   - `api-student.yourdomain.com` → Server IP

3. **Deploy:**
```bash
docker compose up -d --build
```

### Without Traefik

Uncomment the `ports` section in `docker-compose.yml` and access via:
- Frontend: http://your-server:6173
- Backend: http://your-server:8712

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| POSTGRES_DB | Database name | interndb |
| POSTGRES_USER | Database user | internuser |
| POSTGRES_PASSWORD | Database password | internpass |
| VITE_API_BASE_URL | API URL for frontend | http://localhost:8712/api |
| DOMAIN | Production domain | - |
| FRONTEND_SUBDOMAIN | Frontend subdomain | student-management |
| BACKEND_SUBDOMAIN | Backend subdomain | api-student |

## Troubleshooting

### Port already in use
```bash
lsof -i :8712  # Backend
lsof -i :6173  # Frontend
kill -9 <PID>
```

### Database connection error
```bash
docker compose restart postgres
docker compose logs postgres
```

### CORS error
- Verify backend is running
- Check `WebConfig.java` CORS configuration
- Ensure frontend URL is in allowed origins

### Container issues
```bash
# Full reset
docker compose down -v
docker compose up -d --build
```

## Development

### Running Tests

**Backend:**
```bash
cd intern-project-be
./mvnw test
```

**Frontend:**
```bash
cd intern-project-fe
npm run lint
npm run build
```

### API Testing

Use the `intern-project-be/api-test.http` file with VS Code REST Client extension.

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│  PostgreSQL │
│   (React)   │     │ (Spring)    │     │  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       └───────────────────┴────▶ Traefik (SSL/Routing)
```

**N-Tier Architecture:**
- Controller Layer → HTTP request/response handling
- Service Layer → Business logic, validation
- Repository Layer → Database operations

## License

This project is part of an internship assignment at Xtramile.

---

**Happy Coding!** 🚀

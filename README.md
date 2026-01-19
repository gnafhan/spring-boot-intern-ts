# Student Management System - Full Stack Application

Complete student management system with backend REST API (Spring Boot) and frontend SPA (React + TypeScript).

## 📋 Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)

## ✨ Features

### Backend (Spring Boot)
- ✅ RESTful API with N-tier architecture
- ✅ CRUD operations for student data
- ✅ Pagination, sorting, and search
- ✅ Auto-generated student ID (Nomor Induk Mahasiswa)
- ✅ Comprehensive validation (age 17-40, name format, etc.)
- ✅ Global exception handling
- ✅ PostgreSQL database
- ✅ Docker support
- ✅ CORS configuration

### Frontend (React + TypeScript)
- ✅ Single Page Application (SPA)
- ✅ Modern UI with Tailwind CSS & shadcn/ui
- ✅ Form validation (client & server)
- ✅ Real-time search with debouncing
- ✅ Pagination controls
- ✅ Loading states & error handling
- ✅ Toast notifications
- ✅ Confirmation dialogs
- ✅ Responsive design (mobile-friendly)
- ✅ Dark mode support

## 🛠 Technologies

### Backend
- Java 21
- Spring Boot 4.0.1
- Spring Data JPA
- PostgreSQL 16
- Maven
- Docker & Docker Compose

### Frontend
- React 19
- TypeScript
- Vite
- TanStack Query (React Query)
- React Router v7
- React Hook Form + Zod
- Tailwind CSS v4
- shadcn/ui
- date-fns

## 📦 Prerequisites

- **Docker Desktop** (recommended) or
- **Node.js 18+** and **JDK 21** (for local development)

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

Run the entire application (backend + frontend + database) with one command:

```bash
# In root project directory
docker-compose up -d --build
```

Application will be available at:
- **Frontend**: http://localhost:6173
- **Backend API**: http://localhost:8712/api
- **Database**: localhost:5432

To stop the application:
```bash
docker-compose down
```

### Option 2: Manual Development Setup

#### 1. Start Backend
```bash
cd intern-project-be
docker-compose up -d --build
# Backend will run at http://localhost:8712
```

#### 2. Start Frontend
```bash
cd intern-project-fe
npm install
npm run dev
# Frontend will run at http://localhost:5173
```

## 💻 Development

### Backend Development

```bash
cd intern-project-be

# Start with Docker
docker-compose up -d

# Or without Docker (requires PostgreSQL running)
./mvnw spring-boot:run

# Build
./mvnw clean package

# Run tests
./mvnw test
```

**Complete documentation**: [intern-project-be/README-STUDENT-API.md](intern-project-be/README-STUDENT-API.md)

### Frontend Development

```bash
cd intern-project-fe

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

**Complete documentation**: [intern-project-fe/README.md](intern-project-fe/README.md)

## 🚢 Production Deployment

### Using Docker Compose

1. **Build and run all services**:
```bash
docker-compose up -d --build
```

2. **Check logs**:
```bash
# All services
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# Frontend only
docker-compose logs -f frontend
```

3. **Stop services**:
```bash
docker-compose down

# With removing volumes (database will be reset)
docker-compose down -v
```

### Environment Variables

Create a `.env` file in the root project (optional):

```env
# Backend
DB_HOST=postgres
DB_PORT=5432
DB_NAME=interndb
DB_USER=internuser
DB_PASSWORD=internpass

# Frontend
VITE_API_BASE_URL=http://localhost:8712/api
```

### Deployment to Server

1. **Copy project to server**
2. **Ensure Docker and Docker Compose are installed**
3. **Update `VITE_API_BASE_URL` according to production domain**
4. **Run**:
```bash
docker-compose up -d --build
```

### Reverse Proxy (Nginx)

Example Nginx configuration for production:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:6173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8712;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 📁 Project Structure

```
xtramile-intern/
├── intern-project-be/          # Backend Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/xtramile/intern_project/
│   │   │   │       ├── config/
│   │   │   │       ├── controller/
│   │   │   │       ├── dto/
│   │   │   │       ├── exception/
│   │   │   │       ├── model/
│   │   │   │       ├── repository/
│   │   │   │       └── service/
│   │   │   └── resources/
│   │   └── test/
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── pom.xml
│   └── README-STUDENT-API.md
│
├── intern-project-fe/          # Frontend React + TypeScript
│   ├── src/
│   │   ├── api/               # API client
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom hooks
│   │   ├── lib/               # Utilities
│   │   ├── pages/             # Page components
│   │   ├── types/             # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
│
├── docker-compose.yml          # Production compose
└── README.md                   # This file
```

## 📚 API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | List students (paginated) |
| GET | `/api/students/{nomorInduk}` | Get student by ID |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/{nomorInduk}` | Update student |
| DELETE | `/api/students/{nomorInduk}` | Delete student |
| GET | `/api/students/search?keyword={term}` | Search students |

### Request Example

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

**Complete documentation**: [intern-project-be/README-STUDENT-API.md](intern-project-be/README-STUDENT-API.md)

## 🧪 Testing

### Backend Tests
```bash
cd intern-project-be
./mvnw test
```

### Frontend Manual Testing
1. Open http://localhost:6173 (or http://localhost:5173 for dev)
2. Test all CRUD features:
   - Create student
   - View student list (pagination, sorting)
   - Search students
   - View student detail
   - Edit student
   - Delete student

### API Testing
Use the `intern-project-be/api-test.http` file with REST Client extension in VS Code.

## 🔧 Troubleshooting

### Port already in use
```bash
# Check which ports are in use
lsof -i :8712  # Backend
lsof -i :6173  # Frontend
lsof -i :5432  # PostgreSQL

# Kill process
kill -9 <PID>
```

### Database connection error
```bash
# Restart database
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### CORS error in frontend
- Ensure backend is running
- Check `WebConfig.java` for CORS configuration
- Restart backend after changes

### Frontend cannot connect to backend
- Ensure `VITE_API_BASE_URL` is correct
- Check backend logs: `docker-compose logs backend`
- Test API directly: `curl http://localhost:8712/api/students`

## 📝 License

This project is part of an internship assignment.

## 👨‍💻 Development Team

- Backend: Spring Boot + PostgreSQL
- Frontend: React + TypeScript
- Infrastructure: Docker + Docker Compose

---

**Happy Coding!** 🚀

For questions or issues, please check the complete documentation in each project folder.

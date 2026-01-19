# Student Management System - Full Stack Application

Sistem manajemen mahasiswa lengkap dengan backend REST API (Spring Boot) dan frontend SPA (React + TypeScript).

## 📋 Daftar Isi

- [Fitur](#fitur)
- [Teknologi](#teknologi)
- [Prasyarat](#prasyarat)
- [Quick Start](#quick-start)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [Struktur Project](#struktur-project)
- [API Documentation](#api-documentation)

## ✨ Fitur

### Backend (Spring Boot)
- ✅ RESTful API dengan N-tier architecture
- ✅ CRUD operations untuk data mahasiswa
- ✅ Pagination, sorting, dan search
- ✅ Auto-generated student ID (Nomor Induk Mahasiswa)
- ✅ Validasi komprehensif (usia 17-40 tahun, format nama, dll)
- ✅ Global exception handling
- ✅ PostgreSQL database
- ✅ Docker support
- ✅ CORS configuration

### Frontend (React + TypeScript)
- ✅ Single Page Application (SPA)
- ✅ Modern UI dengan Tailwind CSS & shadcn/ui
- ✅ Form validation (client & server)
- ✅ Real-time search dengan debouncing
- ✅ Pagination controls
- ✅ Loading states & error handling
- ✅ Toast notifications
- ✅ Confirmation dialogs
- ✅ Responsive design (mobile-friendly)
- ✅ Dark mode support

## 🛠 Teknologi

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

## 📦 Prasyarat

- **Docker Desktop** (recommended) atau
- **Node.js 18+** dan **JDK 21** (untuk development lokal)

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

Jalankan seluruh aplikasi (backend + frontend + database) dengan satu perintah:

```bash
# Di root project
docker-compose up -d --build
```

Aplikasi akan tersedia di:
- **Frontend**: http://localhost:6173
- **Backend API**: http://localhost:8712/api
- **Database**: localhost:5432

Untuk stop aplikasi:
```bash
docker-compose down
```

### Option 2: Development Manual

#### 1. Start Backend
```bash
cd intern-project-be
docker-compose up -d --build
# Backend akan running di http://localhost:8712
```

#### 2. Start Frontend
```bash
cd intern-project-fe
npm install
npm run dev
# Frontend akan running di http://localhost:5173
```

## 💻 Development

### Backend Development

```bash
cd intern-project-be

# Start dengan Docker
docker-compose up -d

# Atau tanpa Docker (perlu PostgreSQL running)
./mvnw spring-boot:run

# Build
./mvnw clean package

# Run tests
./mvnw test
```

**Dokumentasi lengkap**: [intern-project-be/README-STUDENT-API.md](intern-project-be/README-STUDENT-API.md)

### Frontend Development

```bash
cd intern-project-fe

# Install dependencies
npm install

# Development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

**Dokumentasi lengkap**: [intern-project-fe/README.md](intern-project-fe/README.md)

## 🚢 Production Deployment

### Menggunakan Docker Compose

1. **Build dan run semua services**:
```bash
docker-compose up -d --build
```

2. **Check logs**:
```bash
# Semua services
docker-compose logs -f

# Backend saja
docker-compose logs -f backend

# Frontend saja
docker-compose logs -f frontend
```

3. **Stop services**:
```bash
docker-compose down

# Dengan menghapus volumes (database akan di-reset)
docker-compose down -v
```

### Environment Variables

Buat file `.env` di root project (opsional):

```env
# Backend
DB_HOST=postgres
DB_PORT=5432
DB_NAME=interndb
DB_USER=internuser
DB_PASSWORD=internpass

# Frontend
VITE_API_BASE_URL=http://localhost:8080/api
```

### Deployment ke Server

1. **Copy project ke server**
2. **Pastikan Docker dan Docker Compose terinstall**
3. **Update `VITE_API_BASE_URL` sesuai domain production**
4. **Run**:
```bash
docker-compose up -d --build
```

### Reverse Proxy (Nginx)

Contoh konfigurasi Nginx untuk production:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 📁 Struktur Project

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

**Dokumentasi lengkap**: [intern-project-be/README-STUDENT-API.md](intern-project-be/README-STUDENT-API.md)

## 🧪 Testing

### Backend Tests
```bash
cd intern-project-be
./mvnw test
```

### Frontend Manual Testing
1. Buka http://localhost:6173 (atau http://localhost:5173 untuk dev)
2. Test semua fitur CRUD:
   - Create student
   - View student list (pagination, sorting)
   - Search students
   - View student detail
   - Edit student
   - Delete student

### API Testing
Gunakan file `intern-project-be/api-test.http` dengan REST Client extension di VS Code.

## 🔧 Troubleshooting

### Port sudah digunakan
```bash
# Check port yang digunakan
lsof -i :8080  # Backend
lsof -i :3000  # Frontend
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

### CORS error di frontend
- Pastikan backend sudah running
- Check `WebConfig.java` untuk CORS configuration
- Restart backend setelah perubahan

### Frontend tidak bisa connect ke backend
- Pastikan `VITE_API_BASE_URL` sudah benar
- Check backend logs: `docker-compose logs backend`
- Test API langsung: `curl http://localhost:8712/api/students`

## 📝 License

This project is part of an internship assignment.

## 👨‍💻 Development Team

- Backend: Spring Boot + PostgreSQL
- Frontend: React + TypeScript
- Infrastructure: Docker + Docker Compose

---

**Happy Coding!** 🚀

Untuk pertanyaan atau issues, silakan check dokumentasi lengkap di masing-masing folder project.

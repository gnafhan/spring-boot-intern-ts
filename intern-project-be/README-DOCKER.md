# 🐳 Docker Development Setup

Setup Docker Compose untuk development Spring Boot project.

## 📋 Prerequisites

- Docker Desktop terinstall
- Tidak perlu install Java/JDK (sudah ada di container)

## 🚀 Quick Start

### 1. Build dan Jalankan Aplikasi

```bash
# Jalankan semua services (app + database)
docker-compose up --build

# Atau jalankan di background
docker-compose up -d --build

# Jalankan dengan pgAdmin (optional)
docker-compose --profile tools up -d --build
```

### 2. Akses Aplikasi

- **Spring Boot App**: http://localhost:8080
- **PostgreSQL**: localhost:5432
- **pgAdmin** (jika menggunakan profile tools): http://localhost:5050

### 3. Development Workflow

```bash
# Lihat logs real-time
docker-compose logs -f app

# Restart service tertentu
docker-compose restart app

# Stop semua services
docker-compose down

# Stop dan hapus volumes (data akan hilang!)
docker-compose down -v
```

## 🔧 Konfigurasi

### Environment Variables

Edit `docker-compose.yml` untuk mengubah konfigurasi database dan aplikasi.

### Database Connection

Saat aplikasi berjalan di container:
- **Host**: `postgres` (service name)
- **Port**: `5432`
- **Database**: `interndb`
- **Username**: `internuser`
- **Password**: `internpass`

Dari host machine (untuk tools seperti DBeaver):
- **Host**: `localhost`
- **Port**: `5432`

## 🐛 Remote Debugging

Aplikasi expose port 5005 untuk remote debugging.

### IntelliJ IDEA

1. Run → Edit Configurations
2. Add New → Remote JVM Debug
3. Host: `localhost`, Port: `5005`
4. Apply & Debug

### VS Code

Tambahkan ke `.vscode/launch.json`:

```json
{
  "type": "java",
  "name": "Remote Debug",
  "request": "attach",
  "hostName": "localhost",
  "port": 5005
}
```

## 📂 File Structure

```
.
├── Dockerfile              # Production-ready multi-stage build
├── Dockerfile.dev          # Development dengan hot reload
├── docker-compose.yml      # Orchestration untuk semua services
├── .dockerignore           # File yang diabaikan saat build
└── scripts/
    └── init-db.sql        # Database initialization script
```

## 🔥 Hot Reload

Perubahan di `src/` akan otomatis ter-reload berkat:
- Spring Boot DevTools
- Volume mount dari source code
- `spring-boot:run` Maven goal

## 🧹 Cleanup

```bash
# Stop dan hapus containers
docker-compose down

# Hapus juga volumes (hati-hati, data hilang!)
docker-compose down -v

# Hapus images
docker rmi intern-project-app

# Hapus semua (nuclear option)
docker system prune -a --volumes
```

## 📝 Tips

1. **First run lambat?** - Docker perlu download dependencies pertama kali
2. **Port sudah dipakai?** - Ubah mapping port di `docker-compose.yml`
3. **Out of memory?** - Tambahkan resource di Docker Desktop Settings
4. **Hot reload tidak jalan?** - Restart container: `docker-compose restart app`

## 🆘 Troubleshooting

### Container tidak bisa start

```bash
# Cek logs
docker-compose logs app

# Cek status
docker-compose ps

# Rebuild dari scratch
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### Database connection refused

Tunggu beberapa detik sampai health check hijau:

```bash
docker-compose ps
```

### Maven dependencies error

```bash
# Clear Maven cache dan rebuild
docker-compose down -v
docker volume rm intern-project_maven-cache
docker-compose up --build
```

## 🎯 Next Steps

1. Tambahkan Spring Data JPA dependency di `pom.xml`
2. Buat Entity, Repository, Service, Controller
3. Test API dengan Postman/curl
4. Tambahkan authentication (Spring Security)
5. Deploy ke production!

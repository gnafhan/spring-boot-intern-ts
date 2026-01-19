# 🚀 Quick Start Guide

Panduan cepat untuk memulai development dengan Docker Compose.

## ✅ Prerequisites Check

1. **Pastikan Docker terinstall:**
   ```bash
   docker --version
   docker-compose --version
   ```
   
   Jika belum: Download dari https://www.docker.com/products/docker-desktop

2. **Pastikan Docker Desktop berjalan**

## 🎯 Langkah-langkah (5 Menit)

### 1. Start Development Environment

```bash
# Cara 1: Menggunakan Make (recommended)
make up-build

# Cara 2: Manual
docker-compose up -d --build
```

**First run akan memakan waktu 2-5 menit** karena:
- Download base images (Java 21, PostgreSQL)
- Download Maven dependencies
- Build aplikasi

### 2. Cek Status

```bash
# Lihat semua containers
make ps
# atau
docker-compose ps

# Lihat logs
make logs-app
# atau
docker-compose logs -f app
```

Tunggu sampai muncul:
```
Started InternProjectApplication in X.XXX seconds
```

### 3. Test Aplikasi

Buka browser atau gunakan curl:

```bash
# Health check endpoint
curl http://localhost:8080/api/health

# Hello endpoint
curl http://localhost:8080/api/hello
```

Response yang diharapkan:
```json
{
  "status": "UP",
  "timestamp": "2026-01-19T...",
  "message": "Spring Boot application is running!",
  "version": "0.0.1-SNAPSHOT"
}
```

### 4. Development Workflow

#### Cara 1: Edit Langsung (Hot Reload)

1. Buka file Java (misal `HealthController.java`)
2. Edit kode
3. Save file
4. Tunggu beberapa detik
5. Spring Boot DevTools akan auto-restart!

#### Cara 2: Restart Manual

```bash
make restart
# atau
docker-compose restart app
```

### 5. Stop Development

```bash
# Stop sementara (data tetap ada)
make down

# Stop dan hapus data
make down-v
```

## 🎨 Akses Tools

### Aplikasi Spring Boot
- URL: http://localhost:8080
- Endpoints:
  - `/api/health` - Health check
  - `/api/hello` - Hello world

### PostgreSQL Database
Dari host machine (tools seperti DBeaver, pgAdmin):
- Host: `localhost`
- Port: `5432`
- Database: `interndb`
- Username: `internuser`
- Password: `internpass`

### pgAdmin (Optional Web UI)

```bash
# Start dengan pgAdmin
make up-tools
```

Akses: http://localhost:5050
- Email: `admin@intern.com`
- Password: `admin`

Add server di pgAdmin:
- Host: `postgres` (service name)
- Port: `5432`
- Database: `interndb`
- Username: `internuser`
- Password: `internpass`

## 🐛 Debugging

### Remote Debug dari VS Code

1. Install Extension: "Debugger for Java"
2. Tambahkan ke `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "java",
         "name": "Remote Debug",
         "request": "attach",
         "hostName": "localhost",
         "port": 5005
       }
     ]
   }
   ```
3. Set breakpoint di kode
4. Klik "Run and Debug" → "Remote Debug"

## 📝 Useful Commands

```bash
# Lihat semua commands
make help

# Lihat logs real-time
make logs

# Masuk ke container aplikasi
make shell

# Masuk ke PostgreSQL shell
make db-shell

# Run tests
make test

# Clean up everything
make clean
```

## 🚀 Next Steps

1. **Buat Entity Model**
   ```bash
   # Buat file: src/main/java/com/xtramile/intern_project/model/User.java
   ```

2. **Buat Repository**
   ```bash
   # Buat file: src/main/java/com/xtramile/intern_project/repository/UserRepository.java
   ```

3. **Buat Service**
   ```bash
   # Buat file: src/main/java/com/xtramile/intern_project/service/UserService.java
   ```

4. **Buat REST Controller**
   ```bash
   # Buat file: src/main/java/com/xtramile/intern_project/controller/UserController.java
   ```

5. **Test dengan Postman/curl**

## ❓ Troubleshooting

### Port 8080 sudah dipakai?

Edit `docker-compose.yml`:
```yaml
ports:
  - "8081:8080"  # Ganti 8081 dengan port yang kosong
```

### Container tidak start?

```bash
# Lihat error logs
make logs-app

# Rebuild dari scratch
make clean
make up-build
```

### Hot reload tidak jalan?

```bash
# Restart container
make restart

# Atau rebuild
make down
make up-build
```

### Out of memory?

Docker Desktop → Settings → Resources → Increase Memory

### Maven dependencies error?

```bash
# Clear cache dan rebuild
make down-v
docker volume rm intern-project_maven-cache
make up-build
```

## 💡 Tips

1. **Gunakan Make commands** - Lebih cepat dan mudah diingat
2. **Keep logs window open** - Untuk melihat perubahan real-time
3. **Use VS Code REST Client** - Install extension untuk test API
4. **Commit sering** - Jangan takut eksperimen!

## 📚 Learning Resources

- Spring Boot Docs: https://spring.io/projects/spring-boot
- Docker Docs: https://docs.docker.com/
- PostgreSQL Docs: https://www.postgresql.org/docs/

---

**Selamat coding! 🎉**

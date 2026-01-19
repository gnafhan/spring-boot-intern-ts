# Traefik Production Deployment Guide

Complete guide for deploying Student Management System with Traefik reverse proxy.

## 📋 Prerequisites

- Docker & Docker Compose installed on server
- Traefik already running (global reverse proxy)
- Domain names configured in DNS:
  - `student-management.example.com` → Frontend
  - `api.student-management.example.com` → Backend API
- `traefik_network` Docker network exists

## 🌐 Traefik Configuration

### 1. Verify Traefik Network

```bash
# Check if traefik network exists
docker network ls | grep traefik

# If not exists, create it
docker network create traefik_network
```

### 2. Configure Environment Variables

Create `.env` file in project root:

```bash
# Copy example
cp .env.example .env

# Edit with your domains
nano .env
```

**Example `.env` for production:**

```env
# Database
POSTGRES_DB=interndb
POSTGRES_USER=internuser
POSTGRES_PASSWORD=your-secure-password-here
POSTGRES_PORT=5432

# Domains (Traefik)
BACKEND_DOMAIN=api.student-management.yourdomain.com
FRONTEND_DOMAIN=student-management.yourdomain.com

# Frontend API URL
VITE_API_BASE_URL=https://api.student-management.yourdomain.com
```

### 3. DNS Configuration

Point your domains to your server IP:

```
A Record: student-management.yourdomain.com → YOUR_SERVER_IP
A Record: api.student-management.yourdomain.com → YOUR_SERVER_IP
```

## 🚀 Deployment Steps

### Step 1: Clone Repository

```bash
cd /var/www
git clone <repository-url> student-management
cd student-management
```

### Step 2: Configure Environment

```bash
# Create .env file
nano .env

# Set your domains and passwords
```

### Step 3: Deploy

```bash
# Build and start all services
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Step 4: Verify Deployment

```bash
# Check backend health
curl https://api.student-management.yourdomain.com/actuator/health

# Check frontend
curl https://student-management.yourdomain.com

# Check Traefik dashboard (if enabled)
# Visit your Traefik dashboard to see the services
```

## 📝 Traefik Labels Explained

### Backend Service

```yaml
labels:
  # Enable Traefik for this service
  - "traefik.enable=true"
  - "traefik.docker.network=traefik_network"
  
  # Routing rule - matches your backend domain
  - "traefik.http.routers.student-backend.rule=Host(`api.student-management.example.com`)"
  
  # Use HTTPS
  - "traefik.http.routers.student-backend.entrypoints=websecure"
  - "traefik.http.routers.student-backend.tls=true"
  - "traefik.http.routers.student-backend.tls.certresolver=letsencrypt"
  
  # Backend port
  - "traefik.http.services.student-backend.loadbalancer.server.port=8080"
  
  # CORS headers middleware
  - "traefik.http.routers.student-backend.middlewares=student-backend-headers"
  - "traefik.http.middlewares.student-backend-headers.headers.accesscontrolallowmethods=GET,POST,PUT,DELETE,OPTIONS"
  - "traefik.http.middlewares.student-backend-headers.headers.accesscontrolalloworigin=*"
```

### Frontend Service

```yaml
labels:
  # Enable Traefik
  - "traefik.enable=true"
  - "traefik.docker.network=traefik_network"
  
  # Routing rule - matches your frontend domain
  - "traefik.http.routers.student-frontend.rule=Host(`student-management.example.com`)"
  
  # Use HTTPS
  - "traefik.http.routers.student-frontend.entrypoints=websecure"
  - "traefik.http.routers.student-frontend.tls=true"
  - "traefik.http.routers.student-frontend.tls.certresolver=letsencrypt"
  
  # Frontend port (nginx)
  - "traefik.http.services.student-frontend.loadbalancer.server.port=80"
  
  # Security headers
  - "traefik.http.routers.student-frontend.middlewares=student-frontend-headers"
  - "traefik.http.middlewares.student-frontend-headers.headers.browsersecure=true"
  - "traefik.http.middlewares.student-frontend-headers.headers.framedeny=true"
```

## 🔧 Maintenance

### Update Application

```bash
cd /var/www/student-management

# Pull latest code
git pull

# Rebuild and restart
docker-compose up -d --build

# Check logs
docker-compose logs -f
```

### View Logs

```bash
# All services
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# Frontend only
docker-compose logs -f frontend

# Database only
docker-compose logs -f postgres
```

### Restart Services

```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
docker-compose restart frontend
```

### Backup Database

```bash
# Backup
docker-compose exec postgres pg_dump -U internuser interndb > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
docker-compose exec -T postgres psql -U internuser interndb < backup_20260119_160000.sql
```

## 🐛 Troubleshooting

### Service Not Accessible

1. **Check Traefik network:**
```bash
docker network inspect traefik_network
```

2. **Verify service is in Traefik network:**
```bash
docker inspect student-management-backend | grep -A 5 Networks
docker inspect student-management-frontend | grep -A 5 Networks
```

3. **Check Traefik logs:**
```bash
docker logs traefik
```

4. **Verify DNS:**
```bash
nslookup student-management.yourdomain.com
nslookup api.student-management.yourdomain.com
```

### SSL Certificate Issues

1. **Check certresolver name matches your Traefik config**
2. **Verify acme.json permissions:**
```bash
ls -la /path/to/acme.json
# Should be 600
chmod 600 /path/to/acme.json
```

3. **Force certificate renewal:**
```bash
# Remove old certificate and restart
docker-compose down
docker-compose up -d
```

### CORS Errors

If you get CORS errors, update backend CORS configuration:

```bash
# Edit WebConfig.java
nano intern-project-be/src/main/java/com/xtramile/intern_project/config/WebConfig.java

# Add your frontend domain to allowedOrigins
.allowedOrigins(
    "http://localhost:5173",
    "http://localhost:6173",
    "https://student-management.yourdomain.com"
)

# Rebuild
docker-compose up -d --build backend
```

### Container Won't Start

```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Check health
docker-compose ps

# Remove and recreate
docker-compose down
docker-compose up -d --build
```

## 🔒 Security Best Practices

### 1. Strong Passwords

```bash
# Generate strong password
openssl rand -base64 32

# Update in .env
POSTGRES_PASSWORD=<generated-password>
```

### 2. Firewall Configuration

```bash
# Allow only necessary ports
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP (Traefik)
sudo ufw allow 443/tcp  # HTTPS (Traefik)
sudo ufw enable
```

### 3. Regular Updates

```bash
# Update Docker images
docker-compose pull

# Rebuild with latest base images
docker-compose build --no-cache
docker-compose up -d
```

### 4. Database Access

Keep database port closed to external access (no port mapping in production).

### 5. Environment Variables

Never commit `.env` file to git:

```bash
# Ensure .env is in .gitignore
echo ".env" >> .gitignore
```

## 📊 Monitoring

### Service Status

```bash
# Check all services
docker-compose ps

# Check specific service health
docker inspect --format='{{.State.Health.Status}}' student-management-backend
docker inspect --format='{{.State.Health.Status}}' student-management-frontend
```

### Resource Usage

```bash
# Monitor container resources
docker stats

# Check specific container
docker stats student-management-backend
```

### Application Logs

```bash
# Follow logs in real-time
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100

# Logs for specific time range
docker-compose logs --since 1h
```

## 🔄 CI/CD Integration

### Example GitHub Actions

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd /var/www/student-management
            git pull
            docker-compose up -d --build
```

## 📞 Support

For issues:
- Check [README.md](README.md) for general documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment details
- Review Traefik logs: `docker logs traefik`
- Check service logs: `docker-compose logs`

---

**Production deployment with Traefik is now ready!** 🎉

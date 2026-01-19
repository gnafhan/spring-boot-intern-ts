# Deployment Guide - Student Management System

Panduan lengkap untuk deployment aplikasi Student Management System ke production.

## 📋 Daftar Isi

- [Quick Start](#quick-start)
- [Production Deployment](#production-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Environment Configuration](#environment-configuration)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### Lokal dengan Docker Compose

```bash
# 1. Clone repository (jika belum)
git clone <repository-url>
cd xtramile-intern

# 2. Jalankan dengan script
./start.sh

# Atau manual:
docker-compose up -d --build
```

Aplikasi akan tersedia di:
- **Frontend**: http://localhost:6173
- **Backend API**: http://localhost:8712/api
- **Database**: localhost:5432

## 🌐 Production Deployment

### Prerequisites

- Docker & Docker Compose installed
- Server dengan minimal 2GB RAM
- Port 80, 8080, 5432 tersedia
- (Opsional) Domain name & SSL certificate

### Step-by-Step

#### 1. Persiapan Server

```bash
# Update sistem
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Tambah user ke docker group
sudo usermod -aG docker $USER
newgrp docker
```

#### 2. Deploy Aplikasi

```bash
# Clone repository
git clone <repository-url>
cd xtramile-intern

# (Opsional) Buat file .env untuk production
cp .env.example .env
nano .env  # Edit sesuai kebutuhan

# Build dan start
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

#### 3. Setup Reverse Proxy (Nginx)

Install Nginx di host:

```bash
sudo apt install nginx -y
```

Buat konfigurasi:

```bash
sudo nano /etc/nginx/sites-available/student-management
```

Isi dengan:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:6173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8712;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # CORS headers
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
    }
}
```

Enable dan restart:

```bash
sudo ln -s /etc/nginx/sites-available/student-management /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 4. Setup SSL dengan Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Dapatkan certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal akan di-setup otomatis
```

#### 5. Setup Firewall

```bash
# Allow HTTP, HTTPS, SSH
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## ☁️ Cloud Deployment

### AWS EC2

1. **Launch EC2 Instance**
   - AMI: Ubuntu 22.04 LTS
   - Instance type: t2.medium (minimum)
   - Security Group: Allow ports 22, 80, 443

2. **Connect dan Setup**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
# Follow production deployment steps above
```

3. **Setup Domain**
   - Point DNS A record ke EC2 public IP
   - Follow SSL setup steps

### Google Cloud Platform

1. **Create VM Instance**
   - Machine type: e2-medium
   - Boot disk: Ubuntu 22.04 LTS
   - Firewall: Allow HTTP/HTTPS

2. **Deploy**
```bash
gcloud compute ssh your-instance-name
# Update ports in docker-compose.yml before deployment
# Follow production deployment steps
```

### DigitalOcean

1. **Create Droplet**
   - Image: Ubuntu 22.04
   - Plan: Basic ($12/month)
   - Add your SSH key

2. **Deploy**
```bash
ssh root@your-droplet-ip
# Follow production deployment steps
```

### Heroku (Alternative untuk backend saja)

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Deploy
git subtree push --prefix intern-project-be heroku main
```

## ⚙️ Environment Configuration

### Backend (.env atau docker-compose.yml)

```env
# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/interndb
SPRING_DATASOURCE_USERNAME=internuser
SPRING_DATASOURCE_PASSWORD=<STRONG_PASSWORD_HERE>

# Server
SERVER_PORT=8080

# JPA
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=false

# Logging
LOGGING_LEVEL_ROOT=INFO
```

### Frontend Build Args

Edit `docker-compose.yml`:

```yaml
frontend:
  build:
    args:
      VITE_API_BASE_URL: https://api.yourdomain.com
```

## 📊 Monitoring & Maintenance

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Last 100 lines
docker-compose logs --tail=100 backend
```

### Restart Services

```bash
# All services
docker-compose restart

# Specific service
docker-compose restart backend
docker-compose restart frontend
```

### Update Application

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# Or rebuild specific service
docker-compose up -d --build backend
```

### Backup Database

```bash
# Backup
docker-compose exec postgres pg_dump -U internuser interndb > backup_$(date +%Y%m%d).sql

# Restore
docker-compose exec -T postgres psql -U internuser interndb < backup_20260119.sql
```

### Health Checks

```bash
# Check if services are running
docker-compose ps

# Check service health
curl http://localhost:8712/actuator/health  # Backend
curl http://localhost:6173/health           # Frontend
```

### Resource Monitoring

```bash
# Check container stats
docker stats

# Check disk usage
docker system df

# Clean up unused resources
docker system prune -a
```

## 🔧 Troubleshooting

### Services Won't Start

```bash
# Check logs
docker-compose logs

# Check if ports are available
sudo netstat -tulpn | grep -E ':(6173|8712|5432)'

# Remove containers and volumes
docker-compose down -v
docker-compose up -d --build
```

### Database Connection Issues

```bash
# Check if database is running
docker-compose ps postgres

# Check database logs
docker-compose logs postgres

# Connect to database manually
docker-compose exec postgres psql -U internuser -d interndb
```

### Frontend Can't Connect to Backend

1. Check `VITE_API_BASE_URL` di build args
2. Check CORS configuration di backend
3. Check Nginx proxy configuration (jika ada)
4. Test API langsung:
```bash
curl http://localhost:8712/api/students
```

### SSL Certificate Issues

```bash
# Renew certificate manually
sudo certbot renew

# Check certificate status
sudo certbot certificates

# Test auto-renewal
sudo certbot renew --dry-run
```

### High Memory Usage

```bash
# Check resource usage
docker stats

# Restart services
docker-compose restart

# Set resource limits in docker-compose.yml:
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 1G
```

## 📱 Post-Deployment Checklist

- [ ] All services running (`docker-compose ps`)
- [ ] Frontend accessible (http://localhost:6173)
- [ ] Backend API responding (http://localhost:8712/api/students)
- [ ] Database connected and populated
- [ ] CORS working (no console errors)
- [ ] SSL certificate installed (production)
- [ ] Firewall configured
- [ ] Backup strategy in place
- [ ] Monitoring setup
- [ ] Domain DNS configured
- [ ] Health checks passing

## 🔐 Security Best Practices

1. **Change Default Passwords**
   - Update database password di `.env`
   - Use strong, random passwords

2. **Keep Docker Images Updated**
```bash
docker-compose pull
docker-compose up -d --build
```

3. **Enable Firewall**
```bash
sudo ufw enable
sudo ufw status
```

4. **Regular Backups**
   - Setup cron job untuk backup database
   - Store backups offsite

5. **Monitor Logs**
   - Check logs regularly untuk suspicious activity
   - Setup log rotation

## 📞 Support

Untuk masalah atau pertanyaan:
- Check dokumentasi: [README.md](README.md)
- Check backend docs: [intern-project-be/README-STUDENT-API.md](intern-project-be/README-STUDENT-API.md)
- Check frontend docs: [intern-project-fe/README.md](intern-project-fe/README.md)

---

**Good luck with your deployment!** 🚀

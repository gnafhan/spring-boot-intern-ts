# Environment Configuration Guide

Complete guide for configuring environment variables for different deployment scenarios.

## 📋 Available Environment Files

- `.env.example` - Template with all available variables
- `.env.development` - Local development configuration
- `.env.production` - Production with Traefik template
- `.env` - Your actual configuration (not in git)

## 🚀 Quick Setup

### For Local Development

```bash
# Copy development template
cp .env.development .env

# Start with docker-compose
docker-compose up -d --build
```

Access:
- Frontend: http://localhost:6173
- Backend: http://localhost:8712/api
- Database: localhost:5432

### For Production (Traefik)

```bash
# Copy production template
cp .env.production .env

# Edit with your domains
nano .env

# Update these values:
# - BACKEND_DOMAIN
# - FRONTEND_DOMAIN
# - VITE_API_BASE_URL
# - POSTGRES_PASSWORD (use strong password!)

# Deploy
docker-compose up -d --build
```

## 📝 Environment Variables Reference

### Database Configuration

```env
# Database name
POSTGRES_DB=interndb

# Database user
POSTGRES_USER=internuser

# Database password (CHANGE IN PRODUCTION!)
POSTGRES_PASSWORD=internpass

# Database port (default: 5432)
POSTGRES_PORT=5432
```

**Security Note:** Generate strong password for production:
```bash
openssl rand -base64 32
```

### Domain Configuration (Production with Traefik)

```env
# Backend API domain
BACKEND_DOMAIN=api.student-management.yourdomain.com

# Frontend domain
FRONTEND_DOMAIN=student-management.yourdomain.com
```

**Requirements:**
- DNS A records must point to your server IP
- Traefik must be running on the server
- `traefik_network` Docker network must exist

### Frontend Configuration

```env
# API base URL that frontend will use
VITE_API_BASE_URL=https://api.student-management.yourdomain.com
```

**Important:** This URL must be accessible from the browser (user's machine).

For production: Use HTTPS domain
For development: Use http://localhost:8712/api

### Port Configuration (Development Only)

```env
# Backend port exposed to host
BACKEND_PORT=8712

# Frontend port exposed to host
FRONTEND_PORT=6173
```

**Note:** In production with Traefik, these are not used. Services use `expose` instead of `ports`.

### Backend Configuration

```env
# Internal server port
SERVER_PORT=8080

# Spring profile (dev/prod)
SPRING_PROFILES_ACTIVE=prod

# JPA configuration
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=false
```

## 🔧 Configuration Scenarios

### Scenario 1: Local Development (No Traefik)

**File:** `.env.development`

```env
POSTGRES_DB=interndb
POSTGRES_USER=internuser
POSTGRES_PASSWORD=internpass
POSTGRES_PORT=5432

BACKEND_PORT=8712
FRONTEND_PORT=6173
VITE_API_BASE_URL=http://localhost:8712/api

SPRING_PROFILES_ACTIVE=dev
SPRING_JPA_SHOW_SQL=true
```

**Docker Compose:** Uncomment port mappings in `docker-compose.yml`:
```yaml
backend:
  ports:
    - "${BACKEND_PORT:-8712}:8080"

frontend:
  ports:
    - "${FRONTEND_PORT:-6173}:80"
```

### Scenario 2: Production with Traefik

**File:** `.env.production`

```env
POSTGRES_DB=interndb
POSTGRES_USER=internuser
POSTGRES_PASSWORD=your-secure-password-here
POSTGRES_PORT=5432

BACKEND_DOMAIN=api.student.company.com
FRONTEND_DOMAIN=student.company.com
VITE_API_BASE_URL=https://api.student.company.com

SPRING_PROFILES_ACTIVE=prod
SPRING_JPA_SHOW_SQL=false
```

**Docker Compose:** Use `expose` instead of `ports` (already configured).

**Prerequisites:**
```bash
# 1. Verify Traefik network
docker network ls | grep traefik_network

# 2. Configure DNS
# A student.company.com -> SERVER_IP
# A api.student.company.com -> SERVER_IP

# 3. Verify Traefik is running
docker ps | grep traefik
```

### Scenario 3: Staging Environment

**File:** `.env.staging`

```env
POSTGRES_DB=interndb_staging
POSTGRES_USER=internuser
POSTGRES_PASSWORD=staging-password-here
POSTGRES_PORT=5432

BACKEND_DOMAIN=api.staging.student.company.com
FRONTEND_DOMAIN=staging.student.company.com
VITE_API_BASE_URL=https://api.staging.student.company.com

SPRING_PROFILES_ACTIVE=staging
SPRING_JPA_SHOW_SQL=false
```

## 🔒 Security Best Practices

### 1. Never Commit .env Files

```bash
# Ensure .env is in .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

### 2. Use Strong Passwords

```bash
# Generate strong password
openssl rand -base64 32

# Or use password generator
pwgen -s 32 1
```

### 3. Restrict Database Access

In production, database should not be exposed to the internet:
```yaml
postgres:
  # NO ports mapping in production
  # ports:
  #   - "5432:5432"
  
  # Only expose on internal network
  expose:
    - "5432"
```

### 4. Environment-Specific Secrets

Never use development passwords in production!

```bash
# Development
POSTGRES_PASSWORD=internpass  # OK for dev

# Production
POSTGRES_PASSWORD=<strong-random-password>  # Must be strong
```

### 5. Secret Management

For enterprise deployments, consider:
- Docker Secrets
- HashiCorp Vault
- AWS Secrets Manager
- Azure Key Vault

## 🧪 Testing Configuration

### Verify Environment Variables

```bash
# Check what docker-compose will use
docker-compose config

# Check specific service environment
docker-compose exec backend env | grep SPRING
docker-compose exec frontend env | grep VITE
```

### Test Database Connection

```bash
# Connect to database
docker-compose exec postgres psql -U internuser -d interndb

# Check connection from backend
docker-compose exec backend curl http://localhost:8080/actuator/health
```

### Test Frontend API Connection

```bash
# Check frontend can reach backend
docker-compose exec frontend curl http://backend:8080/actuator/health

# From host (production with Traefik)
curl https://api.student.company.com/actuator/health
```

## 🔄 Switching Environments

### From Development to Production

```bash
# 1. Backup current .env
cp .env .env.backup

# 2. Copy production template
cp .env.production .env

# 3. Edit with your values
nano .env

# 4. Update docker-compose.yml
# - Comment out port mappings
# - Verify Traefik labels are enabled

# 5. Deploy
docker-compose down
docker-compose up -d --build
```

### From Production to Development

```bash
# 1. Copy development template
cp .env.development .env

# 2. Update docker-compose.yml
# - Uncomment port mappings
# - Comment out Traefik labels (if needed)

# 3. Restart
docker-compose down
docker-compose up -d
```

## 📊 Environment Variable Priority

Docker Compose resolves variables in this order:
1. Compose file (inline values)
2. Environment variable from shell
3. `.env` file
4. Dockerfile (ENV instructions)
5. Default value in compose file

Example:
```yaml
backend:
  environment:
    - SERVER_PORT=${SERVER_PORT:-8080}
    #                              ^^^^^ default if not in .env
```

## 🐛 Troubleshooting

### Variables Not Loading

```bash
# 1. Check .env file location (must be in same dir as docker-compose.yml)
ls -la .env

# 2. Verify syntax (no spaces around =)
# GOOD: VAR=value
# BAD:  VAR = value

# 3. Rebuild to apply changes
docker-compose down
docker-compose up -d --build
```

### Wrong API URL

```bash
# Frontend can't connect to backend

# 1. Check VITE_API_BASE_URL in .env
cat .env | grep VITE_API_BASE_URL

# 2. Rebuild frontend (build-time variable)
docker-compose up -d --build frontend

# 3. Check from browser console
# It should show API calls to correct URL
```

### Database Connection Failed

```bash
# 1. Check database is running
docker-compose ps postgres

# 2. Verify credentials
docker-compose exec backend env | grep SPRING_DATASOURCE

# 3. Test connection
docker-compose exec postgres psql -U $POSTGRES_USER -d $POSTGRES_DB
```

## 📚 Additional Resources

- [Docker Compose Environment Variables](https://docs.docker.com/compose/environment-variables/)
- [Traefik Configuration](https://doc.traefik.io/traefik/)
- [Spring Boot Externalized Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config)

---

For questions or issues, check [README.md](README.md) and [TRAEFIK-DEPLOYMENT.md](TRAEFIK-DEPLOYMENT.md).

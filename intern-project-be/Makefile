# Makefile untuk memudahkan development

.PHONY: help up down restart logs build clean ps test shell db-shell

help: ## Tampilkan help
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

up: ## Start semua services
	docker-compose up -d

up-build: ## Build dan start semua services
	docker-compose up -d --build

up-tools: ## Start semua services + pgAdmin
	docker-compose --profile tools up -d --build

down: ## Stop semua services
	docker-compose down

down-v: ## Stop semua services dan hapus volumes
	docker-compose down -v

restart: ## Restart aplikasi
	docker-compose restart app

logs: ## Lihat logs semua services
	docker-compose logs -f

logs-app: ## Lihat logs aplikasi saja
	docker-compose logs -f app

logs-db: ## Lihat logs database saja
	docker-compose logs -f postgres

build: ## Build ulang images
	docker-compose build --no-cache

clean: ## Cleanup containers, images, volumes
	docker-compose down -v
	docker system prune -f

ps: ## Lihat status containers
	docker-compose ps

test: ## Run tests di container
	docker-compose exec app ./mvnw test

shell: ## Masuk ke shell container aplikasi
	docker-compose exec app sh

db-shell: ## Masuk ke PostgreSQL shell
	docker-compose exec postgres psql -U internuser -d interndb

dev: ## Mode development (alias untuk up-build)
	@echo "🚀 Starting development environment..."
	docker-compose up --build

prod: ## Build production image
	docker build -t intern-project:latest -f Dockerfile .

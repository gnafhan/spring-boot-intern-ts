#!/bin/bash

# Student Management System - Quick Start Script

echo "🚀 Starting Student Management System..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Error: docker-compose is not installed."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Build and start all services
echo "📦 Building and starting services..."
docker-compose up -d --build

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 15

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "✅ Services are running!"
    echo ""
    echo "📍 Access the application:"
    echo "   Frontend:  http://localhost:6173"
    echo "   Backend:   http://localhost:8712/api"
    echo "   Database:  localhost:5432"
    echo ""
    echo "📊 View logs:"
    echo "   docker-compose logs -f"
    echo ""
    echo "🛑 Stop services:"
    echo "   docker-compose down"
    echo ""
else
    echo "❌ Error: Services failed to start. Check logs with:"
    echo "   docker-compose logs"
fi

# Multi-stage build untuk optimasi ukuran image

# Stage 1: Build aplikasi
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copy Maven wrapper dan config
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (layer caching untuk speed)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build aplikasi (skip tests untuk development speed)
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime image (lebih kecil untuk production)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Install curl untuk health checks
RUN apk add --no-cache curl

# Create non-root user untuk security
RUN addgroup -g 1001 spring && adduser -u 1001 -G spring -s /bin/sh -D spring
USER spring:spring

# Copy JAR dari build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# JVM options untuk container
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

# Run aplikasi
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

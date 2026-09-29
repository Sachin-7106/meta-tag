# =========================================================
# STAGE 1: Build React + TypeScript Frontend Bundle
# =========================================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# =========================================================
# STAGE 2: Multi-stage Production Python FastAPI Container
# =========================================================
FROM python:3.11-slim AS production

# Install curl for container health check
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

# Create non-root user (UID 10001)
RUN groupadd -g 10001 appuser && \
    useradd -u 10001 -g appuser -s /bin/sh -m appuser

WORKDIR /app

# Copy Python backend dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend source code
COPY backend/app ./backend/app

# Copy built frontend assets from STAGE 1 into backend/static
COPY --from=frontend-builder /app/backend/static ./backend/static

# Set permissions for non-root appuser
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER 10001

# Environment defaults
ENV PYTHONUNBUFFERED=1 \
    APP_ENV=production \
    DEMO_MODE=true \
    PORT=8000 \
    PYTHONPATH=/app/backend

EXPOSE 8000

# Health check endpoint
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8000/api/health || exit 1

# Start FastAPI application
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

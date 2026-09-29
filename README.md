# MetaForge – Automated DevOps Platform for Meta Tag Generator

> **College Mini-Project Implementation**  
> An automated, production-grade DevOps control plane and Meta Tag Generator web application combining source control, CI/CD automation, OCI containerization, Infrastructure as Code (IaC), configuration management, and Kubernetes deployment.

---

## 1. Project Overview

**MetaForge** is a dual-purpose software engineering platform:
1. **Functional Meta Tag Generator**: Generates valid, validated HTML for SEO Title, Meta Description, Facebook Open Graph, and Twitter Cards with real-time card previews.
2. **DevOps SRE Control Plane (`/dashboard`)**: Monitors the automated CI/CD pipeline, cluster node topology, pod telemetry, Terraform IaC state, Ansible playbooks, and security audit metrics.

---

## 2. End-to-End DevOps Lifecycle Architecture

```
Developer
   │
   ▼
01. GitHub (Source Control & Branching: main <- develop <- feature/*)
   │
   ▼
02. Jenkins (CI/CD Pipeline Orchestration & Automated Testing)
   │
   ▼
03. Docker (Multi-stage Containerization & Non-Root Execution)
   │
   ▼
04. Container Registry (GHCR Image Push & Trivy Scanning)
   │
   ▼
05. Terraform (Infrastructure as Code - VPC, Subnets, EKS/Minikube)
   │
   ▼
06. Ansible (Configuration Management - Docker Engine & Kernel Sysctl)
   │
   ▼
07. Kubernetes (Orchestration - 3 Replicas, RollingUpdate & Self-Healing)
   │
   ▼
08. NGINX Ingress (Edge TLS & Traffic Routing)
   │
   ▼
Production App / End User
```

---

## 3. Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Backend API**: Python 3.11, FastAPI, Uvicorn, Pydantic, PyTest
- **Containerization**: Docker OCI, Multi-stage builds, Docker Compose
- **Orchestration**: Kubernetes, Minikube, NGINX Ingress Controller
- **CI/CD**: Jenkins, GitHub Webhooks, OCI Container Registry
- **IaC & Config Management**: Terraform v1.7.5, Ansible Core 2.16

---

## 4. Complete Repository Folder Structure

```
/meta tag
├── README.md
├── .gitignore
├── .env.example
├── Jenkinsfile
├── Dockerfile
├── docker-compose.yml
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── generator.py
│   │   ├── devops_data.py
│   │   └── models.py
│   ├── tests/
│   │   └── test_api.py
│   ├── requirements.txt
│   └── static/
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── index.html
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── api/
│   │   │   └── client.ts
│   │   ├── components/
│   │   ├── pages/
│   │   └── types/
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── ansible/
│   ├── inventory
│   └── playbook.yml
└── kubernetes/
    ├── deployment.yaml
    ├── service.yaml
    ├── ingress.yaml
    └── configmap.yaml
```

---

## 5. Local Development Setup

### 5.1 Backend Setup (FastAPI)
```bash
# Navigate to project root
cd "c:\meta tag"

# Create & activate virtual environment
python -m venv venv
.\venv\Scripts\activate   # On Windows
source venv/bin/activate  # On Linux/macOS

# Install backend dependencies
pip install -r backend/requirements.txt

# Run FastAPI development server
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
Access backend API documentation at: `http://127.0.0.1:8000/docs`

### 5.2 Frontend Setup (React + Vite)
```bash
# Navigate to frontend directory
cd frontend

# Install Node packages
npm install

# Run Vite dev server
npm run dev
```
Access application UI at: `http://localhost:3000`

---

## 6. Docker Container Execution

```bash
# Build OCI Container Image
docker build -t metaforge/metatag-generator:1.4.2 .

# Run Docker Container Locally
docker run -d -p 8000:8000 --name metaforge-app metaforge/metatag-generator:1.4.2

# Verify Health Endpoint
curl http://localhost:8000/api/health

# Docker Compose Launch
docker-compose up -d
```

---

## 7. Local Minikube & Kubernetes Deployment

```bash
# 1. Start Minikube cluster
minikube start --nodes 3 -p metaforge-cluster

# 2. Enable Ingress addon
minikube addons enable ingress -p metaforge-cluster

# 3. Load local Docker image into Minikube
minikube image load metaforge/metatag-generator:1.4.2 -p metaforge-cluster

# 4. Create Namespace and apply Kubernetes manifests
kubectl create namespace metaforge-prod
kubectl apply -f kubernetes/configmap.yaml -n metaforge-prod
kubectl apply -f kubernetes/deployment.yaml -n metaforge-prod
kubectl apply -f kubernetes/service.yaml -n metaforge-prod
kubectl apply -f kubernetes/ingress.yaml -n metaforge-prod

# 5. Verification Commands
kubectl get nodes
kubectl get pods -n metaforge-prod -o wide
kubectl get deployments -n metaforge-prod
kubectl get svc -n metaforge-prod
```

---

## 8. Automated Testing

```bash
# Execute Backend PyTest suite
set PYTHONPATH=backend
python -m pytest backend/tests/test_api.py -v

# Frontend TypeScript verification
cd frontend
npm run build
```

---

## 9. DEMO MODE Explanation

Since external cloud infrastructure (AWS EKS, live Jenkins servers) may not be connected during offline evaluation, the platform includes a **DEMO MODE**:
- When `DEMO_MODE=true` (configured in `.env` or settings page), realistic sample telemetry is displayed with a prominent `DEMO MODE` badge.
- Toggle between `DEMO MODE` and `LIVE INTEGRATION` at any time via the Navbar or Settings view.

---

## 10. Security & Compliance Notes

- **Zero Plaintext Credentials**: No hardcoded API keys, database passwords, or private keys exist in the repository.
- **Non-Root Container**: Dockerfile executes under UID 10001 (`appuser`).
- **Kubernetes RBAC**: Minimal ServiceAccount rights.
- **Trivy Vulnerability Scan**: Automated image scanning integrated in Jenkins pipeline.

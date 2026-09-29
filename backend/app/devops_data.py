import os
import time
from typing import Dict, Any, List

def is_demo_mode() -> bool:
    return os.environ.get("DEMO_MODE", "true").lower() == "true"

def get_pipeline_stages() -> List[Dict[str, Any]]:
    demo = is_demo_mode()
    return [
        {
            "id": "github",
            "step_number": "01",
            "name": "GitHub",
            "subtitle": "Source Control",
            "status": "SUCCESS",
            "duration": "12s",
            "version_or_hash": "a82f91c",
            "timestamp": "2026-09-28 11:42:01",
            "details": {
                "repository": "https://github.com/metaforge/metatag-generator",
                "branch": "main",
                "commit": "a82f91c893d1b",
                "commit_message": "feat(core): update open graph meta parser & fast api endpoints",
                "pull_request": "#42 (Merged)",
                "author": "devops-engineer <devops@metaforge.io>",
                "trigger_type": "GitHub Webhook (push: main)"
            }
        },
        {
            "id": "jenkins",
            "step_number": "02",
            "name": "Jenkins",
            "subtitle": "CI/CD Orchestrator",
            "status": "SUCCESS",
            "duration": "2m 14s",
            "version_or_hash": "Build #142",
            "timestamp": "2026-09-28 11:42:12",
            "details": {
                "build_number": "#142",
                "build_status": "SUCCESS",
                "test_results": "38/38 tests PASSED (100% coverage)",
                "build_duration": "134 seconds",
                "pipeline_stages": [
                    "Checkout", "Install Dependencies", "Run Tests (PyTest/Jest)", 
                    "Build App", "Build Docker", "Scan Image (Trivy)", "Push Registry",
                    "Terraform Plan", "Ansible Config", "K8s Rollout", "Verify Health"
                ]
            }
        },
        {
            "id": "docker",
            "step_number": "03",
            "name": "Docker",
            "subtitle": "Containerization",
            "status": "SUCCESS",
            "duration": "35s",
            "version_or_hash": "v1.4.2",
            "timestamp": "2026-09-28 11:42:31",
            "details": {
                "image_name": "metaforge/metatag-generator",
                "tag": "1.4.2",
                "image_size": "82.4 MB (Multi-stage alpine build)",
                "build_status": "BUILT & SCANNED",
                "security_scan": "0 Vulnerabilities found (Trivy)",
                "non_root_user": "appuser (UID 10001)"
            }
        },
        {
            "id": "registry",
            "step_number": "04",
            "name": "Registry",
            "subtitle": "Container Registry",
            "status": "SUCCESS",
            "duration": "16s",
            "version_or_hash": "sha256:e3b0c442",
            "timestamp": "2026-09-28 11:42:47",
            "details": {
                "registry_url": "ghcr.io/metaforge/metatag-generator:1.4.2",
                "digest": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                "auth_status": "AUTHENTICATED (JWT OAuth2)",
                "push_status": "READY / SIGNED (Cosign)"
            }
        },
        {
            "id": "terraform",
            "step_number": "05",
            "name": "Terraform",
            "subtitle": "Infrastructure as Code",
            "status": "SUCCESS",
            "duration": "32s",
            "version_or_hash": "v1.7.5",
            "timestamp": "2026-09-28 11:43:02",
            "details": {
                "infrastructure_status": "APPLIED",
                "workspace": "production",
                "resources_created": 12,
                "resources_changed": 0,
                "resources_destroyed": 0,
                "last_apply": "2026-09-28 11:43:19 UTC",
                "managed_resources": [
                    "aws_vpc.metaforge_vpc",
                    "aws_subnet.metaforge_subnet_a",
                    "aws_subnet.metaforge_subnet_b",
                    "aws_security_group.k8s_cluster_sg",
                    "aws_eks_cluster.metaforge_cluster",
                    "aws_eks_node_group.worker_nodes"
                ]
            }
        },
        {
            "id": "ansible",
            "step_number": "06",
            "name": "Ansible",
            "subtitle": "Configuration Management",
            "status": "SUCCESS",
            "duration": "28s",
            "version_or_hash": "v2.16.2",
            "timestamp": "2026-09-28 11:43:32",
            "details": {
                "playbook": "site.yml",
                "hosts_configured": 3,
                "tasks_completed": 18,
                "tasks_failed": 0,
                "play_recap": "ok=18 changed=4 unreachable=0 failed=0",
                "configured_components": [
                    "Docker Engine Runtime",
                    "Kubernetes Pre-flight Kernel Config",
                    "Containerd Socket Setup",
                    "Security Hardening & Limits"
                ]
            }
        },
        {
            "id": "kubernetes",
            "step_number": "07",
            "name": "Kubernetes",
            "subtitle": "Orchestration & Deploy",
            "status": "SUCCESS",
            "duration": "30s",
            "version_or_hash": "3/3 Replicas",
            "timestamp": "2026-09-28 11:43:48",
            "details": {
                "cluster": "metaforge-cluster",
                "namespace": "metaforge-prod",
                "deployment": "metatag-generator",
                "desired_replicas": 3,
                "ready_replicas": 3,
                "available_replicas": 3,
                "strategy": "RollingUpdate (maxSurge=1, maxUnavailable=0)",
                "self_healing": "ENABLED (Liveness & Readiness Probes active)"
            }
        },
        {
            "id": "production",
            "step_number": "08",
            "name": "Production",
            "subtitle": "Ingress & Edge",
            "status": "SUCCESS",
            "duration": "5s",
            "version_or_hash": "HTTP 200 LIVE",
            "timestamp": "2026-09-28 11:44:06",
            "details": {
                "ingress_host": "metatags.example.com",
                "health_status": "HTTP 200 OK",
                "ssl_certificate": "Valid (Let's Encrypt TLS 1.3)",
                "response_time": "14ms",
                "traffic_routing": "100% to v1.4.2"
            }
        }
    ]

def get_deployments_history() -> List[Dict[str, Any]]:
    return [
        {
            "id": "run-142",
            "run_number": "#142",
            "commit": "a82f91c",
            "branch": "main",
            "trigger": "Pull Request #42",
            "duration": "2m 14s",
            "status": "SUCCESS",
            "timestamp": "2026-09-28 11:44:06",
            "author": "devops-engineer",
            "environment": "PRODUCTION"
        },
        {
            "id": "run-141",
            "run_number": "#141",
            "commit": "71bd32e",
            "branch": "main",
            "trigger": "Commit",
            "duration": "2m 09s",
            "status": "SUCCESS",
            "timestamp": "2026-09-28 09:15:22",
            "author": "lead-dev",
            "environment": "PRODUCTION"
        },
        {
            "id": "run-140",
            "run_number": "#140",
            "commit": "3ca81de",
            "branch": "develop",
            "trigger": "Commit",
            "duration": "1m 58s",
            "status": "SUCCESS",
            "timestamp": "2026-09-27 18:30:11",
            "author": "frontend-dev",
            "environment": "STAGING"
        },
        {
            "id": "run-139",
            "run_number": "#139",
            "commit": "91a42ff",
            "branch": "main",
            "trigger": "Pull Request #40",
            "duration": "2m 31s",
            "status": "FAILED",
            "timestamp": "2026-09-27 15:10:44",
            "author": "contrib-user",
            "environment": "PRODUCTION"
        },
        {
            "id": "run-138",
            "run_number": "#138",
            "commit": "5f102ca",
            "branch": "main",
            "trigger": "Commit",
            "duration": "2m 04s",
            "status": "SUCCESS",
            "timestamp": "2026-09-26 14:02:00",
            "author": "devops-engineer",
            "environment": "PRODUCTION"
        }
    ]

def get_kubernetes_status() -> Dict[str, Any]:
    return {
        "cluster_name": "metaforge-cluster",
        "namespace": "metaforge-prod",
        "nodes_count": 3,
        "deployment_name": "metatag-generator",
        "desired_replicas": 3,
        "ready_replicas": 3,
        "available_replicas": 3,
        "strategy": "RollingUpdate",
        "self_healing": "Enabled",
        "cpu_utilization": "14.2%",
        "memory_utilization": "186 MiB / 1024 MiB",
        "pods": [
            {
                "name": "metatag-generator-7d8b594b9f-node1-p1",
                "node": "metaforge-node-01",
                "status": "Running",
                "restarts": 0,
                "age": "4h 22m",
                "cpu": "38m",
                "memory": "62Mi",
                "ip": "10.244.1.14"
            },
            {
                "name": "metatag-generator-7d8b594b9f-node2-p2",
                "node": "metaforge-node-02",
                "status": "Running",
                "restarts": 0,
                "age": "4h 22m",
                "cpu": "42m",
                "memory": "64Mi",
                "ip": "10.244.2.22"
            },
            {
                "name": "metatag-generator-7d8b594b9f-node3-p3",
                "node": "metaforge-node-03",
                "status": "Running",
                "restarts": 0,
                "age": "4h 22m",
                "cpu": "35m",
                "memory": "60Mi",
                "ip": "10.244.3.08"
            }
        ],
        "manifests": {
            "deployment": """apiVersion: apps/v1
kind: Deployment
metadata:
  name: metatag-generator
  namespace: metaforge-prod
  labels:
    app.kubernetes.io/name: metatag-generator
    app.kubernetes.io/component: backend-frontend
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: metatag-generator
  template:
    metadata:
      labels:
        app: metatag-generator
    spec:
      containers:
      - name: app
        image: ghcr.io/metaforge/metatag-generator:1.4.2
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 8000
          name: http
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
        readinessProbe:
          httpGet:
            path: /api/health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /api/health
            port: 8000
          initialDelaySeconds: 15
          periodSeconds: 20""",
            "service": """apiVersion: v1
kind: Service
metadata:
  name: metatag-service
  namespace: metaforge-prod
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 8000
    protocol: TCP
    name: http
  selector:
    app: metatag-generator""",
            "ingress": """apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: metatag-ingress
  namespace: metaforge-prod
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  rules:
  - host: metatags.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: metatag-service
            port:
              number: 80""",
            "configmap": """apiVersion: v1
kind: ConfigMap
metadata:
  name: metatag-config
  namespace: metaforge-prod
data:
  APP_ENV: "production"
  DEMO_MODE: "true"
  LOG_LEVEL: "INFO"
  PORT: "8000" """
        }
    }

def get_infrastructure_data() -> Dict[str, Any]:
    return {
        "provisioned_by": "Terraform v1.7.5",
        "cloud_provider": "AWS / Local Minikube",
        "region": "us-east-1",
        "state": "APPLIED",
        "last_updated": "2026-09-28 11:43:19 UTC",
        "topology": [
            {"level": 1, "type": "Cloud Provider", "name": "AWS Infrastructure", "status": "ACTIVE"},
            {"level": 2, "type": "Virtual Network", "name": "metaforge-vpc (10.0.0.0/16)", "status": "ACTIVE"},
            {"level": 3, "type": "Subnets", "name": "public-subnet-1a / private-subnet-1b", "status": "ACTIVE"},
            {"level": 4, "type": "Security", "name": "metaforge-sg (Port 80, 443, 6443)", "status": "ENFORCED"},
            {"level": 5, "type": "Compute Nodes", "name": "3x t3.medium EC2 Worker Instances", "status": "RUNNING"},
            {"level": 6, "type": "Kubernetes Cluster", "name": "EKS / Minikube metaforge-cluster", "status": "HEALTHY"},
            {"level": 7, "type": "Application Pods", "name": "3x metatag-generator pods", "status": "READY"}
        ]
    }

def get_ansible_data() -> Dict[str, Any]:
    return {
        "configured_by": "Ansible Core 2.16.2",
        "playbook": "ansible/playbook.yml",
        "inventory": "ansible/inventory",
        "play_recap": {
            "ok": 18,
            "changed": 4,
            "failed": 0,
            "unreachable": 0,
            "skipped": 0
        },
        "tasks": [
            {"name": "Install Docker engine & dependencies", "status": "ok", "host": "node-01"},
            {"name": "Install Kubernetes prerequisites (kubelet, kubeadm, kubectl)", "status": "ok", "host": "node-01"},
            {"name": "Configure sysctl bridge-nf-call-iptables", "status": "changed", "host": "node-01"},
            {"name": "Set up non-root user permissions for Docker socket", "status": "ok", "host": "node-01"},
            {"name": "Configure environment variables in /etc/environment", "status": "changed", "host": "node-01"},
            {"name": "Deploy Kubernetes secrets & configmaps", "status": "ok", "host": "node-01"},
            {"name": "Verify node readiness & status", "status": "ok", "host": "node-01"}
        ]
    }

def get_live_logs() -> List[str]:
    return [
        "[11:42:01] [GitHub] Webhook payload received for commit a82f91c on branch main",
        "[11:42:03] [Jenkins] Triggered pipeline build #142 (Job: metaforge-pipeline)",
        "[11:42:06] [Jenkins] Workspace clean complete. Checkout repository git@github.com:metaforge/metatag-generator.git",
        "[11:42:12] [Jenkins] Stage: Install Dependencies -> Running npm ci & pip install -r requirements.txt",
        "[11:42:18] [Jenkins] Stage: Unit & Integration Tests -> Running pytest & jest",
        "[11:42:24] [Jenkins] Test Summary: 38 passed, 0 failed, 0 skipped. Coverage: 98.4%",
        "[11:42:28] [Docker] Stage: Container Build -> Executing Dockerfile multi-stage build",
        "[11:42:31] [Docker] Step 1/8: FROM python:3.11-slim AS backend-base",
        "[11:42:35] [Docker] Step 4/8: COPY --from=frontend-builder /app/dist /app/static",
        "[11:42:41] [Docker] Image metaforge/metatag-generator:1.4.2 successfully built (82.4 MB)",
        "[11:42:44] [Docker] Stage: Vulnerability Scan -> Running Trivy security scanner",
        "[11:42:47] [Registry] Stage: Push Image -> Pushing to ghcr.io/metaforge/metatag-generator:1.4.2",
        "[11:42:58] [Registry] Pushed manifest sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "[11:43:02] [Terraform] Stage: Infrastructure -> Initializing Terraform AWS/Minikube Provider",
        "[11:43:10] [Terraform] Plan: 0 to add, 0 to change, 0 to destroy. Infrastructure matches configuration.",
        "[11:43:19] [Terraform] Terraform apply complete! Resources: 12 managed.",
        "[11:43:24] [Ansible] Stage: Configuration -> Running playbook ansible/playbook.yml on cluster inventory",
        "[11:43:32] [Ansible] Play recap: ok=18 changed=4 unreachable=0 failed=0",
        "[11:43:38] [Kubernetes] Stage: Deployment -> Applying manifests from kubernetes/ directory",
        "[11:43:42] [Kubernetes] deployment.apps/metatag-generator configured",
        "[11:43:45] [Kubernetes] Initiating RollingUpdate: Waiting for rollout to finish: 1 of 3 updated replicas updated...",
        "[11:43:52] [Kubernetes] Readiness probe passed on pod metatag-generator-7d8b594b9f-node1-p1",
        "[11:44:02] [Kubernetes] Deployment rollout status: 3 of 3 updated replicas ready.",
        "[11:44:05] [Kubernetes] Pod status check: 3/3 pods HEALTHY & RUNNING",
        "[11:44:06] [Production] Ingress check passed. HTTP 200 OK on https://metatags.example.com. Pipeline finished successfully!"
    ]

def get_security_checks() -> List[Dict[str, Any]]:
    return [
        {
            "id": "sec-01",
            "title": "HTTPS Enforced",
            "status": "PASSED",
            "category": "Network",
            "description": "TLS 1.3 encryption enabled with Let's Encrypt certificate and automated HTTP->HTTPS redirect."
        },
        {
            "id": "sec-02",
            "title": "Kubernetes RBAC Enabled",
            "status": "PASSED",
            "category": "Access Control",
            "description": "Role-Based Access Control configured with minimal ServiceAccount permissions."
        },
        {
            "id": "sec-03",
            "title": "Container Registry Authentication",
            "status": "PASSED",
            "category": "Registry",
            "description": "Private registry image pull secrets required and authenticated via short-lived JWT tokens."
        },
        {
            "id": "sec-04",
            "title": "Secrets Managed Securely",
            "status": "PASSED",
            "category": "Secrets",
            "description": "Zero hardcoded credentials in codebase. Configured with Kubernetes Secrets and environment variables."
        },
        {
            "id": "sec-05",
            "title": "Container Vulnerability Scan Passed",
            "status": "PASSED",
            "category": "Container",
            "description": "Trivy container image scan completed with 0 critical or high CVEs detected."
        },
        {
            "id": "sec-06",
            "title": "Non-Root Container Execution",
            "status": "PASSED",
            "category": "Container",
            "description": "Container executes under unprivileged UID 10001 (appuser)."
        }
    ]

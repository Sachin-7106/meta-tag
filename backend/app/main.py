import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse

from app.models import MetaTagInput, MetaTagOutput
from app.generator import generate_meta_tags
from app.devops_data import (
    is_demo_mode,
    get_pipeline_stages,
    get_deployments_history,
    get_kubernetes_status,
    get_infrastructure_data,
    get_ansible_data,
    get_live_logs,
    get_security_checks,
)

app = FastAPI(
    title="MetaForge Automated DevOps Platform API",
    description="Backend API for Meta Tag Generator and SRE DevOps Control Plane",
    version="1.4.2"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "service": "MetaForge Automated DevOps Platform API",
        "version": "1.4.2",
        "status": "healthy",
        "demo_mode": is_demo_mode(),
        "endpoints": [
            "/api/health",
            "/api/generate",
            "/api/pipeline",
            "/api/deployments",
            "/api/kubernetes",
            "/api/infrastructure",
            "/api/ansible",
            "/api/logs",
            "/api/security"
        ]
    }

@app.get("/api/health")
def get_health():
    return {
        "status": "HEALTHY",
        "service": "metatag-generator-backend",
        "version": "v1.4.2",
        "uptime": "99.98%",
        "demo_mode": is_demo_mode(),
        "environment": os.environ.get("APP_ENV", "production"),
        "timestamp": os.popen("date /t").read().strip() if os.name == 'nt' else os.popen("date").read().strip()
    }

@app.post("/api/generate", response_model=MetaTagOutput)
def api_generate_meta_tags(data: MetaTagInput):
    try:
        output = generate_meta_tags(data)
        return output
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/pipeline")
def api_get_pipeline():
    return {
        "demo_mode": is_demo_mode(),
        "environment": "PRODUCTION",
        "branch": "main",
        "latest_commit": "a82f91c",
        "deployment_status": "LIVE",
        "system_health": "HEALTHY",
        "stages": get_pipeline_stages()
    }

@app.get("/api/deployments")
def api_get_deployments():
    return {
        "demo_mode": is_demo_mode(),
        "deployments": get_deployments_history()
    }

@app.get("/api/kubernetes")
def api_get_kubernetes():
    data = get_kubernetes_status()
    data["demo_mode"] = is_demo_mode()
    return data

@app.get("/api/infrastructure")
def api_get_infrastructure():
    data = get_infrastructure_data()
    data["demo_mode"] = is_demo_mode()
    return data

@app.get("/api/ansible")
def api_get_ansible():
    data = get_ansible_data()
    data["demo_mode"] = is_demo_mode()
    return data

@app.get("/api/logs")
def api_get_logs():
    return {
        "demo_mode": is_demo_mode(),
        "logs": get_live_logs()
    }

@app.get("/api/security")
def api_get_security():
    return {
        "demo_mode": is_demo_mode(),
        "checks": get_security_checks()
    }

# Check if frontend static build exists and serve it
static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
if os.path.exists(static_dir):
    app.mount("/assets", StaticFiles(directory=os.path.join(static_dir, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="API route not found")
        file_path = os.path.join(static_dir, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(static_dir, "index.html"))

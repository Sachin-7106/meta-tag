from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "HEALTHY"
    assert "version" in data
    assert data["service"] == "metatag-generator-backend"

def test_generate_meta_tags_valid():
    payload = {
        "title": "MetaForge - DevOps Platform",
        "description": "Automated DevOps Pipeline & Meta Tag Generator Platform for Modern Web Engineering",
        "url": "https://metaforge.dev",
        "image_url": "https://metaforge.dev/banner.png",
        "twitter_card_type": "summary_large_image",
        "site_name": "MetaForge",
        "author": "DevOps Team",
        "keywords": "devops, kubernetes, terraform, meta tags, cicd",
        "robots": "index, follow",
        "theme_color": "#0f172a"
    }
    response = client.post("/api/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "<title>MetaForge - DevOps Platform</title>" in data["html"]
    assert '<meta name="description" content="Automated DevOps Pipeline &amp; Meta Tag Generator Platform for Modern Web Engineering" />' in data["html"]
    assert '<meta property="og:title" content="MetaForge - DevOps Platform" />' in data["html"]
    assert '<meta name="twitter:card" content="summary_large_image" />' in data["html"]
    assert data["tag_count"] > 5
    assert len(data["validation_warnings"]) == 0

def test_generate_meta_tags_empty_validation():
    payload = {
        "title": "",
        "description": "",
        "url": "invalid-url",
        "image_url": "invalid-image"
    }
    response = client.post("/api/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert len(data["validation_warnings"]) > 0
    assert any("Page Title is empty" in w for w in data["validation_warnings"])
    assert any("Meta Description is empty" in w for w in data["validation_warnings"])

def test_devops_endpoints():
    endpoints = ["/api/pipeline", "/api/deployments", "/api/kubernetes", "/api/infrastructure", "/api/ansible", "/api/logs", "/api/security"]
    for ep in endpoints:
        res = client.get(ep)
        assert res.status_code == 200, f"Endpoint {ep} failed"
        json_data = res.json()
        assert "demo_mode" in json_data

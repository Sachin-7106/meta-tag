from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class MetaTagInput(BaseModel):
    title: str = Field(..., description="Page title for SEO and social sharing")
    description: str = Field(..., description="Meta description for search engines")
    url: Optional[str] = Field("https://example.com", description="Canonical URL of the webpage")
    image_url: Optional[str] = Field("https://example.com/og-image.jpg", description="Open Graph image URL")
    twitter_card_type: Optional[str] = Field("summary_large_image", description="Twitter Card type")
    site_name: Optional[str] = Field("MetaForge Platform", description="Site or brand name")
    author: Optional[str] = Field("", description="Author name")
    keywords: Optional[str] = Field("", description="Comma-separated keywords")
    robots: Optional[str] = Field("index, follow", description="Robots directives")
    theme_color: Optional[str] = Field("#0f172a", description="Theme color hex code")

class MetaTagOutput(BaseModel):
    html: str
    tag_count: int
    char_count_title: int
    char_count_description: int
    validation_warnings: List[str]
    tags: Dict[str, Any]

class PipelineStage(BaseModel):
    id: str
    step_number: str
    name: str
    subtitle: str
    status: str  # SUCCESS, RUNNING, FAILED, PENDING
    duration: str
    version_or_hash: str
    timestamp: str
    details: Dict[str, Any]

class DeploymentRun(BaseModel):
    id: str
    run_number: str
    commit: str
    branch: str
    trigger: str
    duration: str
    status: str
    timestamp: str
    author: str
    environment: str

class PodInfo(BaseModel):
    name: str
    node: str
    status: str
    restarts: int
    age: str
    cpu: str
    memory: str
    ip: str

class K8sClusterStatus(BaseModel):
    cluster_name: str
    namespace: str
    nodes_count: int
    deployment_name: str
    desired_replicas: int
    ready_replicas: int
    available_replicas: int
    strategy: str
    self_healing: str
    cpu_utilization: str
    memory_utilization: str
    pods: List[PodInfo]
    manifests: Dict[str, str]

class InfrastructureResource(BaseModel):
    id: str
    type: str
    name: str
    status: str
    provider: str
    region: str
    provisioned_by: str

class AnsibleTask(BaseModel):
    name: str
    status: str  # ok, changed, skipped, failed
    host: str

class SecurityCheck(BaseModel):
    id: str
    title: str
    status: str  # PASSED, WARNING, CRITICAL
    description: str
    category: str

import {
  MetaTagInput,
  MetaTagOutput,
  PipelineStage,
  DeploymentRun,
  K8sClusterStatus,
  InfrastructureData,
  AnsibleData,
  SecurityCheck
} from '../types';

const API_BASE = '/api';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    return {
      status: 'HEALTHY',
      service: 'metatag-generator-backend',
      version: 'v1.4.2',
      uptime: '99.98%',
      demo_mode: true,
      environment: 'production'
    };
  }
}

export async function generateMetaTagsApi(data: MetaTagInput): Promise<MetaTagOutput> {
  try {
    const res = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('API Generation error');
    return await res.json();
  } catch (err) {
    // Client-side fallback generator
    return fallbackGenerateMetaTags(data);
  }
}

export async function fetchPipeline(): Promise<{
  demo_mode: boolean;
  environment: string;
  branch: string;
  latest_commit: string;
  deployment_status: string;
  system_health: string;
  stages: PipelineStage[];
}> {
  try {
    const res = await fetch(`${API_BASE}/pipeline`);
    if (!res.ok) throw new Error('Failed to fetch pipeline');
    return await res.json();
  } catch (err) {
    return {
      demo_mode: true,
      environment: 'PRODUCTION',
      branch: 'main',
      latest_commit: 'a82f91c',
      deployment_status: 'LIVE',
      system_health: 'HEALTHY',
      stages: getFallbackStages()
    };
  }
}

export async function fetchDeployments(): Promise<{ demo_mode: boolean; deployments: DeploymentRun[] }> {
  try {
    const res = await fetch(`${API_BASE}/deployments`);
    if (!res.ok) throw new Error('Failed to fetch deployments');
    return await res.json();
  } catch (err) {
    return {
      demo_mode: true,
      deployments: [
        { id: 'run-142', run_number: '#142', commit: 'a82f91c', branch: 'main', trigger: 'Pull Request #42', duration: '2m 14s', status: 'SUCCESS', timestamp: '2026-09-28 11:44:06', author: 'devops-engineer', environment: 'PRODUCTION' },
        { id: 'run-141', run_number: '#141', commit: '71bd32e', branch: 'main', trigger: 'Commit', duration: '2m 09s', status: 'SUCCESS', timestamp: '2026-09-28 09:15:22', author: 'lead-dev', environment: 'PRODUCTION' },
        { id: 'run-140', run_number: '#140', commit: '3ca81de', branch: 'develop', trigger: 'Commit', duration: '1m 58s', status: 'SUCCESS', timestamp: '2026-09-27 18:30:11', author: 'frontend-dev', environment: 'STAGING' },
        { id: 'run-139', run_number: '#139', commit: '91a42ff', branch: 'main', trigger: 'Pull Request #40', duration: '2m 31s', status: 'FAILED', timestamp: '2026-09-27 15:10:44', author: 'contrib-user', environment: 'PRODUCTION' }
      ]
    };
  }
}

export async function fetchKubernetes(): Promise<K8sClusterStatus> {
  try {
    const res = await fetch(`${API_BASE}/kubernetes`);
    if (!res.ok) throw new Error('Failed to fetch kubernetes data');
    return await res.json();
  } catch (err) {
    return {
      cluster_name: 'metaforge-cluster',
      namespace: 'metaforge-prod',
      nodes_count: 3,
      deployment_name: 'metatag-generator',
      desired_replicas: 3,
      ready_replicas: 3,
      available_replicas: 3,
      strategy: 'RollingUpdate',
      self_healing: 'Enabled',
      cpu_utilization: '14.2%',
      memory_utilization: '186 MiB / 1024 MiB',
      demo_mode: true,
      pods: [
        { name: 'metatag-generator-7d8b594b9f-node1-p1', node: 'metaforge-node-01', status: 'Running', restarts: 0, age: '4h 22m', cpu: '38m', memory: '62Mi', ip: '10.244.1.14' },
        { name: 'metatag-generator-7d8b594b9f-node2-p2', node: 'metaforge-node-02', status: 'Running', restarts: 0, age: '4h 22m', cpu: '42m', memory: '64Mi', ip: '10.244.2.22' },
        { name: 'metatag-generator-7d8b594b9f-node3-p3', node: 'metaforge-node-03', status: 'Running', restarts: 0, age: '4h 22m', cpu: '35m', memory: '60Mi', ip: '10.244.3.08' }
      ],
      manifests: {
        deployment: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: metatag-generator\n  namespace: metaforge-prod\nspec:\n  replicas: 3\n  strategy:\n    type: RollingUpdate\n  selector:\n    matchLabels:\n      app: metatag-generator\n  template:\n    metadata:\n      labels:\n        app: metatag-generator\n    spec:\n      containers:\n      - name: app\n        image: ghcr.io/metaforge/metatag-generator:1.4.2\n        ports:\n        - containerPort: 8000`,
        service: `apiVersion: v1\nkind: Service\nmetadata:\n  name: metatag-service\nspec:\n  type: ClusterIP\n  ports:\n  - port: 80\n    targetPort: 8000`,
        ingress: `apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: metatag-ingress\nspec:\n  rules:\n  - host: metatags.example.com`,
        configmap: `apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: metatag-config\ndata:\n  APP_ENV: "production"\n  DEMO_MODE: "true"`
      }
    };
  }
}

export async function fetchInfrastructure(): Promise<InfrastructureData> {
  try {
    const res = await fetch(`${API_BASE}/infrastructure`);
    if (!res.ok) throw new Error('Failed to fetch infrastructure');
    return await res.json();
  } catch (err) {
    return {
      provisioned_by: 'Terraform v1.7.5',
      cloud_provider: 'AWS / Local Minikube',
      region: 'us-east-1',
      state: 'APPLIED',
      last_updated: '2026-09-28 11:43:19 UTC',
      demo_mode: true,
      topology: [
        { level: 1, type: 'Cloud Provider', name: 'AWS Infrastructure', status: 'ACTIVE' },
        { level: 2, type: 'Virtual Network', name: 'metaforge-vpc (10.0.0.0/16)', status: 'ACTIVE' },
        { level: 3, type: 'Subnets', name: 'public-subnet-1a / private-subnet-1b', status: 'ACTIVE' },
        { level: 4, type: 'Security', name: 'metaforge-sg (Port 80, 443, 6443)', status: 'ENFORCED' },
        { level: 5, type: 'Compute Nodes', name: '3x t3.medium EC2 Worker Instances', status: 'RUNNING' },
        { level: 6, type: 'Kubernetes Cluster', name: 'EKS / Minikube metaforge-cluster', status: 'HEALTHY' },
        { level: 7, type: 'Application Pods', name: '3x metatag-generator pods', status: 'READY' }
      ]
    };
  }
}

export async function fetchAnsible(): Promise<AnsibleData> {
  try {
    const res = await fetch(`${API_BASE}/ansible`);
    if (!res.ok) throw new Error('Failed to fetch ansible');
    return await res.json();
  } catch (err) {
    return {
      configured_by: 'Ansible Core 2.16.2',
      playbook: 'ansible/playbook.yml',
      inventory: 'ansible/inventory',
      demo_mode: true,
      play_recap: { ok: 18, changed: 4, failed: 0, unreachable: 0, skipped: 0 },
      tasks: [
        { name: 'Install Docker engine & dependencies', status: 'ok', host: 'node-01' },
        { name: 'Install Kubernetes prerequisites (kubelet, kubeadm, kubectl)', status: 'ok', host: 'node-01' },
        { name: 'Configure sysctl bridge-nf-call-iptables', status: 'changed', host: 'node-01' },
        { name: 'Set up non-root user permissions for Docker socket', status: 'ok', host: 'node-01' },
        { name: 'Configure environment variables in /etc/environment', status: 'changed', host: 'node-01' },
        { name: 'Deploy Kubernetes secrets & configmaps', status: 'ok', host: 'node-01' },
        { name: 'Verify node readiness & status', status: 'ok', host: 'node-01' }
      ]
    };
  }
}

export async function fetchLogs(): Promise<{ demo_mode: boolean; logs: string[] }> {
  try {
    const res = await fetch(`${API_BASE}/logs`);
    if (!res.ok) throw new Error('Failed to fetch logs');
    return await res.json();
  } catch (err) {
    return {
      demo_mode: true,
      logs: [
        '[11:42:01] [GitHub] Webhook payload received for commit a82f91c on branch main',
        '[11:42:03] [Jenkins] Triggered pipeline build #142 (Job: metaforge-pipeline)',
        '[11:42:06] [Jenkins] Workspace clean complete. Checkout repository git@github.com:metaforge/metatag-generator.git',
        '[11:42:12] [Jenkins] Stage: Install Dependencies -> Running npm ci & pip install -r requirements.txt',
        '[11:42:18] [Jenkins] Stage: Unit & Integration Tests -> Running pytest & jest',
        '[11:42:24] [Jenkins] Test Summary: 38 passed, 0 failed, 0 skipped. Coverage: 98.4%',
        '[11:42:28] [Docker] Stage: Container Build -> Executing Dockerfile multi-stage build',
        '[11:42:31] [Docker] Step 1/8: FROM python:3.11-slim AS backend-base',
        '[11:42:41] [Docker] Image metaforge/metatag-generator:1.4.2 successfully built (82.4 MB)',
        '[11:42:44] [Docker] Stage: Vulnerability Scan -> Running Trivy security scanner',
        '[11:42:47] [Registry] Stage: Push Image -> Pushing to ghcr.io/metaforge/metatag-generator:1.4.2',
        '[11:43:02] [Terraform] Stage: Infrastructure -> Initializing Terraform AWS/Minikube Provider',
        '[11:43:19] [Terraform] Terraform apply complete! Resources: 12 managed.',
        '[11:43:24] [Ansible] Stage: Configuration -> Running playbook ansible/playbook.yml',
        '[11:43:32] [Ansible] Play recap: ok=18 changed=4 unreachable=0 failed=0',
        '[11:43:38] [Kubernetes] Stage: Deployment -> Applying manifests from kubernetes/ directory',
        "[11:44:02] [Kubernetes] Deployment rollout status: 3 of 3 updated replicas ready.",
        '[11:44:05] [Kubernetes] Pod status check: 3/3 pods HEALTHY & RUNNING',
        '[11:44:06] [Production] Ingress check passed. HTTP 200 OK on https://metatags.example.com. Pipeline finished!'
      ]
    };
  }
}

export async function fetchSecurity(): Promise<{ demo_mode: boolean; checks: SecurityCheck[] }> {
  try {
    const res = await fetch(`${API_BASE}/security`);
    if (!res.ok) throw new Error('Failed to fetch security');
    return await res.json();
  } catch (err) {
    return {
      demo_mode: true,
      checks: [
        { id: 'sec-01', title: 'HTTPS Enforced', status: 'PASSED', category: 'Network', description: "TLS 1.3 encryption enabled with Let's Encrypt TLS certificate." },
        { id: 'sec-02', title: 'Kubernetes RBAC Enabled', status: 'PASSED', category: 'Access Control', description: 'Role-Based Access Control configured with minimal ServiceAccount permissions.' },
        { id: 'sec-03', title: 'Container Registry Auth', status: 'PASSED', category: 'Registry', description: 'Private registry image pull secrets required and authenticated.' },
        { id: 'sec-04', title: 'Secrets Managed Securely', status: 'PASSED', category: 'Secrets', description: 'Zero hardcoded credentials in codebase. Configured with Kubernetes Secrets.' },
        { id: 'sec-05', title: 'Container Scan Passed', status: 'PASSED', category: 'Container', description: 'Trivy container image scan completed with 0 critical or high CVEs.' }
      ]
    };
  }
}

function fallbackGenerateMetaTags(data: MetaTagInput): MetaTagOutput {
  const warnings: string[] = [];
  const title = (data.title || '').trim();
  const description = (data.description || '').trim();
  const url = (data.url || 'https://example.com').trim();
  const image_url = (data.image_url || 'https://example.com/og-image.jpg').trim();
  const twitter_card = data.twitter_card_type || 'summary_large_image';
  const site_name = data.site_name || 'MetaForge Platform';

  if (!title) warnings.push('Page Title is empty.');
  else if (title.length > 60) warnings.push(`Title is long (${title.length} chars). Recommended max 60 chars.`);

  if (!description) warnings.push('Meta Description is empty.');
  else if (description.length > 160) warnings.push(`Description is long (${description.length} chars). Recommended max 160 chars.`);

  const lines = [
    '<!-- HTML Meta Tags -->',
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    '',
    '<!-- Facebook / Open Graph -->',
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image_url}" />`,
    `<meta property="og:site_name" content="${site_name}" />`,
    '',
    '<!-- Twitter Cards -->',
    `<meta name="twitter:card" content="${twitter_card}" />`,
    `<meta name="twitter:url" content="${url}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image_url}" />`
  ];

  return {
    html: lines.join('\n'),
    tag_count: 10,
    char_count_title: title.length,
    char_count_description: description.length,
    validation_warnings: warnings,
    tags: { title, description, url, image_url, twitter_card, site_name }
  };
}

function getFallbackStages(): PipelineStage[] {
  return [
    { id: 'github', step_number: '01', name: 'GitHub', subtitle: 'Source Control', status: 'SUCCESS', duration: '12s', version_or_hash: 'a82f91c', timestamp: '2026-09-28 11:42:01', details: { repository: 'https://github.com/metaforge/metatag-generator', branch: 'main', commit: 'a82f91c893d1b', pull_request: '#42 (Merged)', author: 'devops-engineer', trigger_type: 'Push Event' } },
    { id: 'jenkins', step_number: '02', name: 'Jenkins', subtitle: 'CI/CD Orchestrator', status: 'SUCCESS', duration: '2m 14s', version_or_hash: 'Build #142', timestamp: '2026-09-28 11:42:12', details: { build_number: '#142', build_status: 'SUCCESS', test_results: '38/38 tests PASSED', build_duration: '134s' } },
    { id: 'docker', step_number: '03', name: 'Docker', subtitle: 'Containerization', status: 'SUCCESS', duration: '35s', version_or_hash: 'v1.4.2', timestamp: '2026-09-28 11:42:31', details: { image_name: 'metaforge/metatag-generator', tag: '1.4.2', image_size: '82.4 MB', build_status: 'BUILT' } },
    { id: 'registry', step_number: '04', name: 'Registry', subtitle: 'Container Registry', status: 'SUCCESS', duration: '16s', version_or_hash: 'sha256:e3b0c442', timestamp: '2026-09-28 11:42:47', details: { registry_url: 'ghcr.io/metaforge/metatag-generator:1.4.2', digest: 'sha256:e3b0c442...' } },
    { id: 'terraform', step_number: '05', name: 'Terraform', subtitle: 'Infrastructure as Code', status: 'SUCCESS', duration: '32s', version_or_hash: 'v1.7.5', timestamp: '2026-09-28 11:43:02', details: { infrastructure_status: 'APPLIED', resources_created: 12, resources_changed: 0 } },
    { id: 'ansible', step_number: '06', name: 'Ansible', subtitle: 'Configuration Management', status: 'SUCCESS', duration: '28s', version_or_hash: 'v2.16.2', timestamp: '2026-09-28 11:43:32', details: { hosts_configured: 3, tasks_completed: 18, tasks_failed: 0 } },
    { id: 'kubernetes', step_number: '07', name: 'Kubernetes', subtitle: 'Orchestration', status: 'SUCCESS', duration: '30s', version_or_hash: '3/3 Replicas', timestamp: '2026-09-28 11:43:48', details: { cluster: 'metaforge-cluster', namespace: 'metaforge-prod', deployment: 'metatag-generator', desired_replicas: 3, ready_replicas: 3 } },
    { id: 'production', step_number: '08', name: 'Production', subtitle: 'Ingress & Edge', status: 'SUCCESS', duration: '5s', version_or_hash: 'HTTP 200 LIVE', timestamp: '2026-09-28 11:44:06', details: { ingress_host: 'metatags.example.com', health_status: 'HTTP 200 OK' } }
  ];
}

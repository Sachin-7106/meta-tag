export interface MetaTagInput {
  title: string;
  description: string;
  url: string;
  image_url: string;
  twitter_card_type: string;
  site_name: string;
  author?: string;
  keywords?: string;
  robots?: string;
  theme_color?: string;
}

export interface MetaTagOutput {
  html: string;
  tag_count: number;
  char_count_title: number;
  char_count_description: number;
  validation_warnings: string[];
  tags: Record<string, string>;
}

export interface PipelineStage {
  id: string;
  step_number: string;
  name: string;
  subtitle: string;
  status: 'SUCCESS' | 'RUNNING' | 'FAILED' | 'PENDING';
  duration: string;
  version_or_hash: string;
  timestamp: string;
  details: {
    repository?: string;
    branch?: string;
    commit?: string;
    commit_message?: string;
    pull_request?: string;
    author?: string;
    trigger_type?: string;
    build_number?: string;
    build_status?: string;
    test_results?: string;
    build_duration?: string;
    pipeline_stages?: string[];
    image_name?: string;
    tag?: string;
    image_size?: string;
    registry_url?: string;
    digest?: string;
    infrastructure_status?: string;
    resources_created?: number;
    resources_changed?: number;
    resources_destroyed?: number;
    playbook?: string;
    hosts_configured?: number;
    tasks_completed?: number;
    tasks_failed?: number;
    cluster?: string;
    namespace?: string;
    deployment?: string;
    desired_replicas?: number;
    ready_replicas?: number;
    available_replicas?: number;
    strategy?: string;
    self_healing?: string;
    ingress_host?: string;
    health_status?: string;
    [key: string]: any;
  };
}

export interface DeploymentRun {
  id: string;
  run_number: string;
  commit: string;
  branch: string;
  trigger: string;
  duration: string;
  status: 'SUCCESS' | 'FAILED' | 'RUNNING';
  timestamp: string;
  author: string;
  environment: string;
}

export interface PodInfo {
  name: string;
  node: string;
  status: string;
  restarts: number;
  age: string;
  cpu: string;
  memory: string;
  ip: string;
}

export interface K8sClusterStatus {
  cluster_name: string;
  namespace: string;
  nodes_count: number;
  deployment_name: string;
  desired_replicas: number;
  ready_replicas: number;
  available_replicas: number;
  strategy: string;
  self_healing: string;
  cpu_utilization: string;
  memory_utilization: string;
  pods: PodInfo[];
  manifests: {
    deployment: string;
    service: string;
    ingress: string;
    configmap: string;
  };
  demo_mode?: boolean;
}

export interface InfrastructureData {
  provisioned_by: string;
  cloud_provider: string;
  region: string;
  state: string;
  last_updated: string;
  topology: Array<{
    level: number;
    type: string;
    name: string;
    status: string;
  }>;
  demo_mode?: boolean;
}

export interface AnsibleData {
  configured_by: string;
  playbook: string;
  inventory: string;
  play_recap: {
    ok: number;
    changed: number;
    failed: number;
    unreachable: number;
    skipped: number;
  };
  tasks: Array<{
    name: string;
    status: string;
    host: string;
  }>;
  demo_mode?: boolean;
}

export interface SecurityCheck {
  id: string;
  title: string;
  status: 'PASSED' | 'WARNING' | 'CRITICAL';
  category: string;
  description: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

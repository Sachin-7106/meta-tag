import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/Toast';
import { StageDetailModal } from './components/StageDetailModal';
import { RollbackModal } from './components/RollbackModal';
import { MetaTagGenerator } from './components/MetaTagGenerator';

import { OverviewPage } from './pages/OverviewPage';
import { DashboardPage } from './pages/DashboardPage';
import { PipelinesPage } from './pages/PipelinesPage';
import { DeploymentsPage } from './pages/DeploymentsPage';
import { KubernetesPage } from './pages/KubernetesPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { AnsiblePage } from './pages/AnsiblePage';
import { SecurityPage } from './pages/SecurityPage';
import { LogsPage } from './pages/LogsPage';
import { SettingsPage } from './pages/SettingsPage';

import {
  fetchPipeline,
  fetchDeployments,
  fetchKubernetes,
  fetchInfrastructure,
  fetchAnsible,
  fetchLogs,
  fetchSecurity
} from './api/client';

import {
  PipelineStage,
  DeploymentRun,
  K8sClusterStatus,
  InfrastructureData,
  AnsibleData,
  SecurityCheck,
  ToastMessage
} from './types';

export function App() {
  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [deployments, setDeployments] = useState<DeploymentRun[]>([]);
  const [k8sData, setK8sData] = useState<K8sClusterStatus | null>(null);
  const [infraData, setInfraData] = useState<InfrastructureData | null>(null);
  const [ansibleData, setAnsibleData] = useState<AnsibleData | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [securityChecks, setSecurityChecks] = useState<SecurityCheck[]>([]);

  const [selectedStage, setSelectedStage] = useState<PipelineStage | null>(null);
  const [isRollbackOpen, setIsRollbackOpen] = useState(false);
  const [isTriggering, setIsTriggering] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loadData = async () => {
    try {
      const p = await fetchPipeline();
      setStages(p.stages);
      setDemoMode(p.demo_mode);

      const d = await fetchDeployments();
      setDeployments(d.deployments);

      const k = await fetchKubernetes();
      setK8sData(k);

      const i = await fetchInfrastructure();
      setInfraData(i);

      const a = await fetchAnsible();
      setAnsibleData(a);

      const l = await fetchLogs();
      setLogs(l.logs);

      const s = await fetchSecurity();
      setSecurityChecks(s.checks);
    } catch (e) {
      console.error('Failed to load telemetry', e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTriggerPipeline = () => {
    setIsTriggering(true);
    showToast('Jenkins Pipeline #143 triggered via GitHub Webhook', 'info');
    setTimeout(() => {
      setIsTriggering(false);
      const newRun: DeploymentRun = {
        id: `run-${Date.now()}`,
        run_number: `#${deployments.length + 140}`,
        commit: 'e91c42f',
        branch: 'main',
        trigger: 'Manual Trigger',
        duration: '2m 05s',
        status: 'SUCCESS',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        author: 'devops-operator',
        environment: 'PRODUCTION'
      };
      setDeployments((prev) => [newRun, ...prev]);
      setLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Pipeline #143 completed successfully. 3/3 pods healthy.`,
        ...prev
      ]);
      showToast('Pipeline execution succeeded! Deployment updated.', 'success');
    }, 2000);
  };

  const handleRollbackConfirm = () => {
    showToast('Kubernetes rollback executed successfully! Rolled back to #141.', 'success');
    setLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] kubectl rollout undo deployment/metatag-generator --to-revision=141 completed.`,
      ...prev
    ]);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
        
        {/* Top Navbar */}
        <Navbar
          demoMode={demoMode}
          onToggleDemoMode={() => setDemoMode(!demoMode)}
          onTriggerPipeline={handleTriggerPipeline}
          onOpenRollback={() => setIsRollbackOpen(true)}
          isTriggering={isTriggering}
        />

        {/* Main Workspace Layout */}
        <div className="flex flex-1">
          <Sidebar />

          <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
            <Routes>
              <Route
                path="/"
                element={
                  <OverviewPage
                    stages={stages}
                    k8sData={k8sData || {
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
                      memory_utilization: '186 MiB',
                      pods: [],
                      manifests: { deployment: '', service: '', ingress: '', configmap: '' }
                    }}
                    infraData={infraData || { provisioned_by: 'Terraform', cloud_provider: 'AWS', region: 'us-east-1', state: 'APPLIED', last_updated: '', topology: [] }}
                    demoMode={demoMode}
                  />
                }
              />

              <Route
                path="/generator"
                element={<MetaTagGenerator onShowToast={showToast} />}
              />

              <Route
                path="/dashboard"
                element={
                  <DashboardPage
                    stages={stages}
                    deployments={deployments}
                    logs={logs}
                    onSelectStage={(stg) => setSelectedStage(stg)}
                    onSelectRun={(run) => {
                      showToast(`Viewing details for run ${run.run_number}`, 'info');
                    }}
                    onShowToast={showToast}
                    demoMode={demoMode}
                  />
                }
              />

              <Route
                path="/pipelines"
                element={<PipelinesPage stages={stages} onSelectStage={(stg) => setSelectedStage(stg)} />}
              />

              <Route
                path="/deployments"
                element={
                  <DeploymentsPage
                    deployments={deployments}
                    onSelectRun={(run) => showToast(`Selected run ${run.run_number}`, 'info')}
                  />
                }
              />

              <Route
                path="/kubernetes"
                element={
                  k8sData ? (
                    <KubernetesPage data={k8sData} onShowToast={showToast} />
                  ) : (
                    <div className="text-slate-400 p-8">Loading Kubernetes cluster telemetry...</div>
                  )
                }
              />

              <Route
                path="/infrastructure"
                element={
                  infraData ? (
                    <InfrastructurePage data={infraData} />
                  ) : (
                    <div className="text-slate-400 p-8">Loading Infrastructure topology...</div>
                  )
                }
              />

              <Route
                path="/ansible"
                element={
                  ansibleData ? (
                    <AnsiblePage data={ansibleData} />
                  ) : (
                    <div className="text-slate-400 p-8">Loading Ansible play recap...</div>
                  )
                }
              />

              <Route
                path="/security"
                element={<SecurityPage checks={securityChecks} />}
              />

              <Route
                path="/logs"
                element={<LogsPage logs={logs} onShowToast={showToast} />}
              />

              <Route
                path="/settings"
                element={
                  <SettingsPage
                    demoMode={demoMode}
                    onToggleDemoMode={() => setDemoMode(!demoMode)}
                    onShowToast={showToast}
                  />
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        {/* Modals & Toasts */}
        <StageDetailModal stage={selectedStage} onClose={() => setSelectedStage(null)} />
        <RollbackModal
          isOpen={isRollbackOpen}
          onClose={() => setIsRollbackOpen(false)}
          onConfirm={handleRollbackConfirm}
        />
        <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      </div>
    </BrowserRouter>
  );
}

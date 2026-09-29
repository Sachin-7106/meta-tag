import React, { useState } from 'react';
import {
  Box,
  Server,
  Activity,
  Cpu,
  HardDrive,
  RefreshCw,
  CheckCircle2,
  FileCode,
  Copy,
  Check,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { K8sClusterStatus } from '../types';

interface K8sViewProps {
  data: K8sClusterStatus;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const K8sView: React.FC<K8sViewProps> = ({ data, onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'topology' | 'manifests'>('topology');
  const [selectedManifest, setSelectedManifest] = useState<'deployment' | 'service' | 'ingress' | 'configmap'>('deployment');
  const [copied, setCopied] = useState(false);

  const handleCopyManifest = () => {
    const text = data.manifests[selectedManifest];
    navigator.clipboard.writeText(text);
    setCopied(true);
    onShowToast(`Kubernetes ${selectedManifest}.yaml copied!`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header telemetry card */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5 text-sky-400" />
              <h2 className="text-lg font-bold text-white">Kubernetes Cluster Control Plane</h2>
              {data.demo_mode && (
                <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-950/60 text-amber-400 border border-amber-800/60 rounded">
                  DEMO MODE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Production deployment topology, node metrics, self-healing status, and YAML manifest definitions.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('topology')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'topology' ? 'bg-slate-800 text-sky-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Cluster Topology & Pods
            </button>
            <button
              onClick={() => setActiveTab('manifests')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'manifests' ? 'bg-slate-800 text-sky-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              YAML Manifests
            </button>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono space-y-0.5">
            <div className="text-[10px] text-slate-500 uppercase">Cluster</div>
            <div className="text-xs font-bold text-slate-200 truncate">{data.cluster_name}</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono space-y-0.5">
            <div className="text-[10px] text-slate-500 uppercase">Namespace</div>
            <div className="text-xs font-bold text-purple-400 truncate">{data.namespace}</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono space-y-0.5">
            <div className="text-[10px] text-slate-500 uppercase">Replicas</div>
            <div className="text-xs font-bold text-emerald-400">
              {data.ready_replicas} / {data.desired_replicas} READY
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono space-y-0.5">
            <div className="text-[10px] text-slate-500 uppercase">Strategy</div>
            <div className="text-xs font-bold text-sky-300">{data.strategy}</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono space-y-0.5">
            <div className="text-[10px] text-slate-500 uppercase">CPU Usage</div>
            <div className="text-xs font-bold text-slate-200">{data.cpu_utilization}</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono space-y-0.5">
            <div className="text-[10px] text-slate-500 uppercase">Self-Healing</div>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{data.self_healing}</span>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'topology' ? (
        <div className="space-y-6">
          
          {/* Node Topology Cards (Section 7 Requirement) */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Server className="w-4 h-4 text-sky-400" />
              <span>Node & Pod Distribution Tree (3 Nodes)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['metaforge-node-01', 'metaforge-node-02', 'metaforge-node-03'].map((nodeName, idx) => {
                const pod = data.pods[idx];
                return (
                  <div key={nodeName} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 shadow-md">
                    
                    {/* Node Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-xs">
                      <div className="flex items-center gap-2 text-slate-200 font-bold">
                        <Server className="w-4 h-4 text-purple-400" />
                        <span>Node 0{idx + 1}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                        Ready
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 space-y-0.5">
                      <div>Host: {nodeName}</div>
                      <div>Internal IP: 10.244.0.{10 + idx}</div>
                    </div>

                    {/* Pod Container inside Node */}
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <div className="flex items-center gap-1.5 text-sky-300 font-semibold truncate max-w-[170px]">
                          <Box className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span className="truncate">{pod ? pod.name : `pod-node-${idx + 1}`}</span>
                        </div>
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                          <span>Running</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-900">
                        <div>CPU: {pod ? pod.cpu : '38m'}</div>
                        <div>RAM: {pod ? pod.memory : '62Mi'}</div>
                        <div>Restarts: {pod ? pod.restarts : 0}</div>
                        <div>Age: {pod ? pod.age : '4h 22m'}</div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Pod Metrics Table */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Live Application Pod Health & Metrics</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 px-3">POD NAME</th>
                    <th className="py-2.5 px-3">NODE</th>
                    <th className="py-2.5 px-3">STATUS</th>
                    <th className="py-2.5 px-3">POD IP</th>
                    <th className="py-2.5 px-3">CPU</th>
                    <th className="py-2.5 px-3">MEMORY</th>
                    <th className="py-2.5 px-3">AGE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {data.pods.map((pod) => (
                    <tr key={pod.name} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-sky-400">{pod.name}</td>
                      <td className="py-2.5 px-3 text-slate-400">{pod.node}</td>
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{pod.status}</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">{pod.ip}</td>
                      <td className="py-2.5 px-3 text-purple-300">{pod.cpu}</td>
                      <td className="py-2.5 px-3 text-amber-300">{pod.memory}</td>
                      <td className="py-2.5 px-3 text-slate-400">{pod.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : (
        /* YAML Manifest Inspector */
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-semibold text-slate-200">Kubernetes Declarative YAML Manifests</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                {(['deployment', 'service', 'ingress', 'configmap'] as const).map((mf) => (
                  <button
                    key={mf}
                    onClick={() => setSelectedManifest(mf)}
                    className={`px-2.5 py-1 rounded capitalize font-mono text-xs transition-colors ${
                      selectedManifest === mf ? 'bg-slate-800 text-sky-400 shadow-sm font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mf}.yaml
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopyManifest}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy YAML'}</span>
              </button>
            </div>
          </div>

          <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-sky-300 overflow-x-auto leading-relaxed max-h-[500px]">
            <code>{data.manifests[selectedManifest]}</code>
          </pre>
        </div>
      )}

    </div>
  );
};

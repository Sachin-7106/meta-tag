import React from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  GitBranch,
  Server,
  Box,
  Terminal,
  ShieldCheck,
  FileCode,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { PipelineStage } from '../types';

interface StageDetailModalProps {
  stage: PipelineStage | null;
  onClose: () => void;
}

export const StageDetailModal: React.FC<StageDetailModalProps> = ({ stage, onClose }) => {
  if (!stage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-sky-400 font-bold bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60">
              Stage {stage.step_number}
            </span>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>{stage.name}</span>
                <span className="text-xs text-slate-400 font-normal">({stage.subtitle})</span>
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs font-sans">
          
          {/* Status Banner */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-slate-200 uppercase tracking-wide">Status: {stage.status}</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{stage.duration}</span>
              </span>
              <span>•</span>
              <span>{stage.timestamp}</span>
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Stage Metadata & Telemetry
            </h4>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2.5 font-mono text-xs">
              {Object.entries(stage.details).map(([key, val]) => {
                if (Array.isArray(val)) {
                  return (
                    <div key={key} className="space-y-1">
                      <span className="text-slate-400 capitalize">{key.replace(/_/g, ' ')}:</span>
                      <ul className="pl-4 list-disc text-sky-300 space-y-0.5">
                        {val.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-900/80 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-slate-400 capitalize">{key.replace(/_/g, ' ')}:</span>
                    <span className="text-sky-300 font-medium break-all text-right">{String(val)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DevOps Explanation Note */}
          <div className="p-3 bg-sky-950/20 border border-sky-800/30 rounded-lg text-slate-300 leading-relaxed space-y-1">
            <div className="font-semibold text-sky-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>DevOps Pipeline Role</span>
            </div>
            <p className="text-[11px] text-slate-300">
              {stage.id === 'github' && 'Receives developer commits, triggers GitHub Webhook events, and maintains code integrity.'}
              {stage.id === 'jenkins' && 'Executes automated testing pipelines, compiles assets, and coordinates orchestration jobs.'}
              {stage.id === 'docker' && 'Packages application code into standardized OCI multi-stage minimal container images.'}
              {stage.id === 'registry' && 'Signs and pushes OCI container artifacts securely to private GitHub Container Registry.'}
              {stage.id === 'terraform' && 'Declaratively provisions cloud networks, EKS/Minikube cluster nodes, and security groups.'}
              {stage.id === 'ansible' && 'Configures worker nodes, runtime parameters, sysctl kernel limits, and host environments.'}
              {stage.id === 'kubernetes' && 'Deploys 3 container replicas with rolling updates, self-healing probes, and zero downtime.'}
              {stage.id === 'production' && 'Directs public traffic through Kubernetes NGINX Ingress controller with TLS encryption.'}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};

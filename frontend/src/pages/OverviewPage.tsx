import React from 'react';
import {
  Code,
  LayoutDashboard,
  Layers,
  Box,
  Server,
  GitBranch,
  Shield,
  Activity,
  CheckCircle2,
  ArrowRight,
  Zap,
  Globe,
  Cpu
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PipelineStage, K8sClusterStatus, InfrastructureData } from '../types';

interface OverviewPageProps {
  stages: PipelineStage[];
  k8sData: K8sClusterStatus;
  infraData: InfrastructureData;
  demoMode: boolean;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ stages, k8sData, infraData, demoMode }) => {
  return (
    <div className="space-y-6">
      
      {/* Banner Hero Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono bg-sky-950/80 text-sky-400 border border-sky-800/80 rounded uppercase font-semibold">
                College Mini-Project Platform
              </span>
              {demoMode && (
                <span className="px-2.5 py-0.5 text-[10px] font-mono bg-amber-950/80 text-amber-400 border border-amber-800/80 rounded uppercase font-semibold">
                  DEMO MODE ACTIVE
                </span>
              )}
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              MetaForge Automated DevOps Platform
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every code change to the Meta Tag Generator moves through an automated DevOps pipeline — from GitHub source control, through Jenkins CI/CD, Docker containerization, Terraform infrastructure provisioning, Ansible configuration, and Kubernetes deployment — resulting in a scalable, self-healing production application.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              to="/generator"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs transition-all shadow-lg shadow-sky-500/20"
            >
              <Code className="w-4 h-4" />
              <span>Launch Meta Tag Generator</span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
            >
              <LayoutDashboard className="w-4 h-4 text-sky-400" />
              <span>DevOps Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Section 22 Application + DevOps Connection Panel */}
        <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] text-slate-500">App Health</div>
            <div className="font-bold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>HEALTHY</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] text-slate-500">FastAPI Server</div>
            <div className="font-bold text-sky-400">ONLINE</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] text-slate-500">Database</div>
            <div className="font-bold text-slate-400">NOT REQUIRED</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] text-slate-500">K8s Pods</div>
            <div className="font-bold text-emerald-400">{k8sData.ready_replicas}/{k8sData.desired_replicas} READY</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] text-slate-500">Ingress Status</div>
            <div className="font-bold text-emerald-400">HTTP 200</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] text-slate-500">Version</div>
            <div className="font-bold text-purple-300">v1.4.2</div>
          </div>
        </div>

      </div>

      {/* KPI Cards (Section 27 Requirement) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Pipeline</div>
          <div className="text-sm font-bold text-emerald-400 font-mono">SUCCESS</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Jenkins Build</div>
          <div className="text-sm font-bold text-sky-400 font-mono">#142 PASSED</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Docker Image</div>
          <div className="text-sm font-bold text-purple-400 font-mono">v1.4.2 READY</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Infrastructure</div>
          <div className="text-sm font-bold text-emerald-400 font-mono">HEALTHY</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Kubernetes</div>
          <div className="text-sm font-bold text-emerald-400 font-mono">3/3 READY</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Application</div>
          <div className="text-sm font-bold text-emerald-400 font-mono">LIVE</div>
        </div>
      </div>

      {/* Quick Navigation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <Link to="/generator" className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-all space-y-2 group">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Code className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-sm text-white group-hover:text-sky-300 transition-colors">Meta Tag Generator</h3>
          <p className="text-xs text-slate-400">Generate real SEO, Open Graph & Twitter Card HTML with live previews.</p>
        </Link>

        <Link to="/pipelines" className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-all space-y-2 group">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">CI/CD Pipeline Flow</h3>
          <p className="text-xs text-slate-400">Inspect the 8 interactive stages from GitHub to Production edge ingress.</p>
        </Link>

        <Link to="/kubernetes" className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-all space-y-2 group">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Box className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors">Kubernetes Topology</h3>
          <p className="text-xs text-slate-400">Monitor 3 cluster nodes, live pod metrics, self-healing, and YAML manifests.</p>
        </Link>

        <Link to="/infrastructure" className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-all space-y-2 group">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Server className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-sm text-white group-hover:text-sky-300 transition-colors">Terraform Infrastructure</h3>
          <p className="text-xs text-slate-400">View provisioned virtual networks, subnets, EC2 nodes, and security rules.</p>
        </Link>

        <Link to="/ansible" className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-all space-y-2 group">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <GitBranch className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">Ansible Configuration</h3>
          <p className="text-xs text-slate-400">Review play recap, host preparation, Docker sockets, and system parameters.</p>
        </Link>

        <Link to="/security" className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-all space-y-2 group">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Shield className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">Security & Audit</h3>
          <p className="text-xs text-slate-400">Inspect zero plaintext secrets, HTTPS enforcement, Trivy scans, and RBAC.</p>
        </Link>

      </div>

    </div>
  );
};

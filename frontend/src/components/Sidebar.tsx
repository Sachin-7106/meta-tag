import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Code,
  LayoutDashboard,
  GitPullRequest,
  History,
  Box,
  Server,
  Terminal,
  Shield,
  Settings,
  GitBranch,
  Layers
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Overview', icon: Layers },
    { to: '/generator', label: 'Meta Tag Generator', icon: Code },
    { to: '/dashboard', label: 'DevOps Dashboard', icon: LayoutDashboard },
    { to: '/pipelines', label: 'Pipelines', icon: GitPullRequest },
    { to: '/deployments', label: 'Deployments', icon: History },
    { to: '/kubernetes', label: 'Kubernetes Cluster', icon: Box },
    { to: '/infrastructure', label: 'Infrastructure (IaC)', icon: Server },
    { to: '/ansible', label: 'Ansible Config', icon: GitBranch },
    { to: '/security', label: 'Security & Compliance', icon: Shield },
    { to: '/logs', label: 'Live Logs', icon: Terminal },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0b1120] border-r border-slate-800/80 shrink-0 hidden md:flex flex-col min-h-[calc(100vh-61px)]">
      <div className="p-4">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3 px-2 font-semibold">
          Platform Navigation
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer info box */}
      <div className="mt-auto p-4 border-t border-slate-800/80">
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] space-y-1">
          <div className="text-slate-400 font-medium">MetaForge Engine</div>
          <div className="font-mono text-slate-500 text-[10px]">FastAPI + React + K8s</div>
          <div className="flex items-center gap-1.5 text-emerald-400 pt-1 font-mono text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Cluster Healthy</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

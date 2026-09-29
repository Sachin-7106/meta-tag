import React from 'react';
import {
  Layers,
  GitBranch,
  GitCommit,
  Activity,
  CheckCircle2,
  RefreshCw,
  RotateCcw,
  Zap
} from 'lucide-react';

interface NavbarProps {
  demoMode: boolean;
  onToggleDemoMode: () => void;
  onTriggerPipeline: () => void;
  onOpenRollback: () => void;
  isTriggering: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  demoMode,
  onToggleDemoMode,
  onTriggerPipeline,
  onOpenRollback,
  isTriggering
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b1120]/90 border-b border-slate-800/80 backdrop-blur-md px-4 py-3">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 max-w-7xl mx-auto">
        
        {/* Title & Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">MetaForge</h1>
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase rounded bg-slate-800 text-sky-400 border border-slate-700">
                v1.4.2
              </span>
            </div>
            <p className="text-xs text-slate-400">Meta Tag Generator • DevOps Control Plane</p>
          </div>
        </div>

        {/* Telemetry Status Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          
          {/* Environment */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            <span className="text-slate-500">Env:</span>
            <span className="font-mono font-semibold text-emerald-400 uppercase">PRODUCTION</span>
          </div>

          {/* Branch */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            <GitBranch className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-500">Branch:</span>
            <span className="font-mono text-slate-200 font-medium">main</span>
          </div>

          {/* Commit */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            <GitCommit className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-500">Commit:</span>
            <span className="font-mono text-purple-300">a82f91c</span>
          </div>

          {/* Deployment Status */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400">Status:</span>
            <span className="font-mono font-semibold text-emerald-400">LIVE</span>
          </div>

          {/* System Health */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-500">Health:</span>
            <span className="font-mono text-emerald-400 font-medium">HEALTHY</span>
          </div>

          {/* Demo Mode Badge */}
          <button
            onClick={onToggleDemoMode}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-all border ${
              demoMode
                ? 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-900/50'
                : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50'
            }`}
            title="Click to toggle Demo Mode setting"
          >
            <Zap className={`w-3.5 h-3.5 ${demoMode ? 'text-amber-400' : 'text-emerald-400'}`} />
            <span>{demoMode ? 'DEMO MODE' : 'LIVE INTEGRATION'}</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenRollback}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-colors"
            title="Rollback Kubernetes Deployment"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Rollback</span>
          </button>

          <button
            onClick={onTriggerPipeline}
            disabled={isTriggering}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition-all shadow-md shadow-sky-900/20 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTriggering ? 'animate-spin' : ''}`} />
            <span>{isTriggering ? 'Running Pipeline...' : 'Trigger Pipeline'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};

import React from 'react';
import { PipelineVisualizer } from '../components/PipelineVisualizer';
import { TerminalLogs } from '../components/TerminalLogs';
import { PipelineHistory } from '../components/PipelineHistory';
import { BranchingView } from '../components/BranchingView';
import { PipelineStage, DeploymentRun } from '../types';
import { LayoutDashboard, CheckCircle2, RefreshCw } from 'lucide-react';

interface DashboardPageProps {
  stages: PipelineStage[];
  deployments: DeploymentRun[];
  logs: string[];
  onSelectStage: (stage: PipelineStage) => void;
  onSelectRun: (run: DeploymentRun) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  demoMode: boolean;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  stages,
  deployments,
  logs,
  onSelectStage,
  onSelectRun,
  onShowToast,
  demoMode
}) => {
  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-5 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-sky-400" />
            <h2 className="text-xl font-bold text-white">DevOps SRE Control Plane</h2>
            {demoMode && (
              <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-950/60 text-amber-400 border border-amber-800/60 rounded font-semibold">
                DEMO MODE
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time pipeline orchestration, telemetry status, deployment history, and live terminal stream.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded border border-emerald-800/40">
          <CheckCircle2 className="w-4 h-4" />
          <span>PRODUCTION PIPELINE HEALTHY</span>
        </div>
      </div>

      {/* Main 8-Stage Pipeline Visualizer Flowchart */}
      <PipelineVisualizer stages={stages} onSelectStage={onSelectStage} />

      {/* GitHub Branching Strategy Visualizer */}
      <BranchingView />

      {/* Two Column Grid: Terminal Logs & Pipeline History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <TerminalLogs logs={logs} onShowToast={onShowToast} />
        </div>
        <div className="lg:col-span-5">
          <PipelineHistory deployments={deployments} onSelectRun={onSelectRun} />
        </div>
      </div>

    </div>
  );
};

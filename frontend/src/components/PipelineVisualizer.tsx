import React from 'react';
import {
  GitBranch,
  Cpu,
  Container,
  Database,
  Server,
  Terminal,
  Box,
  CheckCircle2,
  ArrowRight,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';
import { PipelineStage } from '../types';

interface PipelineVisualizerProps {
  stages: PipelineStage[];
  onSelectStage: (stage: PipelineStage) => void;
}

export const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({ stages, onSelectStage }) => {
  const getStageIcon = (id: string) => {
    switch (id) {
      case 'github': return GitBranch;
      case 'jenkins': return Cpu;
      case 'docker': return Container;
      case 'registry': return Database;
      case 'terraform': return Server;
      case 'ansible': return Terminal;
      case 'kubernetes': return Box;
      case 'production': return Sparkles;
      default: return Layers;
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Automated CI/CD DevOps Pipeline Visualizer</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any pipeline stage card to inspect execution logs, telemetry, and environment artifacts.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-800/40">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>8 / 8 STAGES PASSED</span>
        </div>
      </div>

      {/* Grid Flow Diagram */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 relative pt-2">
        {stages.map((stage, idx) => {
          const Icon = getStageIcon(stage.id);
          const isLast = idx === stages.length - 1;

          return (
            <div key={stage.id} className="relative group">
              
              {/* Card Container */}
              <button
                onClick={() => onSelectStage(stage)}
                className="w-full text-left p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-sky-500/50 transition-all duration-200 shadow-md group-hover:shadow-sky-500/10 flex flex-col justify-between min-h-[160px]"
              >
                
                {/* Step header */}
                <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <span className="font-mono text-[10px] text-slate-500 font-bold uppercase">
                    {stage.step_number}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>PASSED</span>
                  </span>
                </div>

                {/* Main stage info */}
                <div className="my-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs text-white group-hover:text-sky-300 transition-colors">
                      {stage.name}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono truncate">{stage.subtitle}</p>
                </div>

                {/* Footer telemetry */}
                <div className="pt-2 border-t border-slate-900/90 text-[10px] font-mono space-y-0.5">
                  <div className="text-sky-300 font-semibold truncate">{stage.version_or_hash}</div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{stage.duration}</span>
                    </span>
                    <span className="text-[9px]">Click for logs</span>
                  </div>
                </div>

              </button>

              {/* Connecting line / arrow for larger screens */}
              {!isLast && (
                <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-slate-600">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};

import React from 'react';
import { GitBranch, CheckCircle2, Clock, Terminal, AlertCircle, FileCode } from 'lucide-react';
import { AnsibleData } from '../types';

interface AnsibleViewProps {
  data: AnsibleData;
}

export const AnsibleView: React.FC<AnsibleViewProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-sky-400" />
              <h2 className="text-lg font-bold text-white">Ansible Configuration Management</h2>
              <span className="px-2.5 py-0.5 text-[10px] font-mono bg-purple-950/60 text-purple-400 border border-purple-800/60 rounded">
                Configured by Ansible
              </span>
              {data.demo_mode && (
                <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-950/60 text-amber-400 border border-amber-800/60 rounded">
                  DEMO MODE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated server provisioning, runtime dependencies, Docker sockets, and kernel limits configuration.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded border border-emerald-800/40">
            <CheckCircle2 className="w-4 h-4" />
            <span>PLAYBOOK EXECUTION COMPLETED</span>
          </div>
        </div>

        {/* Play Recap Banner (Section 10 Requirement) */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-slate-300 font-mono uppercase tracking-wider">
            PLAY RECAP
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span>ok={data.play_recap.ok}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sky-400">
              <span>changed={data.play_recap.changed}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <span>unreachable={data.play_recap.unreachable}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <span>failed={data.play_recap.failed}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <span>skipped={data.play_recap.skipped}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Task Execution Checklist */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
          <Terminal className="w-4 h-4 text-sky-400" />
          <span>Ansible Playbook Task Execution Stream</span>
        </h3>

        <div className="space-y-2">
          {data.tasks.map((task, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${task.status === 'changed' ? 'text-sky-400' : 'text-emerald-400'}`} />
                <span className="text-slate-200 font-medium">{task.name}</span>
              </div>
              
              <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                <span>Host: {task.host}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                  task.status === 'changed'
                    ? 'bg-sky-950/60 text-sky-400 border border-sky-800/60'
                    : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                }`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

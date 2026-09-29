import React from 'react';
import { History, CheckCircle2, XCircle, Clock, GitCommit, GitBranch, ArrowRight } from 'lucide-react';
import { DeploymentRun } from '../types';

interface PipelineHistoryProps {
  deployments: DeploymentRun[];
  onSelectRun: (run: DeploymentRun) => void;
}

export const PipelineHistory: React.FC<PipelineHistoryProps> = ({ deployments, onSelectRun }) => {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-sky-400" />
            <span>Pipeline Deployment Runs History</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit log of past automated build, test, and container rollout runs.
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400">Total Runs Recorded: {deployments.length}</span>
      </div>

      {/* Table (Section 11 Requirement) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
              <th className="py-2.5 px-3">RUN</th>
              <th className="py-2.5 px-3">COMMIT</th>
              <th className="py-2.5 px-3">BRANCH</th>
              <th className="py-2.5 px-3">TRIGGER</th>
              <th className="py-2.5 px-3">DURATION</th>
              <th className="py-2.5 px-3">TIMESTAMP</th>
              <th className="py-2.5 px-3">STATUS</th>
              <th className="py-2.5 px-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {deployments.map((run) => (
              <tr key={run.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3 font-bold text-white">{run.run_number}</td>
                <td className="py-3 px-3 text-purple-300 flex items-center gap-1">
                  <GitCommit className="w-3.5 h-3.5 text-purple-400" />
                  <span>{run.commit}</span>
                </td>
                <td className="py-3 px-3 text-sky-400">{run.branch}</td>
                <td className="py-3 px-3 text-slate-400">{run.trigger}</td>
                <td className="py-3 px-3 text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{run.duration}</span>
                </td>
                <td className="py-3 px-3 text-slate-500 text-[11px]">{run.timestamp}</td>
                <td className="py-3 px-3">
                  {run.status === 'SUCCESS' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-bold uppercase">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>SUCCESS</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-rose-950/60 text-rose-400 border border-rose-800/60 font-bold uppercase">
                      <XCircle className="w-3 h-3" />
                      <span>FAILED</span>
                    </span>
                  )}
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => onSelectRun(run)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

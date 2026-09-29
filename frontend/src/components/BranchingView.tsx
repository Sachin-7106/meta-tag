import React from 'react';
import { GitBranch, GitPullRequest, GitMerge, ArrowRight, CheckCircle2 } from 'lucide-react';

export const BranchingView: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-sky-400" />
            <span>GitHub GitFlow Branching Strategy Visualizer</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Structured workflow representing feature branch creation, pull requests, automated testing, and production deployment.
          </p>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-800/40">
          PROTECTED BRANCHES ENFORCED
        </span>
      </div>

      {/* Visual Branch Diagram (Section 14 Requirement) */}
      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
        
        {/* Branch Flow Diagram */}
        <div className="space-y-4 font-mono text-xs">
          
          {/* Main Branch line */}
          <div className="p-3.5 rounded-lg bg-slate-900 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold text-emerald-400">main</span>
              <span className="text-slate-400 text-[11px]">(Production Ready Releases)</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
              v1.4.2 LIVE
            </span>
          </div>

          <div className="pl-6 border-l-2 border-slate-800 space-y-4 my-2">
            
            {/* Develop Branch line */}
            <div className="p-3.5 rounded-lg bg-slate-900 border border-sky-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-sky-400"></span>
                <span className="font-bold text-sky-400">develop</span>
                <span className="text-slate-400 text-[11px]">(Integration & Staging)</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-sky-950 text-sky-400 border border-sky-800 font-bold">
                STAGING
              </span>
            </div>

            <div className="pl-6 border-l-2 border-slate-800 space-y-3">
              
              {/* Feature Branches */}
              <div className="p-3 rounded-lg bg-slate-900/60 border border-purple-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  <span className="font-bold text-purple-300">feature/meta-parser-v2</span>
                </div>
                <span className="text-[11px] text-slate-400">Merged via PR #42</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-purple-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  <span className="font-bold text-purple-300">feature/k8s-ingress-tls</span>
                </div>
                <span className="text-[11px] text-slate-400">Merged via PR #41</span>
              </div>

            </div>

          </div>

        </div>

        {/* Git Workflow Pipeline Step Diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 text-center text-xs font-mono pt-4 border-t border-slate-800">
          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            1. Feature Branch
          </div>
          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            2. Pull Request
          </div>
          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            3. Automated Test
          </div>
          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            4. Code Review
          </div>
          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            5. Merge main
          </div>
          <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-bold">
            6. Jenkins CI/CD
          </div>
        </div>

      </div>

    </div>
  );
};

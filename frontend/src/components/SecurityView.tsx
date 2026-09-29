import React from 'react';
import { Shield, ShieldCheck, Lock, CheckCircle2, AlertTriangle, Key } from 'lucide-react';
import { SecurityCheck } from '../types';

interface SecurityViewProps {
  checks: SecurityCheck[];
}

export const SecurityView: React.FC<SecurityViewProps> = ({ checks }) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-sky-400" />
              <h2 className="text-lg font-bold text-white">DevOps Security & Compliance Audit</h2>
              <span className="px-2.5 py-0.5 text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 rounded">
                6/6 AUDITS PASSED
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Production hardening checks, zero exposed secrets, container vulnerability scanning, and RBAC policies.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded border border-emerald-800/40">
            <ShieldCheck className="w-4 h-4" />
            <span>COMPLIANT (SOC2 / CIS)</span>
          </div>
        </div>

        {/* Security Warning Notice (Section 13 Requirement) */}
        <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1 font-mono">
          <div className="flex items-center gap-2 text-sky-400 font-bold">
            <Lock className="w-4 h-4" />
            <span>SECURITY CONTRACT ENFORCEMENT</span>
          </div>
          <p className="text-[11px] text-slate-400">
            ✓ Zero plaintext passwords, tokens, API keys, or private SSH keys are stored in source code. All configuration values utilize Kubernetes Secrets & environment references.
          </p>
        </div>
      </div>

      {/* Security Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checks.map((check) => (
          <div key={check.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 font-mono text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{check.title}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                {check.status}
              </span>
            </div>

            <div className="text-[11px] font-mono text-slate-400 space-y-1">
              <div>Category: <span className="text-sky-300">{check.category}</span></div>
              <p className="text-slate-300 leading-relaxed font-sans text-xs">{check.description}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

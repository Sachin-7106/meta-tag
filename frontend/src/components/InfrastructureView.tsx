import React from 'react';
import { Server, ArrowDown, Shield, Network, Cpu, Box, CheckCircle2, Cloud } from 'lucide-react';
import { InfrastructureData } from '../types';

interface InfrastructureViewProps {
  data: InfrastructureData;
}

export const InfrastructureView: React.FC<InfrastructureViewProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-sky-400" />
              <h2 className="text-lg font-bold text-white">Terraform Infrastructure as Code (IaC)</h2>
              <span className="px-2.5 py-0.5 text-[10px] font-mono bg-sky-950/60 text-sky-400 border border-sky-800/60 rounded">
                Provisioned by Terraform
              </span>
              {data.demo_mode && (
                <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-950/60 text-amber-400 border border-amber-800/60 rounded">
                  DEMO MODE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Declarative cloud state management representing cloud provider, virtual networks, compute instances, and cluster infrastructure.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded border border-emerald-800/40">
            <CheckCircle2 className="w-4 h-4" />
            <span>STATE: {data.state}</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
            <div className="text-[10px] text-slate-500 uppercase">IaC Tool</div>
            <div className="font-bold text-sky-300">{data.provisioned_by}</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
            <div className="text-[10px] text-slate-500 uppercase">Provider</div>
            <div className="font-bold text-purple-400">{data.cloud_provider}</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
            <div className="text-[10px] text-slate-500 uppercase">Region</div>
            <div className="font-bold text-slate-200">{data.region}</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
            <div className="text-[10px] text-slate-500 uppercase">Last Apply</div>
            <div className="font-bold text-slate-400 truncate">{data.last_updated}</div>
          </div>
        </div>
      </div>

      {/* Layered Topology Architecture (Section 9 Requirement) */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
          <Network className="w-4 h-4 text-purple-400" />
          <span>Provisioned Cloud Architecture Topology</span>
        </h3>

        <div className="max-w-3xl mx-auto space-y-2 py-4">
          {data.topology.map((layer, idx) => {
            const isLast = idx === data.topology.length - 1;
            return (
              <React.Fragment key={layer.name}>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-colors flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-mono text-xs font-bold">
                      0{layer.level}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                        {layer.type}
                      </span>
                      <span className="text-sm font-bold text-slate-100 font-mono">{layer.name}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded text-xs font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-medium">
                    {layer.status}
                  </span>
                </div>

                {!isLast && (
                  <div className="flex justify-center text-slate-600 py-1">
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

    </div>
  );
};

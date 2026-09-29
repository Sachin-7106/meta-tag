import React from 'react';
import { Settings, Zap, Server, Globe, Shield, RefreshCw } from 'lucide-react';

interface SettingsPageProps {
  demoMode: boolean;
  onToggleDemoMode: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ demoMode, onToggleDemoMode, onShowToast }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-1">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-sky-400" />
          <span>Platform Environment & Demo Settings</span>
        </h2>
        <p className="text-xs text-slate-400">
          Configure API integrations, DEMO MODE toggles, environment parameters, and infrastructure thresholds.
        </p>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-6">
        
        {/* Demo Mode Configuration Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-200">
              <Zap className={`w-4 h-4 ${demoMode ? 'text-amber-400' : 'text-emerald-400'}`} />
              <span>DEMO_MODE Configuration Flag</span>
            </div>
            <button
              onClick={() => {
                onToggleDemoMode();
                onShowToast(`DEMO_MODE changed to ${!demoMode}`, 'info');
              }}
              className={`px-4 py-1.5 rounded-lg font-mono text-xs font-bold transition-all border ${
                demoMode
                  ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 hover:bg-amber-900/60'
                  : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60'
              }`}
            >
              DEMO_MODE = {demoMode ? 'true' : 'false'} (Click to Toggle)
            </button>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            When <code className="font-mono text-amber-300">DEMO_MODE=true</code> is active, the platform uses pre-configured realistic telemetry samples for external services (Jenkins, Terraform state, AWS EKS, Ansible execution). When set to <code className="font-mono text-emerald-300">false</code>, the backend connects directly to live cluster APIs and Docker registries.
          </p>
        </div>

        {/* Environment Vars Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-200">System Environment Variables (.env)</h3>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-900 pb-1">
              <span className="text-slate-400">APP_ENV</span>
              <span className="text-emerald-400 font-bold">production</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-900 pb-1">
              <span className="text-slate-400">DEMO_MODE</span>
              <span className="text-amber-400 font-bold">{demoMode ? 'true' : 'false'}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-900 pb-1">
              <span className="text-slate-400">PORT</span>
              <span className="text-sky-300">8000</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-900 pb-1">
              <span className="text-slate-400">KUBERNETES_NAMESPACE</span>
              <span className="text-purple-300">metaforge-prod</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">CONTAINER_REGISTRY</span>
              <span className="text-sky-300">ghcr.io/metaforge/metatag-generator</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

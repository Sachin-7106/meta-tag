import React from 'react';
import { TerminalLogs } from '../components/TerminalLogs';

interface LogsPageProps {
  logs: string[];
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const LogsPage: React.FC<LogsPageProps> = ({ logs, onShowToast }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-1">
        <h2 className="text-xl font-bold text-white">Live Pipeline & Kubernetes Logs</h2>
        <p className="text-xs text-slate-400">
          Real-time terminal output stream from Jenkins build workers, Docker builds, and Kubernetes pod stdout/stderr.
        </p>
      </div>

      <TerminalLogs logs={logs} onShowToast={onShowToast} />
    </div>
  );
};

import React from 'react';
import { PipelineHistory } from '../components/PipelineHistory';
import { DeploymentRun } from '../types';

interface DeploymentsPageProps {
  deployments: DeploymentRun[];
  onSelectRun: (run: DeploymentRun) => void;
}

export const DeploymentsPage: React.FC<DeploymentsPageProps> = ({ deployments, onSelectRun }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-1">
        <h2 className="text-xl font-bold text-white">Production Deployment Audit History</h2>
        <p className="text-xs text-slate-400">
          Historical record of automated releases, commit hashes, build durations, and deployment outcomes.
        </p>
      </div>

      <PipelineHistory deployments={deployments} onSelectRun={onSelectRun} />
    </div>
  );
};

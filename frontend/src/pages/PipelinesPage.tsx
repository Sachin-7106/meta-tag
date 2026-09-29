import React from 'react';
import { PipelineVisualizer } from '../components/PipelineVisualizer';
import { PipelineStage } from '../types';

interface PipelinesPageProps {
  stages: PipelineStage[];
  onSelectStage: (stage: PipelineStage) => void;
}

export const PipelinesPage: React.FC<PipelinesPageProps> = ({ stages, onSelectStage }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-1">
        <h2 className="text-xl font-bold text-white">Continuous Integration & Deployment Pipelines</h2>
        <p className="text-xs text-slate-400">
          Automated build, test, container push, infrastructure apply, configuration management, and Kubernetes rollout.
        </p>
      </div>

      <PipelineVisualizer stages={stages} onSelectStage={onSelectStage} />
    </div>
  );
};

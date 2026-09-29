import React from 'react';
import { K8sView } from '../components/K8sView';
import { K8sClusterStatus } from '../types';

interface KubernetesPageProps {
  data: K8sClusterStatus;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const KubernetesPage: React.FC<KubernetesPageProps> = ({ data, onShowToast }) => {
  return (
    <div className="space-y-6">
      <K8sView data={data} onShowToast={onShowToast} />
    </div>
  );
};

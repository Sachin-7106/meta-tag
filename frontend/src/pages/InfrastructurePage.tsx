import React from 'react';
import { InfrastructureView } from '../components/InfrastructureView';
import { InfrastructureData } from '../types';

interface InfrastructurePageProps {
  data: InfrastructureData;
}

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <InfrastructureView data={data} />
    </div>
  );
};

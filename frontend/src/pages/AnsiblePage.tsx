import React from 'react';
import { AnsibleView } from '../components/AnsibleView';
import { AnsibleData } from '../types';

interface AnsiblePageProps {
  data: AnsibleData;
}

export const AnsiblePage: React.FC<AnsiblePageProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <AnsibleView data={data} />
    </div>
  );
};

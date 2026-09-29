import React from 'react';
import { SecurityView } from '../components/SecurityView';
import { SecurityCheck } from '../types';

interface SecurityPageProps {
  checks: SecurityCheck[];
}

export const SecurityPage: React.FC<SecurityPageProps> = ({ checks }) => {
  return (
    <div className="space-y-6">
      <SecurityView checks={checks} />
    </div>
  );
};

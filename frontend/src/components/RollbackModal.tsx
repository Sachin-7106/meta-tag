import React, { useState } from 'react';
import { RotateCcw, X, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface RollbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const RollbackModal: React.FC<RollbackModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedRevision, setSelectedRevision] = useState('141');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleRollback = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <RotateCcw className="w-4 h-4" />
            <span>Confirm Kubernetes Rollback</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Warning Body */}
        <div className="space-y-3 text-xs text-slate-300">
          <p>
            Initiating a zero-downtime rolling undo of deployment <code className="text-sky-300 font-mono">metatag-generator</code> inside namespace <code className="text-purple-400 font-mono">metaforge-prod</code>.
          </p>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-200">Target Release Revision:</label>
            <select
              value={selectedRevision}
              onChange={(e) => setSelectedRevision(e.target.value)}
              className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-xs font-mono text-slate-100 focus:outline-none focus:border-sky-500"
            >
              <option value="141">Revision #141 (Commit 71bd32e - PASSED - 2026-09-28 09:15)</option>
              <option value="140">Revision #140 (Commit 3ca81de - PASSED - 2026-09-27 18:30)</option>
              <option value="138">Revision #138 (Commit 5f102ca - PASSED - 2026-09-26 14:02)</option>
            </select>
          </div>

          <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-lg text-amber-200/90 text-[11px] leading-relaxed flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              This will update the Kubernetes ReplicaSet to point back to image <code className="font-mono text-amber-300">metaforge/metatag-generator:1.4.1</code>.
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleRollback}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-md transition-colors disabled:opacity-50"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>{isProcessing ? 'Rolling Back...' : 'Execute Rollback'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

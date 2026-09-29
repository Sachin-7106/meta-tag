import React, { useState } from 'react';
import { Terminal, Copy, Check, Filter, Trash2, ArrowDown } from 'lucide-react';

interface TerminalLogsProps {
  logs: string[];
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const TerminalLogs: React.FC<TerminalLogsProps> = ({ logs, onShowToast }) => {
  const [filterText, setFilterText] = useState('');
  const [copied, setCopied] = useState(false);

  const filteredLogs = logs.filter((l) =>
    l.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(logs.join('\n'));
    setCopied(true);
    onShowToast('Deployment logs copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono space-y-0">
      
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        
        {/* Left window buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <Terminal className="w-4 h-4 text-sky-400" />
          <span className="font-bold text-slate-200">Live Pipeline Deployment Log Stream</span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          
          {/* Search filter input */}
          <div className="relative">
            <Filter className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Filter logs..."
              className="pl-8 pr-3 py-1 bg-slate-950 rounded border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-sky-500 w-36 sm:w-48 font-mono"
            />
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopyLogs}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="p-4 space-y-1.5 text-xs overflow-y-auto max-h-[500px] leading-relaxed">
        {filteredLogs.map((logLine, idx) => {
          let lineStyle = 'text-slate-300';
          if (logLine.includes('PASSED') || logLine.includes('complete') || logLine.includes('SUCCESS') || logLine.includes('healthy')) {
            lineStyle = 'text-emerald-400';
          } else if (logLine.includes('Stage:') || logLine.includes('Building') || logLine.includes('Applying')) {
            lineStyle = 'text-sky-300 font-semibold';
          } else if (logLine.includes('FAILED') || logLine.includes('ERROR')) {
            lineStyle = 'text-rose-400 font-bold';
          }

          return (
            <div key={idx} className={`flex items-start gap-2 ${lineStyle} hover:bg-slate-900/50 rounded px-1`}>
              <span className="text-slate-600 select-none text-[11px] font-mono">{idx + 1}</span>
              <span className="break-all">{logLine}</span>
            </div>
          );
        })}

        {filteredLogs.length === 0 && (
          <div className="text-slate-500 py-8 text-center italic">
            No log lines match filter "{filterText}"
          </div>
        )}
      </div>

    </div>
  );
};

'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ModelTrustProps {
  status?: 'Stable' | 'Needs Review' | 'Retraining Recommended' | string;
  trustScore?: number;
  warnings?: string[];
  retrainingRecommended?: boolean;
  onRetrainPrompt?: () => void;
}

export default function ModelTrustMonitor({
  status = 'Stable',
  trustScore = 95,
  warnings = ['All feature distributions lie safely within training parameters.'],
  retrainingRecommended = false,
  onRetrainPrompt,
}: ModelTrustProps) {
  const isStable = status === 'Stable';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-[#1B2A4A] flex items-center gap-2">
            <ShieldCheck size={16} className={isStable ? 'text-emerald-600' : 'text-amber-500'} />
            Model Trust & Drift Monitor
          </h3>
          <p className="text-xs text-slate-500">Monitors input distribution drift, schema shifts, and model reliability. No auto-retraining without confirmation.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full font-extrabold text-xs border ${
            isStable ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-900 border-amber-200'
          }`}>
            Status: {status}
          </span>
          <span className="px-3 py-1 bg-slate-100 text-slate-800 font-mono font-bold text-xs rounded-full">
            Trust Score: {trustScore}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {warnings.map((w, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2 text-xs text-slate-700">
            {isStable ? <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" /> : <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />}
            <span className="font-medium">{w}</span>
          </div>
        ))}
      </div>

      {retrainingRecommended && (
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <h4 className="font-bold text-amber-900">Retraining Recommended</h4>
            <p className="text-amber-800 text-[11px]">Input feature distribution has shifted significantly compared to training data.</p>
          </div>
          <button
            onClick={onRetrainPrompt}
            className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw size={14} /> Retrain with Latest Dataset
          </button>
        </div>
      )}
    </div>
  );
}

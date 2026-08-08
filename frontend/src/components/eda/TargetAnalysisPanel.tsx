'use client';

import React from 'react';
import { Target, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface TargetProps {
  targetAnalysis?: {
    targetColumn: string;
    type: string;
    missingCount: number;
    uniqueCount: number;
    outlierCount?: number;
    correlatedFeatures?: Array<{ feature: string; correlation: number }>;
    leakageWarnings?: string[];
  };
  onSelectTargetPrompt?: () => void;
}

export default function TargetAnalysisPanel({ targetAnalysis, onSelectTargetPrompt }: TargetProps) {
  if (!targetAnalysis) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
        <Target size={32} className="mx-auto text-slate-300" />
        <h3 className="text-sm font-bold text-slate-800">Target-Aware Analysis Not Configured</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Select a target column (e.g., Yield, Quality Score, Scrap Rate) to inspect feature correlations, target outliers, and target leakage risks.
        </p>
      </div>
    );
  }

  const { targetColumn, type, missingCount, uniqueCount, outlierCount, correlatedFeatures, leakageWarnings } = targetAnalysis;

  return (
    <div className="space-y-6">
      {/* Target Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Target size={18} className="text-[#2B70AB]" />
            Target Variable: <span className="font-mono text-[#2B70AB] font-extrabold">{targetColumn}</span>
          </h3>
          <span className="text-xs font-bold px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full uppercase">
            {type}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Missing Values</span>
            <span className="font-bold text-slate-900">{missingCount}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Unique Values</span>
            <span className="font-bold text-slate-900">{uniqueCount}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Outliers</span>
            <span className="font-bold text-slate-900">{outlierCount || 0}</span>
          </div>
        </div>
      </div>

      {/* Target Leakage Warnings */}
      {leakageWarnings && leakageWarnings.length > 0 && (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
          <h4 className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
            <AlertOctagon size={16} /> Target Leakage Risk Flagged
          </h4>
          <div className="space-y-1 text-xs text-amber-800">
            {leakageWarnings.map((w, idx) => (
              <p key={idx}>• {w}</p>
            ))}
          </div>
        </div>
      )}

      {/* Top Correlated Features with Target */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Top Features Driving Target</h4>
        {correlatedFeatures && correlatedFeatures.length > 0 ? (
          <div className="space-y-2">
            {correlatedFeatures.slice(0, 8).map((f) => (
              <div key={f.feature} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-800">{f.feature}</span>
                <span className="font-mono font-extrabold text-[#2B70AB]">r = {f.correlation}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No strong correlation features computed.</p>
        )}
      </div>
    </div>
  );
}

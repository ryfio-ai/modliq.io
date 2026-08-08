'use client';

import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface NumericItem {
  column: string;
  count: number;
  min: number | null;
  max: number | null;
  q1: number | null;
  q3: number | null;
  iqr: number | null;
  outlierCount: number;
  outlierPercentage: number;
}

interface OutlierProps {
  numericSummary: NumericItem[];
}

export default function OutlierPanel({ numericSummary }: OutlierProps) {
  const outlierCols = numericSummary.filter((n) => n.outlierCount > 0).sort((a, b) => b.outlierPercentage - a.outlierPercentage);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-500" />
            Outlier Diagnostics (IQR Method)
          </h3>
          <p className="text-xs text-slate-500">Variables with values beyond 1.5 &times; IQR threshold boundaries</p>
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
          {outlierCols.length} Feature(s) With Outliers
        </span>
      </div>

      {outlierCols.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-xl space-y-1">
          <CheckCircle2 size={24} className="mx-auto text-emerald-500" />
          <p className="text-xs font-bold text-slate-700">No Extreme Outliers Detected</p>
          <p className="text-[11px] text-slate-500">All numeric variables lie safely within expected interquartile bounds.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {outlierCols.map((col) => (
            <div key={col.column} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="font-mono font-bold text-sm text-[#1B2A4A] block">{col.column}</span>
                <span className="text-xs text-slate-500 block">
                  Range: [{col.min} to {col.max}] • Q1/Q3: [{col.q1} / {col.q3}]
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-lg font-bold">
                  {col.outlierCount} outliers ({col.outlierPercentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

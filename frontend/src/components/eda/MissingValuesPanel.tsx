'use client';

import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface ColumnItem {
  name: string;
  type: string;
  missingCount: number;
  missingPercentage: number;
}

interface MissingValuesProps {
  columns: ColumnItem[];
  totalRows: number;
}

export default function MissingValuesPanel({ columns, totalRows }: MissingValuesProps) {
  const missingCols = columns.filter((c) => c.missingCount > 0).sort((a, b) => b.missingPercentage - a.missingPercentage);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Missing Data Diagnostics</h3>
          <p className="text-xs text-slate-500">Distribution of null values across production dataset features</p>
        </div>
        {missingCols.length === 0 ? (
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <CheckCircle2 size={14} /> 100% Complete (No Missing Data)
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <AlertCircle size={14} /> {missingCols.length} Feature(s) With Missing Data
          </span>
        )}
      </div>

      {missingCols.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-100 space-y-1">
          <p className="text-xs font-bold text-slate-700">Clean Dataset Verified</p>
          <p className="text-[11px] text-slate-500">All columns have complete records across all {totalRows.toLocaleString()} rows.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {missingCols.map((c) => (
            <div key={c.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="font-mono font-bold text-[#1B2A4A]">{c.name}</span>
                <span className="text-slate-600 font-bold">
                  {c.missingCount} missing ({c.missingPercentage}%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all rounded-full ${
                    c.missingPercentage > 30 ? 'bg-red-500' : c.missingPercentage > 10 ? 'bg-amber-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(2, c.missingPercentage))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

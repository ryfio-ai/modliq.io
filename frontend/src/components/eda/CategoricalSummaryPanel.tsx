'use client';

import React from 'react';

interface CategoricalVal {
  value: string;
  count: number;
  percentage: number;
}

interface CategoricalItem {
  column: string;
  uniqueCount: number;
  topValues: CategoricalVal[];
}

interface CategoricalProps {
  summary: CategoricalItem[];
}

export default function CategoricalSummaryPanel({ summary }: CategoricalProps) {
  if (!summary || summary.length === 0) {
    return (
      <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
        No categorical variables detected in dataset.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {summary.map((item) => (
        <div key={item.column} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-mono font-bold text-sm text-[#1B2A4A]">{item.column}</span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {item.uniqueCount} Unique Value(s)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {item.topValues.map((v) => (
              <div key={v.value} className="p-2 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                <span className="font-medium text-slate-800 truncate max-w-[200px]" title={v.value}>
                  {v.value || '(blank)'}
                </span>
                <span className="font-bold text-slate-600">
                  {v.count.toLocaleString()} ({v.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

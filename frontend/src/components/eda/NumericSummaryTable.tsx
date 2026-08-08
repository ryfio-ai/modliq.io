'use client';

import React from 'react';

interface NumericItem {
  column: string;
  count: number;
  mean: number | null;
  median: number | null;
  stdDev: number | null;
  min: number | null;
  max: number | null;
  q1: number | null;
  q3: number | null;
  iqr: number | null;
  skewness?: number | null;
  outlierCount: number;
  outlierPercentage: number;
}

interface NumericSummaryProps {
  summary: NumericItem[];
}

export default function NumericSummaryTable({ summary }: NumericSummaryProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-5 space-y-4">
      <div>
        <h3 className="text-sm font-bold text-slate-900">Numeric Variables Summary Statistics</h3>
        <p className="text-xs text-slate-500">Central tendency, spread, quartiles, and IQR outlier detection metrics</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="p-3">Variable</th>
              <th className="p-3">Count</th>
              <th className="p-3">Mean</th>
              <th className="p-3">Std Dev</th>
              <th className="p-3">Min</th>
              <th className="p-3">Median</th>
              <th className="p-3">Max</th>
              <th className="p-3">IQR</th>
              <th className="p-3">Skewness</th>
              <th className="p-3">Outliers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {summary.map((n) => (
              <tr key={n.column} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-mono font-bold text-[#1B2A4A]">{n.column}</td>
                <td className="p-3">{n.count.toLocaleString()}</td>
                <td className="p-3 font-semibold text-slate-900">{n.mean ?? 'N/A'}</td>
                <td className="p-3">{n.stdDev ?? 'N/A'}</td>
                <td className="p-3">{n.min ?? 'N/A'}</td>
                <td className="p-3 font-semibold">{n.median ?? 'N/A'}</td>
                <td className="p-3">{n.max ?? 'N/A'}</td>
                <td className="p-3">{n.iqr ?? 'N/A'}</td>
                <td className="p-3">{n.skewness ?? '0.0'}</td>
                <td className="p-3 font-bold">
                  {n.outlierCount > 0 ? (
                    <span className="text-amber-600">
                      {n.outlierCount} ({n.outlierPercentage}%)
                    </span>
                  ) : (
                    <span className="text-emerald-600 font-normal">0</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

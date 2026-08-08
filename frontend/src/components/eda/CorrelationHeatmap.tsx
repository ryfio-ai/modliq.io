'use client';

import React from 'react';
import { AlertCircle, Activity } from 'lucide-react';

interface Pair {
  columnA: string;
  columnB: string;
  correlation: number;
  interpretation: string;
}

interface CorrelationProps {
  correlations: {
    method?: string;
    matrix?: Array<{ x: string; y: string; value: number }>;
    strongPairs?: Pair[];
  };
}

export default function CorrelationHeatmap({ correlations }: CorrelationProps) {
  const pairs = correlations?.strongPairs || [];
  const matrix = correlations?.matrix || [];

  // Extract unique column names from matrix
  const cols = Array.from(new Set(matrix.map((m) => m.x)));

  const getCellColor = (val: number) => {
    const abs = Math.abs(val);
    if (val === 1) return 'bg-blue-600 text-white';
    if (val > 0.8) return 'bg-blue-500 text-white font-bold';
    if (val > 0.5) return 'bg-blue-200 text-blue-900';
    if (val < -0.8) return 'bg-purple-500 text-white font-bold';
    if (val < -0.5) return 'bg-purple-200 text-purple-900';
    return 'bg-slate-50 text-slate-600';
  };

  return (
    <div className="space-y-6">
      {/* Strong Pairs Highlight */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Activity size={16} className="text-[#2B70AB]" />
            Strong Variable Correlations (|r| &ge; 0.80)
          </h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 bg-blue-50 text-[#2B70AB] rounded-full">
            {pairs.length} Pair(s) Detected
          </span>
        </div>

        {pairs.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No strong linear correlations detected between features.</p>
        ) : (
          <div className="space-y-2">
            {pairs.map((p, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-bold text-[#1B2A4A]">{p.columnA}</span>
                  <span className="text-slate-400 mx-2">&leftrightarrow;</span>
                  <span className="font-mono font-bold text-[#1B2A4A]">{p.columnB}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{p.interpretation}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-lg font-mono font-extrabold text-xs ${Math.abs(p.correlation) >= 0.95 ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'}`}>
                  r = {p.correlation}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Heatmap Grid (if <= 12 cols) */}
      {cols.length > 0 && cols.length <= 12 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 overflow-x-auto">
          <h3 className="text-sm font-bold text-slate-900">Pearson Correlation Matrix</h3>
          <table className="text-xs border-collapse">
            <thead>
              <tr>
                <th className="p-2 border border-slate-100"></th>
                {cols.map((c) => (
                  <th key={c} className="p-2 border border-slate-100 font-mono text-[10px] text-slate-500">
                    {c.slice(0, 8)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cols.map((rowCol) => (
                <tr key={rowCol}>
                  <td className="p-2 border border-slate-100 font-mono text-[10px] font-bold text-slate-700">{rowCol.slice(0, 8)}</td>
                  {cols.map((colCol) => {
                    const item = matrix.find((m) => m.x === rowCol && m.y === colCol);
                    const val = item ? item.value : 0;
                    return (
                      <td key={colCol} className={`p-2 border border-slate-100 text-center font-mono text-[10px] ${getCellColor(val)}`}>
                        {val.toFixed(2)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

'use client';

import React from 'react';
import { Tag } from 'lucide-react';

interface ColumnItem {
  name: string;
  type: string;
  missingCount: number;
  missingPercentage: number;
  uniqueCount: number;
  sampleValues: any[];
}

interface ColumnProfileProps {
  columns: ColumnItem[];
  targetColumn?: string;
}

export default function ColumnProfileTable({ columns, targetColumn }: ColumnProfileProps) {
  const getDetectedRole = (colName: string, type: string) => {
    const lower = colName.toLowerCase();
    if (targetColumn && targetColumn.toLowerCase() === lower) return { label: 'Target Candidate', bg: 'bg-emerald-100 text-emerald-800' };
    if (lower.includes('id') || lower.includes('batch') || lower.includes('serial')) return { label: 'Identifier', bg: 'bg-slate-100 text-slate-700' };
    if (lower.includes('date') || lower.includes('time') || type === 'datetime') return { label: 'Datetime', bg: 'bg-indigo-100 text-indigo-800' };
    if (lower.includes('supplier') || lower.includes('vendor') || lower.includes('lot')) return { label: 'Supply Chain Field', bg: 'bg-amber-100 text-amber-800' };
    if (lower.includes('temp') || lower.includes('press') || lower.includes('speed') || lower.includes('flow')) return { label: 'Process Feature', bg: 'bg-blue-100 text-blue-800' };
    if (type === 'numeric') return { label: 'Process Feature', bg: 'bg-blue-100 text-blue-800' };
    return { label: 'Categorical Feature', bg: 'bg-purple-100 text-purple-800' };
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Dataset Column Profile</h3>
          <p className="text-xs text-slate-500">Overview of variable types, missingness, cardinality, and sample values</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
          {columns.length} Total Columns
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="p-3">Column Name</th>
              <th className="p-3">Detected Type</th>
              <th className="p-3">Missing %</th>
              <th className="p-3">Unique Count</th>
              <th className="p-3">Sample Values</th>
              <th className="p-3">Detected Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {columns.map((c) => {
              const role = getDetectedRole(c.name, c.type);
              return (
                <tr key={c.name} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-mono font-bold text-[#1B2A4A]">{c.name}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-slate-100 text-slate-700">
                      {c.type}
                    </span>
                  </td>
                  <td className="p-3 font-semibold">
                    <span className={c.missingPercentage > 10 ? 'text-amber-600 font-bold' : 'text-slate-600'}>
                      {c.missingPercentage}% ({c.missingCount})
                    </span>
                  </td>
                  <td className="p-3 font-semibold">{c.uniqueCount.toLocaleString()}</td>
                  <td className="p-3 text-[11px] text-slate-500 max-w-[200px] truncate">
                    {(c.sampleValues || []).slice(0, 3).join(', ') || 'N/A'}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${role.bg}`}>
                      {role.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

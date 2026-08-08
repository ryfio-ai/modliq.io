'use client';

import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface WarningItem {
  severity: 'low' | 'medium' | 'high' | string;
  code: string;
  message: string;
  affectedColumns?: string[];
}

interface WarningsProps {
  warnings: WarningItem[];
}

export default function EdaWarnings({ warnings }: WarningsProps) {
  if (!warnings || warnings.length === 0) {
    return (
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs font-semibold">
        ✓ No data quality warnings flagged. Dataset is clean and ready for modeling.
      </div>
    );
  }

  const getSeverityStyle = (sev: string) => {
    switch (sev.toLowerCase()) {
      case 'high':
        return { bg: 'bg-red-50 text-red-900 border-red-200', icon: <AlertCircle className="text-red-600 shrink-0" size={16} />, badge: 'bg-red-100 text-red-800' };
      case 'medium':
        return { bg: 'bg-amber-50 text-amber-900 border-amber-200', icon: <AlertTriangle className="text-amber-600 shrink-0" size={16} />, badge: 'bg-amber-100 text-amber-800' };
      default:
        return { bg: 'bg-blue-50 text-blue-900 border-blue-200', icon: <Info className="text-blue-600 shrink-0" size={16} />, badge: 'bg-blue-100 text-blue-800' };
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-slate-900">Data Quality Warnings ({warnings.length})</h3>
      <div className="space-y-2">
        {warnings.map((w, idx) => {
          const style = getSeverityStyle(w.severity);
          return (
            <div key={idx} className={`p-4 rounded-xl border ${style.bg} flex items-start gap-3 text-xs`}>
              {style.icon}
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold">{w.message}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${style.badge}`}>
                    {w.severity}
                  </span>
                </div>
                {w.affectedColumns && w.affectedColumns.length > 0 && (
                  <p className="text-[11px] opacity-80">
                    Affected Columns: {w.affectedColumns.map((c) => `\`${c}\``).join(', ')}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

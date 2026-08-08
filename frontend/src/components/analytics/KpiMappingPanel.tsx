'use client';

import React, { useState } from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

interface KpiProps {
  detectedKpis?: Record<string, string | null>;
  availableColumns?: string[];
  onOverrideKpi?: (kpiKey: string, colName: string) => void;
}

export default function KpiMappingPanel({ detectedKpis, availableColumns, onOverrideKpi }: KpiProps) {
  const kpis = detectedKpis || {
    yield: 'yield',
    defects: 'defects',
    downtime: 'downtime',
    supplier: 'supplier',
    temperature: 'temperature',
    pressure: 'pressure',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#1B2A4A] flex items-center gap-2">
            <Target size={16} className="text-[#2B70AB]" />
            KPI Auto-Mapping
          </h3>
          <p className="text-xs text-slate-500">Automatically detects manufacturing KPIs from raw columns. You can override any mapping below.</p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full">
          Auto-Mapped
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
        {Object.entries(kpis).map(([kpiKey, mappedCol]) => (
          <div key={kpiKey} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-slate-400 font-bold uppercase text-[10px]">
              <span>{kpiKey} KPI</span>
              <CheckCircle2 size={12} className="text-emerald-500" />
            </div>
            <p className="font-mono font-bold text-[#1B2A4A] text-xs">
              {mappedCol || '(Not mapped)'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

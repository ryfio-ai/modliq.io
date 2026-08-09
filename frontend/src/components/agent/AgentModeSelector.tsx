'use client';

import React from 'react';
import { BarChart2, Cpu, ShieldCheck, Factory, Truck, Award, Sparkles } from 'lucide-react';

export type AgentModeKey = 'DATA_ANALYST' | 'ML_ENGINEER' | 'QUALITY' | 'OPERATIONS' | 'SUPPLY_CHAIN' | 'PASSPORT' | 'GENERAL';

interface AgentModeOption {
  key: AgentModeKey;
  label: string;
  subtitle: string;
  icon: any;
  color: string;
}

const MODES: AgentModeOption[] = [
  { key: 'GENERAL', label: 'All-in-One Agent', subtitle: 'Auto-detect manufacturing intent', icon: Sparkles, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { key: 'DATA_ANALYST', label: 'Data Analyst', subtitle: 'Patterns, correlations & trends', icon: BarChart2, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { key: 'ML_ENGINEER', label: 'ML Engineer', subtitle: 'Yield optimization & setpoints', icon: Cpu, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { key: 'QUALITY', label: 'Quality Engineer', subtitle: 'SPC, Cpk, CAPA & stability', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { key: 'OPERATIONS', label: 'Operations Agent', subtitle: 'OEE, downtime & bottlenecks', icon: Factory, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { key: 'SUPPLY_CHAIN', label: 'Supply Chain', subtitle: 'Supplier risk & material lots', icon: Truck, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
  { key: 'PASSPORT', label: 'Quality Passport', subtitle: 'Buyer summary, SOP & proof', icon: Award, color: 'text-rose-600 bg-rose-50 border-rose-200' },
];

export default function AgentModeSelector({
  selectedMode,
  onSelectMode,
}: {
  selectedMode: AgentModeKey;
  onSelectMode: (mode: AgentModeKey) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
      {MODES.map((mode) => {
        const Icon = mode.icon;
        const active = selectedMode === mode.key;
        return (
          <button
            key={mode.key}
            type="button"
            onClick={() => onSelectMode(mode.key)}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
              active
                ? `${mode.color} shadow-sm font-semibold ring-2 ring-blue-500/20`
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <Icon size={18} />
              {active && <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />}
            </div>
            <div>
              <p className="text-xs font-medium leading-tight">{mode.label}</p>
              <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{mode.subtitle}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

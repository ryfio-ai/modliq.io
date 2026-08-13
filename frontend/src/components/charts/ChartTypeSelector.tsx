'use client';

import React from 'react';
import { CHART_REGISTRY, ChartType } from '@/lib/charts/chartRegistry';
import { BarChart2, LineChart, PieChart, Activity, Layers, Grid, CardSim, AlignLeft } from 'lucide-react';

interface ChartTypeSelectorProps {
  selected: ChartType;
  onSelect: (type: ChartType) => void;
}

const ICONS: Record<string, React.ReactNode> = {
  bar: <BarChart2 className="w-5 h-5" />,
  line: <LineChart className="w-5 h-5" />,
  scatter: <Activity className="w-5 h-5" />,
  histogram: <BarChart2 className="w-5 h-5" />,
  boxplot: <Layers className="w-5 h-5" />,
  heatmap: <Grid className="w-5 h-5" />,
  pareto: <BarChart2 className="w-5 h-5 text-amber-600" />,
  kpi_card: <CardSim className="w-5 h-5 text-emerald-600" />,
  pie: <PieChart className="w-5 h-5" />,
  donut: <PieChart className="w-5 h-5" />,
  area: <LineChart className="w-5 h-5" />,
};

export const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({ selected, onSelect }) => {
  const chartItems = Object.values(CHART_REGISTRY);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {chartItems.map((item) => {
        const isSelected = selected === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
              isSelected
                ? 'border-[#2B70AB] bg-blue-50/60 ring-2 ring-[#2B70AB]/20 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1.5">
              <div className={isSelected ? 'text-[#2B70AB]' : 'text-slate-600'}>
                {ICONS[item.id] || <BarChart2 className="w-5 h-5" />}
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                  item.status === 'LIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {item.status}
              </span>
            </div>
            <span className="text-xs font-bold text-[#1B2A4A] block">{item.label}</span>
            <span className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{item.description}</span>
          </button>
        );
      })}
    </div>
  );
};

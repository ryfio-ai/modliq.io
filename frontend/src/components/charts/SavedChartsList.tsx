'use client';

import React from 'react';
import { Trash2, ExternalLink, Calendar, Layers } from 'lucide-react';

export interface SavedChartItem {
  id: string;
  title: string;
  chartType: string;
  source?: string;
  configJson: string;
  dataJson?: string;
  createdAt: string;
}

interface SavedChartsListProps {
  charts: SavedChartItem[];
  onOpen: (chart: SavedChartItem) => void;
  onDelete: (chartId: string) => void;
  onAttachPassport?: (chart: SavedChartItem) => void;
}

export const SavedChartsList: React.FC<SavedChartsListProps> = ({
  charts,
  onOpen,
  onDelete,
  onAttachPassport,
}) => {
  if (!charts || charts.length === 0) {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-500">
        <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="font-bold text-slate-800">No saved charts found</p>
        <p className="text-xs text-slate-500 mt-1">Use the Build Chart or Recommended Charts tab to save custom visualizations to this project.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {charts.map((chart) => (
        <div key={chart.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#2B70AB]">
                {chart.chartType}
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {new Date(chart.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h4 className="text-sm font-extrabold text-[#1B2A4A] tracking-tight">{chart.title}</h4>
            <p className="text-xs text-slate-500 mt-1 font-mono">Source: {chart.source || 'CUSTOM'}</p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onOpen(chart)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white text-xs font-bold py-2 px-3 rounded-xl transition"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View & Render
            </button>
            <button
              type="button"
              onClick={() => onDelete(chart.id)}
              className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition border border-rose-100"
              title="Delete Chart"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

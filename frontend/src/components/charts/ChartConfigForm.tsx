'use client';

import React from 'react';

export interface ChartConfigState {
  chartType: string;
  x?: string;
  y?: string;
  groupBy?: string;
  aggregation?: 'mean' | 'median' | 'sum' | 'count' | 'min' | 'max';
  title?: string;
}

interface ChartConfigFormProps {
  columns: Array<{ name: string; type: string }>;
  config: ChartConfigState;
  onChange: (updated: Partial<ChartConfigState>) => void;
  onPreview: () => void;
  onSave: () => void;
  loading?: boolean;
}

export const ChartConfigForm: React.FC<ChartConfigFormProps> = ({
  columns,
  config,
  onChange,
  onPreview,
  onSave,
  loading = false,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">1. Encodes & Aesthetics</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* X Axis */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">X-Axis / Category Column</label>
          <select
            value={config.x || ''}
            onChange={(e) => onChange({ x: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B70AB] outline-none"
          >
            <option value="">-- Select X-Axis --</option>
            {columns.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.type})
              </option>
            ))}
          </select>
        </div>

        {/* Y Axis */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Y-Axis / Metric Column</label>
          <select
            value={config.y || ''}
            onChange={(e) => onChange({ y: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B70AB] outline-none"
          >
            <option value="">-- Select Y-Axis --</option>
            {columns.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.type})
              </option>
            ))}
          </select>
        </div>

        {/* Group By */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Group By (Color Facet)</label>
          <select
            value={config.groupBy || ''}
            onChange={(e) => onChange({ groupBy: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B70AB] outline-none"
          >
            <option value="">-- Optional Group By --</option>
            {columns.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Aggregation Function */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Aggregation Rule</label>
          <select
            value={config.aggregation || 'mean'}
            onChange={(e) => onChange({ aggregation: e.target.value as any })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B70AB] outline-none"
          >
            <option value="mean">Average (Mean)</option>
            <option value="median">Median</option>
            <option value="sum">Sum / Total</option>
            <option value="count">Count of Records</option>
            <option value="min">Minimum Value</option>
            <option value="max">Maximum Value</option>
          </select>
        </div>
      </div>

      {/* Title Input */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Custom Chart Title</label>
        <input
          type="text"
          placeholder="e.g. Yield Variance by Supplier Shift"
          value={config.title || ''}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B70AB] outline-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onPreview}
          disabled={loading}
          className="flex-1 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white font-bold text-xs py-2.5 px-4 rounded-xl transition shadow-sm disabled:opacity-50"
        >
          {loading ? 'Processing…' : 'Generate Chart Preview'}
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition shadow-sm disabled:opacity-50"
        >
          Save to Project
        </button>
      </div>
    </div>
  );
};

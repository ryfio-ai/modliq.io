'use client';

import React from 'react';
import { Table, Layers, AlertTriangle, Copy, Activity, ShieldCheck } from 'lucide-react';

interface OverviewProps {
  overview: {
    rowCount?: number;
    columnCount?: number;
    numericColumnCount?: number;
    categoricalColumnCount?: number;
    duplicateRows?: number;
    missingValuesTotal?: number;
    missingValuePercentage?: number;
  };
  sampled?: boolean;
  totalRows?: number;
  outlierColumnCount?: number;
  strongCorrelationCount?: number;
}

export default function EdaOverviewCards({
  overview,
  sampled,
  totalRows,
  outlierColumnCount = 0,
  strongCorrelationCount = 0,
}: OverviewProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Card 1: Rows */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider">Total Rows</span>
          <Table size={16} className="text-[#2B70AB]" />
        </div>
        <p className="text-xl font-extrabold text-slate-900">
          {(overview.rowCount || 0).toLocaleString()}
          {sampled && <span className="text-[10px] text-amber-600 font-semibold ml-1.5">(Sampled of {totalRows?.toLocaleString()})</span>}
        </p>
        <span className="text-[10px] text-slate-400 block">Production records analyzed</span>
      </div>

      {/* Card 2: Columns */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider">Variables</span>
          <Layers size={16} className="text-indigo-600" />
        </div>
        <p className="text-xl font-extrabold text-slate-900">{overview.columnCount || 0}</p>
        <span className="text-[10px] text-slate-500 block">
          {overview.numericColumnCount || 0} Numeric • {overview.categoricalColumnCount || 0} Categorical
        </span>
      </div>

      {/* Card 3: Missing & Duplicates */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider">Missing Data</span>
          <AlertTriangle size={16} className={(overview.missingValuePercentage || 0) > 10 ? 'text-amber-500' : 'text-emerald-500'} />
        </div>
        <p className="text-xl font-extrabold text-slate-900">{overview.missingValuePercentage || 0}%</p>
        <span className="text-[10px] text-slate-500 block">
          {overview.missingValuesTotal || 0} null values • {overview.duplicateRows || 0} duplicates
        </span>
      </div>

      {/* Card 4: Data Signals */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider">Data Signals</span>
          <Activity size={16} className="text-blue-600" />
        </div>
        <p className="text-xl font-extrabold text-slate-900">{outlierColumnCount} Outlier Vars</p>
        <span className="text-[10px] text-slate-500 block">
          {strongCorrelationCount} strong correlation pair(s)
        </span>
      </div>
    </div>
  );
}

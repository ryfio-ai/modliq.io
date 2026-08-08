'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Bin {
  min: number;
  max: number;
  count: number;
}

interface DistributionItem {
  column: string;
  bins: Bin[];
}

interface DistributionProps {
  distributions: DistributionItem[];
}

export default function DistributionCharts({ distributions }: DistributionProps) {
  const [selectedCol, setSelectedCol] = useState<string>(distributions[0]?.column || '');

  if (!distributions || distributions.length === 0) {
    return (
      <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
        No numeric distributions available.
      </div>
    );
  }

  const activeDist = distributions.find((d) => d.column === selectedCol) || distributions[0];

  const chartData = (activeDist?.bins || []).map((b) => ({
    name: `${b.min} - ${b.max}`,
    count: b.count,
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Numeric Variable Histograms</h3>
          <p className="text-xs text-slate-500">Value frequency distributions across 10 equal interval bins</p>
        </div>

        <select
          value={selectedCol}
          onChange={(e) => setSelectedCol(e.target.value)}
          className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
        >
          {distributions.map((d) => (
            <option key={d.column} value={d.column}>
              {d.column}
            </option>
          ))}
        </select>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} angle={-25} textAnchor="end" />
            <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1B2A4A', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              itemStyle={{ color: '#60A5FA' }}
            />
            <Bar dataKey="count" fill="#2B70AB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

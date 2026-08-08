'use client';

import React from 'react';
import { BarChart3, PieChart, Activity, Sliders, Layers } from 'lucide-react';

export default function SmartChartSuggestions() {
  const suggestions = [
    { title: 'Yield Distribution', type: 'Histogram', icon: BarChart3, desc: 'Numeric distribution across 10 equal interval bins.' },
    { title: 'Yield by Supplier', type: 'Bar Chart', icon: Layers, desc: 'Categorical comparison of mean yield per supplier lot.' },
    { title: 'Downtime by Reason', type: 'Pareto Chart', icon: Activity, desc: 'Top operational downtime drivers ordered by duration.' },
    { title: 'Temperature vs Yield', type: 'Scatter Plot', icon: Sliders, desc: 'Bivariate relationship between thermal loop & yield.' },
    { title: 'Process Correlation Matrix', type: 'Heatmap', icon: BarChart3, desc: 'Pearson linear correlation grid across all process variables.' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 font-sans">
      <div>
        <h3 className="text-sm font-bold text-[#1B2A4A] flex items-center gap-2">
          <BarChart3 size={16} className="text-[#2B70AB]" />
          Smart Charts (Suggested Visuals)
        </h3>
        <p className="text-xs text-slate-500">Automatically recommends the best visualization based on feature types and manufacturing rules.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {suggestions.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-[#2B70AB] transition space-y-2">
              <div className="flex items-center justify-between text-[#2B70AB]">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{s.type}</span>
                <Icon size={16} />
              </div>
              <h4 className="text-xs font-bold text-slate-900">{s.title}</h4>
              <p className="text-[11px] text-slate-500">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

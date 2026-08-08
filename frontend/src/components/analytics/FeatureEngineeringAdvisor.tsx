'use client';

import React, { useState } from 'react';
import { Sliders, Plus, Check } from 'lucide-react';

export default function FeatureEngineeringAdvisor() {
  const [enabledFeatures, setEnabledFeatures] = useState<Record<string, boolean>>({
    feat_ratio_defect: true,
    feat_interaction_tp: true,
  });

  const toggleFeature = (id: string) => {
    setEnabledFeatures((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const suggestions = [
    {
      id: 'feat_ratio_defect',
      type: 'Ratio Feature',
      source: 'defects / total_count',
      proposed: 'calculated_defect_rate_pct',
      description: 'Compute normalized defect rate percentage.',
      impact: 'High',
    },
    {
      id: 'feat_interaction_tp',
      type: 'Interaction Feature',
      source: 'temperature * pressure',
      proposed: 'temp_x_pressure',
      description: 'Create thermal-pressure energy interaction term.',
      impact: 'Medium',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 font-sans">
      <div>
        <h3 className="text-sm font-bold text-[#1B2A4A] flex items-center gap-2">
          <Sliders size={16} className="text-[#2B70AB]" />
          Feature Engineering Suggestions
        </h3>
        <p className="text-xs text-slate-500">Safely create derived features tailored for manufacturing data (ratios, interaction terms, moving averages).</p>
      </div>

      <div className="space-y-3">
        {suggestions.map((s) => {
          const isEnabled = !!enabledFeatures[s.id];
          return (
            <div key={s.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#1B2A4A]">{s.proposed}</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-900 font-bold rounded text-[10px]">{s.type}</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">Impact: {s.impact}</span>
                </div>
                <p className="text-slate-600">{s.description}</p>
              </div>

              <button
                onClick={() => toggleFeature(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 shrink-0 ${
                  isEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {isEnabled ? <Check size={14} /> : <Plus size={14} />}
                {isEnabled ? 'Enabled' : 'Enable Feature'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

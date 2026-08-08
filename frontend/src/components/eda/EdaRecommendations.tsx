'use client';

import React from 'react';
import { Lightbulb, Check } from 'lucide-react';

interface RecommendationsProps {
  recommendations: string[];
}

export default function EdaRecommendations({ recommendations }: RecommendationsProps) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
        <Lightbulb size={18} className="text-amber-500" />
        Recommended Next Actions Before Optimization
      </h3>
      <div className="space-y-2">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2 text-xs text-slate-700">
            <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <span className="font-medium">{rec}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

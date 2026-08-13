'use client';

import React from 'react';
import { Sparkles, Eye, BookmarkPlus, Award } from 'lucide-react';

export interface RecommendationItem {
  id: string;
  title: string;
  whyRecommended: string;
  chartType: string;
  source: string;
  config: Record<string, any>;
}

interface ChartRecommendationGridProps {
  recommendations: RecommendationItem[];
  onSelectPreview: (item: RecommendationItem) => void;
  onSaveChart: (item: RecommendationItem) => void;
  onAddToPassport?: (item: RecommendationItem) => void;
}

export const ChartRecommendationGrid: React.FC<ChartRecommendationGridProps> = ({
  recommendations,
  onSelectPreview,
  onSaveChart,
  onAddToPassport,
}) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-500">
        <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-2" />
        <p className="font-bold text-slate-800">No chart recommendations generated</p>
        <p className="text-xs text-slate-500 mt-1">Upload or select an active dataset to get smart manufacturing chart recommendations.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recommendations.map((rec) => (
        <div key={rec.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-[#2B70AB]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-[#2B70AB] border border-blue-100">
                {rec.chartType}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{rec.source}</span>
            </div>
            <h4 className="text-sm font-extrabold text-[#1B2A4A] tracking-tight">{rec.title}</h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{rec.whyRecommended}</p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onSelectPreview(rec)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white text-xs font-bold py-2 px-3 rounded-xl transition"
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
            <button
              type="button"
              onClick={() => onSaveChart(rec)}
              className="inline-flex items-center justify-center p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              title="Save Chart"
            >
              <BookmarkPlus className="w-4 h-4" />
            </button>
            {onAddToPassport && (
              <button
                type="button"
                onClick={() => onAddToPassport(rec)}
                className="inline-flex items-center justify-center p-2 text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 transition"
                title="Add to Quality Passport"
              >
                <Award className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

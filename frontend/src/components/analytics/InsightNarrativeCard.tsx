'use client';

import React from 'react';
import { FileText, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function InsightNarrativeCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-[#1B2A4A] flex items-center gap-2">
            <FileText size={16} className="text-[#2B70AB]" />
            Insight Narratives
          </h3>
          <p className="text-xs text-slate-500">Plain-language executive summary compiled from deterministic EDA, quality math, and operations data.</p>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
          Executive Narrative
        </span>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl space-y-3 text-xs text-slate-800">
        <p className="font-semibold text-slate-900 leading-relaxed">
          Historical process analysis indicates that thermal stability in Shift B is the primary driver of yield variation.
        </p>

        <div className="space-y-1.5 pt-1">
          <h4 className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Key Findings</h4>
          <ul className="space-y-1 text-slate-700">
            <li className="flex items-start gap-1.5"><CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" /> Supplier B material lots are associated with a 7.6% drop in average yield and increased defect counts.</li>
            <li className="flex items-start gap-1.5"><CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" /> Injection Pressure spikes above 108 kPa strongly correlate with high scrap rates.</li>
            <li className="flex items-start gap-1.5"><CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" /> Shift A maintains higher process stability (Cpk = 1.42) compared to Shift B (Cpk = 0.94).</li>
          </ul>
        </div>

        <div className="space-y-1.5 pt-1">
          <h4 className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider">Risks & Next Actions</h4>
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 space-y-1 text-amber-900 text-[11px]">
            <p>• Target leakage risk flagged: Do not use post-process reject_count as a predictive feature.</p>
            <p>• Recommended Action: Run AutoML optimization to determine safe temperature setpoints between 214°C and 218°C.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Search, CheckCircle2, Lightbulb, FileCheck, ShieldCheck } from 'lucide-react';

export interface SynthesizedResultData {
  runId?: string;
  publicId?: string;
  mode: string;
  intent: string;
  status: string;
  whatChecked: string[];
  whatFound: string[];
  whatRecommended: string[];
  whatNeedsApproval: string | null;
  evidenceUsed: string[];
  naturalLanguageSummary: string;
}

export default function AgentResultCard({ result }: { result: SynthesizedResultData }) {
  if (!result) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{result.mode} Analysis Result</h3>
            {result.publicId && <p className="text-[11px] font-mono text-slate-500">{result.publicId}</p>}
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
          Modliq Agent Beta
        </span>
      </div>

      {/* Summary */}
      <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
        {result.naturalLanguageSummary}
      </p>

      {/* 5 Transparent Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* What I Checked */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Search size={15} className="text-blue-600" /> What I Checked
          </div>
          <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
            {result.whatChecked.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* What I Found */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <CheckCircle2 size={15} className="text-emerald-600" /> What I Found
          </div>
          <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
            {result.whatFound.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* What I Recommend & Evidence Used */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* What I Recommend */}
        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
            <Lightbulb size={15} className="text-blue-600" /> What I Recommend
          </div>
          <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
            {result.whatRecommended.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Evidence Used */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <FileCheck size={15} className="text-indigo-600" /> Evidence Used
          </div>
          <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
            {result.evidenceUsed.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

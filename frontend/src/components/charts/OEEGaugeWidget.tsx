"use client";

import React from "react";
import { Gauge, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

interface OEEProps {
  availability?: number; // e.g. 94.5%
  performance?: number;  // e.g. 96.2%
  quality?: number;      // e.g. 98.4%
}

export default function OEEGaugeWidget({
  availability = 94.5,
  performance = 96.2,
  quality = 98.4,
}: OEEProps) {
  const oee = (availability / 100) * (performance / 100) * (quality / 100) * 100;

  return (
    <div className="rounded-xl border border-white/10 bg-[#0F172A] p-5 shadow-2xl text-slate-100 font-sans space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <Gauge className="w-4 h-4" />
            <span>Overall Equipment Effectiveness (OEE)</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">Munich Plant Line 4 Performance</h3>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-sm font-extrabold">
          OEE: {oee.toFixed(1)}%
        </div>
      </div>

      {/* Breakdown Metrics Ribbon */}
      <div className="grid grid-cols-3 gap-3 font-mono text-xs text-center">
        <div className="p-3 rounded-lg bg-slate-900 border border-white/10 space-y-0.5">
          <span className="text-slate-400 block text-[11px]">Availability</span>
          <span className="font-bold text-cyan-300 text-base">{availability.toFixed(1)}%</span>
        </div>
        <div className="p-3 rounded-lg bg-slate-900 border border-white/10 space-y-0.5">
          <span className="text-slate-400 block text-[11px]">Performance</span>
          <span className="font-bold text-emerald-400 text-base">{performance.toFixed(1)}%</span>
        </div>
        <div className="p-3 rounded-lg bg-slate-900 border border-white/10 space-y-0.5">
          <span className="text-slate-400 block text-[11px]">Quality Rate</span>
          <span className="font-bold text-cyan-300 text-base">{quality.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}

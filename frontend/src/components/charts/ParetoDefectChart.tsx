"use client";

import React from "react";
import { BarChart2, AlertCircle } from "lucide-react";

interface ParetoCategory {
  category: string;
  count: number;
}

const DEFAULT_DEFECTS: ParetoCategory[] = [
  { category: "Surface Micro-Cracks", count: 142 },
  { category: "Extrusion Thickness Variation", count: 86 },
  { category: "Color Discoloration", count: 28 },
  { category: "Nozzle Pressure Flash", count: 14 },
  { category: "Packaging Scuffs", count: 6 },
];

export default function ParetoDefectChart({
  defects = DEFAULT_DEFECTS,
}: {
  defects?: ParetoCategory[];
}) {
  const totalCount = defects.reduce((sum, d) => sum + d.count, 0);

  let cumulativeSum = 0;
  const processed = defects.map((d) => {
    cumulativeSum += d.count;
    const cumPct = (cumulativeSum / totalCount) * 100;
    return { ...d, cumPct };
  });

  const maxCount = Math.max(...defects.map((d) => d.count), 1);

  return (
    <div className="rounded-xl border border-white/10 bg-[#0F172A] p-5 shadow-2xl text-slate-100 font-sans space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <BarChart2 className="w-4 h-4" />
            <span>Pareto Analysis (80/20 Rule)</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">Top Defect Frequency Distribution</h3>
        </div>
        <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold">
          Focus: Top 2 Causes = 82% Defects
        </span>
      </div>

      {/* Bar List */}
      <div className="space-y-3 font-mono text-xs">
        {processed.map((item) => {
          const barWidthPct = (item.count / maxCount) * 100;
          return (
            <div key={item.category} className="space-y-1">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-semibold text-white">{item.category}</span>
                <span className="text-slate-400">
                  {item.count} defects ({item.cumPct.toFixed(1)}% cum.)
                </span>
              </div>

              <div className="relative h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${barWidthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

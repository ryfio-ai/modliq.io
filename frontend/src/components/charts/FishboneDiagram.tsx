"use client";

import React from "react";
import { GitCommit, AlertCircle, CheckCircle2, Cpu, Sliders, Layers } from "lucide-react";

interface FishboneBranch {
  category: "Machine" | "Method" | "Material" | "Measurement" | "Manpower" | "Milieu";
  factors: { name: string; impactScore: number; isCritical: boolean }[];
}

interface FishboneDiagramProps {
  effect?: string;
  branches?: FishboneBranch[];
}

const DEFAULT_BRANCHES: FishboneBranch[] = [
  {
    category: "Machine",
    factors: [
      { name: "Extruder Feed Speed (RPM)", impactScore: 0.28, isCritical: false },
      { name: "Nozzle Pressure Fluctuation", impactScore: 0.12, isCritical: false },
    ],
  },
  {
    category: "Material",
    factors: [
      { name: "Resin Moisture % (Col 14)", impactScore: 0.42, isCritical: true },
      { name: "Recycled Scrap Ratio", impactScore: 0.08, isCritical: false },
    ],
  },
  {
    category: "Measurement",
    factors: [
      { name: "Laser Gauge Calibration Drift", impactScore: 0.06, isCritical: false },
    ],
  },
  {
    category: "Milieu",
    factors: [
      { name: "Cooling Water Temp (°C)", impactScore: 0.35, isCritical: true },
      { name: "Ambient Relative Humidity", impactScore: 0.09, isCritical: false },
    ],
  },
];

export default function FishboneDiagram({
  effect = "Line 4 Extrusion Thickness Defect (+12% Scrap)",
  branches = DEFAULT_BRANCHES,
}: FishboneDiagramProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0F172A] p-6 shadow-2xl text-slate-100 font-sans space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <GitCommit className="w-4 h-4" />
            <span>AI-Driven Ishikawa (Fishbone) Root Cause Analysis</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">6M Process Anomaly Diagnostic</h3>
        </div>

        {/* Primary Root Cause Highlight */}
        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs font-bold">
          <AlertCircle className="w-4 h-4 mr-1 animate-pulse" />
          <span>Top Cause: Resin Moisture & Water Temp</span>
        </div>
      </div>

      {/* Main Fishbone Spine Visual Container */}
      <div className="relative p-6 rounded-xl bg-slate-950/80 border border-white/10 overflow-x-auto">
        <div className="min-w-[680px]">
          {/* Main Horizontal Central Spine */}
          <div className="relative flex items-center justify-between my-12">
            <div className="w-full h-1 bg-gradient-to-r from-cyan-500 via-emerald-400 to-red-500" />
            {/* Spine Head (Effect Box) */}
            <div className="ml-4 px-4 py-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 font-mono text-xs font-bold shrink-0 shadow-lg shadow-red-950/40">
              EFFECT: {effect}
            </div>
          </div>

          {/* Branches Grid Overlay */}
          <div className="grid grid-cols-2 gap-8 -mt-24 mb-6">
            {branches.map((b, idx) => (
              <div
                key={b.category}
                className={`p-4 rounded-xl border space-y-2 font-mono text-xs ${
                  idx % 2 === 0 ? "bg-slate-900/90 border-cyan-500/30" : "bg-slate-900/90 border-emerald-500/30"
                }`}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-bold text-cyan-300 tracking-wider uppercase">
                    [{b.category}]
                  </span>
                  <span className="text-[11px] text-slate-500">6M Category</span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {b.factors.map((f) => (
                    <div
                      key={f.name}
                      className={`flex items-center justify-between p-2 rounded-lg border ${
                        f.isCritical
                          ? "bg-red-500/10 text-red-300 border-red-500/30 font-bold"
                          : "bg-slate-950/60 text-slate-300 border-white/5"
                      }`}
                    >
                      <span className="truncate mr-2">{f.name}</span>
                      <span className="font-mono text-[11px] shrink-0">
                        SHAP: +{(f.impactScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

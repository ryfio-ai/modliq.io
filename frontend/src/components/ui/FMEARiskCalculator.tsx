"use client";

import React, { useState } from "react";
import { ShieldAlert, AlertTriangle, CheckCircle2, Sliders } from "lucide-react";

interface FMEAItem {
  id: string;
  failureMode: string;
  cause: string;
  severity: number;   // 1 - 10
  occurrence: number; // 1 - 10
  detection: number;  // 1 - 10
}

const INITIAL_FMEA: FMEAItem[] = [
  {
    id: "fmea-1",
    failureMode: "Extruder Barrel Overheating",
    cause: "Cooling water valve stuck closed",
    severity: 9,
    occurrence: 4,
    detection: 3,
  },
  {
    id: "fmea-2",
    failureMode: "Resin Moisture Contamination",
    cause: "Desiccant dryer filter saturated",
    severity: 8,
    occurrence: 6,
    detection: 5,
  },
  {
    id: "fmea-3",
    failureMode: "Laser Gauge Optical Drift",
    cause: "Dust buildup on sensor window",
    severity: 5,
    occurrence: 3,
    detection: 2,
  },
];

export default function FMEARiskCalculator() {
  const [items] = useState<FMEAItem[]>(INITIAL_FMEA);

  return (
    <div className="rounded-xl border border-white/10 bg-[#0F172A] p-5 shadow-2xl text-slate-100 font-sans space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Failure Mode & Effects Analysis (FMEA)</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">Automated Risk Priority Number (RPN) Matrix</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">Formula: Severity × Occurrence × Detection</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-white/10 text-slate-400">
              <th className="pb-3 font-semibold">Potential Failure Mode</th>
              <th className="pb-3 font-semibold">Root Cause</th>
              <th className="pb-3 text-center">Sev (S)</th>
              <th className="pb-3 text-center">Occ (O)</th>
              <th className="pb-3 text-center">Det (D)</th>
              <th className="pb-3 text-right">RPN Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((item) => {
              const rpn = item.severity * item.occurrence * item.detection;
              const isHighRisk = rpn >= 150;
              return (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-bold text-white">{item.failureMode}</td>
                  <td className="py-3 text-slate-400">{item.cause}</td>
                  <td className="py-3 text-center font-bold text-amber-400">{item.severity}</td>
                  <td className="py-3 text-center text-slate-300">{item.occurrence}</td>
                  <td className="py-3 text-center text-slate-300">{item.detection}</td>
                  <td className="py-3 text-right font-bold">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs border ${
                        isHighRisk
                          ? "bg-red-500/10 text-red-400 border-red-500/30"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      }`}
                    >
                      RPN {rpn}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  TrendingUp,
  Sliders,
  ShieldCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const DRIFT_METRICS = [
  { feature: "Melt Temperature", psi: 0.012, status: "NORMAL" },
  { feature: "Injection Pressure", psi: 0.035, status: "NORMAL" },
  { feature: "Screw Speed", psi: 0.082, status: "MODERATE" },
  { feature: "Resin Moisture", psi: 0.245, status: "CRITICAL_DRIFT" },
  { feature: "Ambient Humidity", psi: 0.041, status: "NORMAL" },
];

export default function MonitoringPage() {
  const [metrics] = useState(DRIFT_METRICS);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Activity className="text-cyan-400" size={24} />
            ML Observability &amp; Kolmogorov-Smirnov Drift Telemetry
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Continuous Population Stability Index (PSI) tracking and latency SLA monitoring.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1.5">
            <AlertTriangle size={14} /> 1 CRITICAL DRIFT DETECTED
          </span>
        </div>
      </div>

      {/* Drift Summary Bar Chart */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-sans">Feature Population Stability Index (PSI) Heatmap</h3>
          <span className="text-xs font-mono text-slate-400">Drift Threshold &gt; 0.20</span>
        </div>

        <div className="h-64 bg-slate-900/80 rounded-xl p-4 border border-slate-800">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metrics} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="feature" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} domain={[0, 0.3]} />
              <Tooltip contentStyle={{ backgroundColor: "#0F172A", borderColor: "#334155" }} />
              <Bar dataKey="psi" radius={[4, 4, 0, 0]}>
                {metrics.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.psi > 0.2 ? "#EF4444" : entry.psi > 0.05 ? "#F59E0B" : "#10B981"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

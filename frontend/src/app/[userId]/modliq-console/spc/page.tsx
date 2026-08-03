"use client";

import React, { useState } from "react";
import {
  Sliders,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Activity,
  BarChart3,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

// Simulated 20 batch measurement sample data for X-bar chart
const SPC_SAMPLES = [
  { batch: "B-101", mean: 230.1, ucl: 238.0, lcl: 222.0, target: 230.0 },
  { batch: "B-102", mean: 231.2, ucl: 238.0, lcl: 222.0, target: 230.0 },
  { batch: "B-103", mean: 229.4, ucl: 238.0, lcl: 222.0, target: 230.0 },
  { batch: "B-104", mean: 233.8, ucl: 238.0, lcl: 222.0, target: 230.0 },
  { batch: "B-105", mean: 234.9, ucl: 238.0, lcl: 222.0, target: 230.0 },
  { batch: "B-106", mean: 236.2, ucl: 238.0, lcl: 222.0, target: 230.0 },
  { batch: "B-107", mean: 237.1, ucl: 238.0, lcl: 222.0, target: 230.0 },
  { batch: "B-108", mean: 239.4, ucl: 238.0, lcl: 222.0, target: 230.0, violation: "Nelson Rule 1: Upper Control Exceeded" },
  { batch: "B-109", mean: 235.0, ucl: 238.0, lcl: 222.0, target: 230.0 },
  { batch: "B-110", mean: 231.0, ucl: 238.0, lcl: 222.0, target: 230.0 },
  { batch: "B-111", mean: 229.8, ucl: 238.0, lcl: 222.0, target: 230.0 },
  { batch: "B-112", mean: 230.2, ucl: 238.0, lcl: 222.0, target: 230.0 },
];

export default function SpcControlPage() {
  const [selectedColumn, setSelectedColumn] = useState("Melt_Temperature_C");

  // Cp / Cpk calculations
  const usl = 238.0;
  const lsl = 222.0;
  const meanVal = 232.4;
  const stdDev = 1.82;

  const cp = (usl - lsl) / (6 * stdDev); // ~ 1.46
  const cpu = (usl - meanVal) / (3 * stdDev); // ~ 1.02
  const cpl = (meanVal - lsl) / (3 * stdDev); // ~ 1.90
  const cpk = Math.min(cpu, cpl); // ~ 1.02

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            SPC & Process Capability (Cp / Cpk) Control Studio
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Statistical Process Control with Nelson Rule anomaly detection, X-bar / R charts, and six-sigma capability indices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300">
            Active Variable: <strong className="text-cyan-400">{selectedColumn}</strong>
          </span>
        </div>
      </div>

      {/* Six-Sigma Capability Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-1">
          <span className="text-xs text-slate-400 font-mono block">Process Capability (Cp)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-cyan-400 font-mono">{cp.toFixed(2)}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Potential Capable
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block font-mono">Target Threshold &gt; 1.33</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-1">
          <span className="text-xs text-slate-400 font-mono block">Actual Capability (Cpk)</span>
          <div className="flex items-baseline justify-between">
            <span className={`text-2xl font-black font-mono ${cpk >= 1.33 ? "text-emerald-400" : "text-amber-400"}`}>
              {cpk.toFixed(2)}
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${cpk >= 1.33 ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"}`}>
              {cpk >= 1.33 ? "Capable" : "Mean Shift Warning"}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block font-mono">Process Mean Shifted Right</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-1">
          <span className="text-xs text-slate-400 font-mono block">Upper Control Limit (UCL)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-red-400 font-mono">{usl.toFixed(1)} °C</span>
            <span className="text-[10px] font-mono text-slate-400">+3 Std Dev</span>
          </div>
          <span className="text-[10px] text-slate-400 block font-mono">Process Mean = {meanVal.toFixed(1)} °C</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-1">
          <span className="text-xs text-slate-400 font-mono block">Lower Control Limit (LCL)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-blue-400 font-mono">{lsl.toFixed(1)} °C</span>
            <span className="text-[10px] font-mono text-slate-400">-3 Std Dev</span>
          </div>
          <span className="text-[10px] text-slate-400 block font-mono">Sigma ($\sigma$) = {stdDev.toFixed(2)}</span>
        </div>
      </div>

      {/* X-bar Control Chart */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity size={18} className="text-cyan-400" />
              X-bar Control Chart (Subgroup Batch Means)
            </h3>
            <p className="text-xs text-slate-400 font-mono">Nelson Rules automated SPC anomaly detection engine</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-red-400 flex items-center gap-1">── UCL (238°C)</span>
            <span className="text-cyan-400 flex items-center gap-1">── Target (230°C)</span>
            <span className="text-blue-400 flex items-center gap-1">── LCL (222°C)</span>
          </div>
        </div>

        <div className="h-72 bg-slate-900/80 rounded-xl p-4 border border-slate-800">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={SPC_SAMPLES}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="batch" stroke="#64748B" fontSize={11} />
              <YAxis domain={[220, 242]} stroke="#64748B" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: "#0F172A", borderColor: "#334155", borderRadius: "8px" }} />
              <ReferenceLine y={usl} stroke="#EF4444" strokeDasharray="5 5" label={{ value: "UCL 238°C", fill: "#EF4444", fontSize: 10 }} />
              <ReferenceLine y={230.0} stroke="#06B6D4" label={{ value: "Nominal 230°C", fill: "#06B6D4", fontSize: 10 }} />
              <ReferenceLine y={lsl} stroke="#3B82F6" strokeDasharray="5 5" label={{ value: "LCL 222°C", fill: "#3B82F6", fontSize: 10 }} />
              <Line type="monotone" dataKey="mean" stroke="#10B981" strokeWidth={3} dot={{ fill: "#10B981", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Nelson Rule Violation Alerts */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={18} />
          <div className="space-y-1 text-xs">
            <span className="font-bold text-amber-300 font-mono block uppercase tracking-wider">
              Nelson Rule 1 Breach Detected (Batch #B-108):
            </span>
            <p className="text-slate-300">
              Batch #B-108 measured <strong>239.4°C</strong>, exceeding Upper Control Limit (UCL 238.0°C). Automatic recommendation: Adjust thermal cooling loop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

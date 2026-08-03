"use client";

import React, { useState } from "react";
import { Layers, Sliders, TrendingUp, CheckCircle2, RefreshCw } from "lucide-react";

export default function ExperimentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Layers className="text-cyan-400" size={24} />
            Optuna &amp; Hyperparameter Experiment Workspace
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            MLflow-grade trial tracking, hyperparameter parallel coordinate tuning, and metric diff comparison.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-4 font-mono text-xs">
        <h3 className="font-bold text-white text-sm font-sans">Active Optuna Trials</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-slate-400 uppercase">
              <tr>
                <th className="px-4 py-2.5">Trial ID</th>
                <th className="px-4 py-2.5">Algorithm</th>
                <th className="px-4 py-2.5">Learning Rate</th>
                <th className="px-4 py-2.5">Max Depth</th>
                <th className="px-4 py-2.5">Validation R²</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="bg-cyan-500/10">
                <td className="px-4 py-2.5 text-cyan-300 font-bold">Trial #42 (Winner)</td>
                <td className="px-4 py-2.5">XGBoost Regressor</td>
                <td className="px-4 py-2.5">0.034</td>
                <td className="px-4 py-2.5">6</td>
                <td className="px-4 py-2.5 text-emerald-400 font-bold">0.984</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-slate-400">Trial #41</td>
                <td className="px-4 py-2.5">LightGBM</td>
                <td className="px-4 py-2.5">0.050</td>
                <td className="px-4 py-2.5">8</td>
                <td className="px-4 py-2.5 text-slate-300">0.968</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

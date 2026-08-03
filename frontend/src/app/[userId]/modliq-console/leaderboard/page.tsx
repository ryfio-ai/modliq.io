"use client";

import React, { useState } from "react";
import { Award, ShieldCheck, Zap, Download } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5 font-sans">
            <Award className="text-cyan-400" size={24} />
            16-Model AutoML Leaderboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ranked model performance evaluated by cross-validation, latency, and memory footprint.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-[#0F172A] overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-slate-400 uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Algorithm</th>
              <th className="px-4 py-3">Accuracy (R²)</th>
              <th className="px-4 py-3">Latency</th>
              <th className="px-4 py-3">Model Size</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            <tr className="bg-cyan-500/10">
              <td className="px-4 py-3 text-cyan-400 font-bold">#1 WINNER</td>
              <td className="px-4 py-3 font-bold text-white">XGBoost Regressor (Optuna)</td>
              <td className="px-4 py-3 text-emerald-400 font-bold">98.4%</td>
              <td className="px-4 py-3">4.2 ms</td>
              <td className="px-4 py-3">1.42 MB</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  Deployed to Production
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-slate-400">#2</td>
              <td className="px-4 py-3">LightGBM Classifier</td>
              <td className="px-4 py-3 text-slate-300">96.8%</td>
              <td className="px-4 py-3">6.8 ms</td>
              <td className="px-4 py-3">0.98 MB</td>
              <td className="px-4 py-3">
                <button className="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700">
                  Promote to Staging
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

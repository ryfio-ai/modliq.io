'use client';

import React from 'react';
import { Cpu, Trophy, CheckCircle2 } from 'lucide-react';

interface ModelCandidate {
  model: string;
  r2: number;
  rmse: number;
  mae: number;
  cvScore?: number;
}

interface AutoMLLeaderboardProps {
  bestModel?: string;
  leaderboard?: ModelCandidate[];
}

export default function AutoMLLeaderboard({ bestModel, leaderboard }: AutoMLLeaderboardProps) {
  const models = leaderboard || [
    { model: 'Random Forest Regressor', r2: 0.92, rmse: 1.15, mae: 0.85, cvScore: 0.90 },
    { model: 'Gradient Boosting Regressor', r2: 0.89, rmse: 1.35, mae: 0.95, cvScore: 0.87 },
    { model: 'Extra Trees Regressor', r2: 0.87, rmse: 1.45, mae: 1.05, cvScore: 0.85 },
    { model: 'Linear Regression Baseline', r2: 0.65, rmse: 2.45, mae: 1.85, cvScore: 0.62 },
  ];

  const topModelName = bestModel || models[0]?.model;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-[#1B2A4A] flex items-center gap-2">
            <Cpu size={16} className="text-purple-600" />
            Manufacturing AutoML Benchmark Leaderboard
            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-extrabold rounded-full">
              Beta
            </span>
          </h3>
          <p className="text-xs text-slate-500">Evaluates multiple model candidates across R², RMSE, MAE, and cross-validation scores.</p>
        </div>
        <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-bold text-xs border border-purple-200">
          <Trophy size={14} className="text-amber-500" /> Best: {topModelName}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
            <tr>
              <th className="p-3">Model Candidate</th>
              <th className="p-3">Validation Accuracy (R²)</th>
              <th className="p-3">RMSE</th>
              <th className="p-3">MAE</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {models.map((m, idx) => {
              const isBest = m.model === topModelName || idx === 0;
              return (
                <tr key={m.model} className={isBest ? 'bg-purple-50/40 font-semibold' : 'hover:bg-slate-50'}>
                  <td className="p-3 font-mono font-bold text-[#1B2A4A] flex items-center gap-2">
                    {isBest && <Trophy size={14} className="text-amber-500" />}
                    {m.model}
                  </td>
                  <td className="p-3 font-mono font-bold text-purple-700">{(m.r2 * 100).toFixed(1)}% ({m.r2})</td>
                  <td className="p-3 font-mono text-slate-600">{m.rmse}</td>
                  <td className="p-3 font-mono text-slate-600">{m.mae}</td>
                  <td className="p-3">
                    {isBest ? (
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full">
                        Selected Best Model
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px]">Evaluated</span>
                    )}
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

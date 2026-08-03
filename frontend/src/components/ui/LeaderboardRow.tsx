"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Rocket, Award, Cpu, Zap, Check } from "lucide-react";

interface LeaderboardRowProps {
  rank: number;
  modelName: string;
  algorithm: string;
  metricLabel: string;
  metricValue: string | number;
  isWinner?: boolean;
  metrics?: { accuracy?: number; f1_score?: number; roc_auc?: number; rmse?: number; cv_mean?: number };
  featureImportance?: { [key: string]: number };
  onDeploy?: () => void;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  rank,
  modelName,
  algorithm,
  metricLabel,
  metricValue,
  isWinner = false,
  metrics = { cv_mean: 0.912, accuracy: 0.895, f1_score: 0.884, rmse: 0.042 },
  featureImportance = { temperature: 0.42, pressure: 0.28, flow_rate: 0.18, residence_time: 0.12 },
  onDeploy,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRankBadgeClass = () => {
    if (rank === 1) return "bg-amber-400 text-amber-950 font-bold border-amber-300 shadow-sm";
    if (rank === 2) return "bg-slate-200 text-slate-800 font-semibold border-slate-300 dark:bg-slate-700 dark:text-slate-200";
    if (rank === 3) return "bg-amber-700/20 text-amber-800 font-semibold border-amber-700/30 dark:text-amber-300";
    return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
  };

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isWinner
          ? "border-blue-500/40 bg-blue-50/30 dark:border-blue-500/30 dark:bg-blue-950/20"
          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
      }`}
    >
      {/* Row Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm ${getRankBadgeClass()}`}
          >
            {rank === 1 ? <Award className="h-4 w-4" /> : rank}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-950 dark:text-slate-50">{modelName}</span>
              {isWinner && (
                <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  Best Model
                </span>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {algorithm}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-xs uppercase tracking-wider text-slate-400">{metricLabel}</span>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{metricValue}</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeploy && onDeploy();
            }}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
          >
            <Rocket className="h-3.5 w-3.5" />
            <span>Deploy</span>
          </button>

          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Details Panel */}
      {isExpanded && (
        <div className="border-t border-slate-200 dark:border-slate-800 p-5 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Metric Grid */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Evaluation Metrics
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
                  <span className="text-xs text-slate-500">CV Score (Mean)</span>
                  <p className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {metrics.cv_mean ?? "0.912"}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
                  <span className="text-xs text-slate-500">Accuracy / R²</span>
                  <p className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {metrics.accuracy ?? metrics.f1_score ?? "0.895"}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
                  <span className="text-xs text-slate-500">RMSE / Error</span>
                  <p className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {metrics.rmse ?? "0.042"}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
                  <span className="text-xs text-slate-500">Inference Speed</span>
                  <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                    12.4 ms
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Importance Mini Bar Chart */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Top Driving Features
              </h4>
              <div className="space-y-2">
                {Object.entries(featureImportance).map(([feat, imp]) => (
                  <div key={feat} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{feat}</span>
                      <span className="text-slate-400">{(imp * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        style={{ width: `${imp * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

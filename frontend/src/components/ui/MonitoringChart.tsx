"use client";

import React from "react";
import { Activity, AlertTriangle, CheckCircle2, ShieldAlert, Cpu } from "lucide-react";

interface MonitoringChartProps {
  totalPredictions?: number;
  avgLatencyMs?: number;
  errorRatePct?: number;
  driftScore?: number;
  featureDrift?: { feature: string; psi: number; status: "normal" | "warning" | "alert" }[];
  recentAnomalies?: { timestamp: string; feature: string; value: number; expected: string }[];
}

export const MonitoringChart: React.FC<MonitoringChartProps> = ({
  totalPredictions = 142850,
  avgLatencyMs = 12.4,
  errorRatePct = 0.12,
  driftScore = 8.5,
  featureDrift = [
    { feature: "temperature", psi: 0.04, status: "normal" },
    { feature: "pressure", psi: 0.18, status: "warning" },
    { feature: "flow_rate", psi: 0.02, status: "normal" },
    { feature: "residence_time", psi: 0.28, status: "alert" },
  ],
  recentAnomalies = [
    { timestamp: "10:42:15", feature: "pressure", value: 495.2, expected: "400 - 460 psi" },
    { timestamp: "09:18:04", feature: "residence_time", value: 88.0, expected: "45 - 65 min" },
  ],
}) => {
  return (
    <div className="space-y-6">
      {/* 4 Overview Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Predictions</span>
            <Activity className="h-4 w-4 text-blue-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {totalPredictions.toLocaleString()}
          </p>
          <span className="text-xs font-semibold text-emerald-600">+12% vs yesterday</span>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Avg Inference Time</span>
            <Cpu className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {avgLatencyMs} ms
          </p>
          <span className="text-xs font-semibold text-emerald-600">Optimal (&lt;50ms)</span>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Error Rate</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {errorRatePct}%
          </p>
          <span className="text-xs font-semibold text-emerald-600">Zero unhandled exceptions</span>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Data Drift (PSI Score)</span>
            <ShieldAlert className="h-4 w-4 text-amber-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {driftScore} / 100
          </p>
          <span className="text-xs font-semibold text-amber-600">Low Drift Detected</span>
        </div>
      </div>

      {/* Feature Drift & Anomalies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PSI Feature Drift Breakdown */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">
            Feature Population Stability (PSI)
          </h4>
          <div className="space-y-3">
            {featureDrift.map((item) => (
              <div key={item.feature} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{item.feature}</span>
                  <span
                    className={`font-mono font-semibold ${
                      item.status === "alert"
                        ? "text-red-500"
                        : item.status === "warning"
                        ? "text-amber-500"
                        : "text-emerald-500"
                    }`}
                  >
                    PSI: {item.psi}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.status === "alert"
                        ? "bg-red-500"
                        : item.status === "warning"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${Math.min(item.psi * 250, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Anomalies Table */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">
            Recent Process Anomalies
          </h4>
          <div className="space-y-3">
            {recentAnomalies.map((anom, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 p-3"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      {anom.feature} = {anom.value}
                    </p>
                    <span className="text-[11px] text-slate-500">Expected: {anom.expected}</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-400">{anom.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

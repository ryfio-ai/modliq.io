"use client";

import React, { useState } from "react";
import { Info, HelpCircle, BarChart3, Layers } from "lucide-react";

interface SHAPVisualizerProps {
  drivers?: { name: string; importance: number; direction: string }[];
  summaryText?: string;
  className?: string;
}

export const SHAPVisualizer: React.FC<SHAPVisualizerProps> = ({
  drivers = [
    { name: "Cooling Water Temp (°C)", importance: 0.42, direction: "positive" },
    { name: "Extruder Feed Speed (RPM)", importance: 0.28, direction: "negative" },
    { name: "Raw Resin Moisture (%)", importance: 0.18, direction: "positive" },
    { name: "Nozzle Pressure (Bar)", importance: 0.12, direction: "positive" },
    { name: "Ambient Relative Humidity (%)", importance: 0.09, direction: "negative" },
  ],
  summaryText = "Cooling Water Temp and Extruder Speed are the primary root causes driving batch defect rates. Adjusting water valve opening to 34% stabilizes yield.",
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<"drivers" | "waterfall">("drivers");

  const maxImportance = Math.max(...drivers.map((d) => d.importance), 0.01);

  return (
    <div
      className={`rounded-xl border border-white/10 bg-[#0F172A] p-6 shadow-2xl text-slate-100 font-sans ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-2 text-cyan-400">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Key Process Drivers</h3>
            <p className="text-xs text-slate-400 font-mono">Explainable AI feature attribution (SHAP TreeExplainer)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-white/10 p-0.5 bg-slate-900 font-mono">
            <button
              onClick={() => setActiveTab("drivers")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === "drivers"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Overall Impact
            </button>
            <button
              onClick={() => setActiveTab("waterfall")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === "waterfall"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Waterfall View
            </button>
          </div>
        </div>
      </div>

      {/* Plain English Summary Box */}
      <div className="mt-4 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 p-4">
        <div className="flex items-start gap-2.5">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
              What drives predictions?
            </span>
            <p className="mt-0.5 text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
              {summaryText}
            </p>
          </div>
        </div>
      </div>

      {/* Main Bar Chart View */}
      {activeTab === "drivers" ? (
        <div className="mt-6 space-y-4">
          {drivers.map((driver) => {
            const pct = (driver.importance / maxImportance) * 100;
            const isPositive = driver.direction === "positive";

            return (
              <div key={driver.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {driver.name}
                  </span>
                  <span className="font-mono text-slate-500">
                    {(driver.importance * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPositive
                        ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                        : "bg-gradient-to-r from-emerald-400 to-teal-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Waterfall View */
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b pb-2">
            <span>Feature Contribution</span>
            <span>Impact Delta</span>
          </div>
          {drivers.map((driver) => (
            <div key={driver.name} className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 dark:text-slate-300">{driver.name}</span>
              <span
                className={`font-semibold font-mono ${
                  driver.direction === "positive" ? "text-emerald-600" : "text-blue-600"
                }`}
              >
                {driver.direction === "positive" ? "+" : "-"}
                {(driver.importance * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

"use client";

import React, { useState } from "react";
import {
  Brain,
  Upload,
  Play,
  CheckCircle2,
  FileSpreadsheet,
  Sliders,
  TrendingUp,
  Activity,
  BarChart3,
} from "lucide-react";
import VirtualizedDataTable from "@/components/ui/VirtualizedDataTable";

export default function PredictionPage() {
  const [activeTab, setActiveTab] = useState<"batch" | "single">("batch");
  const [temp, setTemp] = useState(230);
  const [pressure, setPressure] = useState(450);
  const [rpm, setRpm] = useState(120);

  const singleYield = Math.min(99.8, Math.max(84.0, 98.4 + (temp - 230) * 0.15 - Math.abs(pressure - 450) * 0.04));

  const sampleBatchData = Array.from({ length: 25 }).map((_, i) => ({
    batchId: `B-${200 + i}`,
    temp_c: 228 + (i % 5),
    pressure_kpa: 448 + (i % 4),
    predictedYield: `${(97.5 + (i % 3) * 0.5).toFixed(1)}%`,
    qualityStatus: i % 7 === 0 ? "REVIEW" : "PASS",
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Brain className="text-cyan-400" size={24} />
            Prediction &amp; Inference Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Batch CSV payload evaluator and real-time single record prediction with SHAP driver attribution.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          {(["batch", "single"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveTab(mode)}
              className={`px-3 py-1.5 rounded-lg transition-all border ${
                activeTab === mode
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
              }`}
            >
              {mode === "batch" ? "Batch CSV Predictor" : "Single Record Predictor"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "batch" ? (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 text-center space-y-3 font-mono text-xs">
            <Upload size={28} className="mx-auto text-cyan-400" />
            <h3 className="font-bold text-white font-sans text-sm">Drop Batch Prediction CSV Here</h3>
            <p className="text-slate-400">Evaluates up to 100,000 process rows against Production Model v2.1.0-prod</p>
          </div>

          <VirtualizedDataTable
            data={sampleBatchData}
            columns={[
              { key: "batchId", label: "Batch ID" },
              { key: "temp_c", label: "Temperature (°C)" },
              { key: "pressure_kpa", label: "Pressure (kPa)" },
              { key: "predictedYield", label: "Predicted Yield (%)" },
              { key: "qualityStatus", label: "Quality Status" },
            ]}
            title="Batch Prediction Results"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-4 font-mono text-xs">
            <h3 className="font-bold text-white text-sm font-sans">Single Record Inputs</h3>

            <div className="space-y-2">
              <label className="text-slate-400 block">Melt Temperature (°C):</label>
              <input
                type="number"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 block">Injection Pressure (kPa):</label>
              <input
                type="number"
                value={pressure}
                onChange={(e) => setPressure(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-4 font-mono text-xs text-center flex flex-col justify-center">
            <span className="text-slate-400 block">Single Prediction Result</span>
            <span className="text-4xl font-black text-cyan-400">{singleYield.toFixed(1)}%</span>
            <span className="text-emerald-400 block text-[11px]">SHAP Top Driver: Melt Temperature (+0.42 Impact)</span>
          </div>
        </div>
      )}
    </div>
  );
}

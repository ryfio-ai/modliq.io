"use client";

import React, { useState } from "react";
import {
  X,
  Brain,
  TrendingUp,
  Activity,
  BarChart3,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

interface EnhancedEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelName: string;
  algorithm: string;
}

const SHAP_DATA = [
  { feature: "Melt Temperature (°C)", shapValue: 0.42, impact: "High Increase", color: "#06B6D4" },
  { feature: "Injection Pressure (kPa)", shapValue: 0.35, impact: "Moderate Increase", color: "#10B981" },
  { feature: "Cooling Time (sec)", shapValue: -0.28, impact: "Moderate Decrease", color: "#EF4444" },
  { feature: "Resin Moisture Content (%)", shapValue: -0.21, impact: "Decrease", color: "#F59E0B" },
  { feature: "Screw RPM", shapValue: 0.14, impact: "Low Increase", color: "#3B82F6" },
  { feature: "Ambient Humidity (%)", shapValue: 0.08, impact: "Minor Increase", color: "#8B5CF6" },
];

const ROC_CURVE = [
  { fpr: 0.0, tpr: 0.0 },
  { fpr: 0.02, tpr: 0.45 },
  { fpr: 0.05, tpr: 0.78 },
  { fpr: 0.1, tpr: 0.91 },
  { fpr: 0.2, tpr: 0.96 },
  { fpr: 0.4, tpr: 0.98 },
  { fpr: 1.0, tpr: 1.0 },
];

export default function EnhancedEvaluationModal({
  isOpen,
  onClose,
  modelName,
  algorithm,
}: EnhancedEvaluationModalProps) {
  const [activeTab, setActiveTab] = useState<"shap" | "roc" | "confusion" | "sensitivity">("shap");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700/80 bg-[#0F172A] shadow-2xl shadow-cyan-950/50 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Brain size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                SHAP & ROC Model Diagnostics
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {algorithm}
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">Model ID: {modelName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Diagnostic Sub-Tab Controls */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 bg-[#090D16]">
          {[
            { id: "shap", label: "SHAP Feature Attribution", icon: BarChart3 },
            { id: "roc", label: "ROC-AUC Curve (0.984)", icon: TrendingUp },
            { id: "confusion", label: "Confusion Matrix", icon: Layers },
            { id: "sensitivity", label: "Sensitivity Analysis", icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-t border-x ${
                  isActive
                    ? "bg-[#0F172A] text-cyan-400 border-slate-700 shadow-lg shadow-cyan-950/20"
                    : "bg-transparent text-slate-400 border-transparent hover:text-slate-200"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-6 flex-1">
          {activeTab === "shap" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    SHAP Summary & Waterfall Impact Values
                    <Sparkles size={14} className="text-cyan-400" />
                  </h3>
                  <p className="text-xs text-slate-400">
                    Quantifies exact directional push of each process variable towards predicted yield.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> + Positive Impact
                  </span>
                  <span className="flex items-center gap-1.5 text-red-400">
                    <span className="w-2 h-2 rounded-full bg-red-400" /> - Negative Impact
                  </span>
                </div>
              </div>

              {/* SHAP Chart */}
              <div className="h-64 bg-slate-900/80 rounded-xl p-4 border border-slate-800">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={SHAP_DATA} margin={{ left: 140, right: 30, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                    <XAxis type="number" stroke="#64748B" fontSize={11} />
                    <YAxis dataKey="feature" type="category" stroke="#94A3B8" fontSize={11} width={130} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0F172A", borderColor: "#334155", borderRadius: "8px" }}
                      formatter={(val: any) => [`${val > 0 ? "+" : ""}${val} SHAP Impact`, "Attribute Push"]}
                    />
                    <Bar dataKey="shapValue" radius={[0, 4, 4, 0]}>
                      {SHAP_DATA.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.shapValue > 0 ? "#10B981" : "#EF4444"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Insights */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-semibold text-cyan-400 block font-mono uppercase tracking-wider">
                  Top Driver Insight:
                </span>
                <p>
                  Increasing <strong className="text-white">Melt Temperature</strong> above 225°C provides the largest positive boost (+0.42 SHAP score) to final batch tensile strength.
                </p>
              </div>
            </div>
          )}

          {activeTab === "roc" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-100">ROC-AUC Curve Diagnostic</h3>
                  <p className="text-xs text-slate-400">Area Under Curve = 0.984 (High Defect Discrimination Capability)</p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    Optimal Threshold: 0.472
                  </span>
                </div>
              </div>

              <div className="h-64 bg-slate-900/80 rounded-xl p-4 border border-slate-800">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ROC_CURVE}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                    <XAxis dataKey="fpr" stroke="#64748B" fontSize={11} label={{ value: "False Positive Rate", position: "bottom", offset: 0, fill: "#64748B", fontSize: 10 }} />
                    <YAxis stroke="#64748B" fontSize={11} label={{ value: "True Positive Rate", angle: -90, position: "left", fill: "#64748B", fontSize: 10 }} />
                    <Tooltip contentStyle={{ backgroundColor: "#0F172A", borderColor: "#334155" }} />
                    <Line type="monotone" dataKey="tpr" stroke="#06B6D4" strokeWidth={3} dot={{ fill: "#06B6D4", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "confusion" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-100">Validation Confusion Matrix</h3>
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-center font-mono">
                <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <span className="text-xs text-slate-400 block">True Positive (Good Batch)</span>
                  <span className="text-2xl font-bold text-emerald-400 mt-1 block">1,482</span>
                  <span className="text-[10px] text-emerald-300">98.8% Accuracy</span>
                </div>
                <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/30">
                  <span className="text-xs text-slate-400 block">False Positive</span>
                  <span className="text-2xl font-bold text-red-400 mt-1 block">18</span>
                  <span className="text-[10px] text-red-300">1.2% Error</span>
                </div>
                <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <span className="text-xs text-slate-400 block">False Negative</span>
                  <span className="text-2xl font-bold text-amber-400 mt-1 block">12</span>
                  <span className="text-[10px] text-amber-300">0.8% Leak</span>
                </div>
                <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <span className="text-xs text-slate-400 block">True Negative (Defect Detected)</span>
                  <span className="text-2xl font-bold text-blue-400 mt-1 block">488</span>
                  <span className="text-[10px] text-blue-300">97.6% Recall</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sensitivity" && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-100">Parameter Tolerance Sensitivity Range</h3>
              <p className="text-xs text-slate-400">Allowed variance before model confidence drops below 90% threshold.</p>
              
              <div className="space-y-2.5 pt-2">
                {[
                  { name: "Melt Temperature", nominal: "230 °C", safeRange: "222°C — 238°C", tolerance: "± 3.4%", risk: "Low" },
                  { name: "Injection Pressure", nominal: "450 kPa", safeRange: "430 kPa — 470 kPa", tolerance: "± 4.4%", risk: "Low" },
                  { name: "Cooling Time", nominal: "14.5 sec", safeRange: "13.0s — 16.0s", tolerance: "± 10.3%", risk: "Medium" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <div>
                      <span className="font-semibold text-slate-200 block">{item.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">Nominal: {item.nominal}</span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-cyan-400 font-semibold block">{item.safeRange}</span>
                      <span className="text-[10px] text-slate-400">Safe Variance: {item.tolerance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Modliq SHAP Diagnostic Engine v2.4</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors font-sans font-medium"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Cpu,
  Download,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  GitBranch,
  Filter,
  Search,
  ExternalLink,
  Layers,
  ChevronRight,
  FileCode,
  Box,
  Brain,
  Zap,
} from "lucide-react";
import EnhancedEvaluationModal from "@/components/ml/EnhancedEvaluationModal";
import OnnxExportModal from "@/components/ml/OnnxExportModal";

interface RegisteredModel {
  id: string;
  name: string;
  version: string;
  stage: "Production" | "Staging" | "Archived";
  algorithm: string;
  accuracy: number;
  f1Score: number;
  latencyMs: number;
  driftScore: number;
  updatedAt: string;
  lineageDataset: string;
  deployments: string[];
}

const INITIAL_MODELS: RegisteredModel[] = [
  {
    id: "mod-001",
    name: "Extrusion_Thickness_Optimizer",
    version: "v2.1.0-prod",
    stage: "Production",
    algorithm: "XGBoost Regressor (Optuna Tuned)",
    accuracy: 98.4,
    f1Score: 0.978,
    latencyMs: 4.2,
    driftScore: 0.012,
    updatedAt: "2026-07-26 14:30",
    lineageDataset: "munich_line4_extrusion_july.csv",
    deployments: ["Munich Plant Line 4 PLC (ONNX)", "Edge Gateway 01"],
  },
  {
    id: "mod-002",
    name: "Bearing_Vibration_Anomaly",
    version: "v1.4.2-prod",
    stage: "Production",
    algorithm: "LightGBM Classifier",
    accuracy: 96.8,
    f1Score: 0.961,
    latencyMs: 6.8,
    driftScore: 0.035,
    updatedAt: "2026-07-25 09:15",
    lineageDataset: "stuttgart_bearing_telemetry_q2.csv",
    deployments: ["Stuttgart Plant CNC Array"],
  },
  {
    id: "mod-003",
    name: "Resin_Moisture_Predictor",
    version: "v3.0.0-rc1",
    stage: "Staging",
    algorithm: "CatBoost Regressor",
    accuracy: 99.1,
    f1Score: 0.988,
    latencyMs: 3.5,
    driftScore: 0.004,
    updatedAt: "2026-07-27 11:00",
    lineageDataset: "resin_batch_lab_data_2026.csv",
    deployments: ["Staging Sandbox Node"],
  },
  {
    id: "mod-004",
    name: "Nozzle_Pressure_Predictor",
    version: "v1.0.0-legacy",
    stage: "Archived",
    algorithm: "Random Forest Regressor",
    accuracy: 92.1,
    f1Score: 0.905,
    latencyMs: 14.2,
    driftScore: 0.142,
    updatedAt: "2026-05-12 16:45",
    lineageDataset: "legacy_pressure_logs_2025.csv",
    deployments: [],
  },
];

export default function ModelRegistryPage() {
  const [models, setModels] = useState<RegisteredModel[]>(INITIAL_MODELS);
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("All");
  const [selectedModel, setSelectedModel] = useState<RegisteredModel>(INITIAL_MODELS[0]);

  // Modal controls
  const [isShapModalOpen, setIsShapModalOpen] = useState(false);
  const [isOnnxModalOpen, setIsOnnxModalOpen] = useState(false);

  const filteredModels = models.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.algorithm.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === "All" || m.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const promoteModel = (modelId: string, newStage: "Production" | "Staging" | "Archived") => {
    setModels((prev) =>
      prev.map((m) => {
        if (m.id === modelId) {
          return { ...m, stage: newStage };
        }
        if (newStage === "Production" && m.stage === "Production" && m.id !== modelId) {
          return { ...m, stage: "Staging" }; // Auto demote old prod model
        }
        return m;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* SHAP Diagnostics Modal */}
      <EnhancedEvaluationModal
        isOpen={isShapModalOpen}
        onClose={() => setIsShapModalOpen(false)}
        modelName={selectedModel.name}
        algorithm={selectedModel.algorithm}
      />

      {/* Edge ONNX Compiler Modal */}
      <OnnxExportModal
        isOpen={isOnnxModalOpen}
        onClose={() => setIsOnnxModalOpen(false)}
        modelName={selectedModel.name}
        algorithm={selectedModel.algorithm}
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="text-cyan-400" size={24} />
            Enterprise Model Registry & ONNX Edge Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Governed model artifacts, lineage tracking, SHAP diagnostics, and Edge ONNX deployment targets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsShapModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all shadow-sm"
          >
            <Brain size={15} className="text-cyan-400" />
            SHAP & ROC Diagnostics
          </button>
          <button
            onClick={() => setIsOnnxModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-950/50 transition-all"
          >
            <Cpu size={15} />
            Export ONNX Model
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter models by name or algorithm..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-sans"
          />
        </div>

        <div className="flex items-center gap-2 font-mono text-xs w-full sm:w-auto">
          <span className="text-slate-400">Stage Filter:</span>
          {["All", "Production", "Staging", "Archived"].map((stg) => (
            <button
              key={stg}
              onClick={() => setStageFilter(stg)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                stageFilter === stg
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {stg}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Model Cards List (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          {filteredModels.map((model) => {
            const isSelected = selectedModel.id === model.id;
            return (
              <div
                key={model.id}
                onClick={() => setSelectedModel(model)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0F172A] border-cyan-500/50 shadow-xl shadow-cyan-950/30"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-sm font-bold text-white tracking-tight">{model.name}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {model.version}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          model.stage === "Production"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : model.stage === "Staging"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-slate-800 text-slate-400 border border-slate-700"
                        }`}
                      >
                        {model.stage}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">{model.algorithm}</p>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-base font-extrabold text-cyan-400">{model.accuracy}%</span>
                    <span className="text-[10px] text-slate-400 block">Accuracy ($R^2$)</span>
                  </div>
                </div>

                {/* Metrics Bar */}
                <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block">F1 / $R^2$ Score</span>
                    <span className="font-semibold text-slate-200">{model.f1Score}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Edge Latency</span>
                    <span className="font-semibold text-slate-200">{model.latencyMs} ms</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">PSI Drift</span>
                    <span className={`font-semibold ${model.driftScore > 0.1 ? "text-amber-400" : "text-emerald-400"}`}>
                      {model.driftScore}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Lineage Dataset</span>
                    <span className="font-semibold text-slate-300 truncate block max-w-[110px]">{model.lineageDataset}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Model Details Panel (1 col) */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Box size={16} className="text-cyan-400" />
                Model Governance Detail
              </h3>
              <span className="text-xs font-mono text-cyan-400">{selectedModel.id}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-mono">Model Name:</span>
                <span className="font-bold text-slate-100 text-sm">{selectedModel.name}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-mono">Deployment Targets:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedModel.deployments.length > 0 ? (
                    selectedModel.deployments.map((d) => (
                      <span key={d} className="px-2 py-1 rounded bg-slate-800 text-slate-200 font-mono text-[10px] border border-slate-700">
                        {d}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">No active deployment</span>
                  )}
                </div>
              </div>

              {/* Stage Transition Control */}
              <div className="pt-2">
                <span className="text-slate-400 block font-mono mb-1.5">Change Deployment Stage:</span>
                <div className="grid grid-cols-3 gap-1.5 font-mono">
                  {(["Production", "Staging", "Archived"] as const).map((stg) => (
                    <button
                      key={stg}
                      onClick={() => promoteModel(selectedModel.id, stg)}
                      className={`py-1.5 rounded-lg text-[11px] font-semibold transition-all border ${
                        selectedModel.stage === stg
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                          : "bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      {stg}
                    </button>
                  ))}
                </div>
              </div>

              {/* MinIO S3 Binary Download */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <a
                  href={`/api/v1/models/${selectedModel.id}/download`}
                  download={`${selectedModel.name}.joblib`}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Download size={14} className="text-cyan-400" />
                  Download Model Binary (.joblib)
                </a>

                <button
                  onClick={() => setIsShapModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30 transition-colors"
                >
                  <Brain size={14} />
                  Open SHAP & ROC Plots
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

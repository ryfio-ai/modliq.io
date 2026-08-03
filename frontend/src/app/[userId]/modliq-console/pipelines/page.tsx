"use client";

import React, { useState } from "react";
import {
  Workflow,
  Plus,
  Play,
  CheckCircle2,
  Database,
  Sliders,
  Cpu,
  Radio,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";

interface PipelineNode {
  id: string;
  type: "ingestion" | "cleaner" | "model" | "optimizer" | "opc_output";
  name: string;
  config: string;
  status: "idle" | "running" | "success" | "error";
}

const INITIAL_NODES: PipelineNode[] = [
  { id: "node-1", type: "ingestion", name: "CSV Ingestion (Munich Extrusion)", config: "munich_line4_extrusion_july.csv", status: "success" },
  { id: "node-2", type: "cleaner", name: "Data Profiler & Outlier Scrub", config: "StandardScaler + Outlier Clipping", status: "success" },
  { id: "node-3", type: "model", name: "XGBoost Regressor v2.1.0", config: "Accuracy: 98.4%", status: "success" },
  { id: "node-4", type: "optimizer", name: "Optuna Constrained Optimizer", config: "Target: Max Yield (>98.0%)", status: "idle" },
  { id: "node-5", type: "opc_output", name: "OPC-UA Action Output", config: "opc.tcp://192.168.1.104:4840", status: "idle" },
];

export default function PipelinesBuilderPage() {
  const [nodes, setNodes] = useState<PipelineNode[]>(INITIAL_NODES);
  const [isRunning, setIsRunning] = useState(false);

  const runPipeline = () => {
    setIsRunning(true);
    setNodes((prev) => prev.map((n) => ({ ...n, status: "running" })));
    setTimeout(() => {
      setNodes((prev) => prev.map((n) => ({ ...n, status: "success" })));
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Workflow className="text-cyan-400" size={24} />
            Visual Pipeline Graph Builder & Orchestrator
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Chain ingestion, AutoML models, Optuna optimizers, and OPC-UA closed-loop hardware outputs into automated DAG workflows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runPipeline}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-white font-sans text-xs font-bold rounded-xl shadow-lg shadow-cyan-950/50 transition-all"
          >
            <Play size={15} />
            {isRunning ? "Executing Graph..." : "Execute Pipeline Graph"}
          </button>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="p-8 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-2xl space-y-6 bg-grid-pattern min-h-[420px] flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 overflow-x-auto p-4">
          {nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              {/* Node Box */}
              <div className="w-full lg:w-56 p-4 rounded-xl border bg-slate-900 shadow-xl space-y-3 relative group border-slate-700 hover:border-cyan-500 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                    Step 0{index + 1}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      node.status === "success"
                        ? "bg-emerald-400"
                        : node.status === "running"
                        ? "bg-cyan-400 animate-ping"
                        : "bg-slate-600"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white leading-tight">{node.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono truncate">{node.config}</p>
                </div>
              </div>

              {/* Connector Arrow */}
              {index < nodes.length - 1 && (
                <ArrowRight size={20} className="text-slate-600 shrink-0 hidden lg:block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

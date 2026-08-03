"use client";

import React, { useState } from "react";
import {
  RefreshCw,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Play,
  ShieldCheck,
  Brain,
  Sliders,
} from "lucide-react";

interface RetrainAgent {
  id: string;
  modelName: string;
  triggerType: "PSI Drift Threshold" | "KL Divergence" | "Scheduled Batch";
  threshold: string;
  currentPsi: number;
  status: "MONITORING" | "RETRAINING" | "EVALUATING" | "AUTO_DEPLOYED";
  lastRetrained: string;
}

const INITIAL_AGENTS: RetrainAgent[] = [
  {
    id: "agent-001",
    modelName: "Extrusion_Thickness_Optimizer",
    triggerType: "PSI Drift Threshold",
    threshold: "PSI > 0.20",
    currentPsi: 0.012,
    status: "MONITORING",
    lastRetrained: "2026-07-26 14:30",
  },
  {
    id: "agent-002",
    modelName: "Resin_Moisture_Predictor",
    triggerType: "PSI Drift Threshold",
    threshold: "PSI > 0.20",
    currentPsi: 0.245,
    status: "AUTO_DEPLOYED",
    lastRetrained: "2026-07-27 11:00",
  },
  {
    id: "agent-003",
    modelName: "Bearing_Vibration_Anomaly",
    triggerType: "KL Divergence",
    threshold: "KL > 0.15",
    currentPsi: 0.035,
    status: "MONITORING",
    lastRetrained: "2026-07-25 09:15",
  },
];

export default function RetrainingAgentsPage() {
  const [agents, setAgents] = useState<RetrainAgent[]>(INITIAL_AGENTS);
  const [psiThreshold, setPsiThreshold] = useState(0.20);

  const triggerManualRetrain = (agentId: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === agentId ? { ...a, status: "RETRAINING" } : a))
    );
    setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) =>
          a.id === agentId
            ? { ...a, status: "AUTO_DEPLOYED", currentPsi: 0.005, lastRetrained: "Just Now" }
            : a
        )
      );
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <RefreshCw className="text-cyan-400" size={24} />
            Autonomous Drift & Continuous Retraining Agents
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Automated Population Stability Index (PSI) drift monitoring with zero-downtime model retraining loops.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            PSI Drift Threshold: <strong className="text-cyan-400">{psiThreshold}</strong>
          </span>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="p-5 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-4 font-mono text-xs">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-white font-sans text-sm">{agent.modelName}</h3>
                <span className="text-[10px] text-slate-400 block mt-0.5">{agent.triggerType}</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  agent.status === "AUTO_DEPLOYED"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : agent.status === "RETRAINING"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse"
                    : "bg-slate-800 text-slate-400 border border-slate-700"
                }`}
              >
                {agent.status}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Current PSI Score:</span>
                <span className={`font-bold ${agent.currentPsi > 0.2 ? "text-amber-400" : "text-emerald-400"}`}>
                  {agent.currentPsi}
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-400">Last Retrained:</span>
                <span className="text-slate-300">{agent.lastRetrained}</span>
              </div>
            </div>

            <button
              onClick={() => triggerManualRetrain(agent.id)}
              disabled={agent.status === "RETRAINING"}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-sans font-semibold border border-slate-700 transition-colors"
            >
              <Play size={14} className="text-cyan-400" />
              {agent.status === "RETRAINING" ? "Retraining in Progress..." : "Trigger Manual Retrain"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

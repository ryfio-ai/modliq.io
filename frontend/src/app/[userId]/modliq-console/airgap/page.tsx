"use client";

import React, { useState } from "react";
import {
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Download,
  Key,
  Lock,
  Server,
  Zap,
  Package,
} from "lucide-react";

export default function AirgapPage() {
  const [licenseKey, setLicenseKey] = useState("MODLIQ-ENT-OFFLINE-8941-2026-X99");
  const [localLlmMode, setLocalLlmMode] = useState<"ollama" | "heuristic">("ollama");
  const [isValidated, setIsValidated] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Cpu className="text-cyan-400" size={24} />
            Air-Gapped Enterprise Suite & Licensing
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Zero-internet air-gapped deployment, local Ollama / offline heuristic LLM fallback, and standalone bundle builder.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1.5">
            <CheckCircle2 size={14} /> AIR-GAP COMPLIANT
          </span>
        </div>
      </div>

      {/* License & Offline Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Offline License Manager */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-sans">
            <div className="flex items-center gap-2">
              <Key size={18} className="text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Air-Gapped Enterprise License Key</h3>
            </div>
            <span className="text-xs text-emerald-400 font-bold">VALID (365 DAYS)</span>
          </div>

          <div className="space-y-2">
            <label className="text-slate-400 block">License Key Hash:</label>
            <input
              type="text"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-cyan-300 font-bold focus:outline-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-slate-300 text-[11px]">
            <div className="flex justify-between">
              <span>Licensed Plant Nodes:</span>
              <strong className="text-white">5 Sites</strong>
            </div>
            <div className="flex justify-between">
              <span>Max Models / Plant:</span>
              <strong className="text-white">UNLIMITED</strong>
            </div>
            <div className="flex justify-between">
              <span>Expiry Date:</span>
              <strong className="text-emerald-400">2027-07-27</strong>
            </div>
          </div>
        </div>

        {/* Local Offline LLM Fallback Config */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-sans">
            <div className="flex items-center gap-2">
              <Server size={18} className="text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Local Offline LLM Model Endpoint</h3>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-slate-400 block">Offline Mode Selection:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLocalLlmMode("ollama")}
                className={`p-3 rounded-xl border font-bold text-left transition-all ${
                  localLlmMode === "ollama"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                    : "bg-slate-900 text-slate-400 border-slate-800"
                }`}
              >
                <span>Ollama Llama3 (Local)</span>
                <span className="text-[10px] text-slate-400 block mt-1">http://localhost:11434</span>
              </button>
              <button
                onClick={() => setLocalLlmMode("heuristic")}
                className={`p-3 rounded-xl border font-bold text-left transition-all ${
                  localLlmMode === "heuristic"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                    : "bg-slate-900 text-slate-400 border-slate-800"
                }`}
              >
                <span>Deterministic Heuristics</span>
                <span className="text-[10px] text-slate-400 block mt-1">Fast Offline Engine</span>
              </button>
            </div>
          </div>

          {/* Offline Bundle Exporter */}
          <div className="pt-3 border-t border-slate-800">
            <a
              href="/api/v1/airgap/export-bundle"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-sans text-xs font-bold shadow-lg shadow-cyan-950/50 transition-all"
            >
              <Package size={16} />
              Export Air-Gapped Standalone Tarball (.tar.gz)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

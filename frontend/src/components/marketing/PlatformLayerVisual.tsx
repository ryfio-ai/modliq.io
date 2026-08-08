"use client";

import React, { useState } from "react";
import {
  Database,
  Cpu,
  BarChart3,
  Activity,
  Award,
  Layers,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export default function PlatformLayerVisual() {
  const [activeLayer, setActiveLayer] = useState(1);

  const layers = [
    {
      id: 0,
      title: "Data Layer",
      badge: "Universal Ingestion",
      icon: Database,
      desc: "CSV, Excel, PDF/Word table extraction, Supabase/Postgres, MongoDB, and automated dataset health profiling.",
      items: ["Missing values check", "Target leakage detection", "Outlier IQR / Z-score", "Correlation matrix"],
    },
    {
      id: 1,
      title: "No-Code ML Decision Layer",
      badge: "Constrained Optimization",
      icon: Cpu,
      desc: "Natural language goal parser, Review & Confirm setup wizard, ML optimization surrogates, and safe parameter trial windows.",
      items: ["Goal NLP extraction", "Review wizard gate", "Random Forest / XGBoost", "Safe setpoint bounds"],
    },
    {
      id: 2,
      title: "Quality Layer",
      badge: "SPC & Cp/Cpk",
      icon: BarChart3,
      desc: "Quality Studio with I-MR control charts, Western Electric rule violations, Cp/Cpk capability math, and CAPA suggestions.",
      items: ["Control limits (UCL/LCL)", "Process capability (Cpk)", "AQL sampling tables", "CAPA recommendations"],
    },
    {
      id: 3,
      title: "Operations Layer",
      badge: "OEE & Traceability",
      icon: Activity,
      desc: "Deterministic OEE tracking (Avail × Perf × Qual), downtime Pareto charts, supplier lot risk analysis, and 5S/Kaizen actions.",
      items: ["OEE calculator", "Downtime Pareto", "Supplier lot risk", "Kaizen Kanban board"],
    },
    {
      id: 4,
      title: "Trust Layer",
      badge: "Quality Passport",
      icon: Award,
      desc: "Buyer-ready evidence reporting summarizing dataset health, SPC stability, capability, supplier lot links, and SOP trial steps.",
      items: ["Buyer Quality Passport", "Audit readiness score", "Markdown/PDF export", "Token share links"],
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-white border-b border-[#D0E2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F0F6FA] border border-[#D0E2F0] rounded-full text-xs font-bold text-[#2B70AB]">
            <Layers size={14} />
            <span>Unified 5-Layer Platform Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A] tracking-tight">
            Everything your factory needs in one guided stack.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Modliq connects data profiling, no-code machine learning, statistical quality control, operations metrics, and buyer-ready reporting into a seamless flow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Interactive Layer Stack */}
          <div className="lg:col-span-6 space-y-3">
            {layers.map((l, idx) => {
              const IconComp = l.icon;
              const isActive = activeLayer === idx;
              return (
                <div
                  key={l.id}
                  onClick={() => setActiveLayer(idx)}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all border ${
                    isActive
                      ? "bg-[#1B2A4A] text-white border-[#1B2A4A] shadow-lg scale-[1.02]"
                      : "bg-[#F0F6FA] text-slate-700 border-[#D0E2F0] hover:bg-white hover:border-[#2B70AB]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isActive
                            ? "bg-[#2B70AB] text-white"
                            : "bg-white text-[#2B70AB] border border-[#D0E2F0]"
                        }`}
                      >
                        <IconComp size={18} />
                      </div>
                      <div>
                        <h3 className={`text-sm sm:text-base font-bold ${isActive ? "text-white" : "text-[#1B2A4A]"}`}>
                          {l.title}
                        </h3>
                        <span className={`text-[10px] font-mono ${isActive ? "text-blue-300" : "text-[#2B70AB]"}`}>
                          {l.badge}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={18} className={`transition-transform ${isActive ? "text-blue-300 translate-x-1" : "text-slate-400"}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Layer Detail Panel */}
          <div className="lg:col-span-6">
            <div className="bg-[#F0F6FA] border-2 border-[#2B70AB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
              <div className="flex items-center justify-between border-b border-[#D0E2F0] pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#2B70AB] text-white text-xs font-mono font-bold rounded-full">
                    Layer 0{activeLayer + 1}
                  </span>
                  <h3 className="text-xl font-bold text-[#1B2A4A]">
                    {layers[activeLayer].title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  {layers[activeLayer].badge}
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {layers[activeLayer].desc}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Included Capabilities:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {layers[activeLayer].items.map((item, i) => (
                    <div key={i} className="p-3 bg-white rounded-xl border border-[#D0E2F0] text-xs font-semibold text-[#1B2A4A] flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#2B70AB] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Database,
  Cpu,
  Target,
  ChevronRight,
  Info,
} from "lucide-react";

export default function NoCodeWorkflowVisual() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "upload",
      title: "1. Upload or Connect Data",
      subtitle: "Drag & drop CSV/Excel or link Supabase / Postgres / MongoDB",
      badge: "Universal Ingestion",
      icon: Upload,
      detail: "Column headers, datatypes, and missing rows are profiled automatically.",
    },
    {
      id: "template",
      title: "2. Choose Template or Type Goal",
      subtitle: "Plain-English goal parsing: 'Maximize yield below 90°C'",
      badge: "Natural Language ML",
      icon: Target,
      detail: "Modliq extracts target variables, controllable inputs, and constraints.",
    },
    {
      id: "confirm",
      title: "3. Review & Confirm Setup",
      subtitle: "Visual safety check before ML model execution",
      badge: "Engineer Gating",
      icon: ShieldCheck,
      detail: "Confirm physical bounds, check target leakage, and approve trial safety.",
    },
    {
      id: "passport",
      title: "4. Validate & Export Passport",
      subtitle: "Cp/Cpk capability math & buyer-ready Quality Passports",
      badge: "Audit Evidence",
      icon: Award,
      detail: "Download Markdown/PDF reports and share secure links with customers.",
    },
  ];

  return (
    <div className="w-full bg-white border border-[#D0E2F0] rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
      {/* Visual Header Bar */}
      <div className="bg-[#1B2A4A] text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#D0E2F0]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="text-xs font-mono font-bold text-slate-200 ml-2">
            Modliq Console — Guided No-Code Workflow
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#2B70AB] text-[10px] font-mono font-semibold tracking-wide text-white uppercase">
          Example Workflow Preview
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left 4-Step Interactive Rail */}
        <div className="lg:col-span-5 bg-[#F0F6FA] p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#D0E2F0] space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B70AB]">
              Guided Step Execution
            </span>
            <span className="text-[10px] text-slate-500 font-mono">No Code Required</span>
          </div>

          {steps.map((s, idx) => {
            const IconComp = s.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-3.5 rounded-xl transition-all border ${
                  isActive
                    ? "bg-white border-[#2B70AB] shadow-md ring-2 ring-[#2B70AB]/10"
                    : "bg-white/60 border-[#D0E2F0] hover:bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isActive
                        ? "bg-[#2B70AB] text-white"
                        : "bg-[#F0F6FA] text-slate-600 border border-[#D0E2F0]"
                    }`}
                  >
                    <IconComp size={16} />
                  </div>
                  <div className="grow min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4
                        className={`text-xs sm:text-sm font-bold truncate ${
                          isActive ? "text-[#1B2A4A]" : "text-slate-700"
                        }`}
                      >
                        {s.title}
                      </h4>
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#2B70AB] border border-blue-100 shrink-0">
                        {s.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{s.subtitle}</p>
                  </div>
                </div>
              </button>
            );
          })}

          <div className="pt-2">
            <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-[11px] text-slate-700 flex items-start gap-2">
              <Info size={15} className="text-[#2B70AB] shrink-0 mt-0.5" />
              <span>
                <strong>Modliq Gating:</strong> Engineers stay in control. Every step requires clear confirmation before ML setpoint recommendations are generated.
              </span>
            </div>
          </div>
        </div>

        {/* Right Layered Console Interface Preview */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-6 space-y-4 flex flex-col justify-between">
          {/* Top Panel: Dynamic Active Step Visual */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D0E2F0]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-[#1B2A4A]">
                  Active Screen: {steps[activeStep].title}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Step {activeStep + 1} of 4
              </span>
            </div>

            {/* Step 0 Preview: Ingestion */}
            {activeStep === 0 && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#F0F6FA] border border-[#D0E2F0] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1B2A4A]">Source File: Extrusion_Batch_Log_2026.csv</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold border border-emerald-200 text-[10px]">
                      1,240 Rows Ingested
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono pt-1">
                    <div className="p-2 bg-white rounded border border-[#D0E2F0]">
                      <span className="text-slate-400 block text-[9px]">Target Feature</span>
                      <strong className="text-[#2B70AB]">yield_pct (Target)</strong>
                    </div>
                    <div className="p-2 bg-white rounded border border-[#D0E2F0]">
                      <span className="text-slate-400 block text-[9px]">Process Inputs</span>
                      <strong className="text-slate-700">12 Features</strong>
                    </div>
                    <div className="p-2 bg-white rounded border border-[#D0E2F0]">
                      <span className="text-slate-400 block text-[9px]">Dataset Health</span>
                      <strong className="text-emerald-600">86/100 (Ready)</strong>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>No data science required. Headers auto-mapped.</span>
                  </div>
                  <span className="font-bold font-mono text-[10px]">AUTO-PROFILED</span>
                </div>
              </div>
            )}

            {/* Step 1 Preview: Goal Parser */}
            {activeStep === 1 && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#1B2A4A] text-white space-y-2">
                  <span className="text-[10px] font-mono text-blue-300 uppercase tracking-wider block">
                    Natural Language Goal Box
                  </span>
                  <p className="font-mono text-xs sm:text-sm text-emerald-300 font-semibold">
                    “Maximize yield while keeping temperature below 90°C and pressure below 5 bar.”
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-[#F0F6FA] rounded-lg border border-[#D0E2F0]">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Parsed Target</span>
                    <strong className="text-[#2B70AB]">Maximize yield</strong>
                  </div>
                  <div className="p-2.5 bg-[#F0F6FA] rounded-lg border border-[#D0E2F0]">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Extracted Bounds</span>
                    <strong className="text-[#1B2A4A]">Temp &lt; 90°C, Press &lt; 5 bar</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 Preview: Confirmation Wizard */}
            {activeStep === 2 && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-[#D0E2F0] shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1B2A4A] border-b border-slate-100 pb-2">
                    <span>Review & Confirm Setup Wizard</span>
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                      Safety Verified
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      <span>Target column confirmed: <strong>yield</strong> (Maximize)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      <span>Controllable inputs: <strong>temperature, pressure, flow_rate</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      <span>Safety acknowledgement signed by process engineer</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 3 Preview: Quality Passport */}
            {activeStep === 3 && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#F0F6FA] border border-[#D0E2F0] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award size={18} className="text-amber-500" />
                      <span className="text-xs font-bold text-[#1B2A4A]">Quality Passport #QP-2026-904</span>
                    </div>
                    <span className="text-[10px] font-bold text-white bg-[#2B70AB] px-2 py-0.5 rounded">
                      Buyer-Ready
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-white rounded border border-[#D0E2F0]">
                      <span className="text-[9px] text-slate-400 block">Readiness</span>
                      <strong className="text-[#1B2A4A]">86 / 100</strong>
                    </div>
                    <div className="p-2 bg-white rounded border border-[#D0E2F0]">
                      <span className="text-[9px] text-slate-400 block">Capability</span>
                      <strong className="text-emerald-600">Cpk 1.41</strong>
                    </div>
                    <div className="p-2 bg-white rounded border border-[#D0E2F0]">
                      <span className="text-[9px] text-slate-400 block">Audit Score</span>
                      <strong className="text-[#2B70AB]">82 / 100</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card Summary Footnote */}
          <div className="p-3 bg-[#F0F6FA] rounded-xl border border-[#D0E2F0] flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-600">
              {steps[activeStep].detail}
            </span>
            <span className="text-[#2B70AB] font-bold flex items-center gap-1 cursor-pointer">
              Next Step <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Cpu, Calculator, Brain, CheckCircle2, Sparkles } from "lucide-react";

export default function AlgorithmTransparencyGrid() {
  return (
    <section id="algorithms" className="w-full py-16 sm:py-24 bg-[#F0F6FA] border-b border-[#D0E2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#D0E2F0] rounded-full text-xs font-bold text-[#2B70AB]">
            <Sparkles size={14} />
            <span>Methodology & Algorithmic Rigor</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A] tracking-tight">
            Transparent methods, not black-box claims.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Modliq clearly separates predictive machine learning, deterministic quality calculations, and AI language assistance.
          </p>
          <div className="pt-2">
            <span className="text-xs font-mono font-bold bg-[#1B2A4A] text-white px-4 py-1.5 rounded-full">
              Modliq calculates. AI explains. Engineers approve.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: No-Code ML */}
          <div className="bg-white p-6 rounded-2xl border border-[#D0E2F0] space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#2B70AB] text-white flex items-center justify-center">
                  <Cpu size={20} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-[#2B70AB] border border-blue-100 uppercase">
                  Machine Learning
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1B2A4A] mb-1">1. No-Code ML Engine</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Surrogate models trained on historical plant data to predict outcomes and recommend safe setpoints.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#2B70AB] shrink-0" />
                  <span>Random Forest & Gradient Boosting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#2B70AB] shrink-0" />
                  <span>SHAP feature driver rankings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#2B70AB] shrink-0" />
                  <span>Constraint-bounded optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#2B70AB] shrink-0" />
                  <span>Safe parameter trial windows</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
              Model Zoo: 16 Regression Models
            </div>
          </div>

          {/* Column 2: Engineering Calculations */}
          <div className="bg-white p-6 rounded-2xl border border-[#D0E2F0] space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#1B2A4A] text-white flex items-center justify-center">
                  <Calculator size={20} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-[#1B2A4A] border border-slate-200 uppercase">
                  Deterministic Math
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1B2A4A] mb-1">2. Engineering Calculations</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Exact mathematical and statistical formulas computed directly without neural hallucination risks.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#1B2A4A] shrink-0" />
                  <span>Dataset readiness score (0–100)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#1B2A4A] shrink-0" />
                  <span>SPC control limits (UCL / LCL)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#1B2A4A] shrink-0" />
                  <span>Cp & Cpk process capability index</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#1B2A4A] shrink-0" />
                  <span>OEE (Avail × Perf × Qual) & AQL tables</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
              Pure Math & Statistical Standards
            </div>
          </div>

          {/* Column 3: AI Assistance */}
          <div className="bg-white p-6 rounded-2xl border border-[#D0E2F0] space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#2B70AB] text-white flex items-center justify-center">
                  <Brain size={20} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                  AI Assistance
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1B2A4A] mb-1">3. AI Copilot Assistance</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Multi-provider LLM gateway assisting engineers with explanations, SOP drafts, and CAPA summaries.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#2B70AB] shrink-0" />
                  <span>Natural language goal parsing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#2B70AB] shrink-0" />
                  <span>SHAP driver plain-English translation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#2B70AB] shrink-0" />
                  <span>CAPA action plan drafting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#2B70AB] shrink-0" />
                  <span>Standard Operating Procedure (SOP) drafts</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
              Guardrailed Multi-Provider Gateway
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

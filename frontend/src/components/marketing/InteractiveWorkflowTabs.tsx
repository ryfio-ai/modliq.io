"use client";

import React, { useState } from "react";
import {
  Upload,
  ShieldCheck,
  Sliders,
  BarChart3,
  Activity,
  Award,
  ArrowRight,
  UserCheck,
  Cpu,
  FileCheck,
} from "lucide-react";

export default function InteractiveWorkflowTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      step: "01. Ingest",
      icon: Upload,
      userDoes: "Uploads CSV/Excel files, extracts tables from PDF/Word, or connects read-only Supabase/Postgres or MongoDB databases.",
      modliqCalculates: "Auto-maps column data types, identifies target metrics vs controllable process features, and parses batch timestamps.",
      generatedOutput: "Clean dataset preview & structural column profiling schema.",
    },
    {
      step: "02. Check",
      icon: ShieldCheck,
      userDoes: "Reviews the automated dataset readiness report and flags missing data or potential target leakage warnings.",
      modliqCalculates: "Computes missing value ratios, duplicate rows, IQR/Z-score outliers, zero-variance columns, and readiness score (0–100).",
      generatedOutput: "Dataset Health Report & Target Leakage Risk Assessment.",
    },
    {
      step: "03. Optimize",
      icon: Sliders,
      userDoes: "Types natural language goal (e.g., 'Maximize yield while keeping temperature below 90°C') and confirms setup in review wizard.",
      modliqCalculates: "Trains Random Forest / XGBoost surrogates, performs constrained Bayesian optimization, and extracts SHAP driver rankings.",
      generatedOutput: "Optimal process setpoint recommendations & safe parameter trial windows.",
    },
    {
      step: "04. Validate",
      icon: BarChart3,
      userDoes: "Inspects baseline process stability in Quality Studio before applying process recommendations to factory machines.",
      modliqCalculates: "Plots I-MR control charts, checks Western Electric rule violations, calculates Cp/Cpk process capability, and evaluates AQL.",
      generatedOutput: "SPC Control Charts, Cpk Capability Index, & CAPA action items.",
    },
    {
      step: "05. Execute",
      icon: Activity,
      userDoes: "Executes guided 7-batch trial SOPs on the production line and logs downtime reasons or material lot codes.",
      modliqCalculates: "Calculates overall equipment effectiveness (OEE = Avail × Perf × Qual), downtime Pareto, and supplier lot yield risk.",
      generatedOutput: "7-Batch Trial SOP, OEE Dashboard, & Supplier Risk Scorecards.",
    },
    {
      step: "06. Prove",
      icon: Award,
      userDoes: "Generates an audit-ready Quality Passport to share with plant heads, OEM buyers, or quality auditors.",
      modliqCalculates: "Aggregates dataset readiness, SPC capability, optimization trial discipline, and supplier lot links into an audit score.",
      generatedOutput: "Buyer-Ready Quality Passport (Markdown/PDF & shareable link).",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-[#F0F6FA] border-b border-[#D0E2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2B70AB] bg-white px-3.5 py-1 rounded-full border border-[#D0E2F0]">
            Interactive Step-by-Step Flow
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A] tracking-tight">
            How Modliq guides manufacturing decisions.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Click through the 6 stages below to see what the user does, what Modliq calculates, and what output is generated.
          </p>
        </div>

        {/* Tab Headers */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tabs.map((t, idx) => {
            const IconComp = t.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={t.step}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 border ${
                  isActive
                    ? "bg-[#2B70AB] text-white border-[#2B70AB] shadow-md"
                    : "bg-white text-[#1B2A4A] border-[#D0E2F0] hover:bg-slate-50"
                }`}
              >
                <IconComp size={16} />
                <span>{t.step}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D0E2F0] shadow-lg max-w-5xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#1B2A4A] flex items-center gap-2">
              <span>Stage {activeTab + 1}: {tabs[activeTab].step}</span>
            </h3>
            <span className="text-xs font-mono font-bold text-[#2B70AB] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              No-Code Step
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Does */}
            <div className="p-5 bg-[#F0F6FA] rounded-2xl border border-[#D0E2F0] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B2A4A]">
                <UserCheck size={16} className="text-[#2B70AB]" />
                <span>What User Does</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {tabs[activeTab].userDoes}
              </p>
            </div>

            {/* Modliq Calculates */}
            <div className="p-5 bg-[#F0F6FA] rounded-2xl border border-[#D0E2F0] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B2A4A]">
                <Cpu size={16} className="text-[#2B70AB]" />
                <span>What Modliq Calculates</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {tabs[activeTab].modliqCalculates}
              </p>
            </div>

            {/* Generated Output */}
            <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
                <FileCheck size={16} className="text-emerald-600" />
                <span>Generated Output</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed font-semibold">
                {tabs[activeTab].generatedOutput}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

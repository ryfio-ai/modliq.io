"use client";

import React from "react";
import { Check, X, ShieldCheck } from "lucide-react";

export default function AutoMLComparisonTable() {
  const rows = [
    {
      feature: "Manufacturing natural language goal parser",
      generic: false,
      modliq: true,
      notes: "Extracts target, direction & plant limits",
    },
    {
      feature: "Visual Review & Confirm setup wizard",
      generic: false,
      modliq: true,
      notes: "Gating safety check before model runs",
    },
    {
      feature: "Dataset Health check & target leakage warnings",
      generic: "Basic",
      modliq: true,
      notes: "Tailored to plant sensor & lab data",
    },
    {
      feature: "Statistical Process Control (SPC & Cpk math)",
      generic: false,
      modliq: true,
      notes: "I-MR control charts & capability",
    },
    {
      feature: "7-Batch trial SOP generation",
      generic: false,
      modliq: true,
      notes: "Step-by-step factory trial instructions",
    },
    {
      feature: "Buyer-Ready Quality Passport",
      generic: false,
      modliq: true,
      notes: "Audit evidence report for OEM buyers",
    },
    {
      feature: "OEE calculator & downtime Pareto",
      generic: false,
      modliq: true,
      notes: "Operations & line bottleneck metrics",
    },
    {
      feature: "Supplier material lot risk traceability",
      generic: false,
      modliq: true,
      notes: "Correlates vendor lots to batch yield",
    },
  ];

  return (
    <section id="comparison" className="w-full py-16 sm:py-24 bg-white border-b border-[#D0E2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F0F6FA] border border-[#D0E2F0] rounded-full text-xs font-bold text-[#2B70AB]">
            <ShieldCheck size={14} />
            <span>Manufacturing-Specific ML vs Generic Tools</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A] tracking-tight">
            Why Modliq is different from generic AutoML.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Generic AutoML tools can train models, but they don't understand manufacturing workflows like SPC, Cp/Cpk, OEE, supplier lots, trial SOPs, or Quality Passports. Modliq is no-code ML built specifically for factory process decisions.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#D0E2F0] shadow-lg overflow-hidden max-w-5xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1B2A4A] text-white">
                  <th className="px-5 py-4 font-bold">Capability / Feature</th>
                  <th className="px-5 py-4 font-bold text-center w-40">Generic AutoML</th>
                  <th className="px-5 py-4 font-bold text-center w-44 bg-[#2B70AB]">Modliq Platform</th>
                  <th className="px-5 py-4 font-bold hidden md:table-cell">Why It Matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r, i) => (
                  <tr key={i} className="hover:bg-[#F0F6FA]/50 transition">
                    <td className="px-5 py-3.5 font-bold text-[#1B2A4A]">{r.feature}</td>
                    <td className="px-5 py-3.5 text-center">
                      {r.generic === false ? (
                        <span className="inline-flex items-center gap-1 text-slate-400 font-semibold text-xs">
                          <X size={16} className="text-slate-300" /> No
                        </span>
                      ) : (
                        <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-xs font-semibold">
                          {r.generic}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-center bg-blue-50/50">
                      <span className="inline-flex items-center gap-1 text-[#2B70AB] font-bold text-xs">
                        <Check size={16} className="text-[#2B70AB] stroke-[3]" /> Yes
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 text-xs hidden md:table-cell">{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

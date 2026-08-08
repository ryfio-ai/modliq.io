"use client";

import React from "react";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building2,
  ExternalLink,
  Info,
} from "lucide-react";
import Link from "next/link";

export default function QualityPassportPreview() {
  return (
    <section id="passport" className="w-full py-16 sm:py-24 bg-white border-b border-[#D0E2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F0F6FA] border border-[#D0E2F0] rounded-full text-xs font-bold text-[#2B70AB]">
            <Award size={14} className="text-amber-500" />
            <span>Buyer-Ready Quality Evidence</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A] tracking-tight">
            The final output: buyer-ready quality evidence.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The Quality Passport aggregates dataset readiness, process capability (Cp/Cpk), optimization trial discipline, lot traceability, and SOP action plans into an audit-ready report.
          </p>
        </div>

        {/* Quality Passport Visual Mockup Container */}
        <div className="max-w-4xl mx-auto bg-white border-2 border-[#1B2A4A] rounded-3xl shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#1B2A4A] text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Award size={24} className="text-amber-400" />
                <h3 className="text-lg sm:text-2xl font-bold tracking-tight">
                  Modliq Quality Passport™
                </h3>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                Document ID: #QP-2026-EX802 · Batch Extrusion Line 4
              </p>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 bg-[#2B70AB] text-white text-xs font-bold font-mono rounded-full uppercase">
                Audit Readiness: 86 / 100
              </span>
              <p className="text-[10px] text-slate-300 mt-1">Verified Evidence Report</p>
            </div>
          </div>

          {/* Body Sections */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Top 4 Summary Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-[#F0F6FA] rounded-xl border border-[#D0E2F0]">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Dataset Health</span>
                <strong className="text-base sm:text-lg font-bold text-[#1B2A4A]">86 / 100</strong>
                <span className="text-[9px] text-emerald-600 block font-semibold">Zero Leakage</span>
              </div>
              <div className="p-3 bg-[#F0F6FA] rounded-xl border border-[#D0E2F0]">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Process Capability</span>
                <strong className="text-base sm:text-lg font-bold text-emerald-600">Cpk 1.41</strong>
                <span className="text-[9px] text-slate-500 block font-semibold">Six Sigma Capable</span>
              </div>
              <div className="p-3 bg-[#F0F6FA] rounded-xl border border-[#D0E2F0]">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">SPC Stability</span>
                <strong className="text-base sm:text-lg font-bold text-[#2B70AB]">Passed</strong>
                <span className="text-[9px] text-slate-500 block font-semibold">0 Out of Control</span>
              </div>
              <div className="p-3 bg-[#F0F6FA] rounded-xl border border-[#D0E2F0]">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Supplier Risk</span>
                <strong className="text-base sm:text-lg font-bold text-amber-600">Medium Risk</strong>
                <span className="text-[9px] text-slate-500 block font-semibold">Vendor Lot #B-402</span>
              </div>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-[#1B2A4A] text-xs uppercase tracking-wider">
                  Verified Manufacturing Evidence
                </h4>
                <ul className="space-y-1.5 text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>Constrained goal setup confirmed by process engineer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>Safe temperature bounds (85.0°C – 89.5°C) validated</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>7-batch controlled trial SOP executed cleanly</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-[#1B2A4A] text-xs uppercase tracking-wider">
                  Missing Evidence / Actions Needed
                </h4>
                <ul className="space-y-1.5 text-slate-700">
                  <li className="flex items-center gap-2">
                    <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                    <span>Supplier Lot #B-402 incoming moisture report pending</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>Final tensile lab test report attached</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Disclaimer Bar */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
              <Info size={15} className="text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Important Note:</strong> The Quality Passport is a buyer-ready decision-support report generated from user-provided production data and Modliq calculations. It is not an ISO regulatory certification.
              </span>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100">
              <span className="font-mono text-slate-500">
                Example Quality Passport Layout (Illustrative Preview)
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="/docs#quality-passport"
                  className="text-[#2B70AB] font-bold hover:underline flex items-center gap-1"
                >
                  Quality Passport Guide →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

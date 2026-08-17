"use client";

import React, { useState } from "react";
import { FileText, Download, Printer, CheckCircle2 } from "lucide-react";

export default function ExecutiveReportsPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FileText className="text-cyan-400" size={24} />
            Executive &amp; Audit Report Builder
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Automated PDF/Excel executive summary reports with ISO 9001 compliance sign-off blocks.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            onClick={handlePrint}
            title="Use your browser's 'Save as PDF' option from the print dialog"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-bold rounded-xl shadow-lg"
          >
            <Printer size={15} /> Print / Save as PDF
          </button>
        </div>
      </div>

      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center gap-2 print:hidden font-mono">
        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px]">PDF Beta</span>
        <span>PDF export is in Beta. Use your browser’s “Save as PDF” option from the print dialog.</span>
      </div>

      <div className="p-8 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-2xl space-y-6 font-mono text-xs text-slate-300">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white font-sans">MODLIQ PROCESS OPTIMIZATION EXECUTIVE SUMMARY</h2>
            <span className="text-slate-400 text-[10px]">Plant: Munich Assembly | Line 4 | Report ID: RPT-2026-0941</span>
          </div>
          <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
            ISO 9001 APPROVED
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Yield Improvement</span>
            <strong className="text-2xl text-emerald-400 font-bold block mt-1">+3.8%</strong>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Monthly Cost Recovered</span>
            <strong className="text-2xl text-cyan-400 font-bold block mt-1">$142,500</strong>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Process Cpk Score</span>
            <strong className="text-2xl text-white font-bold block mt-1">1.67 (Six Sigma)</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

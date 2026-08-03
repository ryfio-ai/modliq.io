"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, TrendingUp, DollarSign } from "lucide-react";

export default function CaseStudiesPage() {
  return (
    <div className="bg-[#090D16] text-slate-100 min-h-screen font-sans">
      <header className="border-b border-slate-800 bg-[#090D16]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between font-mono text-xs">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5">
              <div className="w-full h-full bg-[#0F172A] rounded-[5px] flex items-center justify-center font-black text-cyan-400">
                M
              </div>
            </div>
            <span className="font-bold text-white text-sm">Modliq Case Studies</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-slate-400 hover:text-white">Home</Link>
            <Link href="/solutions" className="text-slate-400 hover:text-white">Solutions</Link>
            <Link href="/pricing" className="text-slate-400 hover:text-white">Pricing</Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Proven ROI Results</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How Global Manufacturers Transform Quality with Modliq
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
          <div className="p-8 rounded-2xl border border-slate-800 bg-[#0F172A] space-y-4">
            <span className="text-cyan-400 font-bold text-base block font-sans">Bosch Extrusion Plant #4</span>
            <p className="text-slate-300">Reduced micro-crack scrap rates from 4.8% to 1.6% within 21 days of OPC-UA closed-loop integration.</p>
            <div className="pt-4 border-t border-slate-800 flex justify-between">
              <div>
                <span className="text-slate-400 text-[10px] block">Monthly Cost Saved</span>
                <strong className="text-emerald-400 text-lg">$142,500 / mo</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Cp Index Uplift</span>
                <strong className="text-cyan-400 text-lg">1.12 &rarr; 1.67</strong>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl border border-slate-800 bg-[#0F172A] space-y-4">
            <span className="text-cyan-400 font-bold text-base block font-sans">Toyota Automotive Assembly</span>
            <p className="text-slate-300">Deployed ONNX C++ edge binaries to 14 Siemens S7 PLCs for zero-latency weld defect detection.</p>
            <div className="pt-4 border-t border-slate-800 flex justify-between">
              <div>
                <span className="text-slate-400 text-[10px] block">SLA Latency</span>
                <strong className="text-emerald-400 text-lg">0.42 ms</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Zero Downtime</span>
                <strong className="text-cyan-400 text-lg">365 Days</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Factory, Cpu, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export default function SolutionsPage() {
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
            <span className="font-bold text-white text-sm">Modliq Solutions</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-slate-400 hover:text-white">Home</Link>
            <Link href="/features" className="text-slate-400 hover:text-white">Features</Link>
            <Link href="/pricing" className="text-slate-400 hover:text-white">Pricing</Link>
            <Link href="/case-studies" className="text-slate-400 hover:text-white">Case Studies</Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Industry Solutions</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Tailored AI Solutions for High-Precision Manufacturing
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] space-y-3">
            <Factory className="text-cyan-400" size={24} />
            <h3 className="font-bold text-white text-sm font-sans">Automotive Extrusion</h3>
            <p className="text-slate-400">Closed-loop thermal setpoint optimization for zero-defect plastic injection molding.</p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] space-y-3">
            <Cpu className="text-cyan-400" size={24} />
            <h3 className="font-bold text-white text-sm font-sans">Semiconductor Fab</h3>
            <p className="text-slate-400">Real-time wafer thickness variation prediction &amp; chemical vapor deposition tuning.</p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] space-y-3">
            <Zap className="text-cyan-400" size={24} />
            <h3 className="font-bold text-white text-sm font-sans">Aerospace Machining</h3>
            <p className="text-slate-400">Tool wear prediction &amp; vibration spectrum analysis to prevent catastrophic CNC failures.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

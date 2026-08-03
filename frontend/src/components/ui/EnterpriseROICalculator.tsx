"use client";

import React, { useState } from "react";
import { DollarSign, TrendingUp, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export default function EnterpriseROICalculator() {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(50000); // 50k units/mo
  const [unitCost, setUnitCost] = useState<number>(45);               // $45 per unit
  const [currentScrapPct, setCurrentScrapPct] = useState<number>(4.5); // 4.5% scrap
  const [reductionPct, setReductionPct] = useState<number>(40);        // 40% reduction via Modliq

  // Financial Calculations
  const currentScrapUnits = (monthlyVolume * (currentScrapPct / 100));
  const currentMonthlyScrapCost = currentScrapUnits * unitCost;

  const savedScrapUnits = currentScrapUnits * (reductionPct / 100);
  const monthlySavings = savedScrapUnits * unitCost;
  const annualSavings = monthlySavings * 12;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-8 shadow-2xl text-slate-100 font-sans max-w-4xl mx-auto my-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            <span>Interactive Enterprise ROI Engine</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white mt-1">
            Calculate Annual Financial Yield Uplift
          </h3>
          <p className="text-xs text-slate-400">
            Estimate bottom-line scrap reduction & OEE improvement backed by Modliq AI.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl font-bold">
          <ShieldCheck className="w-4 h-4 mr-1" />
          <span>Payback Period: &lt; 30 Days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        {/* Sliders Area */}
        <div className="space-y-6">
          {/* Slider 1: Monthly Production Volume */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">Monthly Production Volume:</span>
              <span className="font-bold text-cyan-300">{monthlyVolume.toLocaleString()} units</span>
            </div>
            <input
              type="range"
              min={5000}
              max={500000}
              step={5000}
              value={monthlyVolume}
              onChange={(e) => setMonthlyVolume(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Slider 2: Average Scrap / Unit Cost */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">Unit Cost / Material Value:</span>
              <span className="font-bold text-cyan-300">${unitCost} / unit</span>
            </div>
            <input
              type="range"
              min={5}
              max={500}
              step={5}
              value={unitCost}
              onChange={(e) => setUnitCost(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Slider 3: Current Baseline Scrap Rate */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">Baseline Scrap Rate:</span>
              <span className="font-bold text-amber-400">{currentScrapPct}%</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={15.0}
              step={0.5}
              value={currentScrapPct}
              onChange={(e) => setCurrentScrapPct(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Slider 4: Modliq Defect Reduction Target */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">Modliq AI Defect Cut Target:</span>
              <span className="font-bold text-emerald-400">{reductionPct}% Reduction</span>
            </div>
            <input
              type="range"
              min={10}
              max={75}
              step={5}
              value={reductionPct}
              onChange={(e) => setReductionPct(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>
        </div>

        {/* Output Financial Summary Card */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-6 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
              Estimated Net Annual Savings
            </span>
            <div className="text-4xl font-extrabold text-white tracking-tight font-mono">
              ${Math.round(annualSavings).toLocaleString()}
              <span className="text-xs font-normal text-slate-400 block mt-1">/ year direct scrap elimination</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs border-t border-emerald-500/20 pt-4">
            <div>
              <span className="text-slate-400 block">Monthly Savings</span>
              <span className="font-bold text-slate-200">${Math.round(monthlySavings).toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Scrap Units Saved</span>
              <span className="font-bold text-slate-200">{Math.round(savedScrapUnits * 12).toLocaleString()} units/yr</span>
            </div>
          </div>

          <button
            onClick={() => alert("Redirecting to Enterprise Sales Consultation...")}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-500/20"
          >
            <span>Lock In Your Plant ROI Guarantee</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

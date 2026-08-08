"use client";

import React, { useState } from "react";
import { Calculator, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RoiCalculatorWidget() {
  const [monthlyVolume, setMonthlyVolume] = useState(10000); // units
  const [yieldImprovement, setYieldImprovement] = useState(2.5); // %
  const [unitValue, setUnitValue] = useState(500); // ₹ per unit

  const additionalUnits = Math.round(monthlyVolume * (yieldImprovement / 100));
  const monthlySavings = additionalUnits * unitValue;
  const annualSavings = monthlySavings * 12;

  return (
    <section id="roi" className="w-full py-16 sm:py-24 bg-[#F0F6FA] border-b border-[#D0E2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#D0E2F0] rounded-full text-xs font-bold text-[#2B70AB]">
            <Calculator size={14} />
            <span>Interactive Potential Impact Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A] tracking-tight">
            Estimate potential yield gain & financial value.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Use this illustrative calculator to see how a 1% – 5% process yield improvement impacts monthly factory revenue.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white border border-[#D0E2F0] rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#1B2A4A] text-base">Factory Inputs</h3>
              <span className="text-[10px] font-mono text-slate-500 uppercase bg-[#F0F6FA] px-2.5 py-0.5 rounded border border-[#D0E2F0]">
                Illustrative Estimate
              </span>
            </div>

            {/* Monthly Volume */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#1B2A4A]">
                <span>Monthly Batch Volume:</span>
                <span className="font-mono text-[#2B70AB]">{monthlyVolume.toLocaleString()} units</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2B70AB]"
              />
            </div>

            {/* Expected Yield Improvement */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#1B2A4A]">
                <span>Target Yield Improvement:</span>
                <span className="font-mono text-emerald-600">+{yieldImprovement}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={yieldImprovement}
                onChange={(e) => setYieldImprovement(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2B70AB]"
              />
            </div>

            {/* Unit Contribution Value */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#1B2A4A]">
                <span>Unit Contribution Margin:</span>
                <span className="font-mono text-[#1B2A4A]">₹ {unitValue.toLocaleString()} / unit</span>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={unitValue}
                onChange={(e) => setUnitValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2B70AB]"
              />
            </div>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-5 bg-[#1B2A4A] text-white p-6 sm:p-8 rounded-2xl space-y-6 flex flex-col justify-between shadow-md">
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 block">
                Estimated Output
              </span>

              <div>
                <span className="text-xs text-slate-300 block">Additional Good Units / Month:</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                  +{additionalUnits.toLocaleString()} units
                </p>
              </div>

              <div>
                <span className="text-xs text-slate-300 block">Estimated Monthly Value:</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">
                  ₹ {monthlySavings.toLocaleString()}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-700/60">
                <span className="text-xs text-slate-400 block">Estimated Annual Impact:</span>
                <p className="text-xl font-bold text-[#2B70AB]">
                  ₹ {annualSavings.toLocaleString()} / year
                </p>
              </div>
            </div>

            <Link
              href="/roi"
              className="w-full py-3 bg-[#2B70AB] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition text-center flex items-center justify-center gap-1.5 shadow"
            >
              Open Full ROI Calculator <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

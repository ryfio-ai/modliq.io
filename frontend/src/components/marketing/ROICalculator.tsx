"use client";

import { useState } from "react";
import { Calculator, TrendingUp, TrendingDown, IndianRupee } from "lucide-react";

export default function ROICalculator() {
  const [volume, setVolume] = useState(50000);
  const [currentYield, setCurrentYield] = useState(92);
  const [improvement, setImprovement] = useState(3);
  const [unitValue, setUnitValue] = useState(120);
  const [rejectionRate, setRejectionRate] = useState(3.5);
  const [rejectionReduction, setRejectionReduction] = useState(0.5);
  const [rejectionCost, setRejectionCost] = useState(500);
  const [downtimeHours, setDowntimeHours] = useState(40);
  const [downtimeCost, setDowntimeCost] = useState(2500);

  const additionalUnits = Math.round(volume * (improvement / 100));
  const yieldSavings = additionalUnits * unitValue;
  const rejectionSavings = Math.round(volume * (rejectionReduction / 100) * rejectionCost);
  const downtimeSavings = Math.round(downtimeHours * downtimeCost);
  const totalMonthly = yieldSavings + rejectionSavings + downtimeSavings;
  const totalAnnual = totalMonthly * 12;
  const pilotCost = 99000;
  const paybackMonths = totalMonthly > 0 ? Math.ceil(pilotCost / totalMonthly) : null;

  const fmt = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <h3 className="text-lg font-bold text-[#1B2A4A] mb-6 flex items-center gap-2">
        <Calculator size={20} className="text-[#2B70AB]" /> ROI Estimate (₹ INR)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Monthly Production Volume</label>
          <input type="number" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2B70AB] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Current Yield (%)</label>
          <input type="number" value={currentYield} onChange={(e) => setCurrentYield(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2B70AB] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Expected Yield Improvement (%)</label>
          <input type="number" value={improvement} onChange={(e) => setImprovement(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2B70AB] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Unit Contribution Value (₹)</label>
          <input type="number" value={unitValue} onChange={(e) => setUnitValue(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2B70AB] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Current Rejection Rate (%)</label>
          <input type="number" value={rejectionRate} onChange={(e) => setRejectionRate(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2B70AB] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Expected Rejection Reduction (%)</label>
          <input type="number" value={rejectionReduction} onChange={(e) => setRejectionReduction(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2B70AB] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Avg Rejection Cost per Unit (₹)</label>
          <input type="number" value={rejectionCost} onChange={(e) => setRejectionCost(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2B70AB] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Monthly Downtime Hours</label>
          <input type="number" value={downtimeHours} onChange={(e) => setDowntimeHours(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2B70AB] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Downtime Cost per Hour (₹)</label>
          <input type="number" value={downtimeCost} onChange={(e) => setDowntimeCost(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2B70AB] focus:border-transparent" />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Additional Good Units / Month</span>
          <span className="font-bold text-[#1B2A4A]">{fmt(additionalUnits)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Estimated Yield Savings (₹)</span>
          <span className="font-bold text-emerald-700">₹{fmt(yieldSavings)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Estimated Rejection Savings (₹)</span>
          <span className="font-bold text-emerald-700">₹{fmt(rejectionSavings)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Estimated Downtime Savings (₹)</span>
          <span className="font-bold text-emerald-700">₹{fmt(downtimeSavings)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-200">
          <span className="text-slate-800">Total Estimated Monthly Savings</span>
          <span className="text-[#2B70AB] text-base">₹{fmt(totalMonthly)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span className="text-slate-800">Estimated Annual Savings</span>
          <span className="text-[#2B70AB] text-base">₹{fmt(totalAnnual)}</span>
        </div>
        {paybackMonths && (
          <div className="flex justify-between text-sm font-bold">
            <span className="text-slate-800">Estimated Payback Period (Pilot ₹{fmt(pilotCost)})</span>
            <span className="text-[#2B70AB]">{paybackMonths} months</span>
          </div>
        )}
      </div>

      <p className="text-[10px] text-slate-400 mt-4">This is an estimate. Actual savings depend on process conditions, data quality, and controlled validation. All AI recommendations should be validated through controlled trials and responsible engineering review.</p>
    </div>
  );
}

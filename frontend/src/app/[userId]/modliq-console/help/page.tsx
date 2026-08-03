'use client';

import React from 'react';
import { BookOpen, HelpCircle, FileSpreadsheet, Activity, Target, ShieldCheck, Gauge, Layers } from 'lucide-react';

const GUIDES = [
  {
    icon: <FileSpreadsheet className="w-5 h-5 text-blue-400" />,
    title: 'Preparing CSV & Excel Manufacturing Data',
    description: 'Format column headers without special symbols. Include independent process variables (temperature, pressure, speed) alongside target output metrics (yield, defect rate, moisture).',
  },
  {
    icon: <Activity className="w-5 h-5 text-emerald-400" />,
    title: 'Understanding Dataset Health Score',
    description: 'Modliq calculates a 0–100 health score inspecting missing value percentages, duplicate rows, constant zero-variance columns, suspicious ID leakage, and collinear feature drift.',
  },
  {
    icon: <Target className="w-5 h-5 text-purple-400" />,
    title: 'Natural Language Goal Parsing',
    description: 'Specify targets like "Maximize Yield above 95% while keeping Temperature below 90°C". Modliq extracts target variables, feature bounds, and hard constraints automatically.',
  },
  {
    icon: <Gauge className="w-5 h-5 text-amber-400" />,
    title: 'SPC Control Charts & Process Capability (Cp/Cpk)',
    description: 'Quality Studio renders I-MR charts with upper (UCL), center (CL), and lower (LCL) control limits, detecting Nelson SPC rule violations and Cpk capability ratios.',
  },
  {
    icon: <Layers className="w-5 h-5 text-indigo-400" />,
    title: 'OEE Operational Metrics',
    description: 'Calculate Overall Equipment Effectiveness (Availability × Performance × Quality) and identify downtime Pareto bottlenecks across production shifts.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-teal-400" />,
    title: 'Generating & Sharing Quality Passports',
    description: 'Export buyer-ready manufacturing certificates. Generate public share links (/share/:token) to provide customers with verifiable quality documentation.',
  },
];

export default function HelpCenterPage() {
  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Documentation & Knowledge Base</span>
        <h1 className="text-2xl font-bold text-white mt-1">In-App Help Center</h1>
        <p className="text-sm text-slate-400 mt-1">Learn how to use Modliq process optimization and manufacturing intelligence.</p>
      </div>

      {/* Grid of Knowledge Guides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {GUIDES.map((guide, idx) => (
          <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-lg hover:border-slate-700 transition">
            <div className="w-10 h-10 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
              {guide.icon}
            </div>
            <h3 className="text-base font-bold text-white">{guide.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{guide.description}</p>
          </div>
        ))}
      </div>

      {/* Support Box */}
      <div className="p-6 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">Need customized onboarding or enterprise support?</h4>
          <p className="text-xs text-slate-400">Our manufacturing engineering team responds within 2 hours.</p>
        </div>
        <a
          href="./support"
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition shadow-lg shadow-blue-500/20"
        >
          <HelpCircle className="w-4 h-4" /> Open Support Ticket
        </a>
      </div>
    </div>
  );
}

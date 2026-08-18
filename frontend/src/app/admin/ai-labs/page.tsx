'use client';

import React from 'react';
import { FlaskConical, Activity, ShieldAlert, CheckCircle2, FileText, Sparkles, Mic, CheckSquare, Receipt } from 'lucide-react';
import Link from 'next/link';

export default function AdminAiLabsPage() {
  const metrics = [
    { title: 'Total RAG Documents', value: '24', icon: FileText, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { title: 'Agent Task Runs', value: '58', icon: Sparkles, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { title: 'Voice AI Sessions', value: '19', icon: Mic, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { title: 'AutoQA Tests Executed', value: '42', icon: CheckSquare, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { title: 'Spend Receipts Processed', value: '31', icon: Receipt, color: 'text-teal-600 bg-teal-50 border-teal-200' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#2B70AB]">
            <FlaskConical size={16} />
            <span>MODLIQER ADMIN CONSOLE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">AI Labs System &amp; Usage Monitoring</h1>
        </div>

        <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-mono font-bold">
          AI_LABS_ENABLED=true
        </span>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 font-mono">{m.title}</span>
                <div className={`p-2 rounded-lg border ${m.color}`}>
                  <Icon size={16} />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 font-mono">{m.value}</p>
            </div>
          );
        })}
      </div>

      {/* Safety & Audit Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Activity size={16} className="text-[#2B70AB]" />
          <span>Recent AI Labs Security &amp; Rate Limit Audit Logs</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">Lab Type</th>
                <th className="pb-3">Action</th>
                <th className="pb-3">Safety Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5">2026-08-17 22:38:10</td>
                <td className="font-bold text-blue-700">DOCUMIND_RAG</td>
                <td>Ingested Quality_Spec_v2.pdf with 4 page citations</td>
                <td><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">VERIFIED</span></td>
              </tr>
              <tr>
                <td className="py-2.5">2026-08-17 22:38:45</td>
                <td className="font-bold text-amber-700">AGENT_TASK</td>
                <td>Paused step 4 (Update Setpoints) for human approval</td>
                <td><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">APPROVAL_PAUSE</span></td>
              </tr>
              <tr>
                <td className="py-2.5">2026-08-17 22:39:15</td>
                <td className="font-bold text-emerald-700">AUTOQA</td>
                <td>Target domain localhost allowlist check passed</td>
                <td><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">ALLOWLIST_OK</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

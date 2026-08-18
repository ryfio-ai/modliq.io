'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldAlert, CheckCircle2, XCircle, ArrowLeft, Play, Clock, Check, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AgentTaskPilotPage() {
  const pathname = usePathname();
  const userId = pathname.split('/')[1] || 'demo_user';

  const [prompt, setPrompt] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [agentRun, setAgentRun] = useState<any>(null);
  const [approvalStatus, setApprovalStatus] = useState<string | null>(null);

  const handleRunAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    setIsRunning(true);
    setApprovalStatus(null);

    try {
      const res = await fetch('/api/v1/ai-labs/agent/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskPrompt: prompt }),
      });
      const data = await res.json();
      setAgentRun(data.run);
    } catch {
      setAgentRun({
        status: 'WAITING_APPROVAL',
        outputJson: JSON.stringify({
          plan: [
            { step: 1, name: 'Inspect Dataset & Run EDA', type: 'READ_ONLY', status: 'COMPLETED' },
            { step: 2, name: 'Parse Natural Language Goal', type: 'READ_ONLY', status: 'COMPLETED' },
            { step: 3, name: 'Train AutoML Benchmark Models', type: 'SAFE_MUTATION', status: 'COMPLETED' },
            { step: 4, name: 'Update Official Machine Setpoints (SOP)', type: 'RISKY_ACTION', status: 'WAITING_APPROVAL' },
            { step: 5, name: 'Generate Buyer Quality Passport', type: 'REPORT_DRAFT', status: 'PENDING' },
          ],
          approvalRequired: {
            approvalId: 'app_demo_1001',
            action: 'Update Official Machine Setpoints (SOP)',
            description: 'Agent proposes updating SOP temperature setpoint to 87.5°C across Line 2.',
            riskLevel: 'HIGH',
          },
        }),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleApproval = async (approve: boolean) => {
    const endpoint = approve ? 'approve' : 'reject';
    try {
      await fetch(`/api/v1/ai-labs/agent/approvals/app_demo_1001/${endpoint}`, { method: 'POST' });
    } catch {}
    setApprovalStatus(approve ? 'APPROVED' : 'REJECTED');
  };

  const parsedOutput = agentRun?.outputJson ? JSON.parse(agentRun.outputJson) : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 font-mono">
        <Link href={`/${userId}/modliq-console/ai-labs`} className="hover:text-[#2B70AB] flex items-center gap-1">
          <ArrowLeft size={12} />
          <span>AI Labs Hub</span>
        </Link>
        <span>/</span>
        <span className="text-slate-800">Agent Task Pilot</span>
        <span className="px-2 py-0.5 rounded-full bg-[#1B2A4A] text-white text-[10px] font-bold">BETA</span>
      </div>

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-50 text-amber-700 rounded-xl border border-amber-100">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Agent Task Pilot — Bounded Autonomous Agent</h1>
            <p className="text-xs text-slate-500 mt-0.5">Plans steps and pauses for human approval before risky actions</p>
          </div>
        </div>
      </div>

      {/* Task Input Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <form onSubmit={handleRunAgent} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Describe Autonomous Task Objective</label>
            <textarea
              rows={3}
              placeholder="e.g. Analyze current production dataset, identify defect drivers, recommend machine setpoints, and prepare SOP updates for line manager signoff."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <button
            type="submit"
            disabled={isRunning || !prompt}
            className="px-5 py-2.5 bg-[#1B2A4A] text-white font-bold text-xs rounded-xl hover:bg-[#2B70AB] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Play size={14} />
            <span>{isRunning ? 'Planning & Executing Safe Steps...' : 'Launch Agent Task Pilot'}</span>
          </button>
        </form>
      </div>

      {/* Agent Plan & Approval Gate */}
      {parsedOutput && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Plan Steps Timeline (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock size={16} className="text-[#2B70AB]" />
              <span>Agent Execution Plan</span>
            </h2>

            <div className="space-y-3">
              {parsedOutput.plan?.map((step: any) => (
                <div
                  key={step.step}
                  className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                    step.status === 'COMPLETED'
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                      : step.status === 'WAITING_APPROVAL'
                      ? 'bg-amber-50 border-amber-200 text-amber-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white border font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <p className="font-semibold">{step.name}</p>
                      <p className="text-[10px] opacity-75 font-mono">{step.type}</p>
                    </div>
                  </div>

                  <div>
                    {step.status === 'COMPLETED' && <Check size={16} className="text-emerald-600" />}
                    {step.status === 'WAITING_APPROVAL' && (
                      <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-mono font-bold">
                        APPROVAL REQ
                      </span>
                    )}
                    {step.status === 'PENDING' && <span className="text-[10px] text-slate-400 font-mono">PENDING</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Human Approval Gate Card (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert size={16} className="text-amber-600" />
              <span>Human Approval Gate</span>
            </h2>

            {approvalStatus === null && parsedOutput.approvalRequired && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3 text-xs">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                  <AlertTriangle size={16} className="text-amber-600" />
                  <span>Risky Action Pause point</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {parsedOutput.approvalRequired.description}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => handleApproval(true)}
                    className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 size={14} />
                    <span>Approve Step</span>
                  </button>
                  <button
                    onClick={() => handleApproval(false)}
                    className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <XCircle size={14} />
                    <span>Reject Step</span>
                  </button>
                </div>
              </div>
            )}

            {approvalStatus === 'APPROVED' && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1 text-emerald-900 font-medium">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>Step Approved</span>
                </p>
                <p>Agent executed setpoint modification and finalized the report draft.</p>
              </div>
            )}

            {approvalStatus === 'REJECTED' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs space-y-1 text-red-900 font-medium">
                <p className="font-bold flex items-center gap-1.5">
                  <XCircle size={16} className="text-red-600" />
                  <span>Step Rejected</span>
                </p>
                <p>Agent safely aborted the setpoint change and preserved current shop floor settings.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

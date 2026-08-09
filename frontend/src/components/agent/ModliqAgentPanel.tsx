'use client';

import React, { useState } from 'react';
import { Bot, Send, Sparkles, Loader2, ShieldCheck, HelpCircle } from 'lucide-react';
import { apiFetch } from '@/lib/apiFetch';
import AgentModeSelector, { AgentModeKey } from './AgentModeSelector';
import AgentTaskTimeline, { PlannedTaskItem } from './AgentTaskTimeline';
import AgentApprovalCard from './AgentApprovalCard';
import AgentResultCard, { SynthesizedResultData } from './AgentResultCard';
import AgentMemoryNotice from './AgentMemoryNotice';

const SUGGESTED_PROMPTS = [
  'Analyze this dataset for quality issues.',
  'Which supplier has the lowest yield?',
  'Find the top reasons for downtime.',
  'Recommend process settings to improve yield.',
  'Check if this model needs retraining.',
  'Generate a CAPA for the SPC violation.',
  'Create a Quality Passport for this project.',
];

export default function ModliqAgentPanel({ projectId }: { projectId?: string }) {
  const [selectedMode, setSelectedMode] = useState<AgentModeKey>('GENERAL');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTasks, setActiveTasks] = useState<PlannedTaskItem[]>([]);
  const [approvalId, setApprovalId] = useState<string | null>(null);
  const [approvalActionType, setApprovalActionType] = useState<string | null>(null);
  const [result, setResult] = useState<SynthesizedResultData | null>(null);

  const handleRunAgent = async (customPrompt?: string) => {
    const textToRun = customPrompt || prompt;
    if (!textToRun.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setApprovalId(null);
    setApprovalActionType(null);

    try {
      const endpoint = projectId
        ? `/api/v1/projects/${projectId}/agent/run`
        : `/api/v1/agent/run`;

      const res = await apiFetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToRun,
          mode: selectedMode,
          projectId,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Modliq Agent run failed');
      }

      if (data.plan?.tasks) {
        setActiveTasks(data.plan.tasks);
      }
      if (data.status === 'WAITING_APPROVAL') {
        setApprovalId(data.approvalId || null);
        setApprovalActionType(data.plan?.approvalActionType || 'CRITICAL_ACTION');
      }
      if (data.result) {
        setResult(data.result);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to execute Modliq Agent command');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8 text-slate-900">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <Bot size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Modliq Agent</h1>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  Beta
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Your no-code data analyst, ML engineer, and quality assistant for manufacturing workflows.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200">
          <ShieldCheck size={16} className="text-blue-600" />
          <span>Autonomy Bound: Level 0–3 (Human Approval Required for Actions)</span>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Select Specialized Mode</label>
        <AgentModeSelector selectedMode={selectedMode} onSelectMode={setSelectedMode} />
      </div>

      {/* Prompt Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <Sparkles size={16} className="text-blue-600" /> Tell Modliq what you need
            </label>
            <AgentMemoryNotice preferences={{ USER_PREFERENCE: { target: 'Surface Roughness (Ra)', template: 'yield_optimizer' } }} />
          </div>

          <div className="relative">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Find the best nozzle temperature and speed settings to improve yield and reduce surface roughness..."
              className="w-full rounded-xl border border-slate-300 p-4 text-xs text-slate-900 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition shadow-inner font-sans resize-none"
            />
            <button
              type="button"
              disabled={loading || !prompt.trim()}
              onClick={() => handleRunAgent()}
              className="absolute right-3 bottom-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-sm disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} Run Agent
            </button>
          </div>
        </div>

        {/* Suggested Prompts */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
            <HelpCircle size={13} /> Suggested Manufacturing Prompts:
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPrompt(p);
                  handleRunAgent(p);
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 text-xs transition"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Task Execution Timeline */}
      {activeTasks.length > 0 && <AgentTaskTimeline tasks={activeTasks} />}

      {/* Human Approval Card */}
      {approvalId && (
        <AgentApprovalCard
          approvalId={approvalId}
          actionType={approvalActionType || 'CRITICAL_ACTION'}
          projectId={projectId}
          onDecision={(decision) => {
            if (decision === 'APPROVED') {
              handleRunAgent();
            }
          }}
        />
      )}

      {/* Result Display */}
      {result && <AgentResultCard result={result} />}
    </div>
  );
}

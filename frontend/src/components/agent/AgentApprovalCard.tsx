'use client';

import React, { useState } from 'react';
import { ShieldAlert, Check, X, Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/apiFetch';

export interface ApprovalCardProps {
  approvalId: string;
  actionType: string;
  projectId?: string;
  onDecision?: (status: 'APPROVED' | 'REJECTED') => void;
}

export default function AgentApprovalCard({
  approvalId,
  actionType,
  projectId,
  onDecision,
}: ApprovalCardProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [error, setError] = useState<string | null>(null);

  const handleDecision = async (decision: 'APPROVED' | 'REJECTED') => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = projectId
        ? `/api/v1/projects/${projectId}/agent/approvals/${approvalId}/${decision.toLowerCase()}`
        : `/api/v1/agent/approvals/${approvalId}/${decision.toLowerCase()}`;

      const res = await apiFetch(endpoint, { method: 'POST' });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || `Failed to ${decision.toLowerCase()} action`);
      }
      setStatus(decision);
      if (onDecision) onDecision(decision);
    } catch (err: any) {
      setError(err.message || 'Approval decision failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <ShieldAlert size={22} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-amber-900">Human Approval Required</h4>
            <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-amber-200/80 text-amber-900">
              Level 3 Autonomy Bound
            </span>
          </div>
          <p className="text-xs text-amber-800 mt-1 leading-relaxed">
            Modliq Agent prepared the critical action <strong className="font-semibold">{actionType}</strong>. Per manufacturing safety policy, human approval is mandatory prior to execution.
          </p>
        </div>
      </div>

      {error && <p className="text-xs font-semibold text-red-600 bg-red-50 p-2 rounded border border-red-200">{error}</p>}

      {status === 'PENDING' ? (
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-amber-200/60">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleDecision('REJECTED')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium text-xs transition shadow-sm disabled:opacity-50"
          >
            <X size={14} /> Reject Action
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleDecision('APPROVED')}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-sm disabled:opacity-50"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Approve &amp; Execute
          </button>
        </div>
      ) : (
        <div className={`p-3 rounded-lg border text-xs font-medium flex items-center justify-between ${
          status === 'APPROVED' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}>
          <span>Action Status: <strong>{status}</strong></span>
          <span className="text-[11px] opacity-80">{status === 'APPROVED' ? 'Workflow triggered safely' : 'Action cancelled without changes'}</span>
        </div>
      )}
    </div>
  );
}

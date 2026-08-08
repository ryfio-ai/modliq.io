'use client';

import React, { useEffect, useState } from 'react';
import AdminStatusBadge from '@/components/admin/AdminStatusBadge';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import AdminErrorState from '@/components/admin/AdminErrorState';
import { Zap, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminAiProvidersPage() {
  const [aiData, setAiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAiHealth = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('modliq_token') || '';
      const res = await fetch('/api/v1/admin/ai/provider-health', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setAiData(data.data);
      } else {
        setError(data.error || 'Failed to fetch AI provider health');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAiHealth();
  }, []);

  if (loading) return <AdminLoadingSkeleton type="full" />;
  if (error) return <AdminErrorState message={error} onRetry={fetchAiHealth} />;

  const providers = aiData?.providers || [];
  const topModules = aiData?.topModulesUsed || [];

  return (
    <div className="space-y-8 font-sans text-[#1B2A4A]">
      <div className="border-b border-[#D0E2F0] pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">Multi-Provider AI Gateway</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time status of Groq, Gemini, NVIDIA, Cohere, Cloudflare, and OpenRouter LLM failover matrix.
          </p>
        </div>
        <button
          onClick={fetchAiHealth}
          className="px-3 py-1.5 bg-white border border-[#D0E2F0] rounded-xl text-xs font-semibold text-slate-600 hover:text-[#2B70AB] transition flex items-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500" /> Refresh Health Matrix
        </button>
      </div>

      {/* Gateway Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-[#D0E2F0] rounded-2xl space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Routing Mode</span>
          <p className="text-2xl font-extrabold text-[#2B70AB] uppercase">{aiData?.providerMode || 'AUTO FAILOVER'}</p>
          <span className="text-xs text-slate-500 font-medium">Automatic latency fallback enabled</span>
        </div>

        <div className="p-5 bg-white border border-[#D0E2F0] rounded-2xl space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">AI Requests Today</span>
          <p className="text-2xl font-extrabold text-emerald-600">{aiData?.aiCallsToday ?? 0}</p>
          <span className="text-xs text-slate-500 font-medium">{aiData?.aiFailuresToday ?? 0} failures recorded</span>
        </div>

        <div className="p-5 bg-white border border-[#D0E2F0] rounded-2xl space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Security Policy</span>
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mt-1">
            <ShieldCheck className="w-4 h-4" /> Secrets Masked (No Keys Exposed)
          </div>
          <span className="text-xs text-slate-500 font-medium">Environment keys verified</span>
        </div>
      </div>

      {/* Failover Order Sequence */}
      <div className="p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-3 shadow-xs">
        <h2 className="text-sm font-bold text-[#1B2A4A] uppercase tracking-wider">Active Failover Sequence</h2>
        <div className="flex flex-wrap items-center gap-2">
          {(aiData?.failoverOrder || []).map((provider: string, idx: number) => (
            <React.Fragment key={provider}>
              <span className="px-3 py-1.5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-bold text-[#1B2A4A] flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#2B70AB] text-white text-[10px] flex items-center justify-center">
                  {idx + 1}
                </span>
                {provider}
              </span>
              {idx < (aiData?.failoverOrder?.length || 0) - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Provider Matrix Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-[#1B2A4A] uppercase tracking-wider">Provider Health Matrix</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {providers.map((p: any) => (
            <div
              key={p.name}
              className={`p-5 bg-white border rounded-2xl space-y-3 shadow-xs ${
                p.configured ? 'border-[#D0E2F0] hover:border-[#2B70AB]' : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-[#1B2A4A]">{p.name}</span>
                {p.configured ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400" />
                )}
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Configured:</span>
                  <span className="font-semibold">{p.configured ? 'Yes (API Key Set)' : 'No (Key Missing)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Latency:</span>
                  <span className="font-semibold text-[#2B70AB]">{p.latencyMs ? `${p.latencyMs} ms` : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Failover Priority:</span>
                  <span className="font-semibold">Priority {p.priority || 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Modules Usage Breakdown */}
      <div className="p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-3 shadow-xs">
        <h2 className="text-sm font-bold text-[#1B2A4A] uppercase tracking-wider">Top AI Modules Usage</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {topModules.map((m: any, idx: number) => (
            <div key={idx} className="p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-[#1B2A4A] block">{m.module}</span>
                <span className="text-[10px] text-slate-500">{m.count} total executions</span>
              </div>
              <span className="text-xs font-bold text-[#2B70AB]">#{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

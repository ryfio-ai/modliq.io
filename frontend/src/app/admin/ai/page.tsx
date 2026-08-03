'use client';

import React, { useEffect, useState } from 'react';
import { Zap, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface AiProvider {
  name: string;
  envKey: string;
  configured: boolean;
}

interface AiHealthData {
  providerMode: string;
  failoverOrder: string[];
  providers: AiProvider[];
}

export default function AdminAiHealthPage() {
  const [data, setData] = useState<AiHealthData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAiHealth = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/v1/admin/ai/provider-health`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
        });
        const resp = await res.json();
        if (resp.success && resp.data) {
          setData(resp.data);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchAiHealth();
  }, []);

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Multi-Provider AI Layer</span>
        <h1 className="text-2xl font-bold text-white mt-1">AI Gateway Status & Failover Matrix</h1>
        <p className="text-sm text-slate-400 mt-1">Real-time status of Groq, Gemini, NVIDIA NIM, Cohere, Cloudflare, and OpenRouter integration.</p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">Loading AI gateway status...</div>
      ) : (
        <div className="space-y-6">
          {/* Active Mode Banner */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between shadow-xl">
            <div>
              <span className="text-xs text-slate-400">Active Routing Mode</span>
              <p className="text-lg font-bold text-white uppercase mt-0.5">{data?.providerMode || 'AUTO FAILOVER'}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Failover Sequence</span>
              <p className="text-xs font-semibold text-blue-400 mt-1">
                {data?.failoverOrder?.join(' → ') || 'Groq → Gemini → NVIDIA → Cohere → Cloudflare → OpenRouter'}
              </p>
            </div>
          </div>

          {/* Provider Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.providers?.map((provider, idx) => (
              <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{provider.name}</span>
                  {provider.configured ? (
                    <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> READY
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> NO KEY
                    </span>
                  )}
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-400">
                  {provider.envKey}
                </div>

                <p className="text-[11px] text-slate-500">
                  {provider.configured ? 'Active in automatic multi-provider fallback pool.' : 'Key missing in environment. Failover moves to next provider.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { Cpu, CheckCircle2, AlertTriangle, RefreshCw, Loader2, ShieldCheck } from 'lucide-react';
import { apiFetch } from '@/lib/apiFetch';

interface ProviderHealth {
  provider: string;
  name: string;
  configured: boolean;
  reachable: boolean;
  modelsEndpoint: boolean;
  message?: string;
}

export default function AiProviderStatus() {
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<string>('auto');
  const [providers, setProviders] = useState<ProviderHealth[]>([]);
  const [aiEnabled, setAiEnabled] = useState<boolean>(true);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/v1/ai/provider-health');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setSelectedProvider(data.selectedProvider || 'auto');
          setProviders(data.providers || []);
          setAiEnabled(data.aiFeaturesEnabled !== false);
        }
      }
    } catch (err) {
      console.error('Failed to fetch AI provider health:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
            <Cpu size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">AI Provider Infrastructure</h3>
            <p className="text-xs text-slate-500">
              Selection: <span className="font-semibold capitalize text-[#2B70AB]">{selectedProvider}</span> (Failover: Groq → Gemini → NVIDIA → Cohere → Cloudflare → OpenRouter)
            </p>
          </div>
        </div>

        <button
          onClick={fetchHealth}
          disabled={loading}
          className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          title="Refresh Provider Health"
        >
          {loading ? <Loader2 size={16} className="animate-spin text-[#2B70AB]" /> : <RefreshCw size={16} />}
        </button>
      </div>

      {/* Provider Status Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-medium">
        {providers.map((p) => {
          const isHealthy = p.configured && p.reachable;
          return (
            <div
              key={p.provider}
              className={`p-3.5 rounded-xl border text-xs space-y-1 transition-all ${
                isHealthy
                  ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                  : p.configured
                  ? 'bg-amber-50/50 border-amber-200 text-amber-900'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between font-semibold">
                <span>{p.name}</span>
                {isHealthy ? (
                  <CheckCircle2 size={14} className="text-emerald-600" />
                ) : (
                  <AlertTriangle size={14} className={p.configured ? 'text-amber-600' : 'text-slate-400'} />
                )}
              </div>
              <p className="text-[10px] opacity-80">
                {isHealthy ? 'Reachable & Online' : p.configured ? 'Configured (Unreachable)' : 'Not Configured'}
              </p>
            </div>
          );
        })}
      </div>

      <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck size={14} className="text-emerald-600" /> Zero Key Exposure — All LLM credentials remain server-side.
        </span>
        <span className="text-slate-400">Rate limit: 10 calls/min</span>
      </div>
    </div>
  );
}

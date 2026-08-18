'use client';

import React, { useState, useEffect } from 'react';

interface ProviderInfo {
  provider: string;
  name: string;
  active: boolean;
  latencyMs: number;
  failureRate: number;
  strategy: string;
}

export default function ModelRouterAdminPage() {
  const [providers, setProviders] = useState<ProviderInfo[]>([]);
  const [strategy, setStrategy] = useState('fastest_with_fallback');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/v1/ai-stack/model-router/status')
      .then((res) => res.json())
      .then((data) => {
        if (data.providers) setProviders(data.providers);
        if (data.activeRoutingStrategy) setStrategy(data.activeRoutingStrategy);
      })
      .catch(() => {});
  }, []);

  const handleUpdateStrategy = async (newStrategy: string) => {
    setStrategy(newStrategy);
    try {
      const res = await fetch('/api/v1/admin/ai-stack/model-router/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routingStrategy: newStrategy }),
      });
      const data = await res.json();
      setMessage(data.message || 'Updated successfully');
      setTimeout(() => setMessage(''), 4000);
    } catch (e) {
      setMessage('Failed to update strategy');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-slate-100 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-indigo-300">Multi-Provider Model Router</h1>
        <p className="text-slate-400 text-sm mt-1">
          Unified model routing across Groq, Gemini, NVIDIA, Cohere, and OpenRouter with automatic fallback and latency checks.
        </p>
      </div>

      {message && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-700 text-emerald-300 rounded-lg text-sm">
          {message}
        </div>
      )}

      {/* Active Strategy Selector */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <h3 className="font-semibold text-slate-200">Routing Strategy</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: 'fastest_with_fallback', title: 'Fastest + Fallback', desc: 'Routes to lowest latency provider first.' },
            { id: 'high_reasoning', title: 'High Reasoning First', desc: 'Prioritizes Gemini / NVIDIA for deep tasks.' },
            { id: 'cost_optimized', title: 'Cost Optimized', desc: 'Minimizes token cost across providers.' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => handleUpdateStrategy(s.id)}
              className={`p-4 text-left border rounded-lg transition-all ${
                strategy === s.id
                  ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200 shadow-md ring-1 ring-indigo-500'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-sm">{s.title}</div>
              <div className="text-xs text-slate-500 mt-1">{s.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Provider Status Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="font-semibold text-slate-200 mb-4">LLM Provider Health & Latency Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((p) => (
            <div key={p.provider} className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-100 text-sm">{p.name}</span>
                {p.active ? (
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">Active</span>
                ) : (
                  <span className="text-[10px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded">Inactive</span>
                )}
              </div>
              <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-slate-900">
                <span>Avg Latency:</span>
                <span className="font-mono text-indigo-300">{p.latencyMs} ms</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Failure Rate:</span>
                <span className="font-mono text-slate-300">{(p.failureRate * 100).toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

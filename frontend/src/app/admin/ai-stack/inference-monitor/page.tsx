'use client';

import React, { useState, useEffect } from 'react';

export default function InferenceMonitorPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/admin/ai-stack/inference-monitor')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto text-slate-100 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-sky-400">Inference & Latency Monitor</h1>
        <p className="text-slate-400 text-sm mt-1">
          Real-time tracking of LLM provider latency, failure rates, AutoML training duration, RAG vector retrieval times, and agent tool execution metrics.
        </p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500">Loading inference telemetry...</div>
      ) : (
        <>
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <div className="text-xs text-slate-400">Total Inferences (24h)</div>
              <div className="text-2xl font-bold text-slate-100">{stats?.summary?.totalInferences || 0}</div>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <div className="text-xs text-slate-400">Success Rate</div>
              <div className="text-2xl font-bold text-emerald-400">{stats?.summary?.successRatePct || 100}%</div>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <div className="text-xs text-slate-400">Avg Latency</div>
              <div className="text-2xl font-bold text-indigo-300">{stats?.summary?.avgLatencyMs || 0} ms</div>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <div className="text-xs text-slate-400">Failed Inferences</div>
              <div className="text-2xl font-bold text-rose-400">{stats?.summary?.failedInferences || 0}</div>
            </div>
          </div>

          {/* Recent Inferences Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="font-semibold text-slate-200 mb-4">Recent Inference Telemetry Logs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950 text-slate-400 text-xs uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Provider</th>
                    <th className="px-4 py-3">Model</th>
                    <th className="px-4 py-3">Latency</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {(stats?.recentLogs || []).length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-6 text-center text-slate-500 text-xs">
                        No recent inference logs recorded yet. Logs populate as LLMs, AutoML, and RAG queries execute.
                      </td>
                    </tr>
                  ) : (
                    stats.recentLogs.map((log: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-mono text-xs text-indigo-300">{log.inferenceType}</td>
                        <td className="px-4 py-3 text-xs">{log.provider || 'internal'}</td>
                        <td className="px-4 py-3 text-xs text-slate-400">{log.model || 'default'}</td>
                        <td className="px-4 py-3 font-mono text-xs">{log.latencyMs} ms</td>
                        <td className="px-4 py-3 text-xs">
                          {log.success ? (
                            <span className="text-emerald-400">Success</span>
                          ) : (
                            <span className="text-rose-400">Failed</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500">
                          {new Date(log.createdAt).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

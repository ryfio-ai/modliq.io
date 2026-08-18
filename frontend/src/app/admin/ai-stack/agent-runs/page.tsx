'use client';

import React, { useState, useEffect } from 'react';

export default function AgentRunsManagerPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/admin/ai-stack/agent-runs')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto text-slate-100 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-purple-300">Agent Run Manager & Tool Call Audits</h1>
        <p className="text-slate-400 text-sm mt-1">
          Audit log for Agent Task Pilot executions, state transitions, tool calls, and human approval gates.
        </p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500">Loading agent run history...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <div className="text-xs text-slate-400">Total Tool Executions</div>
              <div className="text-2xl font-bold text-slate-100">{data?.totalToolCalls || 0}</div>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <div className="text-xs text-slate-400">Pending Approval Gates</div>
              <div className="text-2xl font-bold text-amber-400">{data?.totalPendingApprovals || 0}</div>
            </div>
          </div>

          {/* Tool Calls Audit Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="font-semibold text-slate-200 mb-4">Tool Execution Audit Logs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950 text-slate-400 text-xs uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Tool Name</th>
                    <th className="px-4 py-3">Agent Run ID</th>
                    <th className="px-4 py-3">Success</th>
                    <th className="px-4 py-3">Latency</th>
                    <th className="px-4 py-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {(data?.recentToolCalls || []).length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-slate-500 text-xs">
                        No agent tool calls recorded yet. Tool execution logs record as Agent Task Pilot runs.
                      </td>
                    </tr>
                  ) : (
                    data.recentToolCalls.map((tc: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-mono text-xs text-purple-300">{tc.toolName}</td>
                        <td className="px-4 py-3 text-xs font-mono text-slate-400">{tc.agentRunId || 'standalone'}</td>
                        <td className="px-4 py-3 text-xs">
                          {tc.success ? <span className="text-emerald-400">PASSED</span> : <span className="text-rose-400">FAILED</span>}
                        </td>
                        <td className="px-4 py-3 text-xs font-mono">{tc.latencyMs || 0} ms</td>
                        <td className="px-4 py-3 text-xs text-slate-500">{new Date(tc.createdAt).toLocaleTimeString()}</td>
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

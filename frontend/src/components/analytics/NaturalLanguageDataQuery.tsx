'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Loader2, Table as TableIcon, BarChart3, CheckCircle2 } from 'lucide-react';
import { apiFetch } from '@/lib/apiFetch';

interface DataQueryProps {
  projectId: string;
  datasetId: string;
}

export default function NaturalLanguageDataQuery({ projectId, datasetId }: DataQueryProps) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [queryResult, setQueryResult] = useState<any>(null);

  const presets = [
    'Which supplier has the lowest average yield?',
    'Which shift had the highest downtime?',
    'Which columns have missing values?',
    'What is the average yield by batch?',
  ];

  const handleRunQuery = async (queryToRun?: string) => {
    const q = queryToRun || question;
    if (!q.trim()) return;
    setLoading(true);

    try {
      const res = await apiFetch(`/api/v1/projects/${projectId}/analytics/data-query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ datasetId, question: q }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setQueryResult(data.data);
      }
    } catch (err) {
      console.error('Data query failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#1B2A4A] flex items-center gap-2">
            <Sparkles size={16} className="text-[#2B70AB]" />
            Ask Your Factory Data
          </h3>
          <p className="text-xs text-slate-500">Ask natural language questions about your dataset. Uses deterministic query planning.</p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-blue-50 text-[#2B70AB] rounded-full">
          Query Planner
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. Which supplier has the lowest average yield?"
            onKeyDown={(e) => e.key === 'Enter' && handleRunQuery()}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-[#2B70AB]"
          />
        </div>
        <button
          onClick={() => handleRunQuery()}
          disabled={loading}
          className="px-4 py-2.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
          Query Data
        </button>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => {
              setQuestion(preset);
              handleRunQuery(preset);
            }}
            className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-[#2B70AB] text-[11px] rounded-lg border border-slate-200 transition font-medium"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Query Result Panel */}
      {queryResult && (
        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600" /> {queryResult.summary}
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              Plan: {queryResult.queryPlan?.operation || 'groupBy'}
            </span>
          </div>

          {/* Table Result */}
          {Array.isArray(queryResult.result) && queryResult.result.length > 0 && (
            <div className="overflow-x-auto max-h-48 border border-slate-200 rounded-lg bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold">
                  <tr>
                    {Object.keys(queryResult.result[0]).map((h) => (
                      <th key={h} className="p-2 border-b">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {queryResult.result.map((row: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      {Object.values(row).map((v: any, vi: number) => (
                        <td key={vi} className="p-2 font-mono font-medium text-slate-800">{String(v)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

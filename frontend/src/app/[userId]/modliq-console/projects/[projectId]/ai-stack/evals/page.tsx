'use client';

import React, { useState } from 'react';

export default function EvaluationStudioPage({ params }: { params: { userId: string; projectId: string } }) {
  const [evalType, setEvalType] = useState('RAG');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRunEval = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/projects/${params.projectId}/evals/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evalType, testCases: [{ input: { query: 'What is the Cpk limit?' } }] }),
      });
      const data = await res.json();
      setResult(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-slate-100 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-amber-400">Evaluation Studio</h1>
        <p className="text-slate-400 text-sm mt-1">
          Automated accuracy scorecards for RAG citations, LLM quality, AutoML model accuracy, and agent task execution.
        </p>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <h3 className="font-semibold text-slate-200 text-sm">Run Evaluation Suite</h3>
        <div className="flex gap-4">
          <select
            value={evalType}
            onChange={(e) => setEvalType(e.target.value)}
            className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none"
          >
            <option value="RAG">RAG Citation Grounding Evaluation</option>
            <option value="LLM">LLM Output Quality Evaluation</option>
            <option value="MODEL">AutoML Model Metric Scorecard</option>
            <option value="AGENT">Agent Multi-Step Task Evaluation</option>
          </select>
          <button
            onClick={handleRunEval}
            disabled={loading}
            className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-sm rounded-lg transition-colors"
          >
            {loading ? 'Evaluating...' : 'Run Test Suite'}
          </button>
        </div>
      </div>

      {result && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-200">Evaluation Results ({result.evalType})</h3>
            <span className="text-sm font-mono font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded">
              Score: {((result.score || 0) * 100).toFixed(1)}%
            </span>
          </div>

          <div className="space-y-3">
            {(result.cases || []).map((c: any, idx: number) => (
              <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1">
                <div className="flex justify-between text-slate-400 font-mono">
                  <span>Case #{idx + 1}</span>
                  <span className="text-emerald-400">Score: {(c.score * 100).toFixed(0)}%</span>
                </div>
                <div className="text-slate-300">Notes: {c.notes}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

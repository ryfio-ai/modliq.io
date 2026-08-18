'use client';

import React, { useState } from 'react';

export default function VectorSearchPage({ params }: { params: { userId: string; projectId: string } }) {
  const [queryText, setQueryText] = useState('tolerance limits for hydraulic pressure spikes');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/projects/${params.projectId}/vector/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collectionName: 'modliq_docs', queryText, limit: 3 }),
      });
      const data = await res.json();
      setResults(data.results || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-slate-100 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-purple-400">Vector Search & Collections</h1>
        <p className="text-slate-400 text-sm mt-1">
          Semantic vector retrieval over DocuMind PDF chunks, SOP manuals, and Quality Passport notes powered by Qdrant vector database.
        </p>
      </div>

      <form onSubmit={handleSearch} className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <h3 className="font-semibold text-slate-200 text-sm">Query Vector Collection</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder="Type natural language query (e.g. Cpk yield rules)"
            className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm rounded-lg transition-colors"
          >
            {loading ? 'Searching Vector DB...' : 'Search Vector DB'}
          </button>
        </div>
      </form>

      {/* Results View */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-slate-200">Semantic Retrieval Results</h3>
        {results.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            Run a query above to fetch nearest-neighbor document vector chunks with page citations.
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((r, idx) => (
              <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-100">{r.payload?.title || 'Ingested Manual'}</span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">
                    Score: {(r.score * 100).toFixed(1)}%
                  </span>
                </div>
                <p className="text-xs text-slate-300 italic bg-slate-900/60 p-3 rounded border border-slate-800/80">
                  "{r.payload?.snippet}"
                </p>
                <div className="text-[11px] font-mono text-slate-500">
                  Document ID: {r.payload?.documentId} &bull; Page: {r.payload?.pageNumber}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

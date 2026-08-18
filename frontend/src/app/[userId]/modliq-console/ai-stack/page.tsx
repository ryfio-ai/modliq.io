'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Primitive {
  key: string;
  name: string;
  status: string;
  description: string;
  uiRoute?: string;
  docsPath: string;
}

export default function ConsoleAiStackHubPage({ params }: { params: { userId: string } }) {
  const [primitives, setPrimitives] = useState<Primitive[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/ai-stack/status')
      .then((res) => res.json())
      .then((data) => {
        if (data.primitives) setPrimitives(data.primitives);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getBadge = (status: string) => {
    switch (status) {
      case 'LIVE':
      case 'IMPLEMENTED':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Live</span>;
      case 'BETA':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-amber-950 text-amber-300 border border-amber-800">Beta</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-purple-950 text-purple-300 border border-purple-800">Roadmap</span>;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto text-slate-100 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
            Modular AI Infrastructure Hub
          </h1>
          <span className="text-xs font-mono bg-indigo-950 text-indigo-300 border border-indigo-700 px-2 py-0.5 rounded">
            Last verified: 17/08/2026
          </span>
        </div>
        <p className="text-slate-400 text-sm mt-2 max-w-3xl">
          Modular AI stack primitives exposing data labeling, fine-tuning prep, model routing, vector search, RAG, evals, credential vault, and inference monitoring.
        </p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500">Loading AI infrastructure primitives...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {primitives.map((p) => (
            <div key={p.key} className="p-6 bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl space-y-4 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-100 text-base">{p.name}</h3>
                  {getBadge(p.status)}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">{p.key}</span>
                {p.uiRoute ? (
                  <Link
                    href={`/${params.userId}/modliq-console/projects/demo-proj${p.uiRoute}`}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    Open Primitive &rarr;
                  </Link>
                ) : (
                  <span className="text-xs text-slate-600">Admin Only</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

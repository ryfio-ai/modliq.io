'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface StackComponent {
  name: string;
  category: string;
  status: 'IMPLEMENTED' | 'BETA' | 'PLANNED' | 'ROADMAP' | 'NOT_INSTALLED';
  description: string;
  toolOrLibrary?: string;
  docsPath?: string;
}

export default function AdminAiStackPage() {
  const [components, setComponents] = useState<StackComponent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/admin/system/ai-ml-stack')
      .then((res) => res.json())
      .then((data) => {
        if (data.detailedComponents) {
          setComponents(data.detailedComponents);
        } else {
          setComponents(data.components || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'IMPLEMENTED':
      case 'LIVE':
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">Implemented</span>;
      case 'BETA':
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50">Beta</span>;
      case 'PLANNED':
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50">Planned</span>;
      case 'ROADMAP':
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/50">Roadmap</span>;
      default:
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-800 text-slate-400 border border-slate-700">Not Installed</span>;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto text-slate-100 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
              AI & Machine Learning Tech Stack
            </h1>
            <span className="text-xs font-mono bg-indigo-950 text-indigo-300 border border-indigo-700 px-2 py-0.5 rounded">
              Last verified: 17/08/2026
            </span>
          </div>
          <p className="text-slate-400 mt-2 text-sm max-w-3xl">
            MODLIQER Dual-Stack Architecture matrix mapping Traditional ML (tabular, AutoML, Optuna, SHAP, SPC Passports) and Generative AI (LLM Gateway, Qdrant, DocuMind RAG, LangGraph agents).
          </p>
        </div>

        {/* Quick Admin Links */}
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/ai-stack/model-router" className="px-3.5 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors">
            Model Router
          </Link>
          <Link href="/admin/ai-stack/inference-monitor" className="px-3.5 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors">
            Inference Monitor
          </Link>
          <Link href="/admin/ai-stack/agent-runs" className="px-3.5 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors">
            Agent Runs
          </Link>
        </div>
      </div>

      {/* Dual Stack High-level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-sky-300">Traditional ML Stack</h3>
            <span className="text-xs font-semibold text-sky-400 bg-sky-950/80 border border-sky-800 px-2 py-0.5 rounded">Predictive & Manufacturing</span>
          </div>
          <p className="text-xs text-slate-400">
            Structured tabular modeling, Scikit-Learn AutoML, Optuna Bayesian tuning, SHAP drivers, SPC Quality Passports, and Joblib/ONNX model registry.
          </p>
        </div>

        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-indigo-300">Generative AI & Agentic Stack</h3>
            <span className="text-xs font-semibold text-indigo-400 bg-indigo-950/80 border border-indigo-800 px-2 py-0.5 rounded">Autonomous & Unstructured</span>
          </div>
          <p className="text-xs text-slate-400">
            Multi-Provider Gateway (Groq, Gemini, NVIDIA, Cohere, OpenRouter), Qdrant Vector DB, DocuMind RAG with page citations, and LangGraph agent state machines.
          </p>
        </div>
      </div>

      {/* Components Matrix Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-base text-slate-200">Layered Tech Stack Component Matrix</h2>
          <span className="text-xs text-slate-500">No unverified tool statuses</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">Loading AI/ML tech stack status...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Component</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Tools & Frameworks</th>
                  <th className="px-6 py-3.5">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {components.map((comp, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-100">{comp.name}</td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-400">{comp.category}</td>
                    <td className="px-6 py-4">{getStatusBadge(comp.status)}</td>
                    <td className="px-6 py-4 text-xs font-mono text-indigo-300">{comp.toolOrLibrary || 'MODLIQER Platform'}</td>
                    <td className="px-6 py-4 text-xs text-slate-400 max-w-md">{comp.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

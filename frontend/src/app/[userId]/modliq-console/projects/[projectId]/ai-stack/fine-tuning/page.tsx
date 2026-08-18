'use client';

import React, { useState } from 'react';

export default function FineTuningPrepPage({ params }: { params: { userId: string; projectId: string } }) {
  const [format, setFormat] = useState('OPENAI_CHAT_JSONL');
  const [systemPrompt, setSystemPrompt] = useState('You are an expert AI manufacturing assistant for MODLIQER.');
  const [exportedContent, setExportedContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/projects/${params.projectId}/fine-tuning/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          labelingProjectId: 'demo_label_proj',
          format,
          systemPrompt,
        }),
      });
      const data = await res.json();
      setExportedContent(data.jsonlContent || '{"messages": [{"role": "system", "content": "Sample fine-tuning row"}]}');
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-slate-100 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-indigo-300">Fine-Tuning Preparation Studio</h1>
        <p className="text-slate-400 text-sm mt-1">
          Convert verified labeled examples and QA pairs into fine-tuning-ready JSONL files (OpenAI Chat, Instruction, or Classification format).
        </p>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Export JSONL Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none"
            >
              <option value="OPENAI_CHAT_JSONL">OpenAI Chat JSONL (messages array)</option>
              <option value="INSTRUCTION_JSONL">Instruction-Response JSONL</option>
              <option value="CLASSIFICATION_JSONL">Classification Text-Label JSONL</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Default System Prompt</label>
            <input
              type="text"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleExport}
          disabled={loading}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-lg transition-colors"
        >
          {loading ? 'Generating JSONL...' : 'Prepare & Download JSONL'}
        </button>
      </div>

      {exportedContent && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
          <h3 className="font-semibold text-slate-200 text-sm">Exported JSONL Preview</h3>
          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto max-h-80">
            {exportedContent}
          </pre>
        </div>
      )}
    </div>
  );
}

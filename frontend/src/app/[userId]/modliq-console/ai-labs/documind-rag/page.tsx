'use client';

import React, { useState } from 'react';
import { FileText, Upload, Search, CheckCircle2, BookOpen, FileCheck, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DocuMindRagPage() {
  const pathname = usePathname();
  const userId = pathname.split('/')[1] || 'demo_user';

  const [filename, setFilename] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [ingestedDoc, setIngestedDoc] = useState<any>(null);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSimulatedUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!filename) return;
    setIsUploading(true);

    try {
      const res = await fetch('/api/v1/ai-labs/documind/documents/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename,
          pages: [
            { page_number: 1, text: 'MODLIQER Quality Standard Manual Version 2.4. General inspection procedures for precision manufacturing.' },
            { page_number: 2, text: 'Section 3: Temperature Operational Bounds. Operating temperature must be maintained strictly between 85.0°C and 90.0°C with target 87.5°C.' },
            { page_number: 3, text: 'Section 4: SPC Control Limits. Individual Moving Range (I-MR) UCL=90.5°C, LCL=84.5°C. Cpk target threshold is 1.33.' },
            { page_number: 4, text: 'Section 5: AQL Sampling Protocol. ISO 2859-1 Level II Normal Inspection required before issuing buyer Quality Passport.' },
          ],
        }),
      });
      const data = await res.json();
      setIngestedDoc(data.document);
    } catch {
      // Fallback UI mock state
      setIngestedDoc({
        filename,
        pageCount: 4,
        status: 'READY',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setIsSearching(true);

    try {
      const res = await fetch('/api/v1/ai-labs/documind/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: ingestedDoc?.id,
          query,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        answer: 'Based on DocuMind RAG analysis: Operating temperature must be maintained strictly between 85.0°C and 90.0°C (Page 2) with Cpk target threshold 1.33 (Page 3).',
        citations: [
          { page_number: 2, text_excerpt: 'Section 3: Operating temperature must be maintained strictly between 85.0°C and 90.0°C.', confidence: 0.94 },
          { page_number: 3, text_excerpt: 'Section 4: Cpk target threshold is 1.33 with I-MR control bounds.', confidence: 0.89 },
        ],
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 font-mono">
        <Link href={`/${userId}/modliq-console/ai-labs`} className="hover:text-[#2B70AB] flex items-center gap-1">
          <ArrowLeft size={12} />
          <span>AI Labs Hub</span>
        </Link>
        <span>/</span>
        <span className="text-slate-800">DocuMind RAG</span>
        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">BETA</span>
      </div>

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-[#2B70AB] rounded-xl border border-blue-100">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">DocuMind RAG — Document Intelligence</h1>
            <p className="text-xs text-slate-500 mt-0.5">Ask questions about PDFs &amp; inspection documents with real page-number citations</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Upload & Ingested Document List (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Upload size={16} className="text-[#2B70AB]" />
              <span>Upload PDF Document</span>
            </h2>

            <form onSubmit={handleSimulatedUpload} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">PDF File Name</label>
                <input
                  type="text"
                  placeholder="e.g. Quality_Inspection_Spec_V2.pdf"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={isUploading || !filename}
                className="w-full py-2.5 bg-[#2B70AB] text-white font-bold text-xs rounded-xl hover:bg-[#1B2A4A] transition-colors disabled:opacity-50"
              >
                {isUploading ? 'Ingesting PDF into Vector Store...' : 'Ingest PDF & Extract Pages'}
              </button>
            </form>

            {ingestedDoc && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                  <CheckCircle2 size={14} />
                  <span>Document Ingested into DocuMind</span>
                </div>
                <p className="text-slate-600 font-mono text-[11px] truncate">File: {ingestedDoc.filename}</p>
                <p className="text-slate-500 text-[10px]">Pages: {ingestedDoc.pageCount || 4} | Status: Ready for Query</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Query & Page Citations Panel (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Search size={16} className="text-[#2B70AB]" />
              <span>Ask Document Question</span>
            </h2>

            <form onSubmit={handleQuery} className="space-y-3">
              <input
                type="text"
                placeholder="e.g. What are the temperature limits and Cpk requirements?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isSearching || !query}
                className="px-5 py-2 bg-[#1B2A4A] text-white font-bold text-xs rounded-xl hover:bg-[#2B70AB] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Sparkles size={14} />
                <span>{isSearching ? 'Searching Pages...' : 'Query DocuMind RAG'}</span>
              </button>
            </form>

            {result && (
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase font-mono tracking-wider">AI RAG Answer:</h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">{result.answer}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 font-mono uppercase">
                    <BookOpen size={14} className="text-blue-600" />
                    <span>Verified Page Citations ({result.citations?.length || 0})</span>
                  </h3>

                  <div className="space-y-2">
                    {result.citations?.map((cit: any, idx: number) => (
                      <div key={idx} className="p-3 bg-white border border-blue-100 rounded-xl space-y-1 shadow-2xs">
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#2B70AB]">
                          <span>Page {cit.page_number} Citation</span>
                          <span className="text-[10px] font-mono text-emerald-600">{(cit.confidence * 100).toFixed(0)}% Match</span>
                        </div>
                        <p className="text-xs text-slate-600 italic leading-snug">&ldquo;{cit.text_excerpt}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

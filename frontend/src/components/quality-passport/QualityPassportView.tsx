'use client';

import React, { useState, useEffect } from 'react';
import {
  Award,
  ShieldCheck,
  FileText,
  Download,
  Copy,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Sparkles,
  BarChart3,
  TrendingUp,
  Cpu,
  Truck,
  Activity,
  Loader2,
  Check,
} from 'lucide-react';
import { apiFetch } from '@/lib/apiFetch';

interface QualityPassportViewProps {
  userId: string;
  projectId: string;
}

export default function QualityPassportView({ userId, projectId }: QualityPassportViewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [passport, setPassport] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchPassport = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await apiFetch(`/api/v1/projects/${projectId}/quality-passport`);
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to load Quality Passport');
        }

        setPassport(data);
      } catch (err: any) {
        setError(err.message || 'Error loading Quality Passport');
      } finally {
        setLoading(false);
      }
    };

    fetchPassport();
  }, [projectId]);

  const handleCopySummary = () => {
    if (passport?.executiveSummary) {
      navigator.clipboard.writeText(passport.executiveSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDownloadMarkdown = async () => {
    setExporting(true);
    try {
      const res = await apiFetch(`/api/v1/projects/${projectId}/quality-passport/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format: 'markdown' }),
      });

      const data = await res.json();
      if (data.success && data.content) {
        const blob = new Blob([data.content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.filename || `modliq-quality-passport-${projectId}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
        <Loader2 size={36} className="animate-spin text-[#2B70AB] mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Generating buyer-ready Quality Passport & calculating audit score…</p>
      </div>
    );
  }

  if (error || !passport) {
    return (
      <div className="bg-white rounded-2xl border border-red-200 p-8 text-center space-y-4 shadow-sm">
        <AlertTriangle size={36} className="text-red-500 mx-auto" />
        <h3 className="text-base font-semibold text-slate-900">Failed to Generate Passport</h3>
        <p className="text-xs text-slate-500">{error || 'Passport data unavailable'}</p>
      </div>
    );
  }

  const { auditScore, readinessStatus, executiveSummary, sections, missingItems, recommendations, disclaimer } = passport;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AUDIT_READY':
        return { label: 'Audit Ready', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 };
      case 'CONDITIONALLY_COMPLIANT':
        return { label: 'Conditionally Compliant', bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: ShieldCheck };
      case 'REVIEW_REQUIRED':
        return { label: 'Review Required', bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: AlertTriangle };
      default:
        return { label: 'Insufficient Data', bg: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle };
    }
  };

  const statusInfo = getStatusBadge(readinessStatus);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-8 print:p-0 print:space-y-4">
      {/* Action Bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-4 shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <img src="/icon.png" alt="Modliq Report Mark" className="w-8 h-8 rounded-lg object-contain" />
          <div>
            <h2 className="text-sm font-bold text-slate-900">Buyer-Ready Quality Passport</h2>
            <p className="text-xs text-slate-500">Certificate ID: {passport.certificateId}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium text-xs hover:bg-slate-200 transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            {copied ? 'Copied Summary' : 'Copy Executive Summary'}
          </button>
          <button
            onClick={handleDownloadMarkdown}
            disabled={exporting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-colors shadow-sm"
          >
            {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            Download Markdown (.md)
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2B70AB] text-white font-medium text-xs hover:bg-[#205887] transition-colors shadow-sm"
          >
            <Printer size={14} />
            Print Certificate
          </button>
        </div>
      </div>

      {/* Main Certificate Header */}
      <div className="bg-gradient-to-br from-[#1B2A4A] to-[#2B70AB] rounded-3xl p-8 text-white shadow-xl space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Sparkles size={12} /> Modliq Certified Output
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">{passport.project.name}</h1>
            <p className="text-xs text-slate-200">Generated: {new Date(passport.generatedAt).toLocaleDateString()}</p>
          </div>

          <div className="text-right space-y-2">
            <div className="text-5xl font-black tracking-tight">{auditScore}<span className="text-xl text-slate-300 font-normal">/100</span></div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusInfo.bg}`}>
              <StatusIcon size={14} /> {statusInfo.label}
            </div>
          </div>
        </div>

        {/* Executive Summary Box */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-xs leading-relaxed text-slate-100">
          <h3 className="font-semibold text-white mb-1 uppercase tracking-wider text-[10px]">Executive Summary</h3>
          <p>{executiveSummary}</p>
        </div>
      </div>

      {/* Grid of 6 Audit Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Dataset Health */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 rounded-xl bg-blue-50 text-[#2B70AB]">
              <Layers size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">1. Dataset Health & Lineage</h3>
              <p className="text-[11px] text-slate-500">Source: {sections.datasetHealth.source}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Total Rows</span>
              <span className="font-bold text-slate-800 text-sm">{sections.datasetHealth.rowCount}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Health Score</span>
              <span className="font-bold text-emerald-600 text-sm">{sections.datasetHealth.healthScore} / 100</span>
            </div>
          </div>
        </div>

        {/* Section 2: Process Optimization */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Cpu size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">2. Process Optimization & Setpoints</h3>
              <p className="text-[11px] text-slate-500">Model: {sections.optimization.modelType}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Model Accuracy ($R^2$)</span>
              <span className="font-bold text-slate-800 text-sm">{sections.optimization.r2}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Constraints</span>
              <span className="font-bold text-emerald-600 text-sm">Respected</span>
            </div>
          </div>
        </div>

        {/* Section 3: Quality Studio SPC */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <BarChart3 size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">3. Quality Studio — SPC & Capability</h3>
              <p className="text-[11px] text-slate-500">SPC Status: {sections.quality.spcStatus}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Mean</span>
              <span className="font-bold text-slate-800">{sections.quality.mean}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Cp</span>
              <span className="font-bold text-blue-600">{sections.quality.cp}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Cpk</span>
              <span className="font-bold text-emerald-600">{sections.quality.cpk}</span>
            </div>
          </div>
        </div>

        {/* Section 4: Operations OEE */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Activity size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">4. Operations & OEE Performance</h3>
              <p className="text-[11px] text-slate-500">Overall OEE: {sections.operations.oee}%</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Availability</span>
              <span className="font-bold text-slate-800">{sections.operations.availability}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Performance</span>
              <span className="font-bold text-slate-800">{sections.operations.performance}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Quality</span>
              <span className="font-bold text-slate-800">{sections.operations.qualityRate}%</span>
            </div>
          </div>
        </div>

        {/* Section 5: Supply Chain Traceability */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Truck size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">5. Supply Chain Traceability</h3>
              <p className="text-[11px] text-slate-500">Status: {sections.supplyChain.traceabilityStatus}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Tracked Suppliers</span>
              <span className="font-bold text-slate-800">{sections.supplyChain.suppliersCount}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Material Lots</span>
              <span className="font-bold text-slate-800">{sections.supplyChain.materialLotsCount}</span>
            </div>
          </div>
        </div>

        {/* Section 6: Lean & CAPA */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 rounded-xl bg-[#2B70AB]/10 text-[#2B70AB]">
              <TrendingUp size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">6. Lean & CAPA Improvement</h3>
              <p className="text-[11px] text-slate-500">Discipline: Continuous Improvement</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Open Action Items</span>
              <span className="font-bold text-amber-600">{sections.leanCapa.openActions}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Completed Actions</span>
              <span className="font-bold text-emerald-600">{sections.leanCapa.completedActions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Missing Evidence & Recommended Next Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Evidence */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-500" /> Missing Evidence Items
          </h3>
          {missingItems.length > 0 ? (
            <ul className="space-y-2 text-xs text-slate-600">
              {missingItems.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-emerald-600 font-medium">Full evidence criteria met! No missing items.</p>
          )}
        </div>

        {/* Recommended Next Actions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles size={16} className="text-[#2B70AB]" /> Recommended Next Actions
          </h3>
          {recommendations.length > 0 ? (
            <ul className="space-y-2 text-xs text-slate-600">
              {recommendations.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
                  <span className="text-[#2B70AB] font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500">Proceed to trial batch execution and buyer presentation.</p>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-slate-500 text-[11px] leading-relaxed flex items-start gap-3">
        <Info size={18} className="shrink-0 text-slate-400 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-700 block mb-0.5">Buyer Disclaimer</span>
          <p>{disclaimer}</p>
        </div>
      </div>
    </div>
  );
}

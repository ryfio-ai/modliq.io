'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ShieldCheck, Calendar, Eye, Download, Printer, AlertTriangle, FileText, CheckCircle, BarChart3, Building } from 'lucide-react';

interface SharedPassport {
  title: string;
  projectName: string;
  auditScore: number;
  readinessStatus: string;
  executiveSummary: string;
  exportedMarkdown?: string;
  summary: {
    datasetReadinessScore: number;
    optimizationConfidence: number;
    cpkScore: number;
    oeeScore: number;
    supplierRiskLevel: string;
    kaizenCompletionRate: number;
  };
  verifiedAt: string;
  viewCount: number;
}

export default function PublicSharePassportPage() {
  const params = useParams();
  const token = params?.token as string;

  const [passport, setPassport] = useState<SharedPassport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const fetchSharedPassport = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/v1/share/${token}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          setError(data.error || 'Failed to load shared Quality Passport');
        } else {
          setPassport(data.data);
        }
      } catch (err: any) {
        setError('Network error or invalid share link');
      } finally {
        setLoading(false);
      }
    };

    fetchSharedPassport();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 font-medium">Verifying Buyer Quality Passport link...</p>
        </div>
      </div>
    );
  }

  if (error || !passport) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Passport Link Unavailable</h2>
          <p className="text-sm text-slate-400">{error || 'This Quality Passport share link is expired, revoked, or invalid.'}</p>
          <div className="pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-500">Modliq Verification Gateway</span>
          </div>
        </div>
      </div>
    );
  }

  const isAuditReady = passport.readinessStatus === 'AUDIT_READY';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Verification Banner */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">Verified Buyer Quality Passport</span>
                <h1 className="text-2xl font-bold text-white mt-0.5">{passport.title}</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-2 transition"
              >
                <Printer className="w-4 h-4" /> Print Certificate
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400">Audit Score</span>
              <p className="text-2xl font-bold text-blue-400 mt-1">{passport.auditScore} / 100</p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400">Readiness Status</span>
              <div className="mt-1 flex items-center gap-1.5">
                <ShieldCheck className={`w-4 h-4 ${isAuditReady ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span className={`text-sm font-semibold ${isAuditReady ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {passport.readinessStatus.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400">Verified Timestamp</span>
              <p className="text-xs font-semibold text-slate-200 mt-2 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {new Date(passport.verifiedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400">Buyer Views</span>
              <p className="text-xs font-semibold text-slate-200 mt-2 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                {passport.viewCount} views
              </p>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" /> Executive Compliance Summary
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            {passport.executiveSummary}
          </p>
        </div>

        {/* Manufacturing Metrics Breakdown */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" /> Manufacturing Quality & Process Metrics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
              <span className="text-xs text-slate-400">Dataset Health Score</span>
              <p className="text-xl font-bold text-emerald-400">{passport.summary.datasetReadinessScore}%</p>
              <span className="text-[11px] text-slate-500">Zero duplicate or drift anomalies</span>
            </div>

            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
              <span className="text-xs text-slate-400">Process Capability (Cpk)</span>
              <p className="text-xl font-bold text-blue-400">{passport.summary.cpkScore}</p>
              <span className="text-[11px] text-slate-500">Six Sigma compliant capability</span>
            </div>

            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
              <span className="text-xs text-slate-400">Overall Equipment Effectiveness</span>
              <p className="text-xl font-bold text-indigo-400">{passport.summary.oeeScore}%</p>
              <span className="text-[11px] text-slate-500">Line performance & availability</span>
            </div>
          </div>
        </div>

        {/* Full Markdown Report if present */}
        {passport.exportedMarkdown && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white">Full Quality Certificate Documentation</h2>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap overflow-x-auto">
              {passport.exportedMarkdown}
            </pre>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-slate-500 pt-4">
          Powered by Modliq Manufacturing Intelligence • Verified Buyer Quality Passport
        </div>

      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Eye, X, Download, Printer, Copy, Check, FileText } from 'lucide-react';

interface ReportPreviewModalProps {
  title: string;
  reportContent: string;
  onDownloadMarkdown: () => void;
  onPrintPdf: () => void;
  onCopySummary?: () => void;
  triggerButtonText?: string;
  className?: string;
}

export default function ReportPreviewModal({
  title,
  reportContent,
  onDownloadMarkdown,
  onPrintPdf,
  onCopySummary,
  triggerButtonText = 'Preview Report',
  className = '',
}: ReportPreviewModalProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reportContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    onCopySummary?.();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all shadow-xs ${className}`}
      >
        <Eye size={15} className="text-[#2B70AB]" />
        <span>{triggerButtonText}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 print:hidden animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl relative">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2B70AB] flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{title}</h3>
                  <p className="text-xs text-slate-500 font-sans">Report Document Preview</p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Preview */}
            <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-slate-700 bg-slate-50/50 space-y-4 whitespace-pre-wrap leading-relaxed border-b border-slate-100">
              {reportContent}
            </div>

            {/* Actions Footer */}
            <div className="p-4 bg-white rounded-b-3xl flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium text-xs hover:bg-slate-200 transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? 'Copied Content' : 'Copy Content'}</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onDownloadMarkdown();
                    setOpen(false);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-all shadow-xs"
                >
                  <Download size={14} />
                  <span>Download Markdown</span>
                </button>

                <button
                  onClick={() => {
                    onPrintPdf();
                    setOpen(false);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2B70AB] hover:bg-[#205887] text-white font-medium text-xs transition-all shadow-xs"
                >
                  <Printer size={14} />
                  <span>Print / Save as PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

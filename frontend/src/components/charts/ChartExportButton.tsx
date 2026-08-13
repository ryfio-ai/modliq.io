'use client';

import React, { useState } from 'react';
import { Download, FileCode, Award, Code, Check } from 'lucide-react';

interface ChartExportButtonProps {
  chartTitle: string;
  chartType: string;
  chartData: any[];
  config: Record<string, any>;
  insight?: string;
  onAttachPassport?: () => void;
}

export const ChartExportButton: React.FC<ChartExportButtonProps> = ({
  chartTitle,
  chartType,
  chartData,
  config,
  insight,
  onAttachPassport,
}) => {
  const [copied, setCopied] = useState(false);

  const handleDownloadJSON = () => {
    const payload = {
      title: chartTitle,
      chartType,
      config,
      insight,
      exportedAt: new Date().toISOString(),
      data: chartData,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chartTitle.toLowerCase().replace(/\s+/g, '_')}_export.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyVegaLite = () => {
    const vegaSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      title: chartTitle,
      mark: chartType === 'line' ? 'line' : chartType === 'scatter' ? 'point' : 'bar',
      encoding: {
        x: { field: config.xKey || 'x', type: 'nominal' },
        y: { field: config.yKey || 'y', type: 'quantitative' },
      },
      data: { values: chartData },
    };
    navigator.clipboard.writeText(JSON.stringify(vegaSpec, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        type="button"
        onClick={handleDownloadJSON}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
      >
        <Download className="w-3.5 h-3.5" /> JSON Export
      </button>

      <button
        type="button"
        onClick={handleCopyVegaLite}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Code className="w-3.5 h-3.5" />}
        {copied ? 'Copied Spec' : 'Vega-Lite Spec (Beta)'}
      </button>

      {onAttachPassport && (
        <button
          type="button"
          onClick={onAttachPassport}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold rounded-xl transition"
        >
          <Award className="w-3.5 h-3.5" /> Attach to Passport
        </button>
      )}
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { ChartTypeSelector } from './ChartTypeSelector';
import { ChartConfigForm, ChartConfigState } from './ChartConfigForm';
import { ChartRenderer } from './ChartRenderer';
import { ChartExportButton } from './ChartExportButton';
import { ChartType } from '@/lib/charts/chartRegistry';

interface ChartBuilderPanelProps {
  columns: Array<{ name: string; type: string }>;
  onPreview: (config: ChartConfigState) => Promise<any>;
  onSave: (config: ChartConfigState) => Promise<void>;
  onAttachPassport?: (chartData: any) => void;
}

export const ChartBuilderPanel: React.FC<ChartBuilderPanelProps> = ({
  columns,
  onPreview,
  onSave,
  onAttachPassport,
}) => {
  const [config, setConfig] = useState<ChartConfigState>({
    chartType: 'bar',
    x: columns[0]?.name || '',
    y: columns[1]?.name || '',
    aggregation: 'mean',
  });

  const [loading, setLoading] = useState(false);
  const [previewResult, setPreviewResult] = useState<any>(null);

  const handleUpdate = (updated: Partial<ChartConfigState>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleRunPreview = async () => {
    setLoading(true);
    try {
      const res = await onPreview(config);
      setPreviewResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRunSave = async () => {
    setLoading(true);
    try {
      await onSave(config);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Builder Controls */}
      <div className="lg:col-span-5 space-y-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">1. Select Chart Type</h4>
          <ChartTypeSelector
            selected={config.chartType as ChartType}
            onSelect={(type) => handleUpdate({ chartType: type })}
          />
        </div>

        <ChartConfigForm
          columns={columns}
          config={config}
          onChange={handleUpdate}
          onPreview={handleRunPreview}
          onSave={handleRunSave}
          loading={loading}
        />
      </div>

      {/* Right Column: Interactive Preview Canvas */}
      <div className="lg:col-span-7 space-y-4">
        {previewResult ? (
          <div className="space-y-4">
            <ChartRenderer
              chartType={previewResult.chartType || config.chartType}
              data={previewResult.data || []}
              config={previewResult.config || { xKey: config.x, yKey: config.y }}
              title={previewResult.title || config.title}
              insight={previewResult.insight}
              sampled={previewResult.sampled}
              loading={loading}
              height={400}
            />

            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
              <span className="text-xs font-bold text-slate-700">Export & Integration Options</span>
              <ChartExportButton
                chartTitle={previewResult.title || 'Chart'}
                chartType={previewResult.chartType}
                chartData={previewResult.data || []}
                config={previewResult.config || {}}
                insight={previewResult.insight}
                onAttachPassport={() => onAttachPassport && onAttachPassport(previewResult)}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center flex flex-col items-center justify-center text-slate-500 h-[460px]">
            <p className="font-extrabold text-slate-800 text-base">Interactive Chart Canvas</p>
            <p className="text-xs text-slate-500 max-w-sm mt-1">
              Select columns and click &quot;Generate Chart Preview&quot; to compute statistics and view real-time visual output.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

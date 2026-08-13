'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, Sliders, Layers, Factory, RefreshCw, Award } from 'lucide-react';
import { ChartRecommendationGrid, RecommendationItem } from './ChartRecommendationGrid';
import { ChartBuilderPanel } from './ChartBuilderPanel';
import { SavedChartsList, SavedChartItem } from './SavedChartsList';
import { ChartRenderer } from './ChartRenderer';

interface ChartStudioProps {
  projectId: string;
  datasetId: string;
  onAttachToPassport?: (chartData: any) => void;
}

export const ChartStudio: React.FC<ChartStudioProps> = ({
  projectId,
  datasetId,
  onAttachToPassport,
}) => {
  const [activeTab, setActiveTab] = useState<'recommended' | 'build' | 'saved' | 'manufacturing'>('recommended');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [savedCharts, setSavedCharts] = useState<SavedChartItem[]>([]);
  const [columns, setColumns] = useState<Array<{ name: string; type: string }>>([]);

  const [selectedPreview, setSelectedPreview] = useState<any>(null);

  // Load recommendations & saved charts
  const loadStudioData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch recommendations
      const recRes = await fetch(`/api/v1/projects/${projectId}/datasets/${datasetId}/charts/recommend`);
      if (recRes.ok) {
        const data = await recRes.json();
        setRecommendations(data.recommendations || []);
      }

      // 2. Fetch saved charts
      const savedRes = await fetch(`/api/v1/projects/${projectId}/datasets/${datasetId}/charts`);
      if (savedRes.ok) {
        const data = await savedRes.json();
        setSavedCharts(data.charts || []);
      }

      // 3. Fetch dataset info for columns
      const dsRes = await fetch(`/api/datasets/${datasetId}`);
      if (dsRes.ok) {
        const dsData = await dsRes.json();
        if (dsData.columnsJson) {
          try {
            setColumns(JSON.parse(dsData.columnsJson));
          } catch (e) {
            // fallback default columns
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load Chart Studio data');
    } finally {
      setLoading(false);
    }
  }, [projectId, datasetId]);

  useEffect(() => {
    if (datasetId) {
      loadStudioData();
    }
  }, [datasetId, loadStudioData]);

  // Preview recommendation
  const handlePreviewRecommendation = async (rec: RecommendationItem) => {
    try {
      const res = await fetch(`/api/v1/projects/${projectId}/datasets/${datasetId}/charts/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chartType: rec.chartType,
          x: rec.config.x,
          y: rec.config.y,
          aggregation: rec.config.aggregation || 'mean',
          title: rec.title,
        }),
      });
      if (res.ok) {
        const previewData = await res.json();
        setSelectedPreview(previewData);
      }
    } catch (e) {
      console.error('Failed to preview recommended chart', e);
    }
  };

  // Preview builder config
  const handleBuilderPreview = async (config: any) => {
    const res = await fetch(`/api/v1/projects/${projectId}/datasets/${datasetId}/charts/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    if (!res.ok) throw new Error('Preview failed');
    return await res.json();
  };

  // Save chart
  const handleSaveChart = async (configOrRec: any) => {
    const title = configOrRec.title || 'Saved Chart';
    const chartType = configOrRec.chartType || 'bar';
    const config = configOrRec.config || configOrRec;

    const res = await fetch(`/api/v1/projects/${projectId}/datasets/${datasetId}/charts/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, chartType, config, source: 'CHART_STUDIO' }),
    });

    if (res.ok) {
      loadStudioData();
      setActiveTab('saved');
    }
  };

  // Delete chart
  const handleDeleteChart = async (chartId: string) => {
    const res = await fetch(`/api/v1/projects/${projectId}/datasets/${datasetId}/charts/${chartId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setSavedCharts((prev) => prev.filter((c) => c.id !== chartId));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Studio Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">Chart Studio</h1>
            <span className="bg-blue-100 text-[#2B70AB] text-[11px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">
              No-Code Data Visualization
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            No-code data visualization for manufacturing datasets. Analyze what happened with automated chart recommendations.
          </p>
        </div>

        <button
          type="button"
          onClick={loadStudioData}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition self-start md:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Studio
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('recommended')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-extrabold border-b-2 transition whitespace-nowrap ${
            activeTab === 'recommended'
              ? 'border-[#2B70AB] text-[#2B70AB] bg-blue-50/40 rounded-t-xl'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" /> Recommended Charts ({recommendations.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('build')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-extrabold border-b-2 transition whitespace-nowrap ${
            activeTab === 'build'
              ? 'border-[#2B70AB] text-[#2B70AB] bg-blue-50/40 rounded-t-xl'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-4 h-4 text-[#2B70AB]" /> Build Chart
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-extrabold border-b-2 transition whitespace-nowrap ${
            activeTab === 'saved'
              ? 'border-[#2B70AB] text-[#2B70AB] bg-blue-50/40 rounded-t-xl'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-600" /> Saved Charts ({savedCharts.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('manufacturing')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-extrabold border-b-2 transition whitespace-nowrap ${
            activeTab === 'manufacturing'
              ? 'border-[#2B70AB] text-[#2B70AB] bg-blue-50/40 rounded-t-xl'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Factory className="w-4 h-4 text-purple-600" /> Manufacturing Presets
        </button>
      </div>

      {/* Tab 1: Recommended Charts */}
      {activeTab === 'recommended' && (
        <div className="space-y-6">
          <ChartRecommendationGrid
            recommendations={recommendations}
            onSelectPreview={handlePreviewRecommendation}
            onSaveChart={handleSaveChart}
            onAddToPassport={onAttachToPassport}
          />

          {selectedPreview && (
            <div className="pt-4">
              <ChartRenderer
                chartType={selectedPreview.chartType}
                data={selectedPreview.data}
                config={selectedPreview.config}
                title={selectedPreview.title}
                insight={selectedPreview.insight}
                sampled={selectedPreview.sampled}
              />
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Build Chart */}
      {activeTab === 'build' && (
        <ChartBuilderPanel
          columns={columns.length > 0 ? columns : [
            { name: 'supplier', type: 'categorical' },
            { name: 'yield', type: 'numeric' },
            { name: 'temperature', type: 'numeric' },
            { name: 'downtime_reason', type: 'categorical' },
            { name: 'shift', type: 'categorical' },
          ]}
          onPreview={handleBuilderPreview}
          onSave={handleSaveChart}
          onAttachPassport={onAttachToPassport}
        />
      )}

      {/* Tab 3: Saved Charts */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <SavedChartsList
            charts={savedCharts}
            onOpen={(c) => {
              try {
                const data = c.dataJson ? JSON.parse(c.dataJson) : [];
                const config = c.configJson ? JSON.parse(c.configJson) : {};
                setSelectedPreview({
                  chartType: c.chartType,
                  title: c.title,
                  data,
                  config,
                });
              } catch (e) {}
            }}
            onDelete={handleDeleteChart}
            onAttachPassport={onAttachToPassport as any}
          />

          {selectedPreview && (
            <ChartRenderer
              chartType={selectedPreview.chartType}
              data={selectedPreview.data}
              config={selectedPreview.config}
              title={selectedPreview.title}
            />
          )}
        </div>
      )}

      {/* Tab 4: Manufacturing Presets */}
      {activeTab === 'manufacturing' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-[#1B2A4A]">Prebuilt Manufacturing KPI & Capability Visuals</h3>
            <div className="space-y-3">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1B2A4A]">Overall Plant OEE Breakdown</h4>
                  <p className="text-[11px] text-slate-500">Availability, Performance, and Quality composite metrics</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPreview({
                    chartType: 'kpi_card',
                    title: 'Plant OEE Composite Metric',
                    data: [{ metric: 'OEE Total', value: '87.4%' }],
                    insight: 'Plant is operating at 87.4% OEE (Target: >=85%).'
                  })}
                  className="px-3 py-1.5 bg-[#2B70AB] text-white font-bold text-xs rounded-xl"
                >
                  Render
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1B2A4A]">Defects by Shift Pareto</h4>
                  <p className="text-[11px] text-slate-500">Cumulative scrap contribution sorted by root cause</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPreview({
                    chartType: 'pareto',
                    title: 'Defects by Root Cause Pareto',
                    data: [
                      { reason: 'Thermal Variance', count: 142, cumulative_percent: 45.2 },
                      { reason: 'Feeder Jam', count: 88, cumulative_percent: 73.2 },
                      { reason: 'Off-Spec Material', count: 54, cumulative_percent: 90.4 },
                      { reason: 'Operator Error', count: 30, cumulative_percent: 100.0 },
                    ],
                    config: { xKey: 'reason', yKey: 'count' },
                    insight: 'Thermal Variance accounts for 45.2% of total scrap events.'
                  })}
                  className="px-3 py-1.5 bg-[#2B70AB] text-white font-bold text-xs rounded-xl"
                >
                  Render
                </button>
              </div>
            </div>
          </div>

          <div>
            {selectedPreview ? (
              <ChartRenderer
                chartType={selectedPreview.chartType}
                data={selectedPreview.data}
                config={selectedPreview.config || {}}
                title={selectedPreview.title}
                insight={selectedPreview.insight}
              />
            ) : (
              <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-500 h-full flex flex-col items-center justify-center">
                <Factory className="w-8 h-8 text-slate-400 mb-2" />
                <p className="font-bold text-slate-800">Select a Manufacturing Preset</p>
                <p className="text-xs text-slate-500 mt-1">Click Render on any preset to view pre-configured manufacturing visuals.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import {
  BarChart2,
  Table,
  Layers,
  AlertTriangle,
  Activity,
  Target,
  Lightbulb,
  FileText,
  Sparkles,
  Download,
  RefreshCw,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import EdaOverviewCards from './EdaOverviewCards';
import ColumnProfileTable from './ColumnProfileTable';
import MissingValuesPanel from './MissingValuesPanel';
import NumericSummaryTable from './NumericSummaryTable';
import CategoricalSummaryPanel from './CategoricalSummaryPanel';
import DistributionCharts from './DistributionCharts';
import CorrelationHeatmap from './CorrelationHeatmap';
import OutlierPanel from './OutlierPanel';
import TargetAnalysisPanel from './TargetAnalysisPanel';
import EdaWarnings from './EdaWarnings';
import EdaRecommendations from './EdaRecommendations';

interface EdaStudioProps {
  edaReport: any;
  loading?: boolean;
  onRefreshEda?: () => void;
  onExportMarkdown?: () => void;
  onAskAi?: (prompt: string) => void;
}

export default function EdaStudio({
  edaReport,
  loading = false,
  onRefreshEda,
  onExportMarkdown,
  onAskAi,
}: EdaStudioProps) {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'columns' | 'missing' | 'distributions' | 'correlations' | 'outliers' | 'target' | 'recommendations'
  >('overview');

  const report = edaReport?.report || edaReport || {};
  const overview = report.overview || {};
  const columns = report.columns || [];
  const numericSummary = report.numericSummary || [];
  const categoricalSummary = report.categoricalSummary || [];
  const distributions = report.distributions || [];
  const correlations = report.correlations || {};
  const targetAnalysis = report.targetAnalysis;
  const warnings = report.warnings || [];
  const recommendations = report.recommendations || [];

  const outlierColsCount = numericSummary.filter((n: any) => n.outlierCount > 0).length;

  const handleExplainAi = () => {
    if (onAskAi) {
      onAskAi(
        `Explain this EDA report for a manufacturing user. Rows: ${report.rowsAnalyzed || 0}, Columns: ${
          report.totalColumns || 0
        }, Missing values: ${overview.missingValuePercentage || 0}%, Outlier vars: ${outlierColsCount}, Warnings: ${
          warnings.length
        }. Focus on data quality, target readiness, and what to clean before running optimization.`
      );
    }
  };

  return (
    <div className="space-y-6 font-sans text-slate-800">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-[#1B2A4A] tracking-tight">EDA Studio</h1>
            <span className="px-2.5 py-0.5 bg-blue-50 text-[#2B70AB] rounded-full text-xs font-bold border border-blue-200">
              No-Code EDA
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            No-code exploratory data analysis for manufacturing datasets. Understand missing values, outliers, distributions, correlations, and variable relationships before optimization.
          </p>
          {edaReport?.publicId && (
            <span className="text-[10px] font-mono text-[#2B70AB] font-bold block mt-1">
              Report ID: {edaReport.publicId}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onAskAi && (
            <button
              onClick={handleExplainAi}
              className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-xl text-xs transition border border-purple-200 flex items-center gap-1.5"
            >
              <Sparkles size={14} className="text-purple-600" />
              <span>Explain Findings</span>
            </button>
          )}

          {onExportMarkdown && (
            <button
              onClick={onExportMarkdown}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
            >
              <Download size={14} />
              <span>Export Report</span>
            </button>
          )}

          {onRefreshEda && (
            <button
              onClick={onRefreshEda}
              disabled={loading}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
              title="Re-run EDA Analysis"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200 pb-2 scrollbar-none">
        {[
          { id: 'overview', label: 'Overview', icon: Table },
          { id: 'columns', label: 'Columns', icon: Layers },
          { id: 'missing', label: 'Missing Data', icon: AlertTriangle },
          { id: 'distributions', label: 'Distributions', icon: BarChart2 },
          { id: 'correlations', label: 'Correlations', icon: Activity },
          { id: 'outliers', label: 'Outliers', icon: AlertTriangle },
          { id: 'target', label: 'Target Analysis', icon: Target },
          { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#2B70AB] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Loading Overlay */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <Loader2 size={24} className="animate-spin text-[#2B70AB] mx-auto" />
          <p className="text-xs font-bold text-slate-700">Computing No-Code EDA Profile…</p>
          <p className="text-[11px] text-slate-400">Profiling columns, calculating IQR outliers, and Pearson correlations</p>
        </div>
      ) : (
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <EdaOverviewCards
                overview={overview}
                sampled={report.sampled}
                totalRows={report.totalRows}
                outlierColumnCount={outlierColsCount}
                strongCorrelationCount={correlations.strongPairs?.length || 0}
              />
              <EdaWarnings warnings={warnings} />
              <EdaRecommendations recommendations={recommendations} />
            </div>
          )}

          {activeTab === 'columns' && (
            <ColumnProfileTable columns={columns} targetColumn={targetAnalysis?.targetColumn} />
          )}

          {activeTab === 'missing' && (
            <MissingValuesPanel columns={columns} totalRows={report.rowsAnalyzed || 0} />
          )}

          {activeTab === 'distributions' && (
            <div className="space-y-6">
              <DistributionCharts distributions={distributions} />
              <NumericSummaryTable summary={numericSummary} />
              <CategoricalSummaryPanel summary={categoricalSummary} />
            </div>
          )}

          {activeTab === 'correlations' && (
            <CorrelationHeatmap correlations={correlations} />
          )}

          {activeTab === 'outliers' && (
            <OutlierPanel numericSummary={numericSummary} />
          )}

          {activeTab === 'target' && (
            <TargetAnalysisPanel targetAnalysis={targetAnalysis} />
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              <EdaRecommendations recommendations={recommendations} />
              <EdaWarnings warnings={warnings} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

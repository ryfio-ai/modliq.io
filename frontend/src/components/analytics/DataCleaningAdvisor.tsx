'use client';

import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/apiFetch';

interface DataCleaningAdvisorProps {
  projectId: string;
  datasetId: string;
  onDatasetUpdated?: () => void;
}

export default function DataCleaningAdvisor({ projectId, datasetId, onDatasetUpdated }: DataCleaningAdvisorProps) {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([
    {
      id: 'rec_missing_temp',
      column: 'temperature',
      type: 'missing_values',
      issue: 'Temperature column has 3.2% missing values.',
      recommendation: 'Recommended: Apply median imputation to fill missing temperature readings.',
      safe: true,
    },
    {
      id: 'rec_id_batch',
      column: 'batch_id',
      type: 'identifier',
      issue: 'batch_id appears to be a unique batch sequence identifier.',
      recommendation: 'Recommended: Exclude batch_id from ML model feature inputs.',
      safe: true,
    },
    {
      id: 'rec_outlier_press',
      column: 'pressure',
      type: 'outliers',
      issue: 'Pressure column has 5 extreme outliers.',
      recommendation: 'Recommended: Review pressure spikes before running optimization.',
      safe: false,
    },
  ]);

  const [appliedCount, setAppliedCount] = useState(0);

  const handleApply = async (ids: string[]) => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/v1/projects/${projectId}/analytics/datasets/${datasetId}/cleaning/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recommendationIds: ids }),
      });
      const data = await res.json();
      if (data.success) {
        setAppliedCount((prev) => prev + ids.length);
        if (onDatasetUpdated) onDatasetUpdated();
      }
    } catch (err) {
      console.error('Failed to apply cleaning:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#1B2A4A] flex items-center gap-2">
            <ShieldAlert size={16} className="text-amber-500" />
            Data Cleaning Advisor
          </h3>
          <p className="text-xs text-slate-500">
            Modliq recommends data cleaning actions for missing values, identifiers, and outliers. Confirm before applying (creates Dataset Version 2).
          </p>
        </div>
        <button
          onClick={() => handleApply(recommendations.filter((r) => r.safe).map((r) => r.id))}
          disabled={loading || appliedCount > 0}
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
          Apply All Safe Recommendations
        </button>
      </div>

      {appliedCount > 0 && (
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600" />
          Applied {appliedCount} cleaning recommendation(s). Created Dataset Version 2.
        </div>
      )}

      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#1B2A4A]">{rec.column}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${rec.safe ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {rec.type}
                </span>
              </div>
              <p className="text-slate-600 font-medium">{rec.issue}</p>
              <p className="text-[#2B70AB] font-semibold">{rec.recommendation}</p>
            </div>

            <button
              onClick={() => handleApply([rec.id])}
              disabled={loading}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg text-xs transition shrink-0"
            >
              Apply Recommendation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

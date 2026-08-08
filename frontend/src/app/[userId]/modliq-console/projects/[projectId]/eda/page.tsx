'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import EdaStudio from '@/components/eda/EdaStudio';
import { apiFetch } from '@/lib/apiFetch';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function ProjectEdaPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const projectId = params.projectId as string;

  const [edaReport, setEdaReport] = useState<any>(null);
  const [datasetId, setDatasetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjectAndEda = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Get Project to find active datasetId
      const projRes = await apiFetch(`/api/v1/projects/${projectId}`);
      const projData = await projRes.json();

      let activeDatasetId = projData.project?.datasetId;

      if (!activeDatasetId) {
        // Fallback: fetch latest dataset for user
        const dsRes = await apiFetch(`/api/v1/projects/${projectId}/datasets/demo`);
        if (dsRes.ok) {
          const dsData = await dsRes.json();
          activeDatasetId = dsData.dataset?.id;
        }
      }

      if (!activeDatasetId) {
        setError('No active dataset found for this project. Please upload a dataset first.');
        setLoading(false);
        return;
      }

      setDatasetId(activeDatasetId);

      // 2. Get latest EDA report
      const edaRes = await apiFetch(`/api/v1/projects/${projectId}/datasets/${activeDatasetId}/eda`);
      const edaData = await edaRes.json();

      if (edaData.success && edaData.data) {
        setEdaReport(edaData.data);
      } else {
        // Auto generate if not exists
        await triggerEdaGeneration(activeDatasetId);
      }
    } catch (err: any) {
      console.error('Failed to load EDA:', err);
      setError(err.message || 'Failed to load EDA Studio');
    } finally {
      setLoading(false);
    }
  };

  const triggerEdaGeneration = async (dsId: string) => {
    try {
      setGenerating(true);
      const res = await apiFetch(`/api/v1/projects/${projectId}/datasets/${dsId}/eda`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ options: { maxRows: 10000 } }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setEdaReport(data.data);
      }
    } catch (err: any) {
      console.error('Failed to generate EDA:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleExportMarkdown = async () => {
    if (!datasetId) return;
    try {
      const res = await apiFetch(`/api/v1/projects/${projectId}/datasets/${datasetId}/eda/export`, {
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
        a.download = data.filename || 'modliq-eda-report.md';
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      alert('Failed to export EDA markdown report');
    }
  };

  useEffect(() => {
    fetchProjectAndEda();
  }, [projectId]);

  if (loading) {
    return (
      <div className="p-12 text-center space-y-3">
        <Loader2 size={24} className="animate-spin text-[#2B70AB] mx-auto" />
        <p className="text-xs font-bold text-slate-700">Loading EDA Studio…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-4 max-w-lg mx-auto mt-8">
        <p className="text-sm font-bold text-slate-800">{error}</p>
        <button
          onClick={() => router.push(`/${userId}/modliq-console/projects/${projectId}/data-upload`)}
          className="px-4 py-2 bg-[#2B70AB] text-white text-xs font-bold rounded-xl hover:bg-[#1B2A4A] transition"
        >
          Go to Data Upload
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => router.push(`/${userId}/modliq-console/projects/${projectId}/data-upload`)}
        className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#2B70AB] transition font-medium"
      >
        <ArrowLeft size={14} /> Back to Data Upload
      </button>

      <EdaStudio
        edaReport={edaReport}
        loading={generating}
        onRefreshEda={() => datasetId && triggerEdaGeneration(datasetId)}
        onExportMarkdown={handleExportMarkdown}
      />
    </div>
  );
}

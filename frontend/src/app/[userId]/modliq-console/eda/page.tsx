'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import EdaStudio from '@/components/eda/EdaStudio';
import { apiFetch } from '@/lib/apiFetch';
import { Loader2 } from 'lucide-react';

export default function ActiveEdaPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [activeProject, setActiveProject] = useState<any>(null);
  const [edaReport, setEdaReport] = useState<any>(null);
  const [datasetId, setDatasetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActiveEda = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch latest project for user
      const projRes = await apiFetch('/api/v1/projects/latest');
      const projData = await projRes.json();
      const proj = projData.project;

      if (!proj) {
        setError('No projects created yet. Please create a project and upload data first.');
        setLoading(false);
        return;
      }

      setActiveProject(proj);
      const dsId = proj.datasetId || proj.dataset?.id;

      if (!dsId) {
        setError('No dataset linked to current project. Please upload data first.');
        setLoading(false);
        return;
      }

      setDatasetId(dsId);

      // Get EDA report
      const edaRes = await apiFetch(`/api/v1/projects/${proj.id}/datasets/${dsId}/eda`);
      const edaData = await edaRes.json();

      if (edaData.success && edaData.data) {
        setEdaReport(edaData.data);
      } else {
        await triggerEdaGeneration(proj.id, dsId);
      }
    } catch (err: any) {
      console.error('Failed to load active EDA:', err);
      setError(err.message || 'Failed to load EDA Studio');
    } finally {
      setLoading(false);
    }
  };

  const triggerEdaGeneration = async (projId: string, dsId: string) => {
    try {
      setGenerating(true);
      const res = await apiFetch(`/api/v1/projects/${projId}/datasets/${dsId}/eda`, {
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
    if (!activeProject || !datasetId) return;
    try {
      const res = await apiFetch(`/api/v1/projects/${activeProject.id}/datasets/${datasetId}/eda/export`, {
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
    fetchActiveEda();
  }, []);

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
          onClick={() => router.push(`/${userId}/modliq-console/data-upload`)}
          className="px-4 py-2 bg-[#2B70AB] text-white text-xs font-bold rounded-xl hover:bg-[#1B2A4A] transition"
        >
          Go to Data Upload
        </button>
      </div>
    );
  }

  return (
    <EdaStudio
      edaReport={edaReport}
      loading={generating}
      onRefreshEda={() => activeProject && datasetId && triggerEdaGeneration(activeProject.id, datasetId)}
      onExportMarkdown={handleExportMarkdown}
    />
  );
}

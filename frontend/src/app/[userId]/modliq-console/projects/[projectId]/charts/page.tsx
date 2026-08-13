'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChartStudio } from '@/components/charts/ChartStudio';
import { apiFetch } from '@/lib/apiFetch';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function ProjectChartsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const projectId = params.projectId as string;

  const [datasetId, setDatasetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjectData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch project to get active datasetId
        const projRes = await apiFetch(`/api/v1/projects/${projectId}`);
        const projData = await projRes.json();
        let activeDsId = projData.project?.datasetId;

        if (!activeDsId) {
          // Fallback to demo dataset if not set
          const dsRes = await apiFetch(`/api/v1/projects/${projectId}/datasets/demo`);
          if (dsRes.ok) {
            const dsData = await dsRes.json();
            activeDsId = dsData.dataset?.id;
          }
        }

        if (!activeDsId) {
          setError('No active dataset found for this project. Please upload or select a dataset first.');
          setLoading(false);
          return;
        }

        setDatasetId(activeDsId);
      } catch (err: any) {
        setError(err.message || 'Failed to load project dataset for Chart Studio');
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      loadProjectData();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#2B70AB] animate-spin" />
        <p className="text-xs font-bold text-slate-700">Loading Chart Studio…</p>
      </div>
    );
  }

  if (error || !datasetId) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-8">
        <button
          type="button"
          onClick={() => router.push(`/${userId}/modliq-console/projects/${projectId}`)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Project
        </button>
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-rose-800 text-sm max-w-xl">
          <p className="font-bold">Dataset Required</p>
          <p className="text-xs mt-1 text-rose-700">{error || 'Please connect a dataset before launching Chart Studio.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
      <ChartStudio projectId={projectId} datasetId={datasetId} />
    </div>
  );
}

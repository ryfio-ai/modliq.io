'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChartStudio } from '@/components/charts/ChartStudio';
import { apiFetch } from '@/lib/apiFetch';
import { Loader2 } from 'lucide-react';

export default function ActiveChartStudioPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [activeProject, setActiveProject] = useState<any>(null);
  const [datasetId, setDatasetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadActiveProjectData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch latest project for user
        const projRes = await apiFetch('/api/v1/projects/latest');
        const projData = await projRes.json();
        const proj = projData.project;

        if (!proj) {
          setError('No active project found. Please create a project and upload data first.');
          setLoading(false);
          return;
        }

        setActiveProject(proj);
        let dsId = proj.datasetId || proj.dataset?.id;

        if (!dsId) {
          // Fallback to demo dataset
          const dsRes = await apiFetch(`/api/v1/projects/${proj.id}/datasets/demo`);
          if (dsRes.ok) {
            const dsData = await dsRes.json();
            dsId = dsData.dataset?.id;
          }
        }

        if (!dsId) {
          setError('No dataset linked to current project. Please upload data first.');
          setLoading(false);
          return;
        }

        setDatasetId(dsId);
      } catch (err: any) {
        setError(err.message || 'Failed to load Chart Studio');
      } finally {
        setLoading(false);
      }
    }

    loadActiveProjectData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#2B70AB] animate-spin" />
        <p className="text-xs font-bold text-slate-700">Loading Chart Studio…</p>
      </div>
    );
  }

  if (error || !activeProject || !datasetId) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-8">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-amber-900 text-sm max-w-xl">
          <p className="font-bold">Chart Studio Ready</p>
          <p className="text-xs mt-1 text-amber-800">{error || 'Please select an active project with a dataset to launch Chart Studio.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
      <ChartStudio projectId={activeProject.id} datasetId={datasetId} />
    </div>
  );
}

'use client';

import React, { useState, useEffect, useCallback, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, Loader2, AlertCircle, RefreshCw, Clock } from 'lucide-react';
import { usePipelineStore } from '@/store/pipelineStore';
import { apiFetch } from '@/lib/apiFetch';

export default function ProjectOptimizationProgressPage({
  params,
}: {
  params: Promise<{ userId: string; projectId: string }>;
}) {
  const resolvedParams = use(params);
  const { userId, projectId } = resolvedParams;
  const router = useRouter();

  const { intent, filename, setOptimization } = usePipelineStore();
  const [jobStatus, setJobStatus] = useState<'queued' | 'running' | 'completed' | 'failed'>('queued');
  const [stageLabel, setStageLabel] = useState<string>('Initializing job...');
  const [progress, setProgress] = useState(5);
  const [error, setError] = useState<string | null>(null);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  const startOptimization = useCallback(async () => {
    if (!intent || !filename) return;

    setJobStatus('queued');
    setStageLabel('Submitting job to queue...');
    setProgress(10);
    setError(null);

    try {
      const res = await apiFetch('/api/v1/optimization/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          filename,
          template_id: intent.template_id,
          intent: {
            target: intent.target,
            goal_direction: intent.goal_direction,
            threshold: intent.threshold,
            features: intent.features,
            constraints: intent.constraints,
          },
        }),
      });

      const data = await res.json();
      if (!data.success || !data.jobId) {
        throw new Error(data.error || 'Failed to submit optimization job');
      }

      const jobId = data.jobId;

      pollRef.current = setInterval(async () => {
        try {
          const pollRes = await apiFetch(`/api/v1/optimization/jobs/${jobId}`);
          if (!pollRes.ok) return;

          const job = await pollRes.json();
          if (!job.success) return;

          setJobStatus(job.status || 'running');
          if (job.stage) setStageLabel(job.stage);
          if (job.progress !== undefined) setProgress(job.progress);

          if (job.status === 'completed') {
            stopPolling();
            if (job.result && (job.result.recommended_settings || job.result.expected_outcome || job.result.metrics)) {
              setOptimization(jobId, job.result);
              setTimeout(() => {
                router.push(`/${userId}/modliq-console/projects/${projectId}/results`);
              }, 600);
            } else {
              throw new Error(job.result?.error || 'Optimization returned no result');
            }
          } else if (job.status === 'failed') {
            stopPolling();
            throw new Error(job.error || 'Optimization failed');
          }
        } catch (err: any) {
          stopPolling();
          setJobStatus('failed');
          setError(err.message || 'Optimization failed');
        }
      }, 2000);
    } catch (err: any) {
      stopPolling();
      setJobStatus('failed');
      setError(err.message || 'Failed to submit optimization job');
    }
  }, [intent, filename, projectId, userId, setOptimization, router]);

  useEffect(() => {
    startOptimization();
    return () => stopPolling();
  }, [startOptimization]);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1B2A4A] tracking-tight flex items-center gap-3">
          <Activity className="text-[#2B70AB]" size={28} /> Optimization Progress
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {intent ? `Optimizing for ${intent.target} (${intent.goal_direction})` : 'Processing optimization job...'}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        {jobStatus === 'failed' ? (
          <div className="text-center space-y-4 py-6">
            <div className="w-14 h-14 bg-red-50 rounded-2xl text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle size={32} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Optimization Failed</h3>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
            <button
              onClick={startOptimization}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-all shadow-sm"
            >
              <RefreshCw size={16} /> Retry Optimization
            </button>
          </div>
        ) : jobStatus === 'completed' ? (
          <div className="text-center space-y-3 py-6">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl text-emerald-600 flex items-center justify-center mx-auto">
              <Activity size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Optimization Completed!</h3>
            <p className="text-sm text-slate-500">Redirecting to results...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Status Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {jobStatus === 'queued' ? (
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2B70AB] flex items-center justify-center">
                    <Loader2 size={20} className="animate-spin" />
                  </div>
                )}
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{stageLabel}</h3>
                  <p className="text-xs text-slate-500">
                    {jobStatus === 'queued'
                      ? 'Waiting for an available training worker slot in queue...'
                      : 'Training Random Forest model and searching optimal parameters...'}
                  </p>
                </div>
              </div>
              <span className="text-sm font-bold text-[#2B70AB]">{progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
              <div
                className="bg-[#2B70AB] h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs text-center text-slate-400">
              Training runs in an isolated process thread. You can freely switch to another project while this completes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

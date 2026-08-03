'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStudioStore } from '@/store/studio';
import { DEMO_RESULT } from '@/lib/constants';

const STEP_LABELS = [
  'Loading data',
  'Profiling dataset',
  'Detecting task type',
  'Training algorithms',
  'Finding best model',
  'Optimizing settings',
  'Identifying key drivers',
  'Calculating business impact',
  'Generating SOP',
  'Complete',
];

export default function OptimizationProgressPage() {
  const router = useRouter();
  const store = useStudioStore();
  const sseRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!store.optimizationId) {
      store.setResult({ ...DEMO_RESULT, is_demo_fallback: true });
      router.push('/results');
      return;
    }

    const BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001').trim();
    const es = new EventSource(`${BASE}/api/jobs/${store.optimizationId}/stream`);
    sseRef.current = es;

    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      store.setProgress(data.progress || 0, data.step || 'Processing...');

      if (data.status === 'complete') {
        es.close();
        fetch(`${BASE}/api/jobs/${store.optimizationId}`)
          .then((r) => r.json())
          .then((json) => {
            store.setResult(json.job?.result || DEMO_RESULT);
            router.push('/results');
          })
          .catch(() => {
            store.setResult(DEMO_RESULT);
            router.push('/results');
          });
      }

      if (data.status === 'failed') {
        es.close();
        store.setResult({ ...DEMO_RESULT, is_demo_fallback: true });
        router.push('/results');
      }
    };

    es.onerror = () => {
      es.close();
      store.setResult({ ...DEMO_RESULT, is_demo_fallback: true });
      router.push('/results');
    };

    return () => {
      es.close();
    };
  }, []);

  const progress = store.progress ?? 0;
  const stepLabel = store.currentStep ?? 'Starting…';
  const stepIndex = STEP_LABELS.findIndex((s) =>
    s.toLowerCase().includes(stepLabel.toLowerCase())
  ) + 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] gap-8 p-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Finding best settings for your data</h1>
        <p className="text-gray-500 text-sm">Usually takes 30–90 seconds</p>
      </div>

      <div className="w-full space-y-3 bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-primary">{stepLabel}</span>
          <span className="text-gray-700">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 w-full">
        {STEP_LABELS.slice(0, 5).map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                i < stepIndex
                  ? 'bg-primary text-primary-foreground font-bold'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {i < stepIndex ? '✓' : i + 1}
            </div>
            <span className="text-[10px] text-gray-500 text-center leading-tight">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

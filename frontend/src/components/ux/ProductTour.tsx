'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Compass, X, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  actionText: string;
  path: string;
}

const STEPS: TourStep[] = [
  {
    title: '1. Create a Project',
    description: 'Organize your process optimization study by plant, line, or yield goal.',
    actionText: 'Go to Projects',
    path: '/[userId]/modliq-console/projects',
  },
  {
    title: '2. Upload Data',
    description: 'Drag-and-drop CSV/Excel files, PDF tables, or connect read-only plant databases.',
    actionText: 'Go to Ingestion',
    path: '/[userId]/modliq-console/data-upload',
  },
  {
    title: '3. Check Dataset Health',
    description: 'Modliq automatically profiles rows, missing values, outliers, and target leakage.',
    actionText: 'View Health Score',
    path: '/[userId]/modliq-console/data-upload',
  },
  {
    title: '4. Ask Your Factory Data',
    description: 'Query distributions, correlations, and anomalies in plain English without code.',
    actionText: 'Open EDA Studio',
    path: '/[userId]/modliq-console/eda',
  },
  {
    title: '5. Define Your Goal',
    description: 'State what you want to optimize in plain text (e.g. "Maximize yield below 90°C").',
    actionText: 'State Goal',
    path: '/[userId]/modliq-console/goal',
  },
  {
    title: '6. Run AutoML Optimization',
    description: 'Benchmark algorithms and compute safe operating setpoint windows.',
    actionText: 'Run Optimization',
    path: '/[userId]/modliq-console/optimization-progress',
  },
  {
    title: '7. Generate Quality Passport',
    description: 'Create audit-ready compliance pass certificates for buyers and auditors.',
    actionText: 'Generate Passport',
    path: '/[userId]/modliq-console/quality-passport',
  },
];

export default function ProductTour({ userId }: { userId: string }) {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('modliq_tour_dismissed');
    if (saved === 'true') {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('modliq_tour_dismissed', 'true');
    setDismissed(true);
  };

  const handleRestart = () => {
    localStorage.removeItem('modliq_tour_dismissed');
    setCurrentStepIndex(0);
    setDismissed(false);
    setMinimized(false);
  };

  if (dismissed) {
    return (
      <button
        onClick={handleRestart}
        className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-900 text-slate-300 text-xs font-semibold shadow-lg border border-slate-700 transition-all print:hidden"
        title="Restart Product Tour"
      >
        <Compass size={14} className="text-cyan-400" />
        <span>Product Tour</span>
      </button>
    );
  }

  const step = STEPS[currentStepIndex];
  const targetPath = step.path.replace('[userId]', userId);

  return (
    <div className="fixed bottom-6 left-6 z-50 w-full max-w-sm bg-white rounded-3xl border border-slate-200 p-5 shadow-2xl space-y-4 print:hidden animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-[#2B70AB]">
          <Compass size={18} />
          <span className="text-xs font-bold text-slate-900">Modliq Guided Tour</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMinimized(!minimized)}
            className="text-slate-400 hover:text-slate-600 px-1.5 text-xs font-mono"
          >
            {minimized ? '+' : '−'}
          </button>
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100"
            title="Skip Tour"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!minimized && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-400">
            <span>STEP {currentStepIndex + 1} OF {STEPS.length}</span>
            <span>{Math.round(((currentStepIndex + 1) / STEPS.length) * 100)}%</span>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">{step.description}</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-40"
            >
              Previous
            </button>

            <button
              onClick={() => {
                router.push(targetPath);
                if (currentStepIndex < STEPS.length - 1) {
                  setCurrentStepIndex(currentStepIndex + 1);
                } else {
                  handleDismiss();
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2B70AB] hover:bg-[#205887] text-white font-semibold text-xs shadow-xs transition-all"
            >
              <span>{step.actionText}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

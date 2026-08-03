'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, X, ChevronRight, Rocket } from 'lucide-react';
import Link from 'next/link';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  actionUrl: string;
}

const STEPS: OnboardingStep[] = [
  { id: 'step_project', title: '1. Create your first project', description: 'Set up a manufacturing project workspace.', actionUrl: '/modliq-console/projects' },
  { id: 'step_upload', title: '2. Load demo dataset or upload CSV/Excel', description: 'Ingest process parameter dataset.', actionUrl: '/modliq-console/data-upload' },
  { id: 'step_health', title: '3. Review dataset health', description: 'Run automated missing value and drift check.', actionUrl: '/modliq-console/data-upload' },
  { id: 'step_goal', title: '4. Define optimization goal', description: 'Parse target yields, features, and constraints.', actionUrl: '/modliq-console/goal' },
  { id: 'step_optimize', title: '5. Run ML optimization', description: 'Train AutoML model and derive optimal settings.', actionUrl: '/modliq-console/optimization-progress' },
  { id: 'step_results', title: '6. View optimization results', description: 'Inspect recommended parameters & impact.', actionUrl: '/modliq-console/results' },
  { id: 'step_passport', title: '7. Generate Quality Passport', description: 'Export buyer-ready manufacturing certificate.', actionUrl: '/modliq-console/quality-passport' },
  { id: 'step_team', title: '8. Invite team member', description: 'Collaborate with plant engineers & admins.', actionUrl: '/modliq-console/org/members' },
];

export default function OnboardingChecklist({ userId }: { userId: string }) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/v1/onboarding`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
        });
        const data = await res.json();
        if (data.success && data.data) {
          setCompletedSteps(data.data.completedSteps || []);
          setDismissed(Boolean(data.data.dismissed));
        }
      } catch {
        // Ignore fallback
      } finally {
        setLoading(false);
      }
    };

    fetchState();
  }, []);

  const handleDismiss = async () => {
    setDismissed(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      await fetch(`${apiUrl}/api/v1/onboarding`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({ dismissed: true }),
      });
    } catch {
      // Ignore
    }
  };

  if (loading || dismissed) return null;

  const progressPct = Math.round((completedSteps.length / STEPS.length) * 100);

  return (
    <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/20 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/30">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Modliq Guided Onboarding Checklist</h3>
            <p className="text-xs text-slate-400">Complete these steps to unlock full process optimization.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-blue-400">{progressPct}% Completed</span>
            <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-slate-800 transition"
            title="Dismiss checklist"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        {STEPS.map((step) => {
          const isDone = completedSteps.includes(step.id);
          const linkPath = `/${userId}${step.actionUrl}`;

          return (
            <Link
              key={step.id}
              href={linkPath}
              className={`p-3 rounded-xl border transition flex items-start gap-2.5 ${
                isDone
                  ? 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                  : 'bg-slate-900/90 border-blue-500/30 hover:border-blue-500 text-slate-200 hover:bg-slate-800/80 shadow-sm'
              }`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Circle className="w-4 h-4 text-blue-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-xs font-semibold block ${isDone ? 'line-through text-slate-500' : 'text-white'}`}>
                  {step.title}
                </span>
                <span className="text-[11px] text-slate-400 truncate block mt-0.5">{step.description}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

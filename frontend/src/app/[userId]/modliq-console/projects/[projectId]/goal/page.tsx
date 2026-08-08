'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Target, Sparkles, ArrowRight, Loader2, AlertCircle, BookOpen } from 'lucide-react';
import { usePipelineStore } from '@/store/pipelineStore';
import { parseGoal } from '@/services/optimization.service';
import { apiFetch } from '@/lib/apiFetch';
import GoalCrosscheckWizard, { GoalReviewData } from '@/components/goal/GoalCrosscheckWizard';
import TemplateSelector, { ModliqTemplateItem } from '@/components/templates/TemplateSelector';

export default function ProjectGoalPage({
  params,
}: {
  params: Promise<{ userId: string; projectId: string }>;
}) {
  const resolvedParams = use(params);
  const { userId, projectId } = resolvedParams;
  const router = useRouter();

  const { filename, setIntent, analytics } = usePipelineStore();
  const [goalText, setGoalText] = useState('Maximize Yield above 92% while keeping reaction Temperature below 90°C and Pressure below 5 bar.');
  const [parsing, setParsing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Crosscheck Wizard state
  const [goalReviewId, setGoalReviewId] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState<GoalReviewData | null>(null);

  // Template Modal state
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templates, setTemplates] = useState<ModliqTemplateItem[]>([]);

  const columns = [
    ...(analytics?.numericColumns || []),
    ...(analytics?.categoricalColumns || []),
  ];

  // Fetch recommended templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data: any = await apiFetch(`/api/v1/projects/${projectId}/templates/recommended`);
        if (data?.success && data?.templates) {
          setTemplates(data.templates);
        }
      } catch {
        // Fallback
      }
    };
    fetchTemplates();
  }, [projectId]);

  const handleParseAndCrosscheck = async () => {
    if (!goalText.trim()) return;

    setParsing(true);
    setError(null);
    setReviewData(null);

    try {
      // 1. Parse natural language goal
      const parsed = await parseGoal(goalText, 'yield_optimizer', columns);
      const intent = {
        raw_text: parsed.raw_text,
        template_id: parsed.template_id,
        target: parsed.target,
        goal_direction: parsed.goal_direction,
        threshold: parsed.threshold,
        features: parsed.features,
        constraints: parsed.constraints,
      };
      setIntent(intent);

      // 2. Trigger Goal Crosscheck API
      const crosscheckRes = await apiFetch(`/api/v1/projects/${projectId}/goal/crosscheck`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parsedGoal: intent }),
      });
      const crosscheckJson = await crosscheckRes.json();

      if (!crosscheckRes.ok || !crosscheckJson.success) {
        setError(crosscheckJson.error || 'Failed to generate goal crosscheck review');
      } else {
        setGoalReviewId(crosscheckJson.goalReviewId);
        setReviewData(crosscheckJson.review);
      }
    } catch (err: any) {
      setError(err.message || 'Goal parsing or crosscheck failed');
    } finally {
      setParsing(false);
    }
  };

  const handleConfirmAndRun = async (confirmedSetup: any, safetyAcknowledged: boolean) => {
    try {
      setSubmitting(true);
      setError(null);

      // 1. Save confirmed setup to GoalReview
      const confirmRes = await apiFetch(`/api/v1/projects/${projectId}/goal/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goalReviewId,
          confirmed: confirmedSetup,
          safetyAcknowledged,
        }),
      });

      const confirmJson = await confirmRes.json();
      if (!confirmRes.ok || !confirmJson.success) {
        setError(confirmJson.error || 'Failed to confirm optimization setup');
        setSubmitting(false);
        return;
      }

      // 2. Submit optimization job using confirmed setup
      const jobRes = await apiFetch(`/api/v1/optimization/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          filename: filename || 'demo_dataset.csv',
          confirmedSetup,
        }),
      });

      const jobJson = await jobRes.json();
      if (jobRes.ok && jobJson.success) {
        router.push(`/${userId}/modliq-console/projects/${projectId}/optimization-progress`);
      } else {
        setError(jobJson.error || 'Failed to launch optimization job');
        setSubmitting(false);
      }
    } catch (err: any) {
      setError(err.message || 'Network error confirming optimization');
      setSubmitting(false);
    }
  };

  const handleSelectTemplate = (suggestedGoal: string) => {
    setGoalText(suggestedGoal);
    setShowTemplateModal(false);
  };

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Guided Process Setup</span>
          <h1 className="text-2xl font-bold text-white mt-1 flex items-center gap-3">
            <Target className="text-blue-400" size={28} /> Define & Confirm Optimization Goal
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Specify your manufacturing target. Modliq will parse your goal, crosscheck constraints, and request setup confirmation.
          </p>
        </div>

        <button
          onClick={() => setShowTemplateModal(true)}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition border border-slate-700"
        >
          <BookOpen className="w-4 h-4 text-blue-400" /> Use a Goal Template
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Goal Input Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Natural Language Goal Prompt
          </label>
          <textarea
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            rows={4}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 focus:outline-none text-sm text-white font-mono"
            placeholder="e.g. Maximize Yield above 95% while keeping reaction Temperature below 90°C."
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-500">
            Modliq will crosscheck targets, features, and metadata before asking for final setup confirmation.
          </span>

          <button
            onClick={handleParseAndCrosscheck}
            disabled={parsing || !goalText.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 w-full sm:w-auto"
          >
            {parsing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            Parse Goal & Review Setup <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Guided Review & Confirm Wizard */}
      {reviewData && (
        <GoalCrosscheckWizard
          goalReviewId={goalReviewId || undefined}
          initialReview={reviewData}
          onConfirm={handleConfirmAndRun}
          submitting={submitting}
        />
      )}

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <TemplateSelector
              templates={templates}
              onSelectGoalTemplate={handleSelectTemplate}
              onClose={() => setShowTemplateModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

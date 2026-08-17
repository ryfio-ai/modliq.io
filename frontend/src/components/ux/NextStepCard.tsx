'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface NextStepCardProps {
  currentStage: 'upload' | 'eda' | 'goal' | 'confirm' | 'progress' | 'results' | 'quality' | 'passport';
  userId: string;
  projectId?: string;
  customMessage?: string;
  customActionText?: string;
  customActionPath?: string;
  className?: string;
}

export default function NextStepCard({
  currentStage,
  userId,
  projectId = 'default',
  customMessage,
  customActionText,
  customActionPath,
  className = '',
}: NextStepCardProps) {
  const router = useRouter();

  const getStageConfig = () => {
    switch (currentStage) {
      case 'upload':
        return {
          title: 'Recommended Next Step',
          message: 'Your dataset is ingested & health score generated. Explore correlations and distributions next.',
          actionText: 'Open EDA Studio',
          path: `/${userId}/modliq-console/eda`,
        };
      case 'eda':
        return {
          title: 'Recommended Next Step',
          message: 'Data exploration complete. State your natural language target & constraints.',
          actionText: 'Define Optimization Goal',
          path: `/${userId}/modliq-console/goal`,
        };
      case 'goal':
        return {
          title: 'Recommended Next Step',
          message: 'Goal parsed. Review target, features, and safety boundaries in the confirmation wizard.',
          actionText: 'Review & Confirm Setup',
          path: `/${userId}/modliq-console/goal`,
        };
      case 'confirm':
        return {
          title: 'Recommended Next Step',
          message: 'Goal confirmed. Dispatch AutoML optimization algorithms to find optimal setpoints.',
          actionText: 'Run Optimization Job',
          path: `/${userId}/modliq-console/optimization-progress`,
        };
      case 'progress':
        return {
          title: 'Recommended Next Step',
          message: 'Optimization job complete! Inspect model metrics, R², RMSE, and safe operating bounds.',
          actionText: 'View Optimization Results',
          path: `/${userId}/modliq-console/results`,
        };
      case 'results':
        return {
          title: 'Recommended Next Step',
          message: 'Results analyzed. Generate an audit-ready Quality Passport for buyers and auditors.',
          actionText: 'Generate Quality Passport',
          path: `/${userId}/modliq-console/quality-passport`,
        };
      case 'quality':
        return {
          title: 'Recommended Next Step',
          message: 'Quality metrics validated. Export compliance certificate or create a shareable verification link.',
          actionText: 'View Quality Passport',
          path: `/${userId}/modliq-console/quality-passport`,
        };
      case 'passport':
      default:
        return {
          title: 'Recommended Next Step',
          message: 'Quality Passport ready! Download Markdown (.md) or share link with customers.',
          actionText: 'Export Report',
          path: `/${userId}/modliq-console/reports`,
        };
    }
  };

  const config = getStageConfig();
  const title = config.title;
  const message = customMessage || config.message;
  const actionText = customActionText || config.actionText;
  const path = customActionPath || config.path;

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50/60 border border-blue-200/80 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}>
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#2B70AB] text-white flex items-center justify-center shrink-0 shadow-xs">
          <Sparkles size={20} />
        </div>
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2B70AB]">
            {title}
          </span>
          <p className="text-xs font-medium text-slate-700 leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      <button
        onClick={() => router.push(path)}
        className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2B70AB] hover:bg-[#205887] text-white font-semibold text-xs transition-all shadow-xs"
      >
        <span>{actionText}</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

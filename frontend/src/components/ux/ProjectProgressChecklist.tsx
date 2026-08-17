'use client';

import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface StepStatus {
  id: string;
  label: string;
  completed: boolean;
  path: string;
}

interface ProjectProgressChecklistProps {
  userId: string;
  projectId?: string;
  completedSteps?: string[];
  className?: string;
}

export default function ProjectProgressChecklist({
  userId,
  projectId = 'default',
  completedSteps = ['upload', 'health', 'eda', 'goal', 'confirm'],
  className = '',
}: ProjectProgressChecklistProps) {
  const router = useRouter();

  const steps: StepStatus[] = [
    { id: 'upload', label: 'Dataset Uploaded', completed: completedSteps.includes('upload'), path: `/${userId}/modliq-console/data-upload` },
    { id: 'health', label: 'Health Check Verified', completed: completedSteps.includes('health'), path: `/${userId}/modliq-console/data-upload` },
    { id: 'eda', label: 'EDA Completed', completed: completedSteps.includes('eda'), path: `/${userId}/modliq-console/eda` },
    { id: 'goal', label: 'Goal Confirmed', completed: completedSteps.includes('goal'), path: `/${userId}/modliq-console/goal` },
    { id: 'optimization', label: 'Optimization Completed', completed: completedSteps.includes('optimization'), path: `/${userId}/modliq-console/optimization-progress` },
    { id: 'results', label: 'Results Analyzed', completed: completedSteps.includes('results'), path: `/${userId}/modliq-console/results` },
    { id: 'quality', label: 'Quality Validated', completed: completedSteps.includes('quality'), path: `/${userId}/modliq-console/spc` },
    { id: 'passport', label: 'Quality Passport Generated', completed: completedSteps.includes('passport'), path: `/${userId}/modliq-console/quality-passport` },
  ];

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Project Optimization Progress</h3>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            {completedCount} of {steps.length} workflow stages completed
          </p>
        </div>
        <span className="text-sm font-mono font-bold text-[#2B70AB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          {progressPercent}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#2B70AB] to-emerald-500 h-2 transition-all duration-500 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-2">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => router.push(step.path)}
            className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs ${
              step.completed
                ? 'border-emerald-200 bg-emerald-50/60 text-emerald-900 font-semibold'
                : 'border-slate-200 bg-slate-50/50 text-slate-500 hover:border-slate-300'
            }`}
          >
            {step.completed ? (
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            ) : (
              <Circle size={16} className="text-slate-300 shrink-0" />
            )}
            <span className="truncate">{step.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

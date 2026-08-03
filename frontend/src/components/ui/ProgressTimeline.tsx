"use client";

import React from "react";
import { Check, Loader2 } from "lucide-react";

export type StepState = "queued" | "preprocessing" | "training" | "tuning" | "evaluating" | "completed" | "failed";

interface ProgressTimelineProps {
  currentStep: StepState;
  progressPct?: number;
  message?: string;
  className?: string;
}

const STEPS: { id: StepState; label: string }[] = [
  { id: "queued", label: "Queued" },
  { id: "preprocessing", label: "Preprocessing" },
  { id: "training", label: "Training Zoo" },
  { id: "tuning", label: "HPO Tuning" },
  { id: "evaluating", label: "Evaluating" },
  { id: "completed", label: "Completed" },
];

export const ProgressTimeline: React.FC<ProgressTimelineProps> = ({
  currentStep,
  progressPct = 0,
  message,
  className = "",
}) => {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className={`w-full py-4 ${className}`}>
      {/* Stepper Bar */}
      <div className="relative flex items-center justify-between">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 bg-slate-200 dark:bg-slate-800" />
        <div
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-blue-500 transition-all duration-500"
          style={{
            width: `${(Math.max(0, currentIndex) / (STEPS.length - 1)) * 100}%`,
          }}
        />

        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIndex || currentStep === "completed";
          const isActive = idx === currentIndex && currentStep !== "completed";

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : isActive
                    ? "border-blue-500 bg-white text-blue-500 shadow-glow dark:bg-slate-900 animate-pulse"
                    : "border-slate-300 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900"
                }`}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 stroke-[3]" />
                ) : isActive ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span className="text-xs font-semibold">{idx + 1}</span>
                )}
              </div>

              <span
                className={`mt-2 text-xs font-medium tracking-tight ${
                  isActive
                    ? "font-bold text-blue-600 dark:text-blue-400"
                    : isCompleted
                    ? "text-slate-700 dark:text-slate-300"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {message && (
        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{message}</p>
          <div className="mt-2 mx-auto h-2 w-64 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

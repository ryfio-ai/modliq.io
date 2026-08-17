'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Layers, ArrowRight, HelpCircle } from 'lucide-react';

interface SmartEmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  reason?: string;
  actionText: string;
  actionPath: string;
  secondaryActionText?: string;
  secondaryActionPath?: string;
  className?: string;
}

export default function SmartEmptyState({
  icon: Icon = Layers,
  title,
  description,
  reason,
  actionText,
  actionPath,
  secondaryActionText,
  secondaryActionPath,
  className = '',
}: SmartEmptyStateProps) {
  const router = useRouter();

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-6 shadow-xs ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#2B70AB] flex items-center justify-center mx-auto border border-blue-100 shadow-xs">
        <Icon size={32} />
      </div>

      <div className="max-w-md mx-auto space-y-2">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
        <p className="text-xs text-slate-500 font-sans leading-relaxed">{description}</p>
        {reason && (
          <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 font-mono flex items-start gap-2 text-left">
            <HelpCircle size={14} className="text-[#2B70AB] shrink-0 mt-0.5" />
            <span><strong>Why is this empty?</strong> {reason}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => router.push(actionPath)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2B70AB] hover:bg-[#205887] text-white font-semibold text-xs transition-all shadow-xs"
        >
          <span>{actionText}</span>
          <ArrowRight size={15} />
        </button>

        {secondaryActionText && secondaryActionPath && (
          <button
            onClick={() => router.push(secondaryActionPath)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all"
          >
            <span>{secondaryActionText}</span>
          </button>
        )}
      </div>
    </div>
  );
}

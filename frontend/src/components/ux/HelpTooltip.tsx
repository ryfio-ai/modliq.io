'use client';

import React, { useState } from 'react';
import { HelpCircle, Info } from 'lucide-react';

export const DICTIONARY: Record<string, { title: string; definition: string; example?: string }> = {
  R2: {
    title: 'R² (Coefficient of Determination)',
    definition: 'Measures how well the ML model explains variation in your target (0 to 100%). Higher values mean stronger predictive accuracy.',
    example: 'R² = 0.92 means 92% of yield variation is explained by temperature, pressure, and flow rate.',
  },
  RMSE: {
    title: 'RMSE (Root Mean Square Error)',
    definition: 'The average prediction error in your target variable units. Gives more weight to large errors.',
    example: 'An RMSE of 0.8°C means model predictions are typically within ±0.8°C of actual readings.',
  },
  MAE: {
    title: 'MAE (Mean Absolute Error)',
    definition: 'The average absolute difference between predicted and actual values in plain units.',
    example: 'An MAE of 1.2 kg means average prediction error is 1.2 kg.',
  },
  Cp: {
    title: 'Cp (Process Capability Index)',
    definition: 'Measures potential process capability by comparing total allowable spec width against 6-sigma process spread.',
    example: 'Cp >= 1.33 indicates a capable process, assuming perfect centering.',
  },
  Cpk: {
    title: 'Cpk (Centered Process Capability Index)',
    definition: 'Measures actual process capability considering both process spread and centering relative to specification limits (LSL / USL).',
    example: 'Cpk >= 1.33 means less than 64 defects per million opportunities (DPMO).',
  },
  SPC: {
    title: 'SPC (Statistical Process Control)',
    definition: 'Method of quality control using statistical control charts (I-MR, X-bar R) to monitor process stability over time.',
    example: 'Detects special cause variation before non-conforming parts are produced.',
  },
  AQL: {
    title: 'AQL (Acceptable Quality Limit)',
    definition: 'The maximum percent defective that, for sampling inspection, can be considered acceptable as a process average.',
    example: 'AQL 1.5 Level II specifies exact sample sizes and allowable reject counts per batch.',
  },
  OEE: {
    title: 'OEE (Overall Equipment Effectiveness)',
    definition: 'Manufacturing gold standard metric combining Availability × Performance Rate × Quality Rate.',
    example: '85% OEE is considered world-class performance for discrete manufacturing lines.',
  },
  EDA: {
    title: 'EDA (Exploratory Data Analysis)',
    definition: 'Visual profiling of distributions, correlations, outliers, and missing values before building ML models.',
  },
  'Feature Importance': {
    title: 'Feature Importance (Process Drivers)',
    definition: 'Ranks which process parameters (e.g. Temperature, Pressure) have the strongest impact on your target output.',
    example: 'Temperature driving 45% of total yield variation means it is your primary control knob.',
  },
  'Target Leakage': {
    title: 'Target Leakage Warning',
    definition: 'Occurs when an input variable contains future knowledge of the target that would not be available in real production.',
    example: 'Including "defect_count" when predicting "yield" causes false 100% accuracy.',
  },
  'Quality Passport': {
    title: 'Quality Passport Certificate',
    definition: 'Audit-ready compliance document containing dataset health, SPC capability metrics, ML setpoints, and evidence summaries.',
  },
};

interface HelpTooltipProps {
  term: keyof typeof DICTIONARY | string;
  customTitle?: string;
  customDefinition?: string;
  iconOnly?: boolean;
  className?: string;
}

export default function HelpTooltip({
  term,
  customTitle,
  customDefinition,
  iconOnly = false,
  className = '',
}: HelpTooltipProps) {
  const [open, setOpen] = useState(false);

  const entry = DICTIONARY[term] || {
    title: customTitle || term,
    definition: customDefinition || 'Click for plain-language technical explanation.',
  };

  return (
    <div className={`relative inline-flex items-center gap-1 ${className}`}>
      {!iconOnly && <span className="font-semibold">{term}</span>}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="text-[#2B70AB] hover:text-[#1B2A4A] p-0.5 rounded-full transition-colors focus:outline-none"
        aria-label={`Help for ${entry.title}`}
      >
        <HelpCircle size={14} className="inline-block" />
      </button>

      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-slate-900 text-white rounded-xl shadow-2xl z-50 text-xs font-sans space-y-1.5 border border-slate-700 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-1.5 font-bold text-cyan-400 border-b border-slate-800 pb-1">
            <Info size={13} />
            <span>{entry.title}</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">{entry.definition}</p>
          {entry.example && (
            <div className="p-1.5 rounded bg-slate-800/80 text-[10px] text-slate-400 font-mono">
              💡 {entry.example}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

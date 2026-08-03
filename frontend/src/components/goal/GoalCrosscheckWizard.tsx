'use client';

import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, Sliders, Layers, Play, Save, Info, Tag } from 'lucide-react';

export interface GoalReviewData {
  target: string;
  direction: 'maximize' | 'minimize';
  threshold?: number | null;
  controllableFeatures: string[];
  removedFeatures: string[];
  metadataColumns: string[];
  constraints: Record<string, { min?: number | null; max?: number | null }>;
  warnings: string[];
  recommendedModules: {
    optimization: boolean;
    qualityStudio: boolean;
    trialSop: boolean;
    qualityPassport: boolean;
    trialTracker: boolean;
    operations: boolean;
    supplyChain: boolean;
    lean: boolean;
  };
  recommendedActions: string[];
}

interface GoalCrosscheckWizardProps {
  goalReviewId?: string;
  initialReview: GoalReviewData;
  onConfirm: (confirmedSetup: any, safetyAcknowledged: boolean) => Promise<void>;
  onSaveDraft?: (draftSetup: any) => Promise<void>;
  submitting?: boolean;
}

export default function GoalCrosscheckWizard({
  goalReviewId,
  initialReview,
  onConfirm,
  onSaveDraft,
  submitting = false,
}: GoalCrosscheckWizardProps) {
  // Editable State
  const [target, setTarget] = useState<string>(initialReview.target);
  const [direction, setDirection] = useState<'maximize' | 'minimize'>(initialReview.direction);
  const [threshold, setThreshold] = useState<string>(
    initialReview.threshold !== null && initialReview.threshold !== undefined
      ? String(initialReview.threshold)
      : ''
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    initialReview.controllableFeatures
  );
  const [constraints, setConstraints] = useState<Record<string, { min?: string; max?: string }>>(
    Object.entries(initialReview.constraints || {}).reduce((acc, [col, bounds]) => {
      acc[col] = {
        min: bounds.min !== undefined && bounds.min !== null ? String(bounds.min) : '',
        max: bounds.max !== undefined && bounds.max !== null ? String(bounds.max) : '',
      };
      return acc;
    }, {} as Record<string, { min?: string; max?: string }>)
  );
  const [selectedModules, setSelectedModules] = useState<Record<string, boolean>>({
    optimization: initialReview.recommendedModules.optimization ?? true,
    qualityStudio: initialReview.recommendedModules.qualityStudio ?? true,
    trialSop: initialReview.recommendedModules.trialSop ?? true,
    qualityPassport: initialReview.recommendedModules.qualityPassport ?? true,
    trialTracker: initialReview.recommendedModules.trialTracker ?? true,
    operations: initialReview.recommendedModules.operations ?? false,
    supplyChain: initialReview.recommendedModules.supplyChain ?? false,
    lean: initialReview.recommendedModules.lean ?? false,
  });

  const [safetyAcknowledged, setSafetyAcknowledged] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const toggleFeature = (feat: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const updateConstraint = (col: string, field: 'min' | 'max', val: string) => {
    setConstraints((prev) => ({
      ...prev,
      [col]: {
        ...prev[col],
        [field]: val,
      },
    }));
  };

  const handleConfirmSubmit = async () => {
    if (!safetyAcknowledged) {
      setValidationError('You must acknowledge the safety requirement before running optimization.');
      return;
    }

    if (!target.trim()) {
      setValidationError('Target variable is required.');
      return;
    }

    if (selectedFeatures.length === 0) {
      setValidationError('Select at least one controllable process feature.');
      return;
    }

    setValidationError(null);

    const formattedConstraints: Record<string, { min?: number; max?: number }> = {};
    Object.entries(constraints).forEach(([col, bounds]) => {
      const minVal = bounds.min !== '' && !isNaN(Number(bounds.min)) ? Number(bounds.min) : undefined;
      const maxVal = bounds.max !== '' && !isNaN(Number(bounds.max)) ? Number(bounds.max) : undefined;
      if (minVal !== undefined || maxVal !== undefined) {
        formattedConstraints[col] = { min: minVal, max: maxVal };
      }
    });

    const confirmedSetup = {
      target,
      direction,
      threshold: threshold !== '' && !isNaN(Number(threshold)) ? Number(threshold) : null,
      features: selectedFeatures,
      constraints: formattedConstraints,
      selectedOutputs: selectedModules,
    };

    await onConfirm(confirmedSetup, safetyAcknowledged);
  };

  return (
    <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Optimization Readiness Guard</span>
            <h2 className="text-xl font-bold text-white mt-0.5">Review & Confirm Optimization Setup</h2>
            <p className="text-xs text-slate-400 mt-0.5">Before running optimization, confirm that Modliq understood your setup correctly.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold rounded-full">
            Setup Review Needed
          </span>
        </div>
      </div>

      {/* Warnings & Auto-Removals Banner */}
      {initialReview.warnings.length > 0 && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
          <h4 className="text-xs font-bold text-amber-400 flex items-center gap-2 uppercase tracking-wide">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Automated Safety & Metadata Adjustments
          </h4>
          <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
            {initialReview.warnings.map((warn, idx) => (
              <li key={idx}>{warn}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Section A: Target Metric */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Tag className="w-4 h-4 text-blue-400" /> 1. Target Variable & Goal Direction
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Target Metric</label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Goal Direction</label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-blue-500"
            >
              <option value="maximize">Maximize ↑</option>
              <option value="minimize">Minimize ↓</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Target Threshold (Optional)</label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              placeholder="e.g. 95.0"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Section B: Controllable Features */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" /> 2. Controllable Process Variables ({selectedFeatures.length} selected)
        </h3>

        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <p className="text-xs text-slate-400">Toggle variables that engineers can adjust on the production line:</p>

          <div className="flex flex-wrap gap-2">
            {initialReview.controllableFeatures.map((feat) => {
              const isSelected = selectedFeatures.includes(feat);
              return (
                <button
                  key={feat}
                  type="button"
                  onClick={() => toggleFeature(feat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    isSelected
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50'
                      : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-400' : 'text-slate-600'}`} />
                  {feat}
                </button>
              );
            })}
          </div>

          {initialReview.removedFeatures.length > 0 && (
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400" /> Excluded variables: {initialReview.removedFeatures.join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* Section C: Parsed Constraints */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-400" /> 3. Process Limit Constraints
        </h3>

        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
          {Object.keys(constraints).length === 0 ? (
            <p className="text-xs text-slate-500 italic">No operational constraints detected. You can add min/max limits below.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(constraints).map(([col, bounds]) => (
                <div key={col} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-white">{col}</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Min Value</span>
                      <input
                        type="number"
                        value={bounds.min}
                        onChange={(e) => updateConstraint(col, 'min', e.target.value)}
                        placeholder="Min limit"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Max Value</span>
                      <input
                        type="number"
                        value={bounds.max}
                        onChange={(e) => updateConstraint(col, 'max', e.target.value)}
                        placeholder="Max limit"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section D: Recommended Output Modules */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" /> 4. Select Output Modules & Artifacts
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { key: 'optimization', label: 'ML Optimization', desc: 'Predictive parameter setpoints' },
            { key: 'qualityStudio', label: 'Quality Studio', desc: 'SPC control limits & Cpk' },
            { key: 'trialSop', label: 'Trial SOP', desc: '7-batch execution protocol' },
            { key: 'qualityPassport', label: 'Quality Passport', desc: 'Buyer quality certificate' },
            { key: 'operations', label: 'Operations OEE', desc: 'Line Pareto downtime check' },
            { key: 'supplyChain', label: 'Supply Chain', desc: 'Material lot risk analysis' },
            { key: 'lean', label: 'Lean Kaizen', desc: '5S waste action items' },
          ].map((mod) => {
            const isChecked = Boolean(selectedModules[mod.key]);
            return (
              <label
                key={mod.key}
                className={`p-3 rounded-xl border cursor-pointer transition flex items-start gap-2.5 ${
                  isChecked
                    ? 'bg-purple-600/10 border-purple-500/40 text-white'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) =>
                    setSelectedModules((prev) => ({ ...prev, [mod.key]: e.target.checked }))
                  }
                  className="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-purple-500"
                />
                <div>
                  <span className="text-xs font-bold block">{mod.label}</span>
                  <span className="text-[10px] text-slate-500 block leading-tight">{mod.desc}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Section E: Safety Acknowledgement */}
      <div className="p-4 bg-slate-950 rounded-xl border border-blue-500/30 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={safetyAcknowledged}
            onChange={(e) => setSafetyAcknowledged(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-xs font-semibold text-slate-200 leading-normal">
            I understand that Modliq recommendations must be validated through controlled trials before production rollout.
          </span>
        </label>
      </div>

      {validationError && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold">
          {validationError}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <span className="text-xs text-slate-500">Confirmed setup will be saved to audit trail.</span>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onSaveDraft && (
            <button
              type="button"
              onClick={() => onSaveDraft({ target, direction, threshold, features: selectedFeatures, constraints })}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
            >
              <Save className="w-4 h-4" /> Save Draft
            </button>
          )}

          <button
            type="button"
            onClick={handleConfirmSubmit}
            disabled={submitting}
            className="flex-1 sm:flex-initial px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-500/20 disabled:opacity-50"
          >
            <Play className="w-4 h-4" /> {submitting ? 'Confirming & Launching...' : 'Confirm & Run Optimization'}
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { CheckCircle2, Clock, ShieldAlert, Loader2 } from 'lucide-react';

export interface PlannedTaskItem {
  step: number;
  toolName: string;
  description: string;
  requiresApproval: boolean;
}

export default function AgentTaskTimeline({ tasks }: { tasks: PlannedTaskItem[] }) {
  if (!tasks || tasks.length === 0) return null;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Execution Plan &amp; Tool Steps</p>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.step} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-xs">
            <div className="mt-0.5">
              {task.requiresApproval ? (
                <ShieldAlert size={16} className="text-amber-600" />
              ) : (
                <CheckCircle2 size={16} className="text-emerald-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{task.toolName}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                  task.requiresApproval ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {task.requiresApproval ? 'Approval Required' : 'Executed (Read-Only)'}
                </span>
              </div>
              <p className="text-slate-600 mt-1">{task.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

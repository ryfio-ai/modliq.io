import React from 'react';

interface AdminStatusBadgeProps {
  status: string;
  type?: 'health' | 'job' | 'lead' | 'ticket' | 'role' | 'generic';
}

export default function AdminStatusBadge({ status, type = 'generic' }: AdminStatusBadgeProps) {
  const upper = (status || '').toUpperCase();

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (type === 'health') {
    if (['HEALTHY', 'READY', 'EXCELLENT', 'OPERATIONAL'].includes(upper)) {
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (['DEGRADED', 'NEEDS_ATTENTION', 'POOR', 'WARNING'].includes(upper)) {
      colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
    } else if (['DOWN', 'OFFLINE', 'FAILED', 'ERROR'].includes(upper)) {
      colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
    }
  } else if (type === 'job') {
    if (['COMPLETED', 'SUCCESS'].includes(upper)) {
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (['RUNNING', 'OPTIMIZING', 'PROCESSING'].includes(upper)) {
      colorClasses = 'bg-blue-50 text-[#2B70AB] border-blue-200 animate-pulse';
    } else if (['QUEUED', 'DRAFT'].includes(upper)) {
      colorClasses = 'bg-slate-100 text-slate-600 border-slate-200';
    } else if (['FAILED', 'CANCELLED'].includes(upper)) {
      colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
    }
  } else if (type === 'lead') {
    if (upper === 'NEW') {
      colorClasses = 'bg-blue-50 text-[#2B70AB] border-blue-200 font-bold';
    } else if (['CONTACTED', 'QUALIFIED', 'DEMO_SCHEDULED'].includes(upper)) {
      colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
    } else if (['PILOT_ACCEPTED', 'CONVERTED'].includes(upper)) {
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold';
    } else if (upper === 'PILOT_REJECTED') {
      colorClasses = 'bg-slate-100 text-slate-500 border-slate-200';
    }
  } else if (type === 'ticket') {
    if (upper === 'OPEN') {
      colorClasses = 'bg-rose-50 text-rose-700 border-rose-200 font-bold';
    } else if (upper === 'IN_PROGRESS') {
      colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
    } else if (['RESOLVED', 'CLOSED'].includes(upper)) {
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  } else if (type === 'role') {
    if (upper === 'ADMIN') {
      colorClasses = 'bg-indigo-50 text-indigo-700 border-indigo-200 font-bold';
    } else {
      colorClasses = 'bg-slate-50 text-slate-600 border-slate-200';
    }
  } else {
    if (['ACTIVE', 'READY', 'TRUE', 'ENABLED', 'CONNECTED'].includes(upper)) {
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (['DEMO', 'PENDING', 'LIMITED'].includes(upper)) {
      colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
    } else if (['DISABLED', 'REVOKED', 'FALSE'].includes(upper)) {
      colorClasses = 'bg-slate-100 text-slate-500 border-slate-200';
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${colorClasses} tracking-tight uppercase`}
    >
      {status}
    </span>
  );
}

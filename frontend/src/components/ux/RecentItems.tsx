'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Folder, Database, FileText, ArrowRight } from 'lucide-react';

interface RecentItemsProps {
  userId: string;
  className?: string;
}

export default function RecentItems({ userId, className = '' }: RecentItemsProps) {
  const router = useRouter();

  const recents = [
    {
      type: 'project',
      title: 'Crossfields Yield Optimization',
      subtitle: 'Manufacturing Process Optimization · Modified 2h ago',
      path: `/${userId}/modliq-console/dashboard`,
      icon: Folder,
      badge: 'Project',
      badgeColor: 'bg-blue-50 text-[#2B70AB]',
    },
    {
      type: 'dataset',
      title: 'Chemical_Yield_Metrics_2026.csv',
      subtitle: '500 rows · Health Score 92/100 · 4h ago',
      path: `/${userId}/modliq-console/data-upload`,
      icon: Database,
      badge: 'Dataset',
      badgeColor: 'bg-emerald-50 text-emerald-700',
    },
    {
      type: 'report',
      title: 'Quality Passport #CERT-2026-0941',
      subtitle: 'Audit Readiness Score 96/100 · Yesterday',
      path: `/${userId}/modliq-console/quality-passport`,
      icon: FileText,
      badge: 'Quality Passport',
      badgeColor: 'bg-purple-50 text-purple-700',
    },
  ];

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-[#2B70AB]" />
          <h3 className="text-sm font-bold text-slate-900">Recently Used Projects &amp; Files</h3>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">Quick Access</span>
      </div>

      <div className="space-y-2">
        {recents.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => router.push(item.path)}
              className="w-full p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 text-left flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 shadow-2xs group-hover:border-[#2B70AB]">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 truncate group-hover:text-[#2B70AB]">
                      {item.title}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-sans truncate mt-0.5">{item.subtitle}</p>
                </div>
              </div>

              <ArrowRight size={14} className="text-slate-400 group-hover:text-[#2B70AB] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

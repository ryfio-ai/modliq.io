'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ExternalLink, Menu } from 'lucide-react';

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  onMobileMenuToggle?: () => void;
}

export default function AdminHeader({
  title = 'Modliq Admin Console',
  subtitle = 'Platform Observability & Governance',
  onMobileMenuToggle,
}: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-[#D0E2F0] px-6 flex items-center justify-between sticky top-0 z-40 shadow-2xs">
      <div className="flex items-center gap-3">
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 text-slate-500 hover:text-[#1B2A4A] rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-2.5">
          <img src="/icon.png" alt="Modliq" className="w-7 h-7 rounded-lg object-contain" />
          <div>
            <h1 className="text-sm font-extrabold text-[#1B2A4A] tracking-tight">{title}</h1>
            {subtitle && <p className="text-[10px] text-slate-500 font-medium hidden sm:block">{subtitle}</p>}
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-[#2B70AB] border border-blue-200 text-[10px] font-bold rounded-full uppercase">
          <ShieldCheck className="w-3 h-3 text-[#2B70AB]" /> Admin Secured
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="px-3 py-1.5 bg-[#F0F6FA] hover:bg-slate-200 text-[#1B2A4A] text-xs font-semibold rounded-xl border border-[#D0E2F0] transition flex items-center gap-1.5"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </Link>
      </div>
    </header>
  );
}

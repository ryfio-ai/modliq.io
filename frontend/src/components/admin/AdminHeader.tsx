'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ExternalLink, Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
    router.push('/login');
  };

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
        {user && (
          <div className="hidden md:flex items-center gap-2.5 px-3 py-1 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs text-[#1B2A4A]">
            <div className="w-6 h-6 rounded-full bg-[#2B70AB] text-white flex items-center justify-center font-bold text-[10px]">
              {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="text-left">
              <span className="font-bold block text-[11px] leading-tight truncate max-w-[120px]">{user.name || 'Platform Admin'}</span>
              <span className="text-[9px] text-slate-500 font-semibold block leading-tight truncate max-w-[120px]">{user.email || 'admin@modliq.io'}</span>
            </div>
          </div>
        )}

        <Link
          href="/"
          target="_blank"
          className="px-3 py-1.5 bg-[#F0F6FA] hover:bg-slate-200 text-[#1B2A4A] text-xs font-semibold rounded-xl border border-[#D0E2F0] transition flex items-center gap-1.5"
        >
          <span className="hidden sm:inline">View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </Link>

        <button
          onClick={handleSignOut}
          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 text-xs font-bold rounded-xl border border-rose-200 transition flex items-center gap-1.5"
          title="Sign out of Admin Console"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}

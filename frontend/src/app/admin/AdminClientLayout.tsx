'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Building,
  Cpu,
  Activity,
  Zap,
  HelpCircle,
  Shield,
  BarChart3,
  ArrowLeft,
} from 'lucide-react';

const ADMIN_NAV = [
  { label: 'Overview', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Users', path: '/admin/users', icon: <Users className="w-4 h-4" /> },
  { label: 'Organizations', path: '/admin/organizations', icon: <Building className="w-4 h-4" /> },
  { label: 'ML Jobs', path: '/admin/jobs', icon: <Cpu className="w-4 h-4" /> },
  { label: 'AI Providers', path: '/admin/ai', icon: <Zap className="w-4 h-4" /> },
  { label: 'System Status', path: '/admin/system', icon: <Activity className="w-4 h-4" /> },
  { label: 'Usage Metering', path: '/admin/usage', icon: <BarChart3 className="w-4 h-4" /> },
  { label: 'Support Queue', path: '/admin/support', icon: <HelpCircle className="w-4 h-4" /> },
  { label: 'Audit Logs', path: '/admin/audit-logs', icon: <Shield className="w-4 h-4" /> },
];

export default function AdminClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAdmin(true);
    } else {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F6FA] text-[#1B2A4A] font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="h-14 bg-white border-b border-[#D0E2F0] px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="/icon.png"
            alt="Modliq Icon"
            className="w-7 h-7 rounded-lg object-contain"
          />
          <span className="text-sm font-bold text-[#1B2A4A] tracking-wide">Modliq Admin Console</span>
          <span className="px-2 py-0.5 bg-blue-50 text-[#2B70AB] border border-blue-200 text-[10px] font-bold rounded-full uppercase">
            Platform Observability
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <Link href="/login" className="text-slate-600 hover:text-[#2B70AB] flex items-center gap-1.5 transition">
            <ArrowLeft className="w-3.5 h-3.5" /> Exit Admin
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-[#D0E2F0] p-4 space-y-1 hidden md:block">
          <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Administration</div>
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-[#F0F6FA] text-[#2B70AB] border border-[#D0E2F0]'
                    : 'text-slate-600 hover:bg-[#F0F6FA] hover:text-[#1B2A4A]'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F0F6FA]">{children}</main>
      </div>
    </div>
  );
}

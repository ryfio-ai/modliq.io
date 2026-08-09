'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  Building,
  FolderGit2,
  Database,
  Cpu,
  FileSpreadsheet,
  Zap,
  Activity,
  BarChart3,
  UserPlus,
  HelpCircle,
  Globe,
  Shield,
  Settings,
  LogOut,
} from 'lucide-react';

export const ADMIN_NAV_ITEMS = [
  { label: 'Overview', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Users', path: '/admin/users', icon: <Users className="w-4 h-4" /> },
  { label: 'Organizations', path: '/admin/organizations', icon: <Building className="w-4 h-4" /> },
  { label: 'Projects', path: '/admin/projects', icon: <FolderGit2 className="w-4 h-4" /> },
  { label: 'Datasets', path: '/admin/datasets', icon: <Database className="w-4 h-4" /> },
  { label: 'ML Jobs', path: '/admin/jobs', icon: <Cpu className="w-4 h-4" /> },
  { label: 'Imports', path: '/admin/imports', icon: <FileSpreadsheet className="w-4 h-4" /> },
  { label: 'AI Providers', path: '/admin/ai', icon: <Zap className="w-4 h-4" /> },
  { label: 'System Health', path: '/admin/system', icon: <Activity className="w-4 h-4" /> },
  { label: 'Usage Metering', path: '/admin/usage', icon: <BarChart3 className="w-4 h-4" /> },
  { label: 'Pilot Leads', path: '/admin/leads', icon: <UserPlus className="w-4 h-4" /> },
  { label: 'Support Queue', path: '/admin/support', icon: <HelpCircle className="w-4 h-4" /> },
  { label: 'Website Control', path: '/admin/website', icon: <Globe className="w-4 h-4" /> },
  { label: 'Audit Logs', path: '/admin/audit-logs', icon: <Shield className="w-4 h-4" /> },
  { label: 'Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-[#D0E2F0] p-4 flex flex-col justify-between hidden md:flex shrink-0">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Platform Administration
        </div>
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#F0F6FA] text-[#2B70AB] border border-[#D0E2F0] shadow-2xs font-bold'
                  : 'text-slate-600 hover:bg-[#F0F6FA] hover:text-[#1B2A4A]'
              }`}
            >
              <div className={isActive ? 'text-[#2B70AB]' : 'text-slate-400'}>{item.icon}</div>
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="pt-4 border-t border-[#D0E2F0]">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 transition"
        >
          <LogOut className="w-4 h-4 text-rose-500" />
          <span>Sign Out Admin</span>
        </button>
      </div>
    </aside>
  );
}

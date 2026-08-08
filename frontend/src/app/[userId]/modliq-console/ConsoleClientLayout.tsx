'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Upload,
  Target,
  Activity,
  BarChart2,
  LogOut,
  ShieldCheck,
  Sliders,
  Cpu,
  Workflow,
  Radio,
  Box,
  Key,
  RefreshCw,
  Globe2,
  Terminal,
  FileText,
  Award,
  Search,
} from 'lucide-react';
import React, { use, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePipelineStore } from '@/store/pipelineStore';
import AiCopilotDrawer from '@/components/ai/AiCopilotDrawer';
import ProjectSwitcher from '@/components/layout/ProjectSwitcher';
import CommandPalette from '@/components/ui/CommandPalette';
import UserProfileModal from '@/components/profile/UserProfileModal';

export default function ConsoleClientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}) {
  const resolvedParams = use(params);
  const userId = resolvedParams.userId;
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const hydrateWorkspace = usePipelineStore((s) => s.hydrateWorkspace);
  const currentDatasetId = usePipelineStore((s) => s.filename);

  useEffect(() => {
    if (user?.id && !currentDatasetId) {
      fetch('/api/user/workspace')
        .then((r) => (r.ok ? r.json() : {}))
        .then((data) => {
          if (!(data as any).error) {
            hydrateWorkspace(data);
          }
        })
        .catch(() => {});
    }
  }, [user, currentDatasetId, hydrateWorkspace]);

  const handleSignOut = async () => {
    await logout();
    router.push('/');
  };

  const navSections = [
    {
      title: 'CORE STUDIO',
      items: [
        { name: 'Dashboard', href: `/${userId}/modliq-console/dashboard`, icon: LayoutDashboard },
        { name: 'Projects', href: `/${userId}/modliq-console/projects`, icon: FolderKanban },
        { name: 'Data Ingestion', href: `/${userId}/modliq-console/data-upload`, icon: Upload },
        { name: 'Optimization Goal', href: `/${userId}/modliq-console/goal`, icon: Target },
        { name: 'AutoML Engine', href: `/${userId}/modliq-console/optimization-progress`, icon: Activity },
        { name: 'Business Results', href: `/${userId}/modliq-console/results`, icon: BarChart2 },
      ],
    },
    {
      title: 'MODEL & QUALITY',
      items: [
        { name: 'Model Registry', href: `/${userId}/modliq-console/registry`, icon: ShieldCheck },
        { name: 'SPC & Cpk Control', href: `/${userId}/modliq-console/spc`, icon: Sliders },
        { name: 'SOP & CAPA Generator', href: `/${userId}/modliq-console/sop-generator`, icon: FileText },
        { name: 'Quality Passport', href: `/${userId}/modliq-console/quality-passport`, icon: Award },
      ],
    },
    {
      title: 'SECURITY & EDGE',
      items: [
        { name: 'SSO & Access Control', href: `/${userId}/modliq-console/access-control`, icon: Key },
        { name: 'Immutable Audit Logs', href: `/${userId}/modliq-console/audit-logs`, icon: Terminal },
      ],
    },
    {
      title: 'IOT & DIGITAL TWIN',
      items: [
        { name: 'Visual Pipeline Builder', href: `/${userId}/modliq-console/pipelines`, icon: Workflow },
        { name: 'OPC-UA / MQTT IoT', href: `/${userId}/modliq-console/iot`, icon: Radio },
        { name: 'Digital Twin Simulator', href: `/${userId}/modliq-console/digital-twin`, icon: Box },
      ],
    },
    {
      title: 'AIR-GAP & MESH',
      items: [
        { name: 'Air-Gapped Suite', href: `/${userId}/modliq-console/airgap`, icon: Cpu },
        { name: 'Retraining Agents', href: `/${userId}/modliq-console/retraining`, icon: RefreshCw },
        { name: 'Global Plant Mesh', href: `/${userId}/modliq-console/plant-mesh`, icon: Globe2 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans antialiased">
      {/* Cmd+K Global Palette Component */}
      <CommandPalette />

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 text-slate-900 flex flex-col justify-between p-3.5 fixed h-full z-20 shadow-sm overflow-y-auto">
        <div className="space-y-5">
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-slate-100">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img
                src="/icon.png"
                alt="Modliq Icon"
                className="w-8 h-8 rounded-lg object-contain shadow-sm group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="font-bold text-base tracking-tight text-slate-900 block leading-none">Modliq</span>
                <span className="text-[10px] text-blue-600 font-mono tracking-wider uppercase block mt-1 font-semibold">Enterprise v2.4</span>
              </div>
            </Link>
          </div>

          {/* Project Switcher */}
          <div className="px-1">
            <ProjectSwitcher />
          </div>

          {/* Navigation Sections */}
          <nav className="space-y-4">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-1">
                <h3 className="px-2 text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                  {section.title}
                </h3>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon size={15} className={isActive ? 'text-blue-600' : 'text-slate-500'} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Status Indicators & User Profile */}
        <div className="border-t border-slate-100 pt-3 mt-4 space-y-3">
          {/* Real-time System Telemetry Badge */}
          <div className="bg-slate-50 rounded-lg p-2 border border-slate-200 text-[11px] font-mono space-y-1">
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Engine Online
              </span>
              <span className="text-blue-600 font-bold">16/16 Models</span>
            </div>
            <div className="flex items-center justify-between text-slate-500 text-[10px]">
              <span>Air-Gap License</span>
              <span className="text-emerald-600 font-semibold">VALID (365d)</span>
            </div>
          </div>

          {/* User Avatar & Profile Navigation */}
          <div className="flex items-center justify-between px-1 pt-1 bg-slate-50 hover:bg-blue-50/60 p-2 rounded-xl border border-slate-200/80 transition-all group">
            <Link href={`/${userId}/modliq-console/profile`} className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#2B70AB] text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="text-left leading-tight truncate">
                <p className="text-xs font-bold text-slate-800 truncate group-hover:text-[#2B70AB] transition-colors">{user?.name || 'Engineer'}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 font-mono font-bold uppercase">
                    {(user as any)?.role || 'USER'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono hover:underline">View Profile</span>
                </div>
              </div>
            </Link>
            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white transition-colors border border-transparent hover:border-slate-200"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Body */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        {/* Top Floating App Bar */}
        <header className="h-14 border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-mono">Modliq Console</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
              {pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Cmd+K search hint */}
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
                window.dispatchEvent(event);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-colors font-mono"
            >
              <Search size={14} className="text-blue-600" />
              <span>Search platform...</span>
              <kbd className="px-1.5 py-0.5 bg-white rounded text-[10px] text-slate-500 border border-slate-200 shadow-xs">
                ⌘K
              </kbd>
            </button>
          </div>
        </header>

        {/* Main View Area */}
        <main className="flex-1 p-6 overflow-x-hidden bg-[#F8FAFC]">
          {children}
        </main>
      </div>

      {/* AI Copilot Drawer & User Profile Onboarding Popup */}
      <AiCopilotDrawer />
      <UserProfileModal />
    </div>
  );
}

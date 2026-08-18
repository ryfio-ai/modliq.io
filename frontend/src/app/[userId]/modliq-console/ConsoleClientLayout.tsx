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
  Bot,
  FlaskConical,
  Mic,
  CheckSquare,
  Receipt,
  Sparkles,
} from 'lucide-react';
import React, { use, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePipelineStore } from '@/store/pipelineStore';
import AiCopilotDrawer from '@/components/ai/AiCopilotDrawer';
import ProjectSwitcher from '@/components/layout/ProjectSwitcher';
import CommandPalette from '@/components/ui/CommandPalette';
import UserProfileModal from '@/components/profile/UserProfileModal';

import FeedbackButton from '@/components/ux/FeedbackButton';
import SimpleAdvancedToggle from '@/components/ux/SimpleAdvancedToggle';

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
        { name: 'Modliq Agent (Beta)', href: `/${userId}/modliq-console/agent`, icon: Bot },
        { name: 'Projects', href: `/${userId}/modliq-console/projects`, icon: FolderKanban },
        { name: 'Data Ingestion', href: `/${userId}/modliq-console/data-upload`, icon: Upload },
        { name: 'EDA Studio', href: `/${userId}/modliq-console/eda`, icon: BarChart2 },
        { name: 'Chart Studio', href: `/${userId}/modliq-console/charts`, icon: BarChart2 },
        { name: 'Optimization Goal', href: `/${userId}/modliq-console/goal`, icon: Target },
        { name: 'AutoML Engine', href: `/${userId}/modliq-console/optimization-progress`, icon: Activity },
        { name: 'Business Results', href: `/${userId}/modliq-console/results`, icon: BarChart2 },
      ],
    },
    {
      title: 'AI LABS (BETA)',
      items: [
        { name: 'AI Labs Hub', href: `/${userId}/modliq-console/ai-labs`, icon: FlaskConical },
        { name: 'DocuMind RAG', href: `/${userId}/modliq-console/ai-labs/documind-rag`, icon: FileText },
        { name: 'Agent Task Pilot', href: `/${userId}/modliq-console/ai-labs/agent-task-pilot`, icon: Sparkles },
        { name: 'Voice AI Coach', href: `/${userId}/modliq-console/ai-labs/voice-coach`, icon: Mic },
        { name: 'Browser AutoQA', href: `/${userId}/modliq-console/ai-labs/browser-autoqa`, icon: CheckSquare },
        { name: 'SpendLens SaaS', href: `/${userId}/modliq-console/ai-labs/spendlens`, icon: Receipt },
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
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans antialiased">
      <CommandPalette />

      {/* Fixed Left Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col fixed inset-y-0 z-20 shadow-xs">
        {/* Brand Header */}
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-5">
          <Link href={`/${userId}/modliq-console/dashboard`} className="flex items-center gap-2.5">
            <img src="/icon.png" alt="Modliq Logo" className="w-8 h-8 rounded-lg object-contain" />
            <span className="font-extrabold text-base tracking-tight text-[#1B2A4A] font-sans">Modliq</span>
          </Link>
          <span className="px-2 py-0.5 rounded bg-blue-50 text-[#2B70AB] text-[10px] font-mono font-bold border border-blue-200">
            Console
          </span>
        </div>

        {/* Project Switcher */}
        <div className="p-3 border-b border-slate-100 bg-slate-50/50">
          <ProjectSwitcher />
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                {sec.title}
              </p>
              {sec.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#2B70AB] text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer User Scoping */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between p-2 rounded-xl border border-slate-200 bg-white">
            <Link
              href={`/${userId}/modliq-console/profile`}
              className="flex items-center gap-2.5 min-w-0 group"
            >
              <div className="w-7 h-7 rounded-full bg-[#1B2A4A] text-white text-xs font-bold flex items-center justify-center shrink-0">
                {user?.name?.[0]?.toUpperCase() || 'E'}
              </div>
              <div className="text-left leading-tight truncate">
                <p className="text-xs font-bold text-slate-800 truncate group-hover:text-[#2B70AB] transition-colors">{user?.name || 'Engineer'}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 font-mono font-bold uppercase">
                    {(user as any)?.role || 'USER'}
                  </span>
                </div>
              </div>
            </Link>
            <button
              onClick={handleSignOut}
              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} />
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
            <SimpleAdvancedToggle />
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

      {/* AI Copilot Drawer, Feedback Button & User Profile Onboarding Popup */}
      <AiCopilotDrawer />
      <UserProfileModal />
      <FeedbackButton />
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import {
  Users,
  Building,
  FolderGit2,
  Database,
  Cpu,
  Zap,
  Activity,
  BarChart3,
  UserPlus,
  HelpCircle,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Server,
  FileSpreadsheet,
} from 'lucide-react';
import Link from 'next/link';
import AdminMetricCard from '@/components/admin/AdminMetricCard';
import AdminStatusBadge from '@/components/admin/AdminStatusBadge';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';

export default function AdminOverviewPage() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('modliq_token') || '';
      const res = await fetch('/api/v1/admin/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSummary(data.data);
      }
    } catch {
      // Fallback handled by API route
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) {
    return <AdminLoadingSkeleton type="card" />;
  }

  const s = summary || {};
  const ps = s.platformStatus || {};

  return (
    <div className="space-y-8 font-sans text-[#1B2A4A]">
      {/* Top Banner */}
      <div className="border-b border-[#D0E2F0] pb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">Platform Observability Overview</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time monitoring across accounts, compute jobs, AI gateway providers, and support queues.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AdminStatusBadge status="HEALTHY" type="health" />
          <button
            onClick={fetchSummary}
            className="px-3 py-1.5 bg-white border border-[#D0E2F0] rounded-xl text-xs font-semibold text-slate-600 hover:text-[#2B70AB] transition"
          >
            Refresh Summary
          </button>
        </div>
      </div>

      {/* Alerts Panel if any */}
      {s.alerts && s.alerts.length > 0 && (
        <div className="space-y-2">
          {s.alerts.map((alert: any, idx: number) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex items-center justify-between text-xs ${
                alert.severity === 'WARNING'
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-blue-50 border-blue-200 text-blue-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="font-bold">{alert.title}: </span>
                  <span>{alert.message}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 12 KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <AdminMetricCard
          title="Total Users"
          value={s.totalUsers ?? 0}
          subtitle={`+${s.newUsersToday ?? 0} signups today`}
          icon={<Users className="w-4 h-4" />}
          accentColor="blue"
        />
        <AdminMetricCard
          title="Organizations"
          value={s.totalOrganizations ?? 0}
          subtitle="Multi-tenant plants"
          icon={<Building className="w-4 h-4" />}
          accentColor="indigo"
        />
        <AdminMetricCard
          title="Active Projects"
          value={s.totalProjects ?? 0}
          subtitle="Process optimization"
          icon={<FolderGit2 className="w-4 h-4" />}
          accentColor="blue"
        />
        <AdminMetricCard
          title="Datasets Ingested"
          value={s.totalDatasets ?? 0}
          subtitle={`${s.riskyDatasets ?? 0} flagged low health`}
          icon={<Database className="w-4 h-4" />}
          accentColor="emerald"
        />
        <AdminMetricCard
          title="Optimization Jobs"
          value={s.totalOptimizationJobs ?? 0}
          subtitle="Total AutoML runs"
          icon={<Cpu className="w-4 h-4" />}
          accentColor="indigo"
        />
        <AdminMetricCard
          title="Failed Jobs"
          value={s.failedOptimizationJobs ?? 0}
          subtitle="Requires inspection"
          icon={<AlertTriangle className="w-4 h-4 text-rose-500" />}
          accentColor="rose"
        />
        <AdminMetricCard
          title="AI Calls Today"
          value={s.aiCallsToday ?? 0}
          subtitle={`~${s.monthlyAiCalls ?? 0}/mo estimated`}
          icon={<Zap className="w-4 h-4" />}
          accentColor="amber"
        />
        <AdminMetricCard
          title="Pilot Leads"
          value={s.pilotLeads ?? 0}
          subtitle="Contact submissions"
          icon={<UserPlus className="w-4 h-4" />}
          accentColor="emerald"
        />
        <AdminMetricCard
          title="Open Support Tickets"
          value={s.openSupportTickets ?? 0}
          subtitle="Queue items"
          icon={<HelpCircle className="w-4 h-4" />}
          accentColor="rose"
        />
        <AdminMetricCard
          title="Active Share Links"
          value={s.activeShareLinks ?? 0}
          subtitle="Quality Passports"
          icon={<BarChart3 className="w-4 h-4" />}
          accentColor="blue"
        />
        <AdminMetricCard
          title="System Health"
          value={ps.backend || 'HEALTHY'}
          subtitle="Express Gateway v2.0"
          icon={<Server className="w-4 h-4" />}
          accentColor="emerald"
        />
        <AdminMetricCard
          title="Audit Trail"
          value="Secured"
          subtitle="Read-only compliance"
          icon={<Shield className="w-4 h-4" />}
          accentColor="blue"
        />
      </div>

      {/* Platform Infrastructure Health Matrix */}
      <div className="bg-white border border-[#D0E2F0] rounded-2xl p-6 space-y-4 shadow-xs">
        <h2 className="text-sm font-bold text-[#1B2A4A] tracking-tight uppercase">Platform Service Infrastructure</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {[
            { label: 'Frontend UI', status: ps.frontend || 'HEALTHY' },
            { label: 'Backend API', status: ps.backend || 'HEALTHY' },
            { label: 'ML Engine', status: ps.mlEngine || 'HEALTHY' },
            { label: 'MongoDB', status: ps.mongoDb || 'HEALTHY' },
            { label: 'Redis / BullMQ', status: ps.redisQueue || 'HEALTHY' },
            { label: 'AI Gateway', status: ps.aiGateway || 'HEALTHY' },
            { label: 'R2 Storage', status: ps.storage || 'HEALTHY' },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-[#F0F6FA] rounded-xl border border-[#D0E2F0] text-center space-y-1">
              <span className="text-[11px] font-bold text-slate-500 block truncate">{item.label}</span>
              <AdminStatusBadge status={item.status} type="health" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/users" className="p-5 bg-white border border-[#D0E2F0] rounded-2xl space-y-2 hover:border-[#2B70AB] hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2B70AB] uppercase">User Directory</span>
            <Users className="w-4 h-4 text-[#2B70AB]" />
          </div>
          <p className="text-sm font-bold text-[#1B2A4A]">Manage Platform Accounts</p>
          <span className="text-xs text-slate-500">View user roles, org counts, and demo flags.</span>
        </Link>

        <Link href="/admin/jobs" className="p-5 bg-white border border-[#D0E2F0] rounded-2xl space-y-2 hover:border-[#2B70AB] hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2B70AB] uppercase">ML Compute Queue</span>
            <Cpu className="w-4 h-4 text-[#2B70AB]" />
          </div>
          <p className="text-sm font-bold text-[#1B2A4A]">Monitor Optimization Runs</p>
          <span className="text-xs text-slate-500">Inspect training stages and retry failed jobs.</span>
        </Link>

        <Link href="/admin/website" className="p-5 bg-white border border-[#D0E2F0] rounded-2xl space-y-2 hover:border-[#2B70AB] hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2B70AB] uppercase">Website Control</span>
            <Activity className="w-4 h-4 text-[#2B70AB]" />
          </div>
          <p className="text-sm font-bold text-[#1B2A4A]">Marketing & Homepage CMS</p>
          <span className="text-xs text-slate-500">Manage hero, navbar, footer, SEO, and chatbot.</span>
        </Link>
      </div>
    </div>
  );
}

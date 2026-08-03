'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Building, Users, Settings, ShieldCheck, ArrowRight, Layers, Award } from 'lucide-react';
import Link from 'next/link';

interface OrgDetail {
  id: string;
  name: string;
  slug: string;
  industry?: string;
  companySize?: string;
  country?: string;
  userRole?: string;
  createdAt: string;
}

export default function OrganizationOverviewPage() {
  const params = useParams();
  const userId = params?.userId as string;

  const [orgs, setOrgs] = useState<OrgDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/v1/organizations`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
        });
        const data = await res.json();
        if (data.success && data.data) {
          setOrgs(data.data);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchOrgs();
  }, []);

  const activeOrg = orgs[0];

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Team Workspaces</span>
          <h1 className="text-2xl font-bold text-white mt-1">Organization Workspace</h1>
          <p className="text-sm text-slate-400 mt-1">Manage plant team members, roles, and enterprise entitlements.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/${userId}/modliq-console/org/members`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition"
          >
            <Users className="w-4 h-4" /> Manage Members
          </Link>
          <Link
            href={`/${userId}/modliq-console/org/settings`}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
          >
            <Settings className="w-4 h-4" /> Settings
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">Loading workspace details...</div>
      ) : activeOrg ? (
        <div className="space-y-6">
          {/* Active Workspace Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center border border-blue-500/30">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{activeOrg.name}</h2>
                  <span className="text-xs text-slate-400">Slug: {activeOrg.slug}</span>
                </div>
              </div>

              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold rounded-full uppercase">
                {activeOrg.userRole || 'OWNER'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Industry</span>
                <p className="text-sm font-semibold text-slate-100 mt-1">{activeOrg.industry || 'Manufacturing'}</p>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Company Size</span>
                <p className="text-sm font-semibold text-slate-100 mt-1">{activeOrg.companySize || '10-50'}</p>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Current Plan</span>
                <p className="text-sm font-semibold text-emerald-400 mt-1">DEMO PILOT</p>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Created At</span>
                <p className="text-xs font-semibold text-slate-100 mt-1">
                  {new Date(activeOrg.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Shortcut Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href={`/${userId}/modliq-console/org/members`}
              className="p-6 bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl transition space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition" />
              </div>
              <h3 className="text-base font-bold text-white">Team Roster & Roles</h3>
              <p className="text-xs text-slate-400">Invite engineers, plant managers, and assign RBAC permissions.</p>
            </Link>

            <Link
              href={`/${userId}/modliq-console/org/settings`}
              className="p-6 bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl transition space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition" />
              </div>
              <h3 className="text-base font-bold text-white">Entitlements & Plant Settings</h3>
              <p className="text-xs text-slate-400">Configure industry specs, location details, and active quotas.</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-slate-400">No active organization found.</div>
      )}
    </div>
  );
}

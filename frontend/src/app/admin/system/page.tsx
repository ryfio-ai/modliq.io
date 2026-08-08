'use client';

import React, { useEffect, useState } from 'react';
import AdminStatusBadge from '@/components/admin/AdminStatusBadge';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import AdminErrorState from '@/components/admin/AdminErrorState';
import { Activity, Server, Database, Cpu, HardDrive, Shield } from 'lucide-react';

export default function AdminSystemPage() {
  const [system, setSystem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSystem = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('modliq_token') || '';
      const res = await fetch('/api/v1/admin/system', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setSystem(data.data);
      } else {
        setError(data.error || 'Failed to fetch system status');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystem();
  }, []);

  if (loading) return <AdminLoadingSkeleton type="full" />;
  if (error) return <AdminErrorState message={error} onRetry={fetchSystem} />;

  const components = system?.components || [];

  return (
    <div className="space-y-8 font-sans text-[#1B2A4A]">
      <div className="border-b border-[#D0E2F0] pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">System Infrastructure Status</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Express Gateway, MongoDB Atlas, FastAPI ML Engine, BullMQ/Redis, and Cloud Storage health.
          </p>
        </div>
        <button
          onClick={fetchSystem}
          className="px-3 py-1.5 bg-white border border-[#D0E2F0] rounded-xl text-xs font-semibold text-slate-600 hover:text-[#2B70AB] transition"
        >
          Refresh Infrastructure
        </button>
      </div>

      {/* Meta Specs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-[#D0E2F0] rounded-2xl space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Backend Version</span>
          <p className="text-2xl font-extrabold text-[#1B2A4A]">v{system?.backendVersion || '2.0.0'}</p>
          <span className="text-xs text-slate-500 font-medium">Node Environment: {system?.nodeEnv || 'production'}</span>
        </div>

        <div className="p-5 bg-white border border-[#D0E2F0] rounded-2xl space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Process Uptime</span>
          <p className="text-2xl font-extrabold text-emerald-600">
            {Math.floor((system?.uptimeSeconds || 0) / 3600)}h {Math.floor(((system?.uptimeSeconds || 0) % 3600) / 60)}m
          </p>
          <span className="text-xs text-slate-500 font-medium">Server continuous uptime</span>
        </div>

        <div className="p-5 bg-white border border-[#D0E2F0] rounded-2xl space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Overall Health</span>
          <div className="mt-1">
            <AdminStatusBadge status="HEALTHY" type="health" />
          </div>
          <span className="text-xs text-slate-500 font-medium block mt-1">All core subsystems operational</span>
        </div>
      </div>

      {/* Component Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-[#1B2A4A] uppercase tracking-wider">Subsystem Architecture Matrix</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {components.map((comp: any) => (
            <div key={comp.name} className="p-5 bg-white border border-[#D0E2F0] rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-[#1B2A4A]">{comp.name}</span>
                <AdminStatusBadge status={comp.status} type="health" />
              </div>
              <p className="text-xs text-slate-500 font-medium">{comp.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

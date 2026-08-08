'use client';

import React, { useEffect, useState } from 'react';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import AdminErrorState from '@/components/admin/AdminErrorState';
import { Settings, Save, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('modliq_token') || '';
      const res = await fetch('/api/v1/admin/settings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(data.data);
      } else {
        setError(data.error || 'Failed to fetch platform settings');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('modliq_token') || '';
      const res = await fetch('/api/v1/admin/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        alert('Platform settings updated & audit logged successfully!');
        fetchSettings();
      }
    } catch {
      alert('Failed to update platform settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoadingSkeleton type="full" />;
  if (error) return <AdminErrorState message={error} onRetry={fetchSettings} />;

  return (
    <div className="space-y-8 font-sans text-[#1B2A4A]">
      <div className="border-b border-[#D0E2F0] pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">Platform Global Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure system quotas, feature flags, free pilot limits, and maintenance modes.
          </p>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="px-5 py-2.5 bg-[#2B70AB] text-white font-bold rounded-xl text-xs hover:bg-[#1B2A4A] transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Platform Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feature Flags & Pilot Limits */}
        <div className="bg-white border border-[#D0E2F0] rounded-2xl p-6 space-y-5 shadow-xs">
          <h2 className="text-sm font-bold text-[#1B2A4A] uppercase tracking-wider">Pilot Program & Quotas</h2>

          <div className="flex items-center justify-between p-3.5 bg-[#F0F6FA] rounded-xl border border-[#D0E2F0]">
            <div>
              <span className="text-xs font-bold text-[#1B2A4A] block">Free Pilot Lead Capture</span>
              <span className="text-[10px] text-slate-500">Allow users to apply for free 30-day pilot</span>
            </div>
            <input
              type="checkbox"
              checked={Boolean(settings?.freePilotEnabled)}
              onChange={(e) => setSettings({ ...settings, freePilotEnabled: e.target.checked })}
              className="w-4 h-4 text-[#2B70AB] rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Free Pilot Slots Limit</label>
            <input
              type="number"
              value={settings?.freePilotSlotsLimit ?? 50}
              onChange={(e) => setSettings({ ...settings, freePilotSlotsLimit: parseInt(e.target.value) || 0 })}
              className="w-full p-2.5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-bold focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#F0F6FA] rounded-xl border border-[#D0E2F0]">
            <div>
              <span className="text-xs font-bold text-[#1B2A4A] block">AI Features Enabled</span>
              <span className="text-[10px] text-slate-500">Enable multi-provider AI gateway processing</span>
            </div>
            <input
              type="checkbox"
              checked={Boolean(settings?.aiFeaturesEnabled)}
              onChange={(e) => setSettings({ ...settings, aiFeaturesEnabled: e.target.checked })}
              className="w-4 h-4 text-[#2B70AB] rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Quotas & Ingestion Limits */}
        <div className="bg-white border border-[#D0E2F0] rounded-2xl p-6 space-y-5 shadow-xs">
          <h2 className="text-sm font-bold text-[#1B2A4A] uppercase tracking-wider">Ingestion & Support Settings</h2>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Max Upload Size (MB)</label>
            <input
              type="number"
              value={settings?.uploadMaxMb ?? 100}
              onChange={(e) => setSettings({ ...settings, uploadMaxMb: parseInt(e.target.value) || 100 })}
              className="w-full p-2.5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Max Import Rows</label>
            <input
              type="number"
              value={settings?.importMaxRows ?? 500000}
              onChange={(e) => setSettings({ ...settings, importMaxRows: parseInt(e.target.value) || 500000 })}
              className="w-full p-2.5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Support Contact Email</label>
            <input
              type="email"
              value={settings?.supportEmail || 'support@modliq.io'}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              className="w-full p-2.5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-bold focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 bg-rose-50 rounded-xl border border-rose-200">
            <div>
              <span className="text-xs font-bold text-rose-900 block">Maintenance Mode</span>
              <span className="text-[10px] text-rose-700">Restrict non-admin user access for upgrades</span>
            </div>
            <input
              type="checkbox"
              checked={Boolean(settings?.maintenanceMode)}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              className="w-4 h-4 text-rose-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

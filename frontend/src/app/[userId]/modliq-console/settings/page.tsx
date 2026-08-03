'use client';

import React, { useEffect, useState, use } from 'react';
import {
  Settings,
  Check,
  Target,
  Truck,
  Factory,
  Zap,
  Save,
  Loader2,
  Lock,
  Shield,
  Key,
  Users,
  FileCheck2,
  Building,
  CheckCircle2,
} from 'lucide-react';
import AiProviderStatus from '@/components/ai/AiProviderStatus';
import { apiFetch } from '@/lib/apiFetch';

interface ModuleOption {
  id: string;
  title: string;
  description: string;
  icon: any;
}

const MODULE_OPTIONS: ModuleOption[] = [
  {
    id: 'optimization',
    title: 'Core Optimization & Quality',
    description: 'Upload datasets, define yield targets, run ML model optimization, and analyze Quality Studio SPC charts.',
    icon: Target,
  },
  {
    id: 'supply_chain',
    title: 'Supply Chain & Material Tracking',
    description: 'Track suppliers, material lots, defect rates, and incoming material quality metrics.',
    icon: Truck,
  },
  {
    id: 'operations',
    title: 'Operations & OEE Tracking',
    description: 'Monitor OEE, machine availability, downtime logs, and shift performance metrics.',
    icon: Factory,
  },
  {
    id: 'lean',
    title: 'Lean & Kaizen Tracking',
    description: 'Log lean waste events, track Kaizen continuous improvement actions, and 5S workplace audits.',
    icon: Zap,
  },
];

const AUDIT_LOGS = [
  { id: 'evt-901', user: 'sathish@qeltrava.ai', action: 'MODEL_PROMOTED_PRODUCTION', details: 'Promoted Extrusion_Thickness_v2.1 to Munich Line 4', timestamp: '2026-07-27 14:22:04' },
  { id: 'evt-902', user: 'plant_lead@siemens.com', action: 'SOP_EXPORTED', details: 'Generated ISO 9001 SOP for Line 4 Extruder', timestamp: '2026-07-27 12:10:15' },
  { id: 'evt-903', user: 'quality_auditor@bmw.de', action: 'SPC_REPORT_DOWNLOADED', details: 'Downloaded Cpk capability report for Batch 402', timestamp: '2026-07-26 18:45:30' },
];

export default function SettingsPage({ params }: { params: Promise<{ userId: string }> }) {
  const resolvedParams = use(params);
  const userId = resolvedParams.userId;

  const [activeTab, setActiveTab] = useState<'modules' | 'sso' | 'rbac' | 'audit'>('modules');
  const [selectedModules, setSelectedModules] = useState<string[]>(['optimization']);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadPreferences() {
      try {
        setLoading(true);
        const res = await apiFetch('/api/v1/user/preferences/modules');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.enabledModules)) {
            setSelectedModules(data.enabledModules);
          }
        }
      } catch (err) {
        console.error('Failed to load module preferences:', err);
      } fontFinally: {
        setLoading(false);
      }
    }
    loadPreferences();
  }, [userId]);

  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      if (selectedModules.length <= 1) return;
      setSelectedModules(selectedModules.filter((m) => m !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaved(false);
      const res = await apiFetch('/api/v1/user/preferences/modules', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabledModules: selectedModules }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setSaved(true);
          setTimeout(() => setSaved(false), 3000);
        }
      }
    } catch (err) {
      console.error('Failed to save preferences:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-sans text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <Settings className="w-4 h-4" />
            <span>Platform Governance & Security</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Enterprise Settings & Compliance Console
          </h1>
          <p className="text-sm text-slate-400">
            Configure workspace modules, SAML 2.0 Single Sign-On, RBAC permission roles, and W3C audit logs.
          </p>
        </div>

        {activeTab === 'modules' && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-xs font-mono flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving...' : saved ? 'Saved!' : 'Save Preferences'}</span>
          </button>
        )}
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center space-x-2 border-b border-white/10 font-mono text-xs">
        <button
          onClick={() => setActiveTab('modules')}
          className={`px-4 py-2.5 border-b-2 font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'modules'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Workspace Modules</span>
        </button>

        <button
          onClick={() => setActiveTab('sso')}
          className={`px-4 py-2.5 border-b-2 font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'sso'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>SAML 2.0 / Okta SSO</span>
        </button>

        <button
          onClick={() => setActiveTab('rbac')}
          className={`px-4 py-2.5 border-b-2 font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'rbac'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>RBAC Role Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 border-b-2 font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'audit'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Immutable Audit Log</span>
        </button>
      </div>

      {/* Tab 1: Workspace Modules */}
      {activeTab === 'modules' && (
        <div className="space-y-6">
          <AiProviderStatus />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MODULE_OPTIONS.map((module) => {
              const Icon = module.icon;
              const isSelected = selectedModules.includes(module.id);
              return (
                <div
                  key={module.id}
                  onClick={() => toggleModule(module.id)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/40 shadow-lg shadow-cyan-950/20'
                      : 'bg-slate-900/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-white text-sm">{module.title}</h3>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-600'}`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">{module.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: SAML 2.0 / Okta SSO */}
      {activeTab === 'sso' && (
        <div className="p-6 rounded-xl border border-white/10 bg-[#0F172A] space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-cyan-400 font-bold block uppercase">Enterprise Authentication</span>
              <h3 className="text-lg font-bold text-white mt-1">SAML 2.0 / OIDC Identity Provider Configuration</h3>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              SOC2 Type II Ready
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-slate-400 block mb-1">Identity Provider Entity ID (Metadata URL):</label>
              <input
                type="text"
                readOnly
                value="https://idp.okta.com/app/exk40291/sso/saml"
                className="w-full p-3 rounded-lg bg-slate-950 border border-white/10 text-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Modliq SAML ACS Consumer URL:</label>
              <input
                type="text"
                readOnly
                value="https://modliq.ai/api/auth/saml/callback"
                className="w-full p-3 rounded-lg bg-slate-950 border border-white/10 text-cyan-300 font-bold"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: RBAC Role Matrix */}
      {activeTab === 'rbac' && (
        <div className="p-6 rounded-xl border border-white/10 bg-[#0F172A] space-y-4 font-mono text-xs">
          <div className="pb-3 border-b border-white/10">
            <span className="text-cyan-400 font-bold block uppercase">Access Control Matrix</span>
            <h3 className="text-lg font-bold text-white mt-1">Granular Role-Based Permissions</h3>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3">Role</th>
                <th className="pb-3">Dataset Upload</th>
                <th className="pb-3">AutoML Training</th>
                <th className="pb-3">Model Promotion</th>
                <th className="pb-3">SOP Generation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              <tr>
                <td className="py-3 font-bold text-cyan-300">Organization Admin</td>
                <td className="py-3 text-emerald-400">Full Access</td>
                <td className="py-3 text-emerald-400">Full Access</td>
                <td className="py-3 text-emerald-400">Approve & Deploy</td>
                <td className="py-3 text-emerald-400">Full Access</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-200">Process Engineer</td>
                <td className="py-3 text-emerald-400">Full Access</td>
                <td className="py-3 text-emerald-400">Full Access</td>
                <td className="py-3 text-amber-400">Request Only</td>
                <td className="py-3 text-emerald-400">Full Access</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-400">Plant Operator</td>
                <td className="py-3 text-slate-500">Read Only</td>
                <td className="py-3 text-slate-500">No Access</td>
                <td className="py-3 text-slate-500">No Access</td>
                <td className="py-3 text-emerald-400">View Checklists</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Immutable Audit Log */}
      {activeTab === 'audit' && (
        <div className="p-6 rounded-xl border border-white/10 bg-[#0F172A] space-y-4 font-mono text-xs">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <span className="text-cyan-400 font-bold block uppercase">Immutable Compliance Trail</span>
              <h3 className="text-lg font-bold text-white mt-1">W3C Provenance Audit Logs</h3>
            </div>
            <span className="text-emerald-400 font-bold flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1" /> Append-Only Log Active
            </span>
          </div>

          <div className="space-y-2">
            {AUDIT_LOGS.map((log) => (
              <div key={log.id} className="p-3 rounded-lg bg-slate-950 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-bold text-cyan-300 block">{log.action}</span>
                  <span className="text-slate-400 text-[11px]">{log.details} • User: {log.user}</span>
                </div>
                <span className="text-slate-500 text-[11px]">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  Key,
  ShieldCheck,
  Users,
  CheckCircle2,
  Lock,
  Globe,
  Plus,
  Trash2,
  Zap,
} from "lucide-react";

interface RolePermission {
  role: string;
  usersCount: number;
  permissions: {
    modelDeploy: boolean;
    setpointOverride: boolean;
    sopExport: boolean;
    auditRead: boolean;
    iotWrite: boolean;
  };
}

const INITIAL_ROLES: RolePermission[] = [
  {
    role: "ADMIN",
    usersCount: 3,
    permissions: { modelDeploy: true, setpointOverride: true, sopExport: true, auditRead: true, iotWrite: true },
  },
  {
    role: "PROCESS_ENGINEER",
    usersCount: 12,
    permissions: { modelDeploy: true, setpointOverride: true, sopExport: true, auditRead: true, iotWrite: false },
  },
  {
    role: "OPERATOR",
    usersCount: 45,
    permissions: { modelDeploy: false, setpointOverride: false, sopExport: true, auditRead: false, iotWrite: false },
  },
  {
    role: "AUDITOR",
    usersCount: 4,
    permissions: { modelDeploy: false, setpointOverride: false, sopExport: true, auditRead: true, iotWrite: false },
  },
];

export default function AccessControlPage() {
  const [ssoProvider, setSsoProvider] = useState<"okta" | "azure" | "ping">("okta");
  const [ssoEnabled, setSsoEnabled] = useState(true);
  const [roles, setRoles] = useState<RolePermission[]>(INITIAL_ROLES);

  const togglePermission = (roleIndex: number, permKey: keyof RolePermission["permissions"]) => {
    setRoles((prev) =>
      prev.map((r, i) => {
        if (i === roleIndex) {
          return {
            ...r,
            permissions: {
              ...r.permissions,
              [permKey]: !r.permissions[permKey],
            },
          };
        }
        return r;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Key className="text-cyan-400" size={24} />
            Enterprise SSO & Granular RBAC Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            SAML 2.0 / OIDC identity federation and fine-grained Role-Based Access Control permissions matrix.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1.5">
            <CheckCircle2 size={14} /> SSO ACTIVE (SAML 2.0)
          </span>
        </div>
      </div>

      {/* SSO Configuration Card */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Identity Provider (IdP) SSO Configuration</h3>
          </div>
          <button
            onClick={() => setSsoEnabled(!ssoEnabled)}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
              ssoEnabled
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                : "bg-slate-800 text-slate-400 border-slate-700"
            }`}
          >
            {ssoEnabled ? "SSO ENFORCED" : "PASSWORD FALLBACK"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {[
            { id: "okta", name: "Okta Enterprise SAML", domain: "dev-modliq.okta.com" },
            { id: "azure", name: "Microsoft Azure AD (OIDC)", domain: "login.microsoftonline.com" },
            { id: "ping", name: "Ping Identity Federated", domain: "auth.pingidentity.com" },
          ].map((idp) => (
            <div
              key={idp.id}
              onClick={() => setSsoProvider(idp.id as any)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                ssoProvider === idp.id
                  ? "bg-cyan-500/10 border-cyan-500/50 shadow-md shadow-cyan-950/30"
                  : "bg-slate-900 border-slate-800 hover:border-slate-700"
              }`}
            >
              <span className="font-bold text-slate-100 block">{idp.name}</span>
              <span className="text-[10px] text-slate-400 mt-1 block truncate">{idp.domain}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RBAC Permission Matrix Table */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Granular Role-Based Access Control Matrix</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900 text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Active Users</th>
                <th className="px-4 py-3">Deploy Models</th>
                <th className="px-4 py-3">Override Setpoints</th>
                <th className="px-4 py-3">Export SOP</th>
                <th className="px-4 py-3">Read Audit Logs</th>
                <th className="px-4 py-3">Write IoT Commands</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {roles.map((r, roleIdx) => (
                <tr key={r.role} className="hover:bg-slate-900/60">
                  <td className="px-4 py-3 font-bold text-white">{r.role}</td>
                  <td className="px-4 py-3 text-slate-400">{r.usersCount} users</td>
                  {(["modelDeploy", "setpointOverride", "sopExport", "auditRead", "iotWrite"] as const).map((permKey) => (
                    <td key={permKey} className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={r.permissions[permKey]}
                        onChange={() => togglePermission(roleIdx, permKey)}
                        className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

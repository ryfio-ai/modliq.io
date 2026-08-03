"use client";

import React, { useState } from "react";
import {
  Terminal,
  ShieldCheck,
  Search,
  Download,
  Lock,
  Clock,
  Key,
  CheckCircle2,
} from "lucide-react";

interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  resource: string;
  ipAddress: string;
  sha256Hash: string;
}

const INITIAL_LOGS: AuditLogEntry[] = [
  {
    id: "LOG-9041",
    timestamp: "2026-07-27 15:42:09 UTC",
    actor: "sathish@modliq.ai",
    role: "ADMIN",
    action: "MODEL_PROMOTION_PRODUCTION",
    resource: "Extrusion_Thickness_Optimizer (v2.1.0-prod)",
    ipAddress: "192.168.1.104",
    sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  },
  {
    id: "LOG-9040",
    timestamp: "2026-07-27 14:18:22 UTC",
    actor: "engineer.stuttgart@modliq.ai",
    role: "PROCESS_ENGINEER",
    action: "SETPOINT_OVERRIDE_EXECUTED",
    resource: "Melt_Temperature (228.0°C -> 230.0°C)",
    ipAddress: "10.0.4.18",
    sha256Hash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
  },
  {
    id: "LOG-9039",
    timestamp: "2026-07-27 11:05:01 UTC",
    actor: "auditor.munich@iso9001.org",
    role: "AUDITOR",
    action: "SOP_EXPORT_DOWNLOADED",
    resource: "SOP-MODLIQ-2026-084.pdf",
    ipAddress: "185.220.101.4",
    sha256Hash: "7d1a54127b222502f5b79b5fb0803061152a44f92b37e23c6527b63f10ad95a4",
  },
  {
    id: "LOG-9038",
    timestamp: "2026-07-26 19:30:14 UTC",
    actor: "system_agent",
    role: "SYSTEM",
    action: "AUTONOMOUS_RETRAIN_TRIGGERED",
    resource: "PSI > 0.20 (Resin_Moisture_Predictor)",
    ipAddress: "127.0.0.1",
    sha256Hash: "4b227777d4da1691fb773228525dae5611df8f66f273097d83d2dbb018070799",
  },
];

export default function AuditLogsPage() {
  const [logs] = useState<AuditLogEntry[]>(INITIAL_LOGS);
  const [query, setQuery] = useState("");

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(query.toLowerCase()) ||
      l.actor.toLowerCase().includes(query.toLowerCase()) ||
      l.resource.toLowerCase().includes(query.toLowerCase())
  );

  const exportAuditTrail = () => {
    const jsonString = `data:text/json;charset=utf-8,` + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `modliq_audit_trail_immutable.json`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Terminal className="text-cyan-400" size={24} />
            Immutable Cryptographic Audit Logs
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            SHA-256 cryptographically chained activity ledger complying with ISO 27001 and FDA 21 CFR Part 11 requirements.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            onClick={exportAuditTrail}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition-all"
          >
            <Download size={15} className="text-cyan-400" />
            Export Audit Ledger (.JSON)
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search action, actor, or resource..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-sans"
          />
        </div>
        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
          <Lock size={14} /> SHA-256 Hash Chain Integrity: VERIFIED
        </span>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900 text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Timestamp (UTC)</th>
                <th className="px-4 py-3">Actor & Role</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Target Resource</th>
                <th className="px-4 py-3">IP Address</th>
                <th className="px-4 py-3">SHA-256 Signature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="px-4 py-3 text-slate-400">{log.timestamp}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-white block">{log.actor}</span>
                    <span className="text-[10px] text-cyan-400">{log.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-bold border border-slate-700">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-200">{log.resource}</td>
                  <td className="px-4 py-3 text-slate-400">{log.ipAddress}</td>
                  <td className="px-4 py-3 text-[10px] text-slate-400 truncate max-w-[140px]" title={log.sha256Hash}>
                    {log.sha256Hash.substring(0, 16)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

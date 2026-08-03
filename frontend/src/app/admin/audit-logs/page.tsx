'use client';

import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

interface AuditItem {
  id: string;
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadataJson?: string;
  createdAt: string;
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/v1/admin/audit-logs`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
        });
        const resp = await res.json();
        if (resp.success && resp.data) {
          setLogs(resp.data);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-bold text-white">Compliance Audit Trail</h1>
        <p className="text-sm text-slate-400 mt-1">Immutable security log of user actions, role changes, and data exports.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading audit trails...</div>
        ) : (
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-4">Action</th>
                <th className="p-4">Entity Type</th>
                <th className="p-4">User ID</th>
                <th className="p-4">Entity ID</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-mono font-bold text-purple-400">{log.action}</td>
                  <td className="p-4 uppercase text-slate-400">{log.entityType}</td>
                  <td className="p-4">{log.userId || 'System'}</td>
                  <td className="p-4 font-mono text-slate-500">{log.entityId || 'N/A'}</td>
                  <td className="p-4">{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

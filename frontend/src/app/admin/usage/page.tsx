'use client';

import React, { useEffect, useState } from 'react';

interface EventItem {
  id: string;
  userId?: string;
  eventType: string;
  quantity: number;
  metadataJson?: string;
  createdAt: string;
}

export default function AdminUsagePage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/v1/admin/usage`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
        });
        const resp = await res.json();
        if (resp.success && resp.data) {
          setEvents(resp.data);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, []);

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-bold text-white">Platform Usage Events & Metering</h1>
        <p className="text-sm text-slate-400 mt-1">Track AI calls, optimization jobs, dataset uploads, and passport exports.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading usage events...</div>
        ) : (
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-4">Event Type</th>
                <th className="p-4">User ID</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Metadata</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {events.map((e) => (
                <tr key={e.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-mono font-bold text-blue-400">{e.eventType}</td>
                  <td className="p-4">{e.userId || 'Anonymous'}</td>
                  <td className="p-4 font-semibold">{e.quantity}</td>
                  <td className="p-4 text-slate-400 max-w-xs truncate">{e.metadataJson || '{}'}</td>
                  <td className="p-4">{new Date(e.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

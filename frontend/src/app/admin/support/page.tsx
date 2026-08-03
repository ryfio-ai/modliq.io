'use client';

import React, { useEffect, useState } from 'react';
import { HelpCircle, CheckCircle2, MessageSquare } from 'lucide-react';

interface Ticket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  category: string;
  status: string;
  adminResponse?: string;
  createdAt: string;
}

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [responseText, setResponseText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/v1/admin/support/tickets`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
      });
      const resp = await res.json();
      if (resp.success && resp.data) {
        setTickets(resp.data);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleResolveTicket = async (status: string) => {
    if (!selectedTicket) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      await fetch(`${apiUrl}/api/v1/admin/support/tickets/${selectedTicket.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({ status, adminResponse: responseText }),
      });
      setSelectedTicket(null);
      setResponseText('');
      fetchTickets();
    } catch {
      // Ignore
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-bold text-white">Platform Support & Feedback Queue</h1>
        <p className="text-sm text-slate-400 mt-1">Review user support requests and provide engineer responses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 font-bold text-xs text-slate-300 uppercase">
            Tickets ({tickets.length})
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-500">Loading tickets...</div>
          ) : (
            <div className="divide-y divide-slate-800 max-h-96 overflow-y-auto">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTicket(t);
                    setResponseText(t.adminResponse || '');
                  }}
                  className={`p-4 cursor-pointer hover:bg-slate-800/50 transition space-y-1 ${
                    selectedTicket?.id === t.id ? 'bg-slate-800/80 border-l-2 border-purple-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{t.subject}</span>
                    <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-blue-500/20 text-blue-400">
                      {t.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">Category: {t.category}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Response Panel */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          {selectedTicket ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">{selectedTicket.subject}</h3>
                  <span className="text-xs text-slate-400">User ID: {selectedTicket.userId}</span>
                </div>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                  {selectedTicket.status}
                </span>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                {selectedTicket.message}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Engineer Response</label>
                <textarea
                  rows={4}
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Provide resolution details..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => handleResolveTicket('IN_PROGRESS')}
                  className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-700"
                >
                  Mark In Progress
                </button>
                <button
                  onClick={() => handleResolveTicket('RESOLVED')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold"
                >
                  Resolve & Save
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500">Select a ticket from the left panel to inspect and respond.</div>
          )}
        </div>
      </div>
    </div>
  );
}

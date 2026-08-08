'use client';

import React, { useEffect, useState } from 'react';
import AdminFilterBar from '@/components/admin/AdminFilterBar';
import AdminDataTable, { ColumnDef } from '@/components/admin/AdminDataTable';
import AdminStatusBadge from '@/components/admin/AdminStatusBadge';
import AdminDetailDrawer from '@/components/admin/AdminDetailDrawer';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import AdminErrorState from '@/components/admin/AdminErrorState';
import { HelpCircle, Edit3 } from 'lucide-react';

interface TicketRecord {
  id: string;
  userId: string;
  subject: string;
  message: string;
  category: string;
  status: string;
  priority: string;
  adminResponse?: string;
  createdAt: string;
}

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<TicketRecord[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Drawer
  const [selectedTicket, setSelectedTicket] = useState<TicketRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [ticketStatus, setTicketStatus] = useState('');

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('modliq_token') || '';
      const params = new URLSearchParams({
        page: String(pagination.page),
        limit: String(pagination.limit),
        ...(statusFilter ? { status: statusFilter } : {}),
        ...(categoryFilter ? { category: categoryFilter } : {}),
      });

      const res = await fetch(`/api/v1/admin/support/tickets?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setTickets(data.data || []);
        if (data.pagination) setPagination(data.pagination);
      } else {
        setError(data.error || 'Failed to fetch support tickets');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [pagination.page, statusFilter, categoryFilter]);

  const handleUpdateTicket = async () => {
    if (!selectedTicket) return;
    try {
      const token = localStorage.getItem('modliq_token') || '';
      const res = await fetch(`/api/v1/admin/support/tickets/${selectedTicket.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: ticketStatus,
          adminResponse: responseText,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Ticket updated!');
        fetchTickets();
        setIsDrawerOpen(false);
      }
    } catch {
      alert('Failed to update ticket');
    }
  };

  const columns: ColumnDef<TicketRecord>[] = [
    {
      key: 'subject',
      header: 'Subject & User',
      render: (t) => (
        <div>
          <span className="font-bold text-[#1B2A4A] block text-xs">{t.subject}</span>
          <span className="text-[10px] text-slate-400 font-mono">User: {t.userId}</span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (t) => (
        <span className="text-xs font-semibold text-slate-700 uppercase">{t.category}</span>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (t) => (
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            t.priority === 'HIGH'
              ? 'bg-rose-50 text-rose-700 border border-rose-200'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {t.priority}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (t) => <AdminStatusBadge status={t.status} type="ticket" />,
    },
    {
      key: 'createdAt',
      header: 'Submitted At',
      render: (t) => (
        <span className="text-slate-500 font-normal">
          {new Date(t.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (t) => (
        <button
          onClick={() => {
            setSelectedTicket(t);
            setResponseText(t.adminResponse || '');
            setTicketStatus(t.status);
            setIsDrawerOpen(true);
          }}
          className="p-1.5 bg-[#F0F6FA] text-[#2B70AB] hover:bg-blue-100 rounded-lg transition"
          title="Respond to Ticket"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-sans text-[#1B2A4A]">
      <div className="border-b border-[#D0E2F0] pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">Support Ticket Queue</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Engineer review queue for user bug reports, feature requests, and dataset issues.
          </p>
        </div>
      </div>

      <AdminFilterBar
        filters={[
          {
            key: 'status',
            label: 'Status',
            value: statusFilter,
            options: [
              { label: 'Open', value: 'OPEN' },
              { label: 'In Progress', value: 'IN_PROGRESS' },
              { label: 'Resolved', value: 'RESOLVED' },
              { label: 'Closed', value: 'CLOSED' },
            ],
            onChange: setStatusFilter,
          },
          {
            key: 'category',
            label: 'Category',
            value: categoryFilter,
            options: [
              { label: 'Bug', value: 'BUG' },
              { label: 'Billing', value: 'BILLING' },
              { label: 'Data', value: 'DATA' },
              { label: 'Other', value: 'OTHER' },
            ],
            onChange: setCategoryFilter,
          },
        ]}
        onClearFilters={() => {
          setStatusFilter('');
          setCategoryFilter('');
        }}
        onRefresh={fetchTickets}
        isRefreshing={loading}
      />

      {error ? (
        <AdminErrorState message={error} onRetry={fetchTickets} />
      ) : loading ? (
        <AdminLoadingSkeleton count={6} />
      ) : (
        <AdminDataTable
          columns={columns}
          data={tickets}
          pagination={pagination}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
          keyExtractor={(t) => t.id}
          emptyTitle="No Support Tickets"
          emptyDescription="Support queue is clear."
        />
      )}

      {/* Drawer */}
      <AdminDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedTicket?.subject || 'Support Ticket'}
        subtitle={`Ticket ID: ${selectedTicket?.id || ''}`}
      >
        {selectedTicket && (
          <div className="space-y-6">
            <div className="p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">User Query</span>
                <AdminStatusBadge status={selectedTicket.status} type="ticket" />
              </div>
              <p className="text-xs text-slate-700">{selectedTicket.message}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase">Update Ticket Status</h4>
              <select
                value={ticketStatus}
                onChange={(e) => setTicketStatus(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#D0E2F0] rounded-xl text-xs font-bold focus:outline-none"
              >
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase">Engineer Resolution Note</h4>
              <textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Type resolution notes or response to send to user..."
                className="w-full h-32 p-3 bg-white border border-[#D0E2F0] rounded-xl text-xs focus:outline-none focus:border-[#2B70AB]"
              />
              <button
                onClick={handleUpdateTicket}
                className="px-4 py-2 bg-[#2B70AB] text-white font-bold rounded-xl text-xs hover:bg-[#1B2A4A] transition"
              >
                Save Ticket Response
              </button>
            </div>
          </div>
        )}
      </AdminDetailDrawer>
    </div>
  );
}

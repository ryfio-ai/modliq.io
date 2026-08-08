'use client';

import React, { useEffect, useState } from 'react';
import AdminFilterBar from '@/components/admin/AdminFilterBar';
import AdminDataTable, { ColumnDef } from '@/components/admin/AdminDataTable';
import AdminStatusBadge from '@/components/admin/AdminStatusBadge';
import AdminDetailDrawer from '@/components/admin/AdminDetailDrawer';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import AdminErrorState from '@/components/admin/AdminErrorState';
import { UserPlus, Mail, Edit3, MessageSquare } from 'lucide-react';

interface LeadRecord {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  city?: string;
  industry?: string;
  interest?: string;
  message?: string;
  status: string;
  notes?: string;
  createdAt: string;
}

const LEAD_STATUSES = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'DEMO_SCHEDULED',
  'PILOT_ACCEPTED',
  'PILOT_REJECTED',
  'CONVERTED',
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Drawer
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('modliq_token') || '';
      const params = new URLSearchParams({
        page: String(pagination.page),
        limit: String(pagination.limit),
        ...(search ? { search } : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
      });

      const res = await fetch(`/api/v1/admin/leads?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setLeads(data.data || []);
        if (data.pagination) setPagination(data.pagination);
      } else {
        setError(data.error || 'Failed to fetch pilot leads');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [pagination.page, search, statusFilter]);

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('modliq_token') || '';
      const res = await fetch(`/api/v1/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchLeads();
        if (selectedLead?.id === leadId) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch {
      alert('Failed to update lead status');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    try {
      const token = localStorage.getItem('modliq_token') || '';
      const res = await fetch(`/api/v1/admin/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notes: noteText }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Internal notes saved!');
        fetchLeads();
        setSelectedLead((prev) => (prev ? { ...prev, notes: noteText } : null));
      }
    } catch {
      alert('Failed to save notes');
    }
  };

  const columns: ColumnDef<LeadRecord>[] = [
    {
      key: 'name',
      header: 'Lead Name / Company',
      render: (l) => (
        <div>
          <span className="font-bold text-[#1B2A4A] block">{l.name}</span>
          <span className="text-[11px] text-slate-500 font-medium">{l.company || 'Independent Plant'}</span>
        </div>
      ),
    },
    {
      key: 'contact',
      header: 'Contact Info',
      render: (l) => (
        <div>
          <span className="text-xs text-slate-700 block font-mono">{l.email}</span>
          <span className="text-[10px] text-slate-400">{l.phone || l.city || 'N/A'}</span>
        </div>
      ),
    },
    {
      key: 'industry',
      header: 'Industry / Interest',
      render: (l) => (
        <div>
          <span className="text-xs font-semibold text-slate-700 block">{l.industry || 'General'}</span>
          <span className="text-[10px] text-[#2B70AB] font-medium">{l.interest || 'Free Pilot'}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Lead Status',
      render: (l) => (
        <select
          value={l.status}
          onChange={(e) => handleUpdateStatus(l.id, e.target.value)}
          className="px-2.5 py-1 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-bold text-[#1B2A4A] focus:outline-none cursor-pointer"
        >
          {LEAD_STATUSES.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created Date',
      render: (l) => (
        <span className="text-slate-500 font-normal">
          {new Date(l.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (l) => (
        <div className="flex items-center justify-end gap-2">
          <a
            href={`mailto:${l.email}?subject=Modliq%20Free%20Pilot%20Application`}
            className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition"
            title="Open Email"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => {
              setSelectedLead(l);
              setNoteText(l.notes || '');
              setIsDrawerOpen(true);
            }}
            className="p-1.5 bg-[#F0F6FA] text-[#2B70AB] hover:bg-blue-100 rounded-lg transition"
            title="View Details & Internal Notes"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-sans text-[#1B2A4A]">
      <div className="border-b border-[#D0E2F0] pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">Free Pilot & Contact Leads</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage incoming sales inquiries, pilot requests, and conversion pipelines.
          </p>
        </div>
      </div>

      <AdminFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search lead name, company, email..."
        filters={[
          {
            key: 'status',
            label: 'Status',
            value: statusFilter,
            options: LEAD_STATUSES.map((st) => ({ label: st, value: st })),
            onChange: setStatusFilter,
          },
        ]}
        onClearFilters={() => {
          setSearch('');
          setStatusFilter('');
        }}
        onRefresh={fetchLeads}
        isRefreshing={loading}
      />

      {error ? (
        <AdminErrorState message={error} onRetry={fetchLeads} />
      ) : loading ? (
        <AdminLoadingSkeleton count={6} />
      ) : (
        <AdminDataTable
          columns={columns}
          data={leads}
          pagination={pagination}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
          keyExtractor={(l) => l.id}
          emptyTitle="No Contact Leads"
          emptyDescription="No free pilot leads match your search filters."
        />
      )}

      {/* Detail Drawer */}
      <AdminDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedLead?.name || 'Lead Details'}
        subtitle={`Company: ${selectedLead?.company || 'N/A'}`}
      >
        {selectedLead && (
          <div className="space-y-6">
            <div className="p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Contact Overview</span>
                <AdminStatusBadge status={selectedLead.status} type="lead" />
              </div>
              <p className="text-sm font-bold text-[#1B2A4A]">{selectedLead.email}</p>
              <p className="text-xs text-slate-600">Phone: {selectedLead.phone || 'N/A'} • City: {selectedLead.city || 'N/A'}</p>
            </div>

            {selectedLead.message && (
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-500 uppercase">Applicant Message</h4>
                <p className="p-3 bg-white border border-[#D0E2F0] rounded-xl text-xs text-slate-700 italic">
                  "{selectedLead.message}"
                </p>
              </div>
            )}

            {/* Internal Notes */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase">Internal Admin Notes</h4>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add sales notes, call history, or follow-up details..."
                className="w-full h-28 p-3 bg-white border border-[#D0E2F0] rounded-xl text-xs focus:outline-none focus:border-[#2B70AB]"
              />
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-[#2B70AB] text-white font-bold rounded-xl text-xs hover:bg-[#1B2A4A] transition"
              >
                Save Notes
              </button>
            </div>
          </div>
        )}
      </AdminDetailDrawer>
    </div>
  );
}

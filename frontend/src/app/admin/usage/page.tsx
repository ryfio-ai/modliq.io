'use client';

import React, { useEffect, useState } from 'react';
import AdminFilterBar from '@/components/admin/AdminFilterBar';
import AdminDataTable, { ColumnDef } from '@/components/admin/AdminDataTable';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import AdminErrorState from '@/components/admin/AdminErrorState';
import { BarChart3 } from 'lucide-react';

interface UsageRecord {
  id: string;
  userId?: string;
  organizationId?: string;
  eventType: string;
  quantity: number;
  metadataJson?: string;
  createdAt: string;
}

export default function AdminUsagePage() {
  const [events, setEvents] = useState<UsageRecord[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsage = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('modliq_token') || '';
      const params = new URLSearchParams({
        page: String(pagination.page),
        limit: String(pagination.limit),
        ...(typeFilter ? { type: typeFilter } : {}),
      });

      const res = await fetch(`/api/v1/admin/usage?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setEvents(data.data || []);
        if (data.pagination) setPagination(data.pagination);
      } else {
        setError(data.error || 'Failed to fetch usage events');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsage();
  }, [pagination.page, typeFilter]);

  const columns: ColumnDef<UsageRecord>[] = [
    {
      key: 'id',
      header: 'Event ID',
      render: (u) => <span className="font-mono text-xs text-slate-500">{u.id}</span>,
    },
    {
      key: 'eventType',
      header: 'Event Type',
      render: (u) => (
        <span className="px-2.5 py-0.5 bg-blue-50 text-[#2B70AB] font-bold text-xs rounded-full border border-blue-200">
          {u.eventType}
        </span>
      ),
    },
    {
      key: 'quantity',
      header: 'Quantity',
      render: (u) => <span className="font-bold text-xs text-[#1B2A4A]">{u.quantity}</span>,
    },
    {
      key: 'userId',
      header: 'User Account',
      render: (u) => <span className="text-xs text-slate-600 font-mono">{u.userId || 'System / Public'}</span>,
    },
    {
      key: 'createdAt',
      header: 'Timestamp',
      render: (u) => (
        <span className="text-slate-500 font-normal">
          {new Date(u.createdAt).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-sans text-[#1B2A4A]">
      <div className="border-b border-[#D0E2F0] pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">Metered Usage Analytics</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit trail of AI calls, optimization runs, dataset uploads, and passport exports.
          </p>
        </div>
      </div>

      <AdminFilterBar
        filters={[
          {
            key: 'type',
            label: 'Event Type',
            value: typeFilter,
            options: [
              { label: 'AI Gateway Call', value: 'AI_CALL' },
              { label: 'Optimization Job', value: 'OPTIMIZATION_JOB' },
              { label: 'Dataset Upload', value: 'DATASET_UPLOAD' },
            ],
            onChange: setTypeFilter,
          },
        ]}
        onClearFilters={() => setTypeFilter('')}
        onRefresh={fetchUsage}
        isRefreshing={loading}
      />

      {error ? (
        <AdminErrorState message={error} onRetry={fetchUsage} />
      ) : loading ? (
        <AdminLoadingSkeleton count={6} />
      ) : (
        <AdminDataTable
          columns={columns}
          data={events}
          pagination={pagination}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
          keyExtractor={(u) => u.id}
          emptyTitle="No Usage Events"
          emptyDescription="No usage metering events logged."
        />
      )}
    </div>
  );
}

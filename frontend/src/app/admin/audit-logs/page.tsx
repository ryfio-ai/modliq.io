'use client';

import React, { useEffect, useState } from 'react';
import AdminFilterBar from '@/components/admin/AdminFilterBar';
import AdminDataTable, { ColumnDef } from '@/components/admin/AdminDataTable';
import AdminDetailDrawer from '@/components/admin/AdminDetailDrawer';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import AdminErrorState from '@/components/admin/AdminErrorState';
import { Shield, Eye } from 'lucide-react';

interface AuditLogRecord {
  id: string;
  userId?: string;
  actorId?: string;
  organizationId?: string;
  projectId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadataJson?: string;
  createdAt: string;
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogRecord[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [actionFilter, setActionFilter] = useState('');
  const [entityFilter, setEntityFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Drawer
  const [selectedLog, setSelectedLog] = useState<AuditLogRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('modliq_token') || '';
      const params = new URLSearchParams({
        page: String(pagination.page),
        limit: String(pagination.limit),
        ...(actionFilter ? { action: actionFilter } : {}),
        ...(entityFilter ? { entityType: entityFilter } : {}),
      });

      const res = await fetch(`/api/v1/admin/audit-logs?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setLogs(data.data || []);
        if (data.pagination) setPagination(data.pagination);
      } else {
        setError(data.error || 'Failed to fetch audit logs');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, [pagination.page, actionFilter, entityFilter]);

  const columns: ColumnDef<AuditLogRecord>[] = [
    {
      key: 'action',
      header: 'Action Executed',
      render: (l) => (
        <div>
          <span className="font-mono font-bold text-xs text-[#1B2A4A] block">{l.action}</span>
          <span className="text-[10px] text-slate-400">Entity: {l.entityType}</span>
        </div>
      ),
    },
    {
      key: 'actor',
      header: 'Actor / User',
      render: (l) => (
        <span className="text-xs font-mono font-semibold text-slate-700">
          {l.userId || l.actorId || 'System'}
        </span>
      ),
    },
    {
      key: 'entityId',
      header: 'Target Entity ID',
      render: (l) => <span className="font-mono text-[11px] text-slate-500">{l.entityId || '—'}</span>,
    },
    {
      key: 'createdAt',
      header: 'Timestamp',
      render: (l) => (
        <span className="text-slate-500 font-normal">
          {new Date(l.createdAt).toLocaleString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (l) => (
        <button
          onClick={() => {
            setSelectedLog(l);
            setIsDrawerOpen(true);
          }}
          className="p-1.5 bg-[#F0F6FA] text-[#2B70AB] hover:bg-blue-100 rounded-lg transition"
          title="Inspect Audit Event Payload"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-sans text-[#1B2A4A]">
      <div className="border-b border-[#D0E2F0] pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">Security Audit Trail</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable compliance record of administrative actions, role changes, and system settings.
          </p>
        </div>
        <div className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-xl text-[11px] font-bold text-[#2B70AB] flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" /> Read-Only Compliance Log
        </div>
      </div>

      <AdminFilterBar
        filters={[
          {
            key: 'entity',
            label: 'Entity Type',
            value: entityFilter,
            options: [
              { label: 'User', value: 'USER' },
              { label: 'Optimization Job', value: 'OPTIMIZATION_JOB' },
              { label: 'Platform Settings', value: 'PLATFORM_SETTINGS' },
              { label: 'Website Settings', value: 'WEBSITE_SETTINGS' },
            ],
            onChange: setEntityFilter,
          },
        ]}
        onClearFilters={() => setEntityFilter('')}
        onRefresh={fetchAuditLogs}
        isRefreshing={loading}
      />

      {error ? (
        <AdminErrorState message={error} onRetry={fetchAuditLogs} />
      ) : loading ? (
        <AdminLoadingSkeleton count={6} />
      ) : (
        <AdminDataTable
          columns={columns}
          data={logs}
          pagination={pagination}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
          keyExtractor={(l) => l.id}
          emptyTitle="No Audit Logs"
          emptyDescription="No audit logs recorded matching your filter."
        />
      )}

      {/* Detail Drawer */}
      <AdminDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={`Audit Event #${selectedLog?.id || ''}`}
        subtitle={`Action: ${selectedLog?.action || ''}`}
      >
        {selectedLog && (
          <div className="space-y-6">
            <div className="p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase block">Event Details</span>
              <p className="text-xs font-mono">Actor ID: {selectedLog.userId || selectedLog.actorId || 'System'}</p>
              <p className="text-xs font-mono">Entity Type: {selectedLog.entityType}</p>
              <p className="text-xs font-mono">Entity ID: {selectedLog.entityId || 'N/A'}</p>
              <p className="text-xs font-mono">Timestamp: {new Date(selectedLog.createdAt).toLocaleString()}</p>
            </div>

            {selectedLog.metadataJson && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase block">Metadata Payload</span>
                <pre className="p-4 bg-white border border-[#D0E2F0] rounded-xl text-[11px] font-mono text-[#1B2A4A] whitespace-pre-wrap overflow-x-auto">
                  {JSON.stringify(JSON.parse(selectedLog.metadataJson), null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </AdminDetailDrawer>
    </div>
  );
}

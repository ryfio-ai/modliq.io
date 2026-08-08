'use client';

import React, { useEffect, useState } from 'react';
import AdminDataTable, { ColumnDef } from '@/components/admin/AdminDataTable';
import AdminStatusBadge from '@/components/admin/AdminStatusBadge';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import AdminErrorState from '@/components/admin/AdminErrorState';
import { FileSpreadsheet } from 'lucide-react';

interface ImportRecord {
  id: string;
  userId: string;
  user?: { name: string; email: string };
  status: string;
  progress: number;
  error?: string;
  resultJson?: string;
  createdAt: string;
}

export default function AdminImportsPage() {
  const [imports, setImports] = useState<ImportRecord[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImports = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('modliq_token') || '';
      const params = new URLSearchParams({
        page: String(pagination.page),
        limit: String(pagination.limit),
      });

      const res = await fetch(`/api/v1/admin/imports?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setImports(data.data || []);
        if (data.pagination) setPagination(data.pagination);
      } else {
        setError(data.error || 'Failed to fetch import jobs');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImports();
  }, [pagination.page]);

  const columns: ColumnDef<ImportRecord>[] = [
    {
      key: 'id',
      header: 'Import Job ID',
      render: (i) => (
        <div>
          <span className="font-mono font-bold text-[#1B2A4A] block text-xs">{i.id}</span>
          <span className="text-[10px] text-slate-400">Data Connector / Document Ingestion</span>
        </div>
      ),
    },
    {
      key: 'user',
      header: 'User Account',
      render: (i) => (
        <span className="text-xs font-semibold text-slate-700">{i.user?.name || i.userId}</span>
      ),
    },
    {
      key: 'status',
      header: 'Ingestion Status',
      render: (i) => <AdminStatusBadge status={i.status} type="job" />,
    },
    {
      key: 'progress',
      header: 'Progress %',
      render: (i) => (
        <span className="text-xs font-bold text-[#2B70AB]">{i.progress}%</span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created At',
      render: (i) => (
        <span className="text-slate-500 font-normal">
          {new Date(i.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-sans text-[#1B2A4A]">
      <div className="border-b border-[#D0E2F0] pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">Connector & Document Imports</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Universal ingestion jobs across CSV, Excel, PDF/Word documents, and database connectors.
          </p>
        </div>
      </div>

      {error ? (
        <AdminErrorState message={error} onRetry={fetchImports} />
      ) : loading ? (
        <AdminLoadingSkeleton count={6} />
      ) : (
        <AdminDataTable
          columns={columns}
          data={imports}
          pagination={pagination}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
          keyExtractor={(i) => i.id}
          emptyTitle="No Import Jobs Found"
          emptyDescription="No database or document import jobs recorded."
        />
      )}
    </div>
  );
}

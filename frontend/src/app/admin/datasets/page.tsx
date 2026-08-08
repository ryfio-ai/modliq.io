'use client';

import React, { useEffect, useState } from 'react';
import AdminFilterBar from '@/components/admin/AdminFilterBar';
import AdminDataTable, { ColumnDef } from '@/components/admin/AdminDataTable';
import AdminStatusBadge from '@/components/admin/AdminStatusBadge';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import AdminErrorState from '@/components/admin/AdminErrorState';
import { Database, ShieldAlert } from 'lucide-react';

interface DatasetRecord {
  id: string;
  name: string;
  filename: string;
  contentType?: string;
  sourceType: string;
  fileType?: string;
  status: string;
  sizeBytes?: number;
  totalRows?: number;
  totalColumns?: number;
  healthScore?: number;
  healthStatus?: string;
  isDemo: boolean;
  user?: { name: string; email: string };
  createdAt: string;
}

export default function AdminDatasetsPage() {
  const [datasets, setDatasets] = useState<DatasetRecord[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDatasets = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('modliq_token') || '';
      const params = new URLSearchParams({
        page: String(pagination.page),
        limit: String(pagination.limit),
        ...(search ? { search } : {}),
        ...(sourceFilter ? { sourceType: sourceFilter } : {}),
      });

      const res = await fetch(`/api/v1/admin/datasets?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setDatasets(data.data || []);
        if (data.pagination) setPagination(data.pagination);
      } else {
        setError(data.error || 'Failed to fetch datasets');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, [pagination.page, search, sourceFilter]);

  const columns: ColumnDef<DatasetRecord>[] = [
    {
      key: 'name',
      header: 'Dataset Name / File',
      render: (d) => (
        <div>
          <span className="font-bold text-[#1B2A4A] block">{d.name || d.filename}</span>
          <span className="text-[11px] text-slate-400 font-mono">{d.filename}</span>
        </div>
      ),
    },
    {
      key: 'user',
      header: 'Uploaded By',
      render: (d) => (
        <span className="text-xs font-semibold text-slate-700">{d.user?.name || 'Platform User'}</span>
      ),
    },
    {
      key: 'sourceType',
      header: 'Source & Type',
      render: (d) => (
        <span className="text-xs font-medium text-slate-600 uppercase">
          {d.sourceType} • {d.fileType || 'CSV'}
        </span>
      ),
    },
    {
      key: 'dimensions',
      header: 'Rows / Columns',
      render: (d) => (
        <span className="text-xs font-semibold text-[#1B2A4A]">
          {d.totalRows ? d.totalRows.toLocaleString() : 'N/A'} rows × {d.totalColumns ?? '—'} cols
        </span>
      ),
    },
    {
      key: 'health',
      header: 'Health Score',
      render: (d) => (
        <div className="flex items-center gap-2">
          <span className="font-bold text-xs text-[#2B70AB]">{d.healthScore ?? 85}%</span>
          <AdminStatusBadge status={d.healthStatus || 'READY'} type="health" />
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Upload Date',
      render: (d) => (
        <span className="text-slate-500 font-normal">
          {new Date(d.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-sans text-[#1B2A4A]">
      <div className="border-b border-[#D0E2F0] pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">Ingested Datasets & Telemetry</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Dataset metadata, ingestion sources, quality health scores, and dimensions.
          </p>
        </div>
        <div className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-xl text-[11px] font-bold text-amber-800 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" /> Raw Data Rows Masked for Privacy
        </div>
      </div>

      <AdminFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search dataset name or filename..."
        filters={[
          {
            key: 'source',
            label: 'Source',
            value: sourceFilter,
            options: [
              { label: 'File Upload', value: 'file' },
              { label: 'Database Connector', value: 'connector' },
              { label: 'Document OCR', value: 'document' },
              { label: 'Demo Dataset', value: 'demo' },
            ],
            onChange: setSourceFilter,
          },
        ]}
        onClearFilters={() => {
          setSearch('');
          setSourceFilter('');
        }}
        onRefresh={fetchDatasets}
        isRefreshing={loading}
      />

      {error ? (
        <AdminErrorState message={error} onRetry={fetchDatasets} />
      ) : loading ? (
        <AdminLoadingSkeleton count={6} />
      ) : (
        <AdminDataTable
          columns={columns}
          data={datasets}
          pagination={pagination}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
          keyExtractor={(d) => d.id}
          emptyTitle="No Datasets Found"
          emptyDescription="No uploaded datasets match your filter criteria."
        />
      )}
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import AdminFilterBar from '@/components/admin/AdminFilterBar';
import AdminDataTable, { ColumnDef } from '@/components/admin/AdminDataTable';
import AdminStatusBadge from '@/components/admin/AdminStatusBadge';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import AdminErrorState from '@/components/admin/AdminErrorState';
import { FolderGit2 } from 'lucide-react';

interface ProjectRecord {
  id: string;
  name: string;
  status: string;
  organizationId?: string;
  userId: string;
  user?: { name: string; email: string };
  dataset?: { id: string; name: string; filename: string };
  optimizationJob?: { id: string; status: string; progress: number };
  createdAt: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
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

      const res = await fetch(`/api/v1/admin/projects?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.data || []);
        if (data.pagination) setPagination(data.pagination);
      } else {
        setError(data.error || 'Failed to fetch projects');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [pagination.page, search, statusFilter]);

  const columns: ColumnDef<ProjectRecord>[] = [
    {
      key: 'name',
      header: 'Project Name',
      render: (p) => (
        <div>
          <span className="font-bold text-[#1B2A4A] block">{p.name}</span>
          <span className="text-[11px] text-slate-400 font-mono">{p.id}</span>
        </div>
      ),
    },
    {
      key: 'user',
      header: 'Owner Account',
      render: (p) => (
        <div>
          <span className="text-xs font-semibold text-[#1B2A4A] block">{p.user?.name || 'User'}</span>
          <span className="text-[10px] text-slate-400">{p.user?.email || p.userId}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Project Status',
      render: (p) => <AdminStatusBadge status={p.status} type="job" />,
    },
    {
      key: 'dataset',
      header: 'Linked Dataset',
      render: (p) => (
        <span className="text-slate-600 text-xs font-medium">
          {p.dataset?.name || p.dataset?.filename || 'No Dataset Attached'}
        </span>
      ),
    },
    {
      key: 'optimization',
      header: 'AutoML Job Progress',
      render: (p) => (
        <span className="text-slate-600 text-xs font-medium">
          {p.optimizationJob ? `${p.optimizationJob.progress}% (${p.optimizationJob.status})` : 'Not Executed'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created Date',
      render: (p) => (
        <span className="text-slate-500 font-normal">
          {new Date(p.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-sans text-[#1B2A4A]">
      <div className="border-b border-[#D0E2F0] pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">Active Platform Projects</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Process optimization projects created across user workspaces.
          </p>
        </div>
      </div>

      <AdminFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search project name..."
        filters={[
          {
            key: 'status',
            label: 'Status',
            value: statusFilter,
            options: [
              { label: 'Completed', value: 'completed' },
              { label: 'Optimizing', value: 'optimizing' },
              { label: 'Queued', value: 'queued' },
              { label: 'Draft', value: 'draft' },
              { label: 'Error', value: 'error' },
            ],
            onChange: setStatusFilter,
          },
        ]}
        onClearFilters={() => {
          setSearch('');
          setStatusFilter('');
        }}
        onRefresh={fetchProjects}
        isRefreshing={loading}
      />

      {error ? (
        <AdminErrorState message={error} onRetry={fetchProjects} />
      ) : loading ? (
        <AdminLoadingSkeleton count={6} />
      ) : (
        <AdminDataTable
          columns={columns}
          data={projects}
          pagination={pagination}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
          keyExtractor={(p) => p.id}
          emptyTitle="No Projects Found"
          emptyDescription="No process optimization projects match your criteria."
        />
      )}
    </div>
  );
}

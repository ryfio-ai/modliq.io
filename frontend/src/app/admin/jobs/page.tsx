'use client';

import React, { useEffect, useState } from 'react';
import AdminFilterBar from '@/components/admin/AdminFilterBar';
import AdminDataTable, { ColumnDef } from '@/components/admin/AdminDataTable';
import AdminStatusBadge from '@/components/admin/AdminStatusBadge';
import AdminDetailDrawer from '@/components/admin/AdminDetailDrawer';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import AdminErrorState from '@/components/admin/AdminErrorState';
import { Cpu, RefreshCw, XCircle, Eye } from 'lucide-react';

interface JobRecord {
  id: string;
  userId: string;
  user?: { name: string; email: string };
  status: string;
  stage?: string;
  progress: number;
  error?: string;
  createdAt: string;
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<JobRecord[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Drawer
  const [selectedJob, setSelectedJob] = useState<JobRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('modliq_token') || '';
      const params = new URLSearchParams({
        page: String(pagination.page),
        limit: String(pagination.limit),
        ...(statusFilter ? { status: statusFilter } : {}),
      });

      const res = await fetch(`/api/v1/admin/jobs?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setJobs(data.data || []);
        if (data.pagination) setPagination(data.pagination);
      } else {
        setError(data.error || 'Failed to fetch ML jobs');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [pagination.page, statusFilter]);

  const handleRetryJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to retry this failed job?')) return;
    try {
      const token = localStorage.getItem('modliq_token') || '';
      const res = await fetch(`/api/v1/admin/jobs/${jobId}/retry`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        alert('Job re-queued successfully!');
        fetchJobs();
      }
    } catch {
      alert('Failed to retry job');
    }
  };

  const handleCancelJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to cancel this running job?')) return;
    try {
      const token = localStorage.getItem('modliq_token') || '';
      const res = await fetch(`/api/v1/admin/jobs/${jobId}/cancel`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        alert('Job cancelled');
        fetchJobs();
      }
    } catch {
      alert('Failed to cancel job');
    }
  };

  const columns: ColumnDef<JobRecord>[] = [
    {
      key: 'id',
      header: 'Job ID & Execution',
      render: (j) => (
        <div>
          <span className="font-mono font-bold text-[#1B2A4A] block text-xs">{j.id}</span>
          <span className="text-[10px] text-slate-400">Stage: {j.stage || 'queued'}</span>
        </div>
      ),
    },
    {
      key: 'user',
      header: 'User Account',
      render: (j) => (
        <span className="text-xs font-semibold text-slate-700">{j.user?.name || j.userId}</span>
      ),
    },
    {
      key: 'status',
      header: 'Compute Status',
      render: (j) => <AdminStatusBadge status={j.status} type="job" />,
    },
    {
      key: 'progress',
      header: 'Progress %',
      render: (j) => (
        <div className="w-32 space-y-1">
          <div className="flex justify-between text-[10px] font-bold text-slate-600">
            <span>{j.progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                j.status === 'completed'
                  ? 'bg-emerald-500'
                  : j.status === 'failed'
                  ? 'bg-rose-500'
                  : 'bg-[#2B70AB]'
              }`}
              style={{ width: `${j.progress}%` }}
            ></div>
          </div>
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created At',
      render: (j) => (
        <span className="text-slate-500 font-normal">
          {new Date(j.createdAt).toLocaleTimeString()} ({new Date(j.createdAt).toLocaleDateString()})
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (j) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => {
              setSelectedJob(j);
              setIsDrawerOpen(true);
            }}
            className="p-1.5 bg-[#F0F6FA] text-[#2B70AB] hover:bg-blue-100 rounded-lg transition"
            title="Inspect Job Traceback"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {j.status === 'failed' && (
            <button
              onClick={() => handleRetryJob(j.id)}
              className="p-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg transition flex items-center gap-1 text-[10px] font-bold"
              title="Retry Failed Job"
            >
              <RefreshCw className="w-3 h-3" /> Retry
            </button>
          )}

          {j.status === 'running' && (
            <button
              onClick={() => handleCancelJob(j.id)}
              className="p-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg transition flex items-center gap-1 text-[10px] font-bold"
              title="Cancel Running Job"
            >
              <XCircle className="w-3 h-3" /> Cancel
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-sans text-[#1B2A4A]">
      <div className="border-b border-[#D0E2F0] pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">ML Compute Job Queue</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            AutoML optimization execution queue, training stages, and failure tracebacks.
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
              { label: 'Running', value: 'running' },
              { label: 'Completed', value: 'completed' },
              { label: 'Failed', value: 'failed' },
              { label: 'Queued', value: 'queued' },
            ],
            onChange: setStatusFilter,
          },
        ]}
        onClearFilters={() => setStatusFilter('')}
        onRefresh={fetchJobs}
        isRefreshing={loading}
      />

      {error ? (
        <AdminErrorState message={error} onRetry={fetchJobs} />
      ) : loading ? (
        <AdminLoadingSkeleton count={6} />
      ) : (
        <AdminDataTable
          columns={columns}
          data={jobs}
          pagination={pagination}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
          keyExtractor={(j) => j.id}
          emptyTitle="No Jobs Found"
          emptyDescription="No AutoML optimization compute jobs found in queue."
        />
      )}

      {/* Detail Drawer */}
      <AdminDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={`Optimization Job #${selectedJob?.id || ''}`}
        subtitle={`Status: ${selectedJob?.status?.toUpperCase() || ''}`}
      >
        {selectedJob && (
          <div className="space-y-6">
            <div className="p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Execution Progress</span>
                <AdminStatusBadge status={selectedJob.status} type="job" />
              </div>
              <p className="text-sm font-bold text-[#1B2A4A]">Stage: {selectedJob.stage || 'queued'}</p>
              <p className="text-xs text-slate-600">Progress: {selectedJob.progress}%</p>
            </div>

            {selectedJob.error ? (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-rose-800 uppercase block">Error Traceback</span>
                <pre className="p-3 bg-white border border-rose-200 rounded-xl text-[11px] font-mono text-rose-700 whitespace-pre-wrap overflow-x-auto">
                  {selectedJob.error}
                </pre>
              </div>
            ) : (
              <p className="text-xs text-emerald-600 font-semibold">No errors recorded during execution.</p>
            )}
          </div>
        )}
      </AdminDetailDrawer>
    </div>
  );
}

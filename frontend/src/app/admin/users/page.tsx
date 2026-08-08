'use client';

import React, { useEffect, useState } from 'react';
import AdminFilterBar from '@/components/admin/AdminFilterBar';
import AdminDataTable, { ColumnDef } from '@/components/admin/AdminDataTable';
import AdminStatusBadge from '@/components/admin/AdminStatusBadge';
import AdminDetailDrawer from '@/components/admin/AdminDetailDrawer';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import AdminErrorState from '@/components/admin/AdminErrorState';
import { Eye, Shield, UserCheck, AlertCircle } from 'lucide-react';

interface UserRecord {
  id: string;
  publicId?: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isDemo: boolean;
  orgCount: number;
  projectCount: number;
  datasetCount: number;
  jobCount: number;
  createdAt: string;
  lastActive: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Drawer state
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerLoading, setDrawerLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('modliq_token') || '';
      const params = new URLSearchParams({
        page: String(pagination.page),
        limit: String(pagination.limit),
        ...(search ? { search } : {}),
        ...(roleFilter ? { role: roleFilter } : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
      });

      const res = await fetch(`/api/v1/admin/users?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.data || []);
        if (data.pagination) setPagination(data.pagination);
      } else {
        setError(data.error || 'Failed to fetch users');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, search, roleFilter, statusFilter]);

  const handleInspectUser = async (user: UserRecord) => {
    try {
      setDrawerLoading(true);
      setIsDrawerOpen(true);
      const token = localStorage.getItem('modliq_token') || '';
      const res = await fetch(`/api/v1/admin/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setSelectedUser(data.data);
      } else {
        setSelectedUser({ profile: user });
      }
    } catch {
      setSelectedUser({ profile: user });
    } finally {
      setDrawerLoading(false);
    }
  };

  const handleToggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    if (!confirm(`Are you sure you want to change user role to ${newRole}?`)) return;

    try {
      const token = localStorage.getItem('modliq_token') || '';
      const res = await fetch(`/api/v1/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        fetchUsers();
        if (selectedUser?.profile?.id === userId) {
          setSelectedUser((prev: any) => ({
            ...prev,
            profile: { ...prev.profile, role: newRole },
          }));
        }
      }
    } catch {
      alert('Failed to update role');
    }
  };

  const columns: ColumnDef<UserRecord>[] = [
    {
      key: 'name',
      header: 'Name / Public ID',
      render: (u) => (
        <div>
          <span className="font-bold text-[#1B2A4A] block">{u.name}</span>
          <span className="text-[10px] text-[#2B70AB] font-mono font-bold block">{u.publicId || u.id}</span>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (u) => <span className="text-slate-600 font-mono text-[11px]">{u.email}</span>,
    },
    {
      key: 'role',
      header: 'Role',
      render: (u) => <AdminStatusBadge status={u.role} type="role" />,
    },
    {
      key: 'status',
      header: 'Account Status',
      render: (u) => <AdminStatusBadge status={u.status} type="generic" />,
    },
    {
      key: 'counts',
      header: 'Projects / Datasets / Jobs',
      render: (u) => (
        <span className="text-slate-600">
          {u.projectCount} prj • {u.datasetCount} ds • {u.jobCount} jobs
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created Date',
      render: (u) => (
        <span className="text-slate-500 font-normal">
          {new Date(u.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (u) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleInspectUser(u)}
            className="p-1.5 bg-[#F0F6FA] text-[#2B70AB] hover:bg-blue-100 rounded-lg transition"
            title="Inspect Detail"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleToggleRole(u.id, u.role)}
            className="p-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition text-[10px] font-bold"
            title="Toggle Admin/User Role"
          >
            {u.role === 'ADMIN' ? 'Demote' : 'Promote'}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-sans text-[#1B2A4A]">
      {/* Header */}
      <div className="border-b border-[#D0E2F0] pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">User Account Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage user accounts, roles, workspace activity, and security permissions.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <AdminFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name or email..."
        filters={[
          {
            key: 'role',
            label: 'Role',
            value: roleFilter,
            options: [
              { label: 'Admin', value: 'ADMIN' },
              { label: 'Standard User', value: 'USER' },
            ],
            onChange: setRoleFilter,
          },
          {
            key: 'status',
            label: 'Status',
            value: statusFilter,
            options: [
              { label: 'Active', value: 'STANDARD' },
              { label: 'Demo Account', value: 'DEMO' },
            ],
            onChange: setStatusFilter,
          },
        ]}
        onClearFilters={() => {
          setSearch('');
          setRoleFilter('');
          setStatusFilter('');
        }}
        onRefresh={fetchUsers}
        isRefreshing={loading}
      />

      {/* Data Table */}
      {error ? (
        <AdminErrorState message={error} onRetry={fetchUsers} />
      ) : loading ? (
        <AdminLoadingSkeleton count={6} />
      ) : (
        <AdminDataTable
          columns={columns}
          data={users}
          pagination={pagination}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
          keyExtractor={(u) => u.id}
          emptyTitle="No Users Found"
          emptyDescription="No registered users match your search criteria."
        />
      )}

      {/* Detail Drawer */}
      <AdminDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedUser?.profile?.name || 'User Account Details'}
        subtitle={`ID: ${selectedUser?.profile?.id || ''}`}
      >
        {drawerLoading ? (
          <div className="p-8 text-center text-slate-400">Loading user metadata...</div>
        ) : selectedUser ? (
          <div className="space-y-6">
            {/* Profile Overview */}
            <div className="p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Profile Details</span>
                <AdminStatusBadge status={selectedUser.profile?.role} type="role" />
              </div>
              <p className="text-sm font-bold text-[#1B2A4A]">{selectedUser.profile?.email}</p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div>Account Type: <span className="font-semibold">{selectedUser.profile?.isDemo ? 'Demo' : 'Standard'}</span></div>
                <div>Default Org: <span className="font-semibold">{selectedUser.profile?.defaultOrgId || 'None'}</span></div>
              </div>
            </div>

            {/* Projects List */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">User Projects ({selectedUser.projects?.length || 0})</h3>
              {selectedUser.projects && selectedUser.projects.length > 0 ? (
                <div className="space-y-1.5">
                  {selectedUser.projects.map((p: any) => (
                    <div key={p.id} className="p-3 bg-white border border-[#D0E2F0] rounded-xl flex items-center justify-between">
                      <span className="font-bold text-xs">{p.name}</span>
                      <AdminStatusBadge status={p.status} type="job" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No projects created yet.</p>
              )}
            </div>

            {/* Datasets List */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">User Datasets ({selectedUser.datasets?.length || 0})</h3>
              {selectedUser.datasets && selectedUser.datasets.length > 0 ? (
                <div className="space-y-1.5">
                  {selectedUser.datasets.map((d: any) => (
                    <div key={d.id} className="p-3 bg-white border border-[#D0E2F0] rounded-xl flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs block">{d.name || d.filename}</span>
                        <span className="text-[10px] text-slate-400">{d.filename}</span>
                      </div>
                      <span className="text-xs font-bold text-[#2B70AB]">Health: {d.healthScore ?? 'N/A'}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No datasets uploaded yet.</p>
              )}
            </div>
          </div>
        ) : null}
      </AdminDetailDrawer>
    </div>
  );
}

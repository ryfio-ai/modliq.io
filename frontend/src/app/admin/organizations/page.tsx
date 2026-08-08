'use client';

import React, { useEffect, useState } from 'react';
import AdminFilterBar from '@/components/admin/AdminFilterBar';
import AdminDataTable, { ColumnDef } from '@/components/admin/AdminDataTable';
import AdminStatusBadge from '@/components/admin/AdminStatusBadge';
import AdminDetailDrawer from '@/components/admin/AdminDetailDrawer';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import AdminErrorState from '@/components/admin/AdminErrorState';
import { Eye, Building } from 'lucide-react';

interface OrganizationRecord {
  id: string;
  name: string;
  slug: string;
  ownerUserId: string;
  industry?: string;
  companySize?: string;
  memberCount: number;
  projectCount: number;
  plan: string;
  createdAt: string;
}

export default function AdminOrganizationsPage() {
  const [orgs, setOrgs] = useState<OrganizationRecord[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Drawer
  const [selectedOrg, setSelectedOrg] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerLoading, setDrawerLoading] = useState(false);

  const fetchOrgs = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('modliq_token') || '';
      const params = new URLSearchParams({
        page: String(pagination.page),
        limit: String(pagination.limit),
        ...(search ? { search } : {}),
        ...(industryFilter ? { industry: industryFilter } : {}),
      });

      const res = await fetch(`/api/v1/admin/organizations?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setOrgs(data.data || []);
        if (data.pagination) setPagination(data.pagination);
      } else {
        setError(data.error || 'Failed to fetch organizations');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, [pagination.page, search, industryFilter]);

  const handleInspectOrg = async (org: OrganizationRecord) => {
    try {
      setDrawerLoading(true);
      setIsDrawerOpen(true);
      const token = localStorage.getItem('modliq_token') || '';
      const res = await fetch(`/api/v1/admin/organizations/${org.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setSelectedOrg(data.data);
      } else {
        setSelectedOrg({ organization: org });
      }
    } catch {
      setSelectedOrg({ organization: org });
    } finally {
      setDrawerLoading(false);
    }
  };

  const columns: ColumnDef<OrganizationRecord>[] = [
    {
      key: 'name',
      header: 'Organization Name',
      render: (o) => (
        <div>
          <span className="font-bold text-[#1B2A4A] block">{o.name}</span>
          <span className="text-[11px] text-slate-400 font-mono">/{o.slug}</span>
        </div>
      ),
    },
    {
      key: 'industry',
      header: 'Industry / Size',
      render: (o) => (
        <div>
          <span className="text-xs font-semibold text-slate-700 block">{o.industry || 'General Manufacturing'}</span>
          <span className="text-[10px] text-slate-400">{o.companySize || 'Enterprise'}</span>
        </div>
      ),
    },
    {
      key: 'plan',
      header: 'Entitlement Plan',
      render: (o) => <AdminStatusBadge status={o.plan} type="generic" />,
    },
    {
      key: 'members',
      header: 'Members & Projects',
      render: (o) => (
        <span className="text-slate-600 font-medium">
          {o.memberCount} members • {o.projectCount} projects
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created Date',
      render: (o) => (
        <span className="text-slate-500 font-normal">
          {new Date(o.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (o) => (
        <button
          onClick={() => handleInspectOrg(o)}
          className="p-1.5 bg-[#F0F6FA] text-[#2B70AB] hover:bg-blue-100 rounded-lg transition"
          title="Inspect Detail"
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
          <h1 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">Tenant Organizations</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Multi-tenant plant workspaces, company sizes, industries, and entitlement plans.
          </p>
        </div>
      </div>

      <AdminFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name or slug..."
        filters={[
          {
            key: 'industry',
            label: 'Industry',
            value: industryFilter,
            options: [
              { label: 'Specialty Chemicals', value: 'Specialty Chemicals' },
              { label: 'Pharma / Biotech', value: 'Pharma / Biotech' },
              { label: 'Packaging / Plastics', value: 'Packaging / Plastics' },
              { label: 'Automotive Components', value: 'Automotive Components' },
            ],
            onChange: setIndustryFilter,
          },
        ]}
        onClearFilters={() => {
          setSearch('');
          setIndustryFilter('');
        }}
        onRefresh={fetchOrgs}
        isRefreshing={loading}
      />

      {error ? (
        <AdminErrorState message={error} onRetry={fetchOrgs} />
      ) : loading ? (
        <AdminLoadingSkeleton count={6} />
      ) : (
        <AdminDataTable
          columns={columns}
          data={orgs}
          pagination={pagination}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
          keyExtractor={(o) => o.id}
          emptyTitle="No Organizations Found"
          emptyDescription="No multi-tenant organizations match your search filters."
        />
      )}

      {/* Drawer */}
      <AdminDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedOrg?.organization?.name || 'Organization Details'}
        subtitle={`Slug: /${selectedOrg?.organization?.slug || ''}`}
      >
        {drawerLoading ? (
          <div className="p-8 text-center text-slate-400">Loading organization details...</div>
        ) : selectedOrg ? (
          <div className="space-y-6">
            <div className="p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Organization Info</span>
                <AdminStatusBadge status={selectedOrg.entitlement?.plan || 'DEMO'} type="generic" />
              </div>
              <p className="text-sm font-bold text-[#1B2A4A]">{selectedOrg.organization?.name}</p>
              <p className="text-xs text-slate-600">Industry: {selectedOrg.organization?.industry || 'General Manufacturing'}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Members ({selectedOrg.members?.length || 0})</h3>
              {selectedOrg.members && selectedOrg.members.length > 0 ? (
                <div className="space-y-1.5">
                  {selectedOrg.members.map((m: any) => (
                    <div key={m.id} className="p-3 bg-white border border-[#D0E2F0] rounded-xl flex items-center justify-between">
                      <span className="font-semibold text-xs">{m.userId}</span>
                      <AdminStatusBadge status={m.role} type="role" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No members assigned.</p>
              )}
            </div>
          </div>
        ) : null}
      </AdminDetailDrawer>
    </div>
  );
}

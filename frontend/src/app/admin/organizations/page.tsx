'use client';

import React, { useEffect, useState } from 'react';
import { Building } from 'lucide-react';

interface Org {
  id: string;
  name: string;
  slug: string;
  industry?: string;
  companySize?: string;
  createdAt: string;
}

export default function AdminOrganizationsPage() {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/v1/admin/organizations`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
        });
        const resp = await res.json();
        if (resp.success && resp.data) {
          setOrgs(resp.data);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchOrgs();
  }, []);

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-bold text-white">Platform Organizations & Workspaces</h1>
        <p className="text-sm text-slate-400 mt-1">Directory of multi-tenant enterprise and plant organizations.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading organizations...</div>
        ) : (
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-4">Organization</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Industry</th>
                <th className="p-4">Size</th>
                <th className="p-4">Created Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orgs.map((org) => (
                <tr key={org.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-semibold text-white">{org.name}</td>
                  <td className="p-4 text-slate-400">{org.slug}</td>
                  <td className="p-4">{org.industry || 'Manufacturing'}</td>
                  <td className="p-4">{org.companySize || '10-50'}</td>
                  <td className="p-4">{new Date(org.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

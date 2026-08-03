'use client';

import React, { useEffect, useState } from 'react';

interface Job {
  id: string;
  userId: string;
  status: string;
  stage?: string;
  progress: number;
  error?: string;
  createdAt: string;
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/v1/admin/jobs`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
        });
        const resp = await res.json();
        if (resp.success && resp.data) {
          setJobs(resp.data);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-bold text-white">ML Optimization & Ingestion Job Queue</h1>
        <p className="text-sm text-slate-400 mt-1">Monitor real-time training jobs, statuses, and error tracebacks.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading jobs...</div>
        ) : (
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-4">Job ID</th>
                <th className="p-4">User</th>
                <th className="p-4">Status</th>
                <th className="p-4">Stage</th>
                <th className="p-4">Progress</th>
                <th className="p-4">Error / Notes</th>
                <th className="p-4">Started At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-mono text-blue-400">{job.id.substring(0, 12)}...</td>
                  <td className="p-4">{job.userId}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border uppercase ${
                        job.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : job.status === 'failed'
                          ? 'bg-red-500/20 text-red-400 border-red-500/30'
                          : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4">{job.stage || 'optimization'}</td>
                  <td className="p-4 font-semibold">{job.progress}%</td>
                  <td className="p-4 text-slate-400 max-w-xs truncate">{job.error || 'None'}</td>
                  <td className="p-4">{new Date(job.createdAt).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

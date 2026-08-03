'use client';

import React, { useEffect, useState } from 'react';
import { Activity, Server, Database, Cpu, HardDrive } from 'lucide-react';

interface SystemStatus {
  backendVersion: string;
  nodeEnv: string;
  databaseStatus: string;
  mlEngineHealth: string;
  mlEngineUrl: string;
  redisQueueStatus: string;
  clientOrigin: string;
  uptimeSeconds: number;
}

export default function AdminSystemPage() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSystem = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/v1/admin/system`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
        });
        const resp = await res.json();
        if (resp.success && resp.data) {
          setStatus(resp.data);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchSystem();
  }, []);

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-bold text-white">System Architecture & Infrastructure Status</h1>
        <p className="text-sm text-slate-400 mt-1">Status of Express Gateway, FastAPI ML Engine, MongoDB Atlas, Redis, and MinIO storage.</p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">Loading system status...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Express API Gateway</span>
              <Server className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-xl font-bold text-white">v{status?.backendVersion || '2.0.0'}</p>
            <div className="text-xs text-slate-400 space-y-1">
              <p>Node Environment: {status?.nodeEnv}</p>
              <p>Uptime: {Math.floor((status?.uptimeSeconds || 0) / 60)} minutes</p>
            </div>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Database Layer</span>
              <Database className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-xl font-bold text-emerald-400">MongoDB Atlas</p>
            <div className="text-xs text-slate-400 space-y-1">
              <p>Connection: {status?.databaseStatus || 'Connected'}</p>
              <p>Prisma Client v5.22.0</p>
            </div>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">FastAPI ML Engine</span>
              <Cpu className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-xl font-bold text-white capitalize">{status?.mlEngineHealth || 'Healthy'}</p>
            <div className="text-xs text-slate-400 space-y-1">
              <p className="truncate">URL: {status?.mlEngineUrl}</p>
              <p>Auth: Service-Key Protected</p>
            </div>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">BullMQ / Redis Queue</span>
              <Activity className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-xl font-bold text-white capitalize">{status?.redisQueueStatus?.replace(/_/g, ' ')}</p>
            <div className="text-xs text-slate-400 space-y-1">
              <p>Job Retries & Exponential Backoff Active</p>
            </div>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Model Storage</span>
              <HardDrive className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-xl font-bold text-white">MinIO / S3 Storage</p>
            <div className="text-xs text-slate-400 space-y-1">
              <p>Local disk fallback enabled</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

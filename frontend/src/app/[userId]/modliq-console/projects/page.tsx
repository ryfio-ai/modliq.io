'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FolderKanban,
  Plus,
  Play,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
  Edit2,
  FileSpreadsheet,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { usePipelineStore } from '@/store/pipelineStore';
import { apiFetch } from '@/lib/apiFetch';

interface Project {
  id: string;
  name: string;
  status: 'draft' | 'queued' | 'optimizing' | 'completed' | 'error';
  datasetId?: string | null;
  dataset?: { filename: string; totalRows?: number } | null;
  optimizationJobId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsPage({ params }: { params: Promise<{ userId: string }> }) {
  const resolvedParams = use(params);
  const userId = resolvedParams.userId;
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const { setProject, setDataset } = usePipelineStore();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/v1/projects');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setProjects(data.projects || []);
        }
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  const handleCreateProject = async () => {
    try {
      const res = await apiFetch('/api/v1/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `Project ${projects.length + 1}` }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.project) {
          router.push(`/${userId}/modliq-console/projects/${data.project.id}/data-upload`);
        }
      }
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  const handleRename = async (id: string) => {
    if (!editName.trim()) return;
    try {
      const res = await apiFetch(`/api/v1/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName }),
      });
      if (res.ok) {
        setProjects(projects.map((p) => (p.id === id ? { ...p, name: editName } : p)));
        setEditingId(null);
      }
    } catch (err) {
      console.error('Failed to rename project:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await apiFetch(`/api/v1/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const openProject = (proj: Project) => {
    setProject(proj.id, proj.name);
    if (proj.dataset?.filename) {
      setDataset(proj.dataset.filename, null, true);
    }

    let targetStep = 'data-upload';
    if (proj.status === 'completed') targetStep = 'results';
    else if (proj.status === 'optimizing' || proj.status === 'queued') targetStep = 'optimization-progress';
    else if (proj.datasetId) targetStep = 'goal';

    router.push(`/${userId}/modliq-console/projects/${proj.id}/${targetStep}`);
  };

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={12} /> Completed
          </span>
        );
      case 'optimizing':
      case 'queued':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 animate-pulse">
            <Clock size={12} /> {status === 'queued' ? 'Queued' : 'Optimizing...'}
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            <AlertCircle size={12} /> Error
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
            Draft
          </span>
        );
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1B2A4A] tracking-tight flex items-center gap-3">
            <FolderKanban className="text-[#2B70AB]" size={28} /> Projects Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your optimization projects, datasets, and concurrent runs independently.
          </p>
        </div>
        <button
          onClick={handleCreateProject}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2B70AB] text-white font-medium text-sm hover:bg-[#205887] transition-all shadow-sm shrink-0"
        >
          <Plus size={18} /> New Project
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <Loader2 className="animate-spin text-[#2B70AB] mb-3" size={32} />
          <p className="text-sm font-medium text-slate-500">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center p-16 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto text-[#2B70AB]">
            <FolderKanban size={32} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">No Projects Yet</h3>
            <p className="text-sm text-slate-500 mt-1">
              Create your first project to upload data and start optimizing yield.
            </p>
          </div>
          <button
            onClick={handleCreateProject}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2B70AB] text-white font-medium text-sm hover:bg-[#205887] transition-all"
          >
            <Plus size={18} /> Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Title & Status */}
                <div className="flex items-start justify-between gap-2">
                  {editingId === project.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleRename(project.id)}
                      onBlur={() => handleRename(project.id)}
                      autoFocus
                      className="text-base font-semibold text-slate-900 px-2 py-1 border border-blue-400 rounded-md focus:outline-none w-full"
                    />
                  ) : (
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => openProject(project)}>
                      <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#2B70AB] transition-colors truncate">
                        {project.name}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(project.id);
                          setEditName(project.name);
                        }}
                        className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit2 size={14} />
                      </button>
                    </div>
                  )}
                  {getStatusBadge(project.status)}
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs text-slate-500 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet size={14} className="text-slate-400 shrink-0" />
                    <span className="truncate">
                      {project.dataset?.filename || 'No dataset uploaded'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock size={14} className="shrink-0" />
                    <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => openProject(project)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-[#2B70AB] font-medium text-xs hover:bg-blue-50 transition-colors"
                >
                  Open Project <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

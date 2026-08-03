'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FolderKanban, Plus, ChevronDown, Check, Loader2 } from 'lucide-react';
import { usePipelineStore } from '@/store/pipelineStore';
import { apiFetch } from '@/lib/apiFetch';

interface Project {
  id: string;
  name: string;
  status: 'draft' | 'queued' | 'optimizing' | 'completed' | 'error';
  datasetId?: string | null;
  dataset?: { filename: string } | null;
  updatedAt: string;
}

interface ProjectSwitcherProps {
  userId?: string;
}

export default function ProjectSwitcher({ userId: propUserId }: ProjectSwitcherProps = {}) {
  const router = useRouter();
  const params = useParams();
  const userId = propUserId || (params.userId as string);
  const currentProjectId = params.projectId as string | undefined;

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { setProject, setDataset, setIntent } = usePipelineStore();

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
  }, [userId, currentProjectId]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeProject = projects.find((p) => p.id === currentProjectId) || projects[0];

  const handleSelectProject = (project: Project) => {
    setIsOpen(false);
    setProject(project.id, project.name);

    if (project.dataset?.filename) {
      setDataset(project.dataset.filename, null, true);
    }

    // Determine target step based on status
    let targetStep = 'data-upload';
    if (project.status === 'completed') targetStep = 'results';
    else if (project.status === 'optimizing' || project.status === 'queued') targetStep = 'optimization-progress';
    else if (project.datasetId) targetStep = 'goal';

    router.push(`/${userId}/modliq-console/projects/${project.id}/${targetStep}`);
  };

  const handleCreateProject = async () => {
    setIsOpen(false);
    try {
      setLoading(true);
      const res = await apiFetch('/api/v1/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `Project ${projects.length + 1}` }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.project) {
          setProjects([data.project, ...projects]);
          handleSelectProject(data.project);
        }
      }
    } catch (err) {
      console.error('Failed to create project:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
      >
        <FolderKanban size={16} className="text-[#2B70AB]" />
        <span className="truncate max-w-[140px]">
          {activeProject ? activeProject.name : 'Select Project'}
        </span>
        <ChevronDown size={14} className="text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl z-50 py-1 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Projects</span>
            <button
              onClick={() => router.push(`/${userId}/modliq-console/projects`)}
              className="text-xs text-[#2B70AB] hover:underline font-medium"
            >
              View All
            </button>
          </div>

          <div className="max-h-56 overflow-y-auto py-1">
            {loading && projects.length === 0 ? (
              <div className="flex items-center justify-center p-4 text-xs text-slate-400 gap-2">
                <Loader2 size={14} className="animate-spin text-[#2B70AB]" /> Loading...
              </div>
            ) : (
              projects.map((proj) => {
                const isSelected = proj.id === activeProject?.id;
                return (
                  <button
                    key={proj.id}
                    onClick={() => handleSelectProject(proj)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                      isSelected ? 'bg-blue-50 text-[#2B70AB] font-medium' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="truncate min-w-0 pr-2">
                      <p className="truncate">{proj.name}</p>
                      <p className="text-[10px] text-slate-400 capitalize">
                        {proj.status === 'optimizing' ? 'Optimizing...' : proj.status}
                      </p>
                    </div>
                    {isSelected && <Check size={14} className="text-[#2B70AB] shrink-0" />}
                  </button>
                );
              })
            )}
          </div>

          <div className="border-t border-slate-100 p-1">
            <button
              onClick={handleCreateProject}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-[#2B70AB] hover:bg-blue-50 transition-colors"
            >
              <Plus size={14} /> New Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

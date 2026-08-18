'use client';

import React, { useState, useEffect } from 'react';

export default function DataLabelingWorkspacePage({ params }: { params: { userId: string; projectId: string } }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [taskType, setTaskType] = useState('CLASSIFICATION');

  const fetchProjects = () => {
    fetch(`/api/v1/projects/${params.projectId}/labeling/projects`)
      .then((res) => res.json())
      .then((d) => setProjects(Array.isArray(d) ? d : []))
      .catch(() => {});
  };

  useEffect(() => {
    fetchProjects();
  }, [params.projectId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    try {
      await fetch(`/api/v1/projects/${params.projectId}/labeling/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, taskType, labels: ['Defective', 'Non-Defective', 'Requires Review'] }),
      });
      setName('');
      fetchProjects();
    } catch (err) {}
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-slate-100 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-sky-400">Data Labeling Workspace</h1>
        <p className="text-slate-400 text-sm mt-1">
          Create labeled dataset rows for defect classification, supplier risk tagging, QA pair creation, and document categorization.
        </p>
      </div>

      {/* New Labeling Project Form */}
      <form onSubmit={handleCreate} className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <h3 className="font-semibold text-slate-200 text-sm">Create New Labeling Project</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Project Name (e.g. Defect Risk Tagging)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
          />
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none"
          >
            <option value="CLASSIFICATION">Classification</option>
            <option value="REGRESSION">Regression Validation</option>
            <option value="QA_PAIR">RAG QA Pair Creation</option>
            <option value="DOCUMENT_TAGGING">Document Tagging</option>
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-lg transition-colors"
          >
            Create Project
          </button>
        </div>
      </form>

      {/* Labeling Projects List */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="font-semibold text-slate-200 mb-4">Active Labeling Projects</h3>
        <div className="space-y-3">
          {projects.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No labeling projects yet. Create one above to begin labeling dataset rows.
            </div>
          ) : (
            projects.map((p) => (
              <div key={p.id} className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-100">{p.name}</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">{p.publicId || p.id} &bull; {p.taskType}</div>
                </div>
                <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded">
                  {p.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

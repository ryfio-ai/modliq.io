'use client';

import React, { useEffect, useState } from 'react';
import TemplateSelector, { ModliqTemplateItem } from '@/components/templates/TemplateSelector';

export default function StandaloneTemplatesPage() {
  const [templates, setTemplates] = useState<ModliqTemplateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/v1/projects/default/templates/recommended`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
        });
        const data = await res.json();
        if (data.success && data.templates) {
          setTemplates(data.templates);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Standard Specifications</span>
        <h1 className="text-2xl font-bold text-white mt-1">Manufacturing Template Library</h1>
        <p className="text-sm text-slate-400 mt-1">
          Explore standard goal templates, quality specifications, SOP trial plans, control plans, and CAPA protocols across 7 manufacturing industries.
        </p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">Loading template library...</div>
      ) : (
        <TemplateSelector templates={templates} />
      )}
    </div>
  );
}

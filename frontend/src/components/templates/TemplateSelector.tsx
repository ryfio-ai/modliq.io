'use client';

import React, { useState } from 'react';
import { Search, SlidersHorizontal, Check, Sparkles, X, FileText } from 'lucide-react';

export interface ModliqTemplateItem {
  id: string;
  type: string;
  industry: string;
  title: string;
  description: string;
  suggestedGoal?: string;
  payload: any;
}

const INDUSTRIES = [
  'All Industries',
  'Specialty Chemicals',
  'Food Processing',
  'Pharma / Nutraceuticals',
  'Automotive Components',
  'Packaging / Plastics',
  'Textiles',
  'Biomanufacturing / Fermentation',
];

const CATEGORIES = [
  { label: 'All Categories', value: 'all' },
  { label: 'Goal Templates', value: 'goal' },
  { label: 'QC Specs', value: 'qc_spec' },
  { label: 'SOP / Trial Plans', value: 'sop_trial' },
  { label: 'Control Plans', value: 'control_plan' },
  { label: 'CAPA Protocols', value: 'capa' },
];

interface TemplateSelectorProps {
  templates: ModliqTemplateItem[];
  onSelectGoalTemplate?: (suggestedGoal: string, payload: any) => void;
  onClose?: () => void;
}

export default function TemplateSelector({
  templates,
  onSelectGoalTemplate,
  onClose,
}: TemplateSelectorProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All Industries');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredTemplates = templates.filter((t) => {
    const matchesIndustry =
      selectedIndustry === 'All Industries' || t.industry === selectedIndustry;
    const matchesCategory =
      selectedCategory === 'all' || t.type === selectedCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.suggestedGoal && t.suggestedGoal.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesIndustry && matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Modliq Sample Template Library</h3>
            <p className="text-xs text-slate-400">Select standard manufacturing goals, QC specs, and trial SOPs.</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search templates..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Industry Filter */}
        <select
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
        >
          {INDUSTRIES.map((ind) => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-1">
        {filteredTemplates.length === 0 ? (
          <div className="col-span-full p-8 text-center text-xs text-slate-500">
            No templates match the selected criteria.
          </div>
        ) : (
          filteredTemplates.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 rounded-xl space-y-3 transition flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold rounded-full uppercase">
                    {item.type.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-slate-500 truncate max-w-[120px]">{item.industry}</span>
                </div>

                <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition">{item.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{item.description}</p>
              </div>

              {item.suggestedGoal && onSelectGoalTemplate && (
                <button
                  onClick={() => onSelectGoalTemplate(item.suggestedGoal!, item.payload)}
                  className="w-full mt-2 py-1.5 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-blue-500/30"
                >
                  <Check className="w-3.5 h-3.5" /> Use Goal Template
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

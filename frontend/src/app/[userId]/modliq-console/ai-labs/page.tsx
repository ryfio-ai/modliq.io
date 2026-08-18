'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FlaskConical,
  FileText,
  Sparkles,
  Mic,
  CheckSquare,
  Receipt,
  ArrowRight,
  ShieldAlert,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export default function AiLabsHubPage() {
  const pathname = usePathname();
  const userId = pathname.split('/')[1] || 'demo_user';

  const labs = [
    {
      id: 'documind-rag',
      title: 'DocuMind RAG',
      status: 'Beta',
      icon: FileText,
      description: 'Upload PDF inspection specs or standard operating procedures and ask questions with verified page-level citations.',
      skills: ['RAG', 'Hybrid Search', 'Reranking', 'Qdrant', 'Embeddings', 'Page Citations'],
      href: `/${userId}/modliq-console/ai-labs/documind-rag`,
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      id: 'agent-task-pilot',
      title: 'Agent Task Pilot',
      status: 'Beta',
      icon: Sparkles,
      description: 'Bounded autonomous agent using LangGraph workflows. Plans actions and pauses for human approval before executing risky process updates.',
      skills: ['LangGraph', 'Agentic Workflows', 'Tool Registry', 'Human-in-the-loop', 'Approval Gates'],
      href: `/${userId}/modliq-console/ai-labs/agent-task-pilot`,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      id: 'voice-coach',
      title: 'Voice AI Coach',
      status: 'Beta',
      icon: Mic,
      description: 'Real-time interactive voice practice session for quality audits, viva exams, and technical interviews with mid-sentence interruption & text fallback.',
      skills: ['WebSockets', 'Whisper STT', 'TTS Streaming', 'Low Latency', 'Text Fallback'],
      href: `/${userId}/modliq-console/ai-labs/voice-coach`,
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    },
    {
      id: 'browser-autoqa',
      title: 'Browser AutoQA',
      status: 'Beta',
      icon: CheckSquare,
      description: 'Describe web application tests in plain English. Executes Playwright automation within strict allowlisted domains and files bug reports.',
      skills: ['Playwright', 'Gemini Vision', 'Allowlist Safety', 'Trace Capture', 'Bug Filing'],
      href: `/${userId}/modliq-console/ai-labs/browser-autoqa`,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      id: 'spendlens',
      title: 'SpendLens SaaS',
      status: 'Beta',
      icon: Receipt,
      description: 'AI-assisted receipt data extraction and spend analytics. Upload receipts, verify structured fields, and chat with validated spend metrics.',
      skills: ['OCR Extraction', 'Field Validation', 'Spend Dashboard', 'Spend Chat', 'Full-Stack SaaS'],
      href: `/${userId}/modliq-console/ai-labs/spendlens`,
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1B2A4A] via-[#2B70AB] to-[#1B2A4A] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold font-mono tracking-wide text-blue-200 backdrop-blur-xs">
            <FlaskConical size={14} className="text-amber-400" />
            <span>MODLIQER AI LABS — EXPERIMENTAL BETA MODULES</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Experimental AI Workflows &amp; Intelligence Showcase
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-3xl leading-relaxed">
            Explore advanced AI research modules — document intelligence, bounded agentic task planning, real-time voice coaching, domain-restricted browser QA, and receipt spend analytics. All modules run behind strict safety gates and rate limits.
          </p>
        </div>
      </div>

      {/* Safety & Beta Positioning Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900 shadow-xs">
        <ShieldAlert size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Beta Labs Positioning Guardrail:</p>
          <p className="text-amber-800 mt-0.5 leading-relaxed">
            AI Labs modules are experimental showcases separate from core MODLIQER manufacturing analytics and AutoML workflows. Sensitive operations require explicit human approval, and browser testing is strictly restricted to allowlisted staging domains.
          </p>
        </div>
      </div>

      {/* AI Labs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab) => {
          const Icon = lab.icon;
          return (
            <div
              key={lab.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#2B70AB]/50 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-[#2B70AB] group-hover:bg-blue-50 transition-colors">
                    <Icon size={22} />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase font-mono border ${lab.badgeColor}`}>
                    {lab.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2B70AB] transition-colors">
                    {lab.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {lab.description}
                  </p>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {lab.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold font-mono border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6">
                <Link
                  href={lab.href}
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#1B2A4A] text-white text-xs font-bold hover:bg-[#2B70AB] transition-colors shadow-xs"
                >
                  <span>Launch {lab.title}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import PublicNavbar from "@/components/marketing/PublicNavbar";
import PublicFooter from "@/components/marketing/PublicFooter";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'MODLIQER AI Tech Stack — Modular AI Infrastructure Primitives',
  description:
    'Explore MODLIQER’s YC-style modular AI tech stack primitives: data labeling, fine-tuning prep, model routing, vector search, RAG, evals, credential vault, and inference monitoring.',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/ai-tech-stack',
  },
};

export default function PublicAiTechStackPage() {
  const primitives = [
    { title: "Data Labeling Workspace", status: "BETA", desc: "Multi-modal tabular, defect, QA pair, and document tagging labeling workspace.", tag: "Data Prep" },
    { title: "Fine-Tuning Preparation", status: "BETA", desc: "Export labeled examples into OpenAI Chat JSONL, Instruction JSONL, or Classification JSONL formats.", tag: "Fine-Tuning" },
    { title: "Multi-Provider Model Router", status: "LIVE", desc: "Unified model routing across Groq, Gemini, NVIDIA, Cohere, and OpenRouter with fallback strategies.", tag: "Inference" },
    { title: "Agent Orchestration Engine", status: "BETA", desc: "State-machine agent task pilot with tool execution controls and human approval gates.", tag: "Agents" },
    { title: "Credential Vault & Isolation", status: "BETA", desc: "Server-side credential references ensuring raw API keys and database strings are never passed to agents or clients.", tag: "Security" },
    { title: "Vector Search Layer", status: "BETA", desc: "Qdrant vector collection management, chunk embeddings, and semantic similarity search.", tag: "Vector DB" },
    { title: "DocuMind RAG Engine", status: "BETA", desc: "Grounded retrieval-augmented generation with exact document page citations.", tag: "RAG" },
    { title: "Evaluation Studio", status: "BETA", desc: "RAG citation accuracy check, LLM answer quality evals, and agent task scorecards.", tag: "Evals" },
    { title: "Inference & Performance Monitor", status: "LIVE", desc: "Real-time tracking of LLM provider latency, failure rates, token usage, ML job times, and agent tool execution times.", tag: "Observability" },
    { title: "Agent Run Manager", status: "BETA", desc: "Audit view, tool execution logs, step retries, and approval history for agent runs.", tag: "Audit" },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen flex flex-col justify-between">
      <div>
        <PublicNavbar />

        <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-[#111827] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <span className="text-xs font-mono bg-indigo-950 text-indigo-300 border border-indigo-700 px-3 py-1 rounded-full uppercase tracking-wide">
              YC-Style Modular AI Layer
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Modular AI Tech Stack Infrastructure
            </h1>
            <p className="text-indigo-200 text-lg font-medium max-w-2xl mx-auto">
              Analyze data. Build models. Prove results — without code.
            </p>
            <p className="text-slate-400 text-sm max-w-3xl mx-auto">
              MODLIQER combines no-code user workflows with modular AI infrastructure layers: data labeling, model routing, vector search, RAG, agents, evaluation, and MLOps evidence.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-400">
              Last verified: 17/08/2026
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {primitives.map((p, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                        {p.tag}
                      </span>
                      {p.status === 'LIVE' ? (
                        <span className="text-xs font-semibold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">Live</span>
                      ) : (
                        <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full">Beta</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-[#1B2A4A]">{p.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>MODLIQER Primitive</span>
                    <span className="text-indigo-600 font-semibold">&bull; Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <PublicFooter />
    </div>
  );
}

import type { Metadata } from "next";
import PublicNavbar from "@/components/marketing/PublicNavbar";
import PublicFooter from "@/components/marketing/PublicFooter";
import SystemArchitectureDiagram from "@/components/marketing/SystemArchitectureDiagram";
import IndiaBadge from "@/components/marketing/IndiaBadge";

export const metadata: Metadata = {
  title: 'MODLIQER System Architecture — Dual-Stack AI & Machine Learning Platform',
  description:
    'MODLIQER architecture combines a Traditional ML Stack (tabular, AutoML, Optuna, SHAP, SPC) with a Generative AI & Agentic Stack (LLM Gateway, Qdrant, DocuMind RAG, LangGraph agents).',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/system-architecture',
  },
};

export default function SystemArchitecturePage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      <PublicNavbar />

      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-[#111827] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <IndiaBadge />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-4 mb-3">
            Dual-Stack AI & Machine Learning Architecture
          </h1>
          <p className="text-indigo-300 text-lg font-semibold mb-2">
            MODLIQER — Models, Operations, Data, Learning, Intelligence, Quality, Engineering & Research
          </p>
          <p className="text-slate-300 text-base max-w-3xl mx-auto">
            Analyze data. Build models. Prove results — without code.
          </p>
          <div className="mt-4 inline-block bg-indigo-950/80 border border-indigo-700 px-3 py-1 rounded text-xs text-indigo-300 font-mono">
            Last verified: 17/08/2026
          </div>
        </div>
      </section>

      {/* Dual Stack Architecture Overview */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B2A4A] mb-3">
              Dual-Stack Architectural Architecture
            </h2>
            <p className="text-slate-600 text-sm">
              MODLIQER explicitly formalizes classical predictive tabular ML alongside unstructured Generative AI and autonomous agentic state machines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#1B2A4A]">1. Traditional ML Stack</h3>
                <span className="text-xs font-semibold px-2.5 py-1 bg-sky-100 text-sky-800 rounded-full">Predictive & Manufacturing</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deterministic structured data processing, tabular modeling, SPC Quality Passports, and real-time process monitoring.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 font-mono">
                <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> Data: MongoDB Atlas, Postgres/Supabase connectors</li>
                <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> Frameworks: Scikit-Learn, AutoML Leaderboard, Optuna (Beta)</li>
                <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> Explainability: SHAP drivers & feature importances</li>
                <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> Registry: Joblib & ONNX export abstraction</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#1B2A4A]">2. Generative AI & Agentic Stack</h3>
                <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-full">Unstructured & Autonomous</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                LLM orchestration, retrieval-augmented generation, page-cited PDF search, and approval-gated agent state machines.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 font-mono">
                <li className="flex items-center gap-2"><span className="text-indigo-600 font-bold">✓</span> Gateway: Groq, Gemini, NVIDIA, Cohere, OpenRouter</li>
                <li className="flex items-center gap-2"><span className="text-indigo-600 font-bold">✓</span> Vector DB: Qdrant vector database (Beta)</li>
                <li className="flex items-center gap-2"><span className="text-indigo-600 font-bold">✓</span> RAG: DocuMind PDF extraction with page citations</li>
                <li className="flex items-center gap-2"><span className="text-indigo-600 font-bold">✓</span> Agents: Agent Task Pilot with human approval gates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Diagram */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h3 className="text-xl font-bold text-center text-[#1B2A4A] mb-8">Service Boundaries & Security Isolation Topology</h3>
          <SystemArchitectureDiagram />
        </div>
      </section>

      {/* Security Principles */}
      <section className="py-16 bg-[#F0F6FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-[#1B2A4A] mb-6 text-center">Security & Credential Isolation Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Frontend never calls ML or AI providers directly", desc: "All calls are mediated through the Express API Gateway." },
              { title: "Credential Vault isolation", desc: "Agents receive credential reference IDs only; raw secrets are never passed to agents or clients." },
              { title: "Vector DB protected", desc: "Qdrant vector search DB is never exposed to browser clients." },
              { title: "ML engine compute-only", desc: "FastAPI ML engine runs pure compute with service key authentication." },
              { title: "Grounded RAG citations", desc: "DocuMind answers cite exact document pages to prevent hallucinated claims." },
              { title: "Human approval gates", desc: "Risky agent actions require explicit user approval before execution." },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <h4 className="text-sm font-bold text-[#1B2A4A] mb-1">{s.title}</h4>
                <p className="text-xs text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
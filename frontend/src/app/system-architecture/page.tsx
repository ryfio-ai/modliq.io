import type { Metadata } from "next";
import PublicNavbar from "@/components/marketing/PublicNavbar";
import PublicFooter from "@/components/marketing/PublicFooter";
import SystemArchitectureDiagram from "@/components/marketing/SystemArchitectureDiagram";
import IndiaBadge from "@/components/marketing/IndiaBadge";

export const metadata: Metadata = {
  title: "System Architecture — Modliq Manufacturing Intelligence Platform",
  description: "Modliq system architecture: Next.js frontend, Express API Gateway, MongoDB Atlas, BullMQ + Redis queue, FastAPI ML Engine, AI Gateway, Cloudflare R2 storage, NextAuth.js / JWT auth.",
  openGraph: {
    title: "Modliq System Architecture",
    description: "See how Modliq's architecture secures your data with server-side API keys, encrypted connector credentials, and scoped project data.",
    type: "website",
    url: "https://modliq.io/system-architecture",
  },
};

export default function SystemArchitecturePage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      <PublicNavbar />

      <section className="bg-gradient-to-b from-white to-[#F0F6FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <IndiaBadge />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A] mt-4 mb-4">System Architecture</h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">Modliq is designed with security and scalability in mind. Frontend never talks directly to ML or AI providers.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SystemArchitectureDiagram />
        </div>
      </section>

      {/* Security Principles */}
      <section className="py-16 bg-[#F0F6FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-[#1B2A4A] mb-6 text-center">Security Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Frontend never talks directly to ML or AI providers", desc: "All ML and AI calls go through the Express API Gateway." },
              { title: "API keys remain server-side", desc: "AI provider keys are stored securely on the backend and never exposed to the browser." },
              { title: "Connector credentials encrypted", desc: "Database and storage connection strings are encrypted at rest and in transit." },
              { title: "ML compute endpoints protected by service key", desc: "The ML Engine only accepts requests authenticated with a service key." },
              { title: "Project data scoped by user and organization", desc: "Each project and its data are isolated by user and organization boundaries." },
              { title: "Audit logging on all data access", desc: "Every data read and write is logged for compliance and traceability." },
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
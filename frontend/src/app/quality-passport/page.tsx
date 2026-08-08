import type { Metadata } from 'next';
import Link from 'next/link';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import QualityPassportPreview from '@/components/marketing/QualityPassportPreview';
import { Award, Sparkles, ArrowRight, ShieldCheck, FileCheck, CheckCircle2, Share2, Download, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Modliq Quality Passport — Buyer-Ready Quality & Audit Proof',
  description:
    'Generate buyer-ready Quality Passports summarizing dataset health, Cpk process capability, trial SOPs, and supplier lot traceability for audit compliance.',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/quality-passport',
  },
};

export default function QualityPassportPage() {
  const features = [
    {
      title: 'Dataset Readiness Audit',
      desc: 'Includes 100-point data health score, row/column counts, outlier cleaning verification, and target leakage checks.',
    },
    {
      title: 'Process Capability Proof (Cp / Cpk)',
      desc: 'Automatic statistical calculation of process capability index (Cpk >= 1.33 / 1.67) and X-bar/R control chart stability.',
    },
    {
      title: 'Optimization Trial Log',
      desc: 'Detailed record of initial vs. recommended setpoints, physics constraint compliance, and validated yield gains.',
    },
    {
      title: 'Supplier Material Lot Traceability',
      desc: 'Links raw material batch numbers directly to batch yield and defect rates for full supply chain transparency.',
    },
    {
      title: 'Trial SOP Action Items',
      desc: 'Actionable step-by-step Standard Operating Procedures generated for plant operators during trial execution.',
    },
    {
      title: 'Shareable & Exportable',
      desc: 'Export to audit-ready PDF, Markdown summary, or generate a secure read-only URL for OEM buyers and auditors.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1B2A4A] font-sans antialiased">
      <PublicNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F0F6FA] via-white to-white py-16 sm:py-24 border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-[#2B70AB]">
            <Award className="w-3.5 h-3.5" />
            <span>Buyer-Ready Production Proof & Compliance</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1B2A4A] tracking-tight leading-tight max-w-4xl mx-auto">
            Certified Quality Passports for Buyers & Auditors
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Turn factory batch runs into immutable, buyer-ready Quality Passports. Combine dataset health, Cpk capability proof, optimization trial logs, and supplier lot traceability in one audit-ready document.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?interest=free-pilot"
              className="px-6 py-3.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md"
            >
              Apply for Free Pilot <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/workflow"
              className="px-6 py-3.5 bg-white hover:bg-[#F0F6FA] text-[#1B2A4A] border border-[#D0E2F0] rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
            >
              View 10-Step Workflow
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Quality Passport Preview */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B70AB] bg-[#F0F6FA] px-3.5 py-1 rounded-full border border-[#D0E2F0]">
              Document Preview
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A]">
              Inside a Modliq Quality Passport
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A comprehensive evidence report generated automatically upon trial completion.
            </p>
          </div>

          <QualityPassportPreview />
        </div>
      </section>

      {/* 6 Key Sections of Quality Passport */}
      <section className="py-16 sm:py-24 bg-[#F0F6FA] border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B70AB] bg-white px-3.5 py-1 rounded-full border border-[#D0E2F0]">
              Report Contents
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A]">
              What Makes Quality Passports Audit-Ready
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, idx) => (
              <div key={idx} className="p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2B70AB] font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-[#1B2A4A]">{f.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1B2A4A] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">Generate Your First Quality Passport</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Test Quality Passport generation on your plant telemetry during a 30-day free pilot.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?interest=free-pilot"
              className="px-7 py-3.5 bg-[#2B70AB] hover:bg-blue-600 text-white rounded-xl font-bold text-sm transition-all shadow-lg"
            >
              Apply for Free Pilot →
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

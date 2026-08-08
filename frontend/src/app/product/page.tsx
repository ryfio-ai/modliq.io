import type { Metadata } from 'next';
import Link from 'next/link';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import PlatformLayerVisual from '@/components/marketing/PlatformLayerVisual';
import {
  Sparkles,
  ArrowRight,
  Database,
  ShieldCheck,
  Cpu,
  BarChart3,
  Truck,
  FileCheck,
  Zap,
  Lock,
  Building2,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Modliq Product Overview — Manufacturing Intelligence Engine',
  description:
    'Explore the Modliq manufacturing intelligence platform: data ingestion, health scoring, AutoML process optimization, SPC Quality Studio, operations, and Quality Passports.',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/product',
  },
};

export default function ProductPage() {
  const pillars = [
    {
      icon: <Database className="w-6 h-6 text-[#2B70AB]" />,
      title: 'Universal Plant Ingestion',
      desc: 'Connect CSV/Excel files, SCADA exports, SQL databases, or IoT telemetry with zero pipeline configuration.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#2B70AB]" />,
      title: 'Dataset Health Scoring',
      desc: 'Automated 100-point data quality audit checking missing values, outliers, duplicate records, and target leakage.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#2B70AB]" />,
      title: 'Constrained Process AutoML',
      desc: 'Optimization models that recommend exact machine setpoints while respecting physical equipment safety bounds.',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#2B70AB]" />,
      title: 'Quality Studio & SPC Math',
      desc: 'Statistical Process Control with automatic X-bar/R control charts, Nelson rules, and Cp/Cpk capability metrics.',
    },
    {
      icon: <Truck className="w-6 h-6 text-[#2B70AB]" />,
      title: 'Supplier Risk & Traceability',
      desc: 'Link raw material lot numbers directly to batch yield outcomes and defect rates for vendor accountability.',
    },
    {
      icon: <FileCheck className="w-6 h-6 text-[#2B70AB]" />,
      title: 'Certified Quality Passports',
      desc: 'Generate audit-ready evidence reports summarizing data readiness, setpoint safety, and capability proof for buyers.',
    },
  ];

  const roles = [
    {
      title: 'Process & Manufacturing Engineers',
      points: [
        'No Python or data science required',
        'Natural-language optimization goal wizard',
        'Physical equipment bounds enforced',
        'SOP action items generated automatically',
      ],
    },
    {
      title: 'Quality Managers & QA Heads',
      points: [
        'Automatic Cp/Cpk process capability calculation',
        'Real-time Nelson rule SPC anomaly detection',
        'Audit-ready Quality Passports for OEM customers',
        'Supplier lot quality correlation tracking',
      ],
    },
    {
      title: 'Plant Directors & Operations VPs',
      points: [
        'Plant-wide yield improvement and scrap reduction',
        'OEE and energy consumption tracking',
        'Multi-plant benchmarking and project history',
        'Secure multi-tenant data isolation',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1B2A4A] font-sans antialiased">
      <PublicNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F0F6FA] via-white to-white py-16 sm:py-24 border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-[#2B70AB]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Manufacturing Intelligence Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1B2A4A] tracking-tight leading-tight max-w-4xl mx-auto">
            The Complete Product Platform for Factory Intelligence
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Modliq bridges the gap between raw plant telemetry and actionable operational decisions. From dataset health to constrained ML optimization and buyer-ready Quality Passports.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?interest=free-pilot"
              className="px-6 py-3.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md"
            >
              Apply for Free Pilot <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3.5 bg-white hover:bg-[#F0F6FA] text-[#1B2A4A] border border-[#D0E2F0] rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
            >
              View Pricing Tiers
            </Link>
          </div>
        </div>
      </section>

      {/* 6 Core Product Pillars */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B70AB] bg-[#F0F6FA] px-3.5 py-1 rounded-full border border-[#D0E2F0]">
              Product Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A]">
              Six Integrated Pillars of Factory Excellence
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Every module is designed specifically for manufacturing workflows—not generic business tables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border border-[#D0E2F0] rounded-2xl shadow-xs hover:border-[#2B70AB] transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1B2A4A]">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Layer Interactive Visual */}
      <section className="py-16 sm:py-24 bg-[#F0F6FA] border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B70AB] bg-white px-3.5 py-1 rounded-full border border-[#D0E2F0]">
              System Layering
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A]">
              How Modliq Operates Across Your Stack
            </h2>
          </div>

          <PlatformLayerVisual />
        </div>
      </section>

      {/* Persona Value Grid */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B70AB] bg-[#F0F6FA] px-3.5 py-1 rounded-full border border-[#D0E2F0]">
              Built For Your Team
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A]">
              Tailored Capabilities for Every Plant Role
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((r, idx) => (
              <div key={idx} className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#2B70AB]" />
                  <h3 className="text-base font-bold text-[#1B2A4A]">{r.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {r.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 bg-[#1B2A4A] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">Ready to Upgrade Your Factory Operations?</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Apply for our 30-day free pilot program. Zero setup fees and full platform access.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?interest=free-pilot"
              className="px-7 py-3.5 bg-[#2B70AB] hover:bg-blue-600 text-white rounded-xl font-bold text-sm transition-all shadow-lg"
            >
              Apply for Free Pilot →
            </Link>
            <Link
              href="/docs"
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm transition-all border border-white/20"
            >
              Read Technical Docs
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

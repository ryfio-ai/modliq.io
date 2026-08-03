'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Activity,
  Target,
  Cpu,
  Layers,
  BarChart3,
  Truck,
  TrendingUp,
  ChevronDown,
  Award,
  Zap,
  Globe,
  SlidersHorizontal,
  FileText,
  Lock,
  Building2,
  Check,
  Search,
  Database,
  LineChart,
  Settings,
  Shield,
  HelpCircle,
  Users,
  Factory,
  CheckSquare,
  RefreshCw,
  Share2,
  Workflow,
  AlertTriangle,
  Flame,
  Binary,
  Scale,
  Clock,
  LayoutGrid,
} from 'lucide-react';

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // JSON-LD Structured Data Objects
  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Qeltrava AI',
    url: 'https://qeltravaai.vercel.app/en',
    logo: 'https://modliq.vercel.app/logo%20modliq.png',
    sameAs: [
      'https://www.linkedin.com/company/qeltravai/',
      'https://www.instagram.com/qeltravaai',
    ],
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    product: {
      '@type': 'Product',
      name: 'Modliq',
      description: 'AI-assisted manufacturing intelligence platform made in Tamil Nadu, India.',
    },
  };

  const jsonLdSoftwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Modliq',
    operatingSystem: 'Web-based SaaS',
    applicationCategory: 'BusinessApplication',
    description:
      'Modliq helps manufacturers upload production data, optimize process settings, validate quality with SPC and Cp/Cpk, track OEE and supplier risk, and generate buyer-ready Quality Passports.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      description: 'Free Launch Pilot for first 10 selected manufacturing companies.',
    },
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Modliq built by AI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Modliq is built by people for manufacturers. AI is only an assistant inside the platform to help explain statistical outputs, draft CAPAs, and write SOPs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Modliq replace engineers or quality leaders?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Modliq supports engineers and quality teams with calculations, recommendations, and documentation. Engineers always review and approve recommendations before controlled plant trials.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need ERP or MES integration to start?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. You can start immediately by uploading production logs in CSV or Excel format.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I connect my database to Modliq?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Modliq supports direct connections to Supabase/Postgres and MongoDB databases via secure, read-only connectors.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are recommendations guaranteed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Modliq provides decision-support recommendations based on historical data. Recommendations must be validated through controlled trials before full production rollout.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a Quality Passport?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Quality Passport is a buyer-ready report that brings together dataset readiness, process capability (Cpk), optimization evidence, lot traceability, and improvement documentation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Modliq made in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Modliq is made in Tamil Nadu, India, by Qeltrava AI.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-[#1B2A4A] font-sans antialiased">
      {/* JSON-LD Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* 1. SEO-Friendly Sticky Navbar */}
      <PublicNavbar />

      {/* 2. Hero Section — Responsive & Product-Led */}
      <section id="product" className="bg-gradient-to-b from-[#F0F6FA] via-white to-white py-12 sm:py-20 border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Badge & Headlines */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-[#2B70AB] shadow-xs">
              <Globe className="w-3.5 h-3.5 text-[#2B70AB]" />
              <span>Made in Tamil Nadu, India · Manufacturing Intelligence Platform</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B2A4A] tracking-tight leading-[1.15]">
              Turn factory data into better decisions, validated quality, and buyer-ready proof.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Modliq helps manufacturing teams upload or connect production data, check dataset readiness, optimize process settings, validate quality, track operations and supplier risk, and generate Quality Passports.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact?interest=free-pilot"
                className="w-full sm:w-auto min-h-[44px] px-6 py-3.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/10 hover:shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-blue-200" /> Apply for Free Pilot
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto min-h-[44px] px-6 py-3.5 bg-white hover:bg-[#F0F6FA] text-[#1B2A4A] border border-[#D0E2F0] rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                Launch Demo <ArrowRight className="w-4 h-4 text-[#2B70AB]" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto min-h-[44px] px-5 py-3.5 bg-[#F0F6FA] hover:bg-slate-200 text-[#1B2A4A] border border-[#D0E2F0] rounded-xl text-sm font-semibold flex items-center justify-center transition-all"
              >
                Explore Features ↓
              </a>
            </div>

            <div className="pt-1 space-y-1">
              <p className="text-xs text-[#2B70AB] font-bold">
                Free launch pilot for the first 10 selected manufacturing companies.
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Built in Tamil Nadu by Qeltrava AI for Indian and global manufacturing teams.
              </p>
            </div>
          </div>

          {/* Product Dashboard Visual Mockup */}
          <div className="p-4 sm:p-6 bg-white border border-[#D0E2F0] rounded-3xl shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#D0E2F0] pb-4 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold text-[#1B2A4A] ml-2">
                  Modliq Console — Line 4 Batch Extrusion #802
                </span>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-full">
                Dataset Health & Setup Verified
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Workflow Rail */}
              <div className="lg:col-span-1 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl p-4 space-y-2">
                <span className="text-[10px] font-bold text-[#2B70AB] uppercase tracking-wider block mb-2">
                  Live Workflow State
                </span>
                {[
                  { label: 'Data Ingestion', status: 'Connected', icon: <Database className="w-3.5 h-3.5 text-emerald-600" /> },
                  { label: 'Dataset Health', status: '86/100 Ready', icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> },
                  { label: 'Goal Definition', status: 'Yield Max', icon: <Target className="w-3.5 h-3.5 text-[#2B70AB]" /> },
                  { label: 'Review Setup', status: 'Confirmed', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> },
                  { label: 'ML Optimization', status: 'Temp 87.5°C', icon: <Cpu className="w-3.5 h-3.5 text-[#2B70AB]" /> },
                  { label: 'Quality Studio', status: 'Cpk 1.41 Passed', icon: <Activity className="w-3.5 h-3.5 text-emerald-600" /> },
                ].map((w, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-xl border border-[#D0E2F0] text-xs">
                    <div className="flex items-center gap-2">
                      {w.icon}
                      <span className="font-semibold text-[#1B2A4A]">{w.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{w.status}</span>
                  </div>
                ))}
              </div>

              {/* Metric Cards Grid */}
              <div className="lg:col-span-3 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Dataset Readiness</span>
                    <p className="text-2xl font-bold text-[#1B2A4A]">86 / 100</p>
                    <span className="text-[10px] text-emerald-600 font-bold">Zero Target Leakage</span>
                  </div>
                  <div className="p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Expected Yield Gain</span>
                    <p className="text-2xl font-bold text-[#2B70AB]">+ 3.2 %</p>
                    <span className="text-[10px] text-slate-500">Estimated Gain</span>
                  </div>
                  <div className="p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Process Capability</span>
                    <p className="text-2xl font-bold text-emerald-600">Cpk 1.41</p>
                    <span className="text-[10px] text-slate-500">Six Sigma Capable</span>
                  </div>
                  <div className="p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Overall OEE Rate</span>
                    <p className="text-2xl font-bold text-[#1B2A4A]">78 %</p>
                    <span className="text-[10px] text-slate-500">Avail 88% • Perf 91%</span>
                  </div>
                  <div className="p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Supplier Lot Risk</span>
                    <p className="text-2xl font-bold text-amber-600">Medium Risk</p>
                    <span className="text-[10px] text-slate-500">Vendor Lot #B-402</span>
                  </div>
                  <div className="p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Audit Readiness</span>
                    <p className="text-2xl font-bold text-[#2B70AB]">82 / 100</p>
                    <span className="text-[10px] text-emerald-600 font-bold">Passport Ready</span>
                  </div>
                </div>

                {/* Quality Passport Preview Bar */}
                <div className="p-4 bg-[#1B2A4A] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-white block">Quality Passport Certificate #QP-2026-904</span>
                      <span className="text-[11px] text-slate-300 block">Verified Batch Capability & Process Evidence for Buyers</span>
                    </div>
                  </div>
                  <Link
                    href="/login"
                    className="min-h-[44px] px-4 py-2 bg-[#2B70AB] hover:bg-white hover:text-[#1B2A4A] text-white rounded-xl text-xs font-bold transition flex items-center justify-center shrink-0"
                  >
                    View Passport →
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Audience Section */}
      <section className="py-16 bg-white border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Target Manufacturing Roles</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1B2A4A]">
              Built for manufacturing teams who need decisions, not just dashboards.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                role: 'Factory Owners',
                icon: <Building2 className="w-5 h-5 text-[#2B70AB]" />,
                desc: 'Clear visibility into line yields, plant OEE, monthly scrap reduction, and financial ROI.',
              },
              {
                role: 'Plant Heads',
                icon: <Factory className="w-5 h-5 text-[#2B70AB]" />,
                desc: 'Cross-shift performance, equipment downtime pareto, and unified operational control.',
              },
              {
                role: 'Quality Managers',
                icon: <ShieldCheck className="w-5 h-5 text-[#2B70AB]" />,
                desc: 'Automated SPC control charts, Cp/Cpk capability math, AQL sampling, and buyer Quality Passports.',
              },
              {
                role: 'Process Engineers',
                icon: <SlidersHorizontal className="w-5 h-5 text-[#2B70AB]" />,
                desc: 'Dataset health validation, machine learning setpoint recommendations, and 7-batch trial SOPs.',
              },
              {
                role: 'Operations Managers',
                icon: <Activity className="w-5 h-5 text-[#2B70AB]" />,
                desc: 'Real-time OEE tracking, shift bottlenecks, and downtime root-cause analysis.',
              },
              {
                role: 'Supplier Quality Teams',
                icon: <Truck className="w-5 h-5 text-[#2B70AB]" />,
                desc: 'Material lot traceability, raw vendor defect correlation, and lot risk scoring.',
              },
            ].map((aud, idx) => (
              <div key={idx} className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-3 shadow-xs">
                <div className="w-10 h-10 bg-white rounded-xl border border-[#D0E2F0] flex items-center justify-center">
                  {aud.icon}
                </div>
                <h3 className="text-base font-bold text-[#1B2A4A]">{aud.role}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{aud.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Problem Section */}
      <section className="py-16 bg-[#F0F6FA] border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">The Problem We Solve</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1B2A4A]">
              Most factories already have data. The hard part is turning it into action.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Scattered Data Silos', desc: 'Production data is scattered across Excel files, PDFs, plant databases, and physical log sheets.' },
              { title: 'Hard-to-Isolate Yield Loss', desc: 'Yield loss and defect causes are hard to isolate across dozens of process variables.' },
              { title: 'Slow Manual Capability Math', desc: 'SPC control charts and Cp/Cpk capability reports take too long to compute manually.' },
              { title: 'Disconnected Operations & Quality', desc: 'Operations OEE, quality defect rates, and supplier lot data remain completely disconnected.' },
              { title: 'Painful Buyer Audit Prep', desc: 'Assembling audit documentation and quality proof for buyers is slow and stressful.' },
              { title: 'Generic AI Lacks Manufacturing Context', desc: 'Generic AI chatbots write generic text and cannot execute statistical engineering calculations.' },
            ].map((prob, idx) => (
              <div key={idx} className="p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-2 shadow-card">
                <span className="text-xs font-bold text-red-600 uppercase">Challenge 0{idx + 1}</span>
                <h3 className="text-base font-bold text-[#1B2A4A]">{prob.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{prob.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Available Features Matrix — 6 Grouped Cards */}
      <section id="features" className="py-20 bg-white border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Complete Feature Matrix</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1B2A4A]">
              Everything available in the Modliq platform.
            </h2>
            <p className="text-sm text-slate-600">
              Modliq combines data ingestion, dataset readiness, machine learning optimization, statistical quality, operations tracking, and trust evidence into one connected console.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Group A */}
            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-4">
              <div className="flex items-center gap-3 border-b border-[#D0E2F0] pb-3">
                <Database className="w-5 h-5 text-[#2B70AB]" />
                <h3 className="text-base font-bold text-[#1B2A4A]">A. Data & Ingestion</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> CSV & Excel file upload</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> PDF/Word table extraction</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Postgres & Supabase database connector</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> MongoDB connector</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Dataset preview & column profiling</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Module detection & import history</li>
              </ul>
            </div>

            {/* Group B */}
            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-4">
              <div className="flex items-center gap-3 border-b border-[#D0E2F0] pb-3">
                <ShieldCheck className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-bold text-[#1B2A4A]">B. Dataset Health & Setup</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Readiness score (0–100)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Missing value & outlier detection</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Target leakage warning engine</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Identifier column auto-filtering</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Industry goal template library</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Review & Confirm setup wizard</li>
              </ul>
            </div>

            {/* Group C */}
            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-4">
              <div className="flex items-center gap-3 border-b border-[#D0E2F0] pb-3">
                <Cpu className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-[#1B2A4A]">C. Process Optimization</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Natural language goal parsing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Constraint extraction & validation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Async optimization job queue</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Random Forest & Gradient Boosting</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Feature importance & safe ranges</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Financial ROI gain estimator</li>
              </ul>
            </div>

            {/* Group D */}
            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-4">
              <div className="flex items-center gap-3 border-b border-[#D0E2F0] pb-3">
                <Activity className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-[#1B2A4A]">D. Quality Engineering</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Quality Studio summary stats</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> I-MR control charts & center lines</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> SPC out-of-control rule detection</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Cp & Cpk capability calculations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> AQL acceptance sampling calculator</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> CAPA generation & control plans</li>
              </ul>
            </div>

            {/* Group E */}
            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-4">
              <div className="flex items-center gap-3 border-b border-[#D0E2F0] pb-3">
                <BarChart3 className="w-5 h-5 text-[#1B2A4A]" />
                <h3 className="text-base font-bold text-[#1B2A4A]">E. Operations / Supply / Lean</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> OEE math (Availability × Perf × Quality)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Equipment downtime Pareto analysis</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Supplier lot risk & yield correlation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Waste tracker & Kaizen action board</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 5S audit scoring checklist</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Takt time & Kanban calculators</li>
              </ul>
            </div>

            {/* Group F */}
            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-4">
              <div className="flex items-center gap-3 border-b border-[#D0E2F0] pb-3">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-[#1B2A4A]">F. Trust, AI & Reports</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Multi-provider AI Copilot gateway</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 7-batch trial SOP plan generation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Buyer Quality Passport certificates</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Audit readiness score (0–100)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Secure buyer share links & Markdown export</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Admin console & RBAC governance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Workflow Section — 10 Steps Timeline */}
      <section id="workflow" className="py-20 bg-[#F0F6FA] border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Guided End-to-End Workflow</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1B2A4A]">
              A guided workflow from data to buyer-ready evidence.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Create Project', input: 'Plant & line info', action: 'Initialize workspace', output: 'Active Project' },
              { step: '02', title: 'Upload Data', input: 'CSV/Excel/DB', action: 'Extract & profile', output: 'Raw Dataset' },
              { step: '03', title: 'Check Readiness', input: 'Raw Dataset', action: 'Scan missing & leakage', output: 'Health Score' },
              { step: '04', title: 'Define Goal', input: 'Text / Template', action: 'Parse optimization target', output: 'Target Intent' },
              { step: '05', title: 'Review & Confirm', input: 'Target Intent', action: 'Verify constraints & safety', output: 'Confirmed Config' },
              { step: '06', title: 'Run Optimization', input: 'Confirmed Config', action: 'Train ML surrogate models', output: 'Optimal Setpoints' },
              { step: '07', title: 'Quality Studio', input: 'Process samples', action: 'SPC charts & Cp/Cpk math', output: 'Stability Proof' },
              { step: '08', title: 'Track Ops & Lean', input: 'Downtime logs', action: 'OEE & Kaizen tracking', output: 'Action Plan' },
              { step: '09', title: 'Generate Trial SOP', input: 'Optimal setpoints', action: 'Draft 7-batch trial plan', output: 'Trial SOP' },
              { step: '10', title: 'Quality Passport', input: 'Project evidence', action: 'Compile buyer report', output: 'Quality Passport' },
            ].map((w, idx) => (
              <div key={idx} className="p-4 bg-white border border-[#D0E2F0] rounded-2xl space-y-2 shadow-xs">
                <span className="text-xs font-extrabold text-[#2B70AB]">{w.step}</span>
                <h3 className="text-xs font-bold text-[#1B2A4A]">{w.title}</h3>
                <div className="text-[10px] text-slate-500 space-y-0.5 border-t border-[#D0E2F0] pt-2">
                  <p><span className="font-bold text-[#1B2A4A]">Input:</span> {w.input}</p>
                  <p><span className="font-bold text-[#1B2A4A]">Action:</span> {w.action}</p>
                  <p className="text-[#2B70AB] font-bold">Output: {w.output}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Algorithm Transparency Section */}
      <section id="algorithms" className="py-20 bg-white border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Engineering Methods</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1B2A4A]">Engineering methods under the hood.</h2>
            <p className="text-sm text-slate-600">
              Modliq combines deterministic manufacturing calculations, statistical quality methods, machine learning, and AI-assisted interpretation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <span className="text-xs font-bold text-[#2B70AB] uppercase">Deterministic Math</span>
              <h3 className="text-sm font-bold text-[#1B2A4A]">SPC, Cp/Cpk & OEE Calculations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deterministic mathematical equations for I-MR control limits (x̄ ± 3σ), Cpk process capability indexes, and OEE (Availability × Performance × Quality). Zero LLM hallucinations.
              </p>
            </div>

            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <span className="text-xs font-bold text-[#2B70AB] uppercase">Machine Learning</span>
              <h3 className="text-sm font-bold text-[#1B2A4A]">Surrogate Process Models</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Random Forest and Gradient Boosting regressors trained on historical plant data to predict yield targets and calculate safe parameter trial ranges.
              </p>
            </div>

            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <span className="text-xs font-bold text-[#2B70AB] uppercase">AI Assistance</span>
              <h3 className="text-sm font-bold text-[#1B2A4A]">AI-Assisted Interpretations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multi-provider AI Copilot used strictly for summarizing statistical outputs, drafting CAPA responses, and writing 7-batch trial SOPs.
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-center text-xs font-bold text-[#1B2A4A]">
            Modliq Rule: AI explains and drafts. Modliq calculates. Engineers approve.
          </div>
        </div>
      </section>

      {/* 8. Quality Passport Section */}
      <section id="passport" className="py-20 bg-[#F0F6FA] border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Flagship Output</span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#1B2A4A]">The flagship output: Quality Passport.</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                The Modliq Quality Passport brings together dataset readiness, process capability (Cpk), optimization discipline, lot traceability, operations performance, and improvement evidence into a buyer-ready report.
              </p>

              <div className="pt-2">
                <Link
                  href="/login"
                  className="min-h-[44px] px-6 py-3 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 transition"
                >
                  <Award className="w-4 h-4" /> See Quality Passport →
                </Link>
              </div>
            </div>

            {/* Passport Mock Card */}
            <div className="p-8 bg-white border border-[#D0E2F0] rounded-3xl shadow-card space-y-6">
              <div className="flex items-center justify-between border-b border-[#D0E2F0] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1B2A4A] text-white rounded-xl flex items-center justify-center font-bold">
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#2B70AB] uppercase">Buyer-Ready Proof</span>
                    <h3 className="text-base font-bold text-[#1B2A4A]">Quality Passport</h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full">
                  Audit Readiness 82/100
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#F0F6FA] rounded-xl border border-[#D0E2F0]">
                  <span className="text-[11px] text-slate-500 block">Dataset Health</span>
                  <span className="font-bold text-[#1B2A4A]">Good (86/100)</span>
                </div>
                <div className="p-3 bg-[#F0F6FA] rounded-xl border border-[#D0E2F0]">
                  <span className="text-[11px] text-slate-500 block">Capability (Cpk)</span>
                  <span className="font-bold text-emerald-600">Cpk 1.41</span>
                </div>
                <div className="p-3 bg-[#F0F6FA] rounded-xl border border-[#D0E2F0]">
                  <span className="text-[11px] text-slate-500 block">Line OEE Rate</span>
                  <span className="font-bold text-[#1B2A4A]">78 %</span>
                </div>
                <div className="p-3 bg-[#F0F6FA] rounded-xl border border-[#D0E2F0]">
                  <span className="text-[11px] text-slate-500 block">Supplier Lot Risk</span>
                  <span className="font-bold text-amber-600">Medium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Why Modliq Is Different */}
      <section className="py-20 bg-white border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Clear Differentiation</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1B2A4A]">
              Different from BI tools, ERP systems, consultants, and generic AI chatbots.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">BI Dashboards</span>
              <h3 className="text-sm font-bold text-[#1B2A4A]">BI tools show charts.</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Modliq guides process decisions with optimization & SPC math.</p>
            </div>

            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">ERP / MES</span>
              <h3 className="text-sm font-bold text-[#1B2A4A]">ERP/MES records transactions.</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Modliq analyzes process performance, setpoints, and quality proof.</p>
            </div>

            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Consultants</span>
              <h3 className="text-sm font-bold text-[#1B2A4A]">Consultants give 1-time reports.</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Modliq creates repeatable software workflows across every line.</p>
            </div>

            <div className="p-6 bg-[#1B2A4A] text-white rounded-2xl space-y-2 border border-[#2B70AB] shadow-md">
              <span className="text-xs font-bold text-[#2B70AB] uppercase">Generic AI</span>
              <h3 className="text-sm font-bold text-white">Generic AI writes text.</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Modliq calculates, validates, and documents manufacturing evidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Indian Manufacturing Use Cases */}
      <section className="py-20 bg-[#F0F6FA] border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Indian Manufacturing Reality</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1B2A4A]">Designed for Indian manufacturing realities.</h2>
            <p className="text-xs text-slate-600">
              Built in Tamil Nadu — a state known for automotive, textiles, engineering, electronics, chemicals, food processing, and industrial manufacturing clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { industry: 'Specialty Chemicals', desc: 'Batch yield optimization, raw material variance, and 7-batch trial SOPs.' },
              { industry: 'Food Processing', desc: 'Moisture tracking, defect rates, supplier lot risk, and export Quality Passports.' },
              { industry: 'Pharma / Nutraceuticals', desc: 'Assay, pH, compression force limits, Cpk capability, and CAPA evidence.' },
              { industry: 'Automotive Components', desc: 'Machining rejection rates, Cpk capability, and OEM audit readiness.' },
              { industry: 'Textiles', desc: 'Dyeing consistency, liquor ratios, rework rates, and fabric finishing stability.' },
              { industry: 'Packaging / Plastics', desc: 'Extrusion scrap reduction, barrel temperatures, cycle times, and OEE.' },
              { industry: 'Biomanufacturing', desc: 'Fermentation yield, dissolved oxygen control, and batch release proof.' },
              { industry: 'Precision Manufacturing', desc: 'Dimensional tolerance tracking, I-MR control limits, and zero-defect proof.' },
            ].map((ind, idx) => (
              <div key={idx} className="p-5 bg-white border border-[#D0E2F0] rounded-2xl space-y-2 shadow-xs">
                <span className="text-xs font-bold text-[#2B70AB] uppercase">{ind.industry}</span>
                <p className="text-xs text-slate-600 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Free Pilot Section */}
      <section className="py-20 bg-white border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-[#F0F6FA] border border-[#2B70AB]/30 rounded-3xl p-8 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D0E2F0] pb-6">
              <div>
                <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Limited Launch Pilot</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2A4A] mt-0.5">
                  Free launch pilot for the first 10 selected manufacturing companies.
                </h2>
              </div>
              <span className="px-3.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold rounded-full shrink-0">
                10 Slots Open
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              We are selecting 10 manufacturing teams to use Modliq during the launch pilot. Selected companies get access to the platform, guided onboarding, and a review session.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-xl border border-[#D0E2F0] text-xs space-y-1">
                <span className="font-bold text-[#1B2A4A] block">1. Production Data</span>
                <span className="text-slate-500">Have data in CSV, Excel, or DB.</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#D0E2F0] text-xs space-y-1">
                <span className="font-bold text-[#1B2A4A] block">2. Measurable Problem</span>
                <span className="text-slate-500">Yield loss, defect rate, or OEE issue.</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#D0E2F0] text-xs space-y-1">
                <span className="font-bold text-[#1B2A4A] block">3. Controlled Trials</span>
                <span className="text-slate-500">Willing to test setpoints safely.</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#D0E2F0] text-xs space-y-1">
                <span className="font-bold text-[#1B2A4A] block">4. Feedback Partner</span>
                <span className="text-slate-500">Provide product feedback.</span>
              </div>
            </div>

            <div className="pt-2 text-right">
              <Link
                href="/contact?interest=free-pilot"
                className="min-h-[44px] px-6 py-3 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4" /> Apply for Free Pilot →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 12. ROI Preview Section */}
      <section className="py-20 bg-[#F0F6FA] border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="bg-white border border-[#D0E2F0] rounded-3xl p-8 shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-lg">
              <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Financial Impact</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2A4A]">Estimate the value of better process decisions.</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modliq calculates the bottom-line financial return of yield improvements and defect cuts.
              </p>
              <div className="pt-2">
                <Link
                  href="/roi"
                  className="min-h-[44px] px-6 py-3 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 transition"
                >
                  <TrendingUp className="w-4 h-4" /> Calculate Your Plant ROI →
                </Link>
              </div>
            </div>

            <div className="w-full max-w-md p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#D0E2F0] pb-2 font-bold text-[#1B2A4A]">
                <span>Monthly Production</span>
                <span>50,000 units</span>
              </div>
              <div className="flex justify-between border-b border-[#D0E2F0] pb-2 font-bold text-emerald-600">
                <span>Yield Improvement</span>
                <span>+ 2.5 %</span>
              </div>
              <div className="flex justify-between border-b border-[#D0E2F0] pb-2 font-bold text-[#1B2A4A]">
                <span>Additional Good Units</span>
                <span>1,250 units</span>
              </div>
              <div className="flex justify-between border-b border-[#D0E2F0] pb-2 font-bold text-[#1B2A4A]">
                <span>Unit Contribution</span>
                <span>₹80 / unit</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-extrabold text-[#2B70AB]">
                <span>Estimated Monthly Savings</span>
                <span>₹1,00,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Pricing Preview Section (INR) */}
      <section id="pricing" className="py-20 bg-white border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Pilot & Enterprise Plans</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1B2A4A]">Start with a pilot. Scale plant by plant.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-[#F0F6FA] border-2 border-[#2B70AB] rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-2">
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold rounded-full uppercase">
                  10 Slots Open
                </span>
                <h3 className="text-lg font-bold text-[#1B2A4A]">Launch Pilot</h3>
                <p className="text-3xl font-extrabold text-[#2B70AB]">₹0</p>
                <p className="text-xs text-slate-500">Free for first 10 selected companies.</p>
              </div>
              <Link
                href="/contact?interest=free-pilot"
                className="w-full min-h-[44px] py-2 bg-[#2B70AB] text-white rounded-xl text-xs font-bold text-center flex items-center justify-center hover:bg-[#1B2A4A] transition"
              >
                Apply for Free Pilot
              </Link>
            </div>

            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-4 shadow-card flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#1B2A4A]">Paid Pilot</h3>
                <p className="text-3xl font-extrabold text-[#1B2A4A]">₹99,000</p>
                <p className="text-xs text-slate-500">30-day single line pilot program.</p>
              </div>
              <Link
                href="/contact?interest=pilot"
                className="w-full min-h-[44px] py-2 bg-white text-[#1B2A4A] border border-[#D0E2F0] rounded-xl text-xs font-bold text-center flex items-center justify-center hover:bg-slate-200 transition"
              >
                Book Pilot
              </Link>
            </div>

            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-4 shadow-card flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#1B2A4A]">Pro Plant</h3>
                <p className="text-3xl font-extrabold text-[#1B2A4A]">₹49,000 <span className="text-xs font-normal text-slate-500">/ mo</span></p>
                <p className="text-xs text-slate-500">Per plant / month unlimited users.</p>
              </div>
              <Link
                href="/contact?interest=pro"
                className="w-full min-h-[44px] py-2 bg-white text-[#1B2A4A] border border-[#D0E2F0] rounded-xl text-xs font-bold text-center flex items-center justify-center hover:bg-slate-200 transition"
              >
                Contact Sales
              </Link>
            </div>

            <div className="p-6 bg-[#1B2A4A] text-white border border-[#1B2A4A] rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Enterprise</h3>
                <p className="text-3xl font-extrabold text-[#2B70AB]">Custom</p>
                <p className="text-xs text-slate-300">Multi-plant & dedicated support.</p>
              </div>
              <Link
                href="/contact?interest=enterprise"
                className="w-full min-h-[44px] py-2 bg-[#2B70AB] text-white rounded-xl text-xs font-bold text-center flex items-center justify-center hover:bg-white hover:text-[#1B2A4A] transition"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FAQ Section */}
      <section className="py-20 bg-[#F0F6FA] border-b border-[#D0E2F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Engineered Support</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2A4A]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {jsonLdFaq.mainEntity.map((faq, idx) => (
              <div key={idx} className="p-5 bg-white border border-[#D0E2F0] rounded-2xl space-y-2 shadow-xs">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full min-h-[44px] text-left font-bold text-sm text-[#1B2A4A] flex items-center justify-between"
                >
                  <span>{faq.name}</span>
                  <ChevronDown className={`w-4 h-4 text-[#2B70AB] transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-[#D0E2F0]">
                    {faq.acceptedAnswer.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Final CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-[#1B2A4A] to-[#2B70AB] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="px-3.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold rounded-full inline-block">
            Human-Engineered Manufacturing Software
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Bring your factory data. Turn it into decisions.
          </h2>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Apply for the free launch pilot or explore the demo to see how Modliq helps factories move from scattered data to better decisions, validated quality, and buyer-ready proof.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?interest=free-pilot"
              className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 bg-white text-[#1B2A4A] hover:bg-[#F0F6FA] text-sm font-extrabold rounded-xl transition shadow-lg flex items-center justify-center"
            >
              Apply for Free Pilot →
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 bg-transparent border-2 border-white/80 hover:bg-white/10 text-white text-sm font-bold rounded-xl transition flex items-center justify-center"
            >
              Launch Demo
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto min-h-[44px] px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl transition flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}
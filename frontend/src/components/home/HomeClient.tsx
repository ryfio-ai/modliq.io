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
  Activity,
  Target,
  Cpu,
  BarChart3,
  Truck,
  TrendingUp,
  ChevronDown,
  Award,
  Globe,
  SlidersHorizontal,
  Building2,
  Database,
  Factory,
} from 'lucide-react';

export default function HomeClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: 'What is Modliq?',
      a: 'Modliq is a manufacturing intelligence platform made in Tamil Nadu, India by Qeltrava AI. It helps factory teams turn production data into process decisions, validated quality, and buyer-ready Quality Passports.',
    },
    {
      q: 'Who is Modliq built for?',
      a: 'Modliq is built for factory owners, plant heads, quality managers, process engineers, operations managers, and supplier quality teams in chemical, food, pharma, automotive, textile, plastic, and precision manufacturing.',
    },
    {
      q: 'How does Modliq optimize process settings?',
      a: 'Modliq parses process goals, checks dataset health, trains machine learning models on historical plant data, predicts yield targets, and outputs safe parameter trial ranges and 7-batch trial SOPs.',
    },
    {
      q: 'What is a Quality Passport?',
      a: 'A Quality Passport is a buyer-ready report that brings together dataset readiness, process capability (Cpk), optimization evidence, lot traceability, and improvement documentation.',
    },
    {
      q: 'Is Modliq made in India?',
      a: 'Yes. Modliq is made in Tamil Nadu, India, by Qeltrava AI.',
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-[#1B2A4A] font-sans antialiased">
      {/* 1. SEO-Friendly Sticky Navbar */}
      <PublicNavbar />

      {/* 2. Hero Section */}
      <section id="product" className="w-full bg-gradient-to-b from-[#F0F6FA] via-white to-white py-8 sm:py-16 md:py-20 border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          
          {/* Badge & Headlines */}
          <div className="text-center max-w-4xl mx-auto space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 bg-blue-50 border border-blue-200 rounded-full text-[11px] sm:text-xs font-bold text-[#2B70AB] shadow-xs max-w-full truncate">
              <Globe className="w-3.5 h-3.5 text-[#2B70AB] shrink-0" />
              <span className="truncate">Made in Tamil Nadu, India · Manufacturing Intelligence Platform</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1B2A4A] tracking-tight leading-[1.18] break-words">
              Turn factory data into better decisions, validated quality, and buyer-ready proof.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Modliq helps manufacturing teams upload or connect production data, check dataset readiness, optimize process settings, validate quality, track operations and supplier risk, and generate Quality Passports.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full">
              <Link
                href="/contact?interest=free-pilot"
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/10 hover:shadow-lg text-center"
              >
                <Sparkles className="w-4 h-4 text-blue-200 shrink-0" /> Apply for Free Pilot
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 bg-white hover:bg-[#F0F6FA] text-[#1B2A4A] border border-[#D0E2F0] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs text-center"
              >
                Launch Demo <ArrowRight className="w-4 h-4 text-[#2B70AB] shrink-0" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto min-h-[44px] px-5 py-3 bg-[#F0F6FA] hover:bg-slate-200 text-[#1B2A4A] border border-[#D0E2F0] rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center transition-all text-center"
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

          {/* Dashboard Visual Mockup */}
          <div className="w-full overflow-hidden p-3 sm:p-6 bg-white border border-[#D0E2F0] rounded-2xl sm:rounded-3xl shadow-card space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#D0E2F0] pb-3 sm:pb-4 gap-2">
              <div className="flex items-center gap-2 max-w-full overflow-hidden">
                <div className="w-3 h-3 rounded-full bg-red-400 shrink-0" />
                <div className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
                <div className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-[#1B2A4A] ml-1 sm:ml-2 truncate">
                  Modliq Console — Line 4 Batch Extrusion #802
                </span>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-full shrink-0">
                Dataset Health & Setup Verified
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Left Workflow Rail */}
              <div className="lg:col-span-1 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-2">
                <span className="text-[10px] font-bold text-[#2B70AB] uppercase tracking-wider block mb-2">
                  Live Workflow State
                </span>
                {[
                  { label: 'Data Ingestion', status: 'Connected', icon: <Database className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> },
                  { label: 'Dataset Health', status: '86/100 Ready', icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> },
                  { label: 'Goal Definition', status: 'Yield Max', icon: <Target className="w-3.5 h-3.5 text-[#2B70AB] shrink-0" /> },
                  { label: 'Review Setup', status: 'Confirmed', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> },
                  { label: 'ML Optimization', status: 'Temp 87.5°C', icon: <Cpu className="w-3.5 h-3.5 text-[#2B70AB] shrink-0" /> },
                  { label: 'Quality Studio', status: 'Cpk 1.41 Passed', icon: <Activity className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> },
                ].map((w, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-xl border border-[#D0E2F0] text-xs">
                    <div className="flex items-center gap-2">
                      {w.icon}
                      <span className="font-semibold text-[#1B2A4A] truncate">{w.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 shrink-0">{w.status}</span>
                  </div>
                ))}
              </div>

              {/* Metric Cards Grid */}
              <div className="lg:col-span-3 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="p-3.5 sm:p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl sm:rounded-2xl space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Dataset Readiness</span>
                    <p className="text-xl sm:text-2xl font-bold text-[#1B2A4A]">86 / 100</p>
                    <span className="text-[10px] text-emerald-600 font-bold">Zero Target Leakage</span>
                  </div>
                  <div className="p-3.5 sm:p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl sm:rounded-2xl space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Expected Yield Gain</span>
                    <p className="text-xl sm:text-2xl font-bold text-[#2B70AB]">+ 3.2 %</p>
                    <span className="text-[10px] text-slate-500">Estimated Gain</span>
                  </div>
                  <div className="p-3.5 sm:p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl sm:rounded-2xl space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Process Capability</span>
                    <p className="text-xl sm:text-2xl font-bold text-emerald-600">Cpk 1.41</p>
                    <span className="text-[10px] text-slate-500">Six Sigma Capable</span>
                  </div>
                  <div className="p-3.5 sm:p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl sm:rounded-2xl space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Overall OEE Rate</span>
                    <p className="text-xl sm:text-2xl font-bold text-[#1B2A4A]">78 %</p>
                    <span className="text-[10px] text-slate-500">Avail 88% • Perf 91%</span>
                  </div>
                  <div className="p-3.5 sm:p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl sm:rounded-2xl space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Supplier Lot Risk</span>
                    <p className="text-xl sm:text-2xl font-bold text-amber-600">Medium Risk</p>
                    <span className="text-[10px] text-slate-500">Vendor Lot #B-402</span>
                  </div>
                  <div className="p-3.5 sm:p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl sm:rounded-2xl space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Audit Readiness</span>
                    <p className="text-xl sm:text-2xl font-bold text-[#2B70AB]">82 / 100</p>
                    <span className="text-[10px] text-emerald-600 font-bold">Passport Ready</span>
                  </div>
                </div>

                {/* Quality Passport Preview Bar */}
                <div className="p-3.5 sm:p-4 bg-[#1B2A4A] text-white rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-white block">Quality Passport Certificate #QP-2026-904</span>
                      <span className="text-[11px] text-slate-300 block">Verified Batch Capability & Process Evidence for Buyers</span>
                    </div>
                  </div>
                  <Link
                    href="/login"
                    className="w-full sm:w-auto min-h-[44px] px-4 py-2 bg-[#2B70AB] hover:bg-white hover:text-[#1B2A4A] text-white rounded-xl text-xs font-bold transition flex items-center justify-center shrink-0 text-center"
                  >
                    View Passport →
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. AEO Answer Engine Quick Answers Section */}
      <section id="quick-answers" className="w-full py-12 sm:py-16 bg-white border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Answer Engine Optimization</span>
            <h2 className="text-xl sm:text-3xl font-bold text-[#1B2A4A]">Quick Answers about Modliq</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="p-5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <h3 className="text-base font-bold text-[#1B2A4A]">What is Modliq?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modliq is a manufacturing intelligence platform that helps factories turn production data into process optimization insights, quality validation, operations visibility, supplier risk analysis, and buyer-ready Quality Passports.
              </p>
            </article>

            <article className="p-5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <h3 className="text-base font-bold text-[#1B2A4A]">Who is Modliq for?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modliq is for manufacturing teams, plant heads, quality managers, process engineers, operations managers, supplier quality teams, and Indian MSME manufacturers.
              </p>
            </article>

            <article className="p-5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <h3 className="text-base font-bold text-[#1B2A4A]">What problem does Modliq solve?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modliq helps manufacturers reduce manual analysis, improve quality visibility, validate process settings, track operations and supplier risks, and create audit-ready manufacturing evidence.
              </p>
            </article>

            <article className="p-5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-2">
              <h3 className="text-base font-bold text-[#1B2A4A]">What is a Quality Passport?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A Quality Passport is a buyer-ready report generated by Modliq that summarizes dataset readiness, process capability, SPC stability, optimization discipline, supplier traceability, and improvement evidence.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 4. Audience Section */}
      <section className="w-full py-12 sm:py-16 bg-[#F0F6FA] border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Target Manufacturing Roles</span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#1B2A4A]">
              Built for manufacturing teams who need decisions, not just dashboards.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { role: 'Factory Owners', icon: <Building2 className="w-5 h-5 text-[#2B70AB]" />, desc: 'Clear visibility into line yields, plant OEE, monthly scrap reduction, and financial ROI.' },
              { role: 'Plant Heads', icon: <Factory className="w-5 h-5 text-[#2B70AB]" />, desc: 'Cross-shift performance, equipment downtime pareto, and unified operational control.' },
              { role: 'Quality Managers', icon: <ShieldCheck className="w-5 h-5 text-[#2B70AB]" />, desc: 'Automated SPC control charts, Cp/Cpk capability math, AQL sampling, and buyer Quality Passports.' },
              { role: 'Process Engineers', icon: <SlidersHorizontal className="w-5 h-5 text-[#2B70AB]" />, desc: 'Dataset health validation, machine learning setpoint recommendations, and 7-batch trial SOPs.' },
              { role: 'Operations Managers', icon: <Activity className="w-5 h-5 text-[#2B70AB]" />, desc: 'Real-time OEE tracking, shift bottlenecks, and downtime root-cause analysis.' },
              { role: 'Supplier Quality Teams', icon: <Truck className="w-5 h-5 text-[#2B70AB]" />, desc: 'Material lot traceability, raw vendor defect correlation, and lot risk scoring.' },
            ].map((aud, idx) => (
              <div key={idx} className="p-5 sm:p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-3 shadow-xs">
                <div className="w-10 h-10 bg-[#F0F6FA] rounded-xl border border-[#D0E2F0] flex items-center justify-center">
                  {aud.icon}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#1B2A4A]">{aud.role}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{aud.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Features Section */}
      <section id="features" className="w-full py-16 sm:py-20 bg-white border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Complete Feature Matrix</span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#1B2A4A]">
              Everything available in the Modliq platform.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-[#1B2A4A]">Data & Ingestion</h3>
              <p className="text-xs text-slate-600">CSV, Excel, PDF/Word table extraction, PostgreSQL, Supabase, and MongoDB database connectors.</p>
            </div>
            <div className="p-5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-[#1B2A4A]">Dataset Health & Setup</h3>
              <p className="text-xs text-slate-600">Readiness score (0-100), missing value scans, target leakage detection, and review wizard.</p>
            </div>
            <div className="p-5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-[#1B2A4A]">Process Optimization</h3>
              <p className="text-xs text-slate-600">Goal parsing, Random Forest/Gradient Boosting ML surrogates, safe trial ranges, and ROI estimation.</p>
            </div>
            <div className="p-5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-[#1B2A4A]">Quality Studio</h3>
              <p className="text-xs text-slate-600">I-MR control charts, Cp/Cpk capability math, AQL sampling plans, and automated CAPA generation.</p>
            </div>
            <div className="p-5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-[#1B2A4A]">Operations & OEE</h3>
              <p className="text-xs text-slate-600">OEE calculation (Avail × Perf × Qual), downtime Pareto charts, supplier lot risk, and 5S/Kaizen tools.</p>
            </div>
            <div className="p-5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-[#1B2A4A]">Quality Passport</h3>
              <p className="text-xs text-slate-600">Buyer-ready PDF/Markdown exports and secure external share links for OEM audit readiness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Pricing Section */}
      <section id="pricing" className="w-full py-16 sm:py-20 bg-[#F0F6FA] border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Pricing Plans</span>
            <h2 className="text-xl sm:text-3xl font-bold text-[#1B2A4A]">Modliq Pricing in INR</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white border-2 border-[#2B70AB] rounded-2xl space-y-3">
              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full">10 Slots Open</span>
              <h3 className="text-base font-bold text-[#1B2A4A]">Launch Pilot</h3>
              <p className="text-2xl font-extrabold text-[#2B70AB]">₹0</p>
              <p className="text-xs text-slate-500">Free for first 10 selected companies.</p>
            </div>
            <div className="p-5 bg-white border border-[#D0E2F0] rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-[#1B2A4A]">Paid Pilot</h3>
              <p className="text-2xl font-extrabold text-[#1B2A4A]">₹99,000</p>
              <p className="text-xs text-slate-500">30-day single line pilot program.</p>
            </div>
            <div className="p-5 bg-white border border-[#D0E2F0] rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-[#1B2A4A]">Pro Plant</h3>
              <p className="text-2xl font-extrabold text-[#1B2A4A]">₹49,000 / mo</p>
              <p className="text-xs text-slate-500">Per plant / month unlimited users.</p>
            </div>
            <div className="p-5 bg-[#1B2A4A] text-white rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-white">Enterprise</h3>
              <p className="text-2xl font-extrabold text-[#2B70AB]">Custom</p>
              <p className="text-xs text-slate-300">Multi-plant & dedicated support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="w-full py-16 sm:py-20 bg-white border-b border-[#D0E2F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Engineered Support</span>
            <h2 className="text-xl sm:text-3xl font-bold text-[#1B2A4A]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((faq, idx) => (
              <div key={idx} className="p-4 sm:p-5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl sm:rounded-2xl space-y-2 shadow-xs">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full min-h-[44px] text-left font-bold text-xs sm:text-sm text-[#1B2A4A] flex items-center justify-between gap-2"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#2B70AB] shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-[#D0E2F0]">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}

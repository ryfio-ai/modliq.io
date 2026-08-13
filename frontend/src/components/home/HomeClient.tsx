'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import NoCodeWorkflowVisual from '@/components/marketing/NoCodeWorkflowVisual';
import NoCodeMeansSection from '@/components/marketing/NoCodeMeansSection';
import PlatformLayerVisual from '@/components/marketing/PlatformLayerVisual';
import InteractiveWorkflowTabs from '@/components/marketing/InteractiveWorkflowTabs';
import QualityPassportPreview from '@/components/marketing/QualityPassportPreview';
import AlgorithmTransparencyGrid from '@/components/marketing/AlgorithmTransparencyGrid';
import AutoMLComparisonTable from '@/components/marketing/AutoMLComparisonTable';
import RoiCalculatorWidget from '@/components/marketing/RoiCalculatorWidget';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Globe,
  Factory,
  GraduationCap,
  BookOpen,
  School,
  FileSpreadsheet,
  Layers,
  Cpu,
  Users,
  ChevronDown,
  Check,
  Award,
} from 'lucide-react';

export default function HomeClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: 'Do I need a data scientist or programming skills to use Modliq?',
      a: 'No. Modliq is designed to reduce technical friction for manufacturing teams, educators, students, and research scholars without requiring Python, SQL, or custom data science setups. Humans remain in full control of setup and decisions.',
    },
    {
      q: 'Does Modliq replace teachers, engineers, or data scientists?',
      a: 'No. Modliq supports learning and decision-making, automates repetitive analysis workflows, and helps teams get started without coding. It keeps humans in control and does not replace teachers, researchers, engineers, or data scientists.',
    },
    {
      q: 'How does Modliq serve Manufacturing Industries?',
      a: 'For manufacturing, Modliq turns factory production logs, inspection records, and QC data into EDA reports, dataset health scores, SPC control charts, Cp/Cpk process capability math, OEE analytics, supplier lot traceability, and buyer-ready Quality Passports or PPAP/ISIR evidence packs.',
    },
    {
      q: 'How does Modliq serve Education & Research?',
      a: 'For educators, students, and researchers, Modliq provides a visual no-code environment to teach and learn exploratory data analysis (EDA), dataset health profiling, model training, AutoML algorithm comparison, feature importance interpretation, and research report export.',
    },
    {
      q: 'How can I schedule a demo for my plant, department, or lab?',
      a: 'Click "Book Your Free Demo" on any page to submit your details. Our team will prepare a tailored demonstration based on your specific industry or academic research workflow.',
    },
    {
      q: 'Is Modliq an ISO certification body or a replacement for accredited testing?',
      a: 'No. Modliq generates audit-ready evidence documentation (Quality Passports / PPAP / ISIR packs) based on user data. All recommendations must be validated through controlled engineering review before production deployment.',
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-[#1B2A4A] font-sans antialiased">
      {/* 1. Sticky Navigation Header */}
      <PublicNavbar />

      {/* 1.5 Announcement Launch Banner */}
      <div className="w-full bg-[#1B2A4A] text-white py-2.5 px-4 text-center text-xs font-semibold flex items-center justify-center gap-3 border-b border-blue-900/50">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-300 shrink-0" />
          <span>Launching August 20 at 10:00 AM IST — Book your free demo.</span>
        </span>
        <Link
          href="/launch"
          className="px-2.5 py-1 bg-[#2B70AB] hover:bg-blue-600 text-white rounded-md text-[11px] font-bold transition whitespace-nowrap shadow-xs"
        >
          View Countdown →
        </Link>
      </div>

      {/* 2. Hero Section — August 20 Dual Audience Launch */}
      <section id="product" className="w-full bg-gradient-to-b from-[#F0F6FA] via-white to-white py-12 sm:py-20 border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Hero Headline & Badges */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-[#2B70AB]">
              <Globe className="w-3.5 h-3.5 text-[#2B70AB] shrink-0" />
              <span>No-Code Machine Learning · Manufacturing Intelligence · Education & Research</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1B2A4A] tracking-tight leading-[1.15]">
              No-code machine learning for factories, classrooms, and applied research.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
              Modliq helps manufacturing teams, teachers, students, professors, and research scholars explore data, run EDA, compare ML models, validate results, and generate professional reports — without writing code.
            </p>

            <p className="text-xs sm:text-sm text-[#2B70AB] font-bold">
              Built in Tamil Nadu by Qeltrava AI for real-world industry use and practical ML learning.
            </p>

            {/* Primary & Secondary Hero CTAs */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 w-full">
              <Link
                href="/contact?interest=demo"
                className="px-7 py-3.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/10 hover:shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-blue-200" />
                <span>Book Your Free Demo</span>
              </Link>

              <a
                href="#industry"
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-[#1B2A4A] border border-[#D0E2F0] rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-4 h-4 text-[#2B70AB]" />
              </a>
            </div>
          </div>

          {/* Hero Visual: Interactive No-Code Workflow Preview */}
          <div id="workflow" className="pt-4 scroll-mt-24">
            <NoCodeWorkflowVisual />
          </div>
        </div>
      </section>

      {/* 3. Two-Lane Audience Split Section (Manufacturing First!) */}
      <section className="w-full py-16 sm:py-24 bg-gradient-to-b from-white to-[#F0F6FA] border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B70AB] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
              One No-Code ML Platform
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A] tracking-tight">
              One no-code ML platform. Two practical use cases.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Analyze data, build predictive models, and prove results without writing code — tailored for manufacturing plants and academic institutions.
            </p>
          </div>

          {/* Two Large Audience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: For Manufacturing Industries (ORDER 1) */}
            <div className="bg-white rounded-3xl border-2 border-blue-200 p-8 shadow-sm space-y-6 flex flex-col justify-between hover:shadow-md transition">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 bg-blue-100 text-blue-900 font-extrabold text-xs rounded-full uppercase tracking-wider flex items-center gap-1.5">
                    <Factory className="w-3.5 h-3.5" /> Industry Lane
                  </span>
                  <Award className="w-6 h-6 text-[#2B70AB]" />
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-[#1B2A4A]">For Manufacturing Industries</h3>
                  <p className="text-sm font-semibold text-slate-600 mt-1">
                    Turn production logs into optimization, SPC, Cp/Cpk, OEE, supplier traceability, and buyer-ready Quality Passports.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Key Capabilities</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Data Ingestion</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> EDA Studio</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Dataset Health</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Goal Parser</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> AutoML Optimization</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Quality Studio (Cp/Cpk)</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> OEE & Downtime</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Supplier Traceability</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Quality Passport</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> PPAP / ISIR Packs</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/contact?interest=manufacturing-demo"
                  className="w-full py-3 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  Book Manufacturing Demo <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: For Education & Research (ORDER 2) */}
            <div className="bg-white rounded-3xl border-2 border-purple-200 p-8 shadow-sm space-y-6 flex flex-col justify-between hover:shadow-md transition">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 bg-purple-100 text-purple-900 font-extrabold text-xs rounded-full uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> Education & Research Lane
                  </span>
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-[#1B2A4A]">For Education & Research</h3>
                  <p className="text-sm font-semibold text-slate-600 mt-1">
                    Teach, learn, and apply EDA, data visualization, model comparison, feature importance, and research reporting without complex Python setup.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Key Capabilities</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> No-code EDA Studio</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Chart Studio</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Dataset Health</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> AutoML Leaderboard</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Model Metrics (R², RMSE)</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Feature Importance</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Research Reports</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Classroom Presets</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/contact?interest=education-demo"
                  className="w-full py-3 bg-purple-700 hover:bg-purple-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  Book Education Demo <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Manufacturing Section (#industry) */}
      <section id="industry" className="w-full py-16 sm:py-24 bg-white border-b border-[#D0E2F0] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-4">
            <span className="px-3.5 py-1 bg-blue-50 text-[#2B70AB] font-extrabold text-xs rounded-full border border-blue-200 uppercase tracking-wider">
              Manufacturing Industry Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A]">
              Modliq for Manufacturing Industries
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Manufacturing teams can use Modliq to convert Excel logs, QC reports, supplier records, machine data, and production databases into analysis, optimization, quality validation, and buyer-ready evidence.
            </p>
          </div>

          {/* Manufacturing Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-3">
              <BarChart3 className="w-6 h-6 text-[#2B70AB]" />
              <h3 className="text-lg font-bold text-[#1B2A4A]">Quality &amp; SPC Math</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculate process capability indices (Cp, Cpk, Pp, Ppk), X-bar/R control limits, defect rates, and subgroup statistics verified by a single Python engine.
              </p>
            </div>

            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#2B70AB]" />
              <h3 className="text-lg font-bold text-[#1B2A4A]">PPAP / ISIR &amp; Quality Passport</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generate buyer-accepted Part Submission Warrants (PSW) and Initial Sample Inspection Reports (ISIR) with traceable Math Verification Records for OEM buyers.
              </p>
            </div>

            <div className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-3">
              <Cpu className="w-6 h-6 text-[#2B70AB]" />
              <h3 className="text-lg font-bold text-[#1B2A4A]">OEE &amp; Process Optimization</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Analyze equipment availability, performance loss, quality yield, downtime Pareto, and run constrained AutoML process setpoint optimization.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/contact?interest=manufacturing-demo"
              className="px-6 py-3 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 transition"
            >
              Book Your Free Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Education & Research Section (#education) */}
      <section id="education" className="w-full py-16 sm:py-24 bg-[#F0F6FA] border-b border-[#D0E2F0] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-4">
            <span className="px-3.5 py-1 bg-purple-100 text-purple-900 font-extrabold text-xs rounded-full border border-purple-200 uppercase tracking-wider">
              Academic &amp; Research Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A]">
              Modliq for Education &amp; Research
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Teachers, professors, students, and research scholars can use Modliq as a no-code environment for data analysis and machine learning practice.
            </p>
          </div>

          {/* 4 Audience Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-3">
              <School className="w-6 h-6 text-purple-600" />
              <h3 className="text-base font-bold text-[#1B2A4A]">Teachers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Create interactive classroom demonstrations for EDA, data visualization, and model comparison without managing complex coding environments.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-3">
              <GraduationCap className="w-6 h-6 text-purple-600" />
              <h3 className="text-base font-bold text-[#1B2A4A]">Professors</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Teach applied analytics, quality engineering, AutoML, and manufacturing data science with structured workflows and repeatable examples.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-3">
              <Users className="w-6 h-6 text-purple-600" />
              <h3 className="text-base font-bold text-[#1B2A4A]">Students</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Learn data analysis and machine learning visually. Upload datasets, ask questions, compare models, and understand results step by step.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-3">
              <BookOpen className="w-6 h-6 text-purple-600" />
              <h3 className="text-base font-bold text-[#1B2A4A]">Research Scholars</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use Modliq for early-stage exploratory analysis, feature discovery, visualization, model benchmarking, and research report preparation.
              </p>
            </div>

          </div>

          <div className="pt-2">
            <Link
              href="/contact?interest=education-demo"
              className="px-6 py-3 bg-purple-700 hover:bg-purple-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 transition"
            >
              Book Education Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Interactive Platform Workflows & Transparency */}
      <InteractiveWorkflowTabs />
      <AlgorithmTransparencyGrid />
      <AutoMLComparisonTable />

      {/* 7. Final Bottom Call-To-Action Banner */}
      <section className="w-full py-16 sm:py-20 bg-gradient-to-b from-[#1B2A4A] to-[#0F172A] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs font-bold text-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Analyze data. Build models. Prove results — without code.</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to explore no-code machine learning for your plant or classroom?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Whether you are a manufacturer, teacher, student, professor, or research scholar, Modliq helps you explore data and machine learning without code.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?interest=demo"
              className="px-8 py-4 bg-[#2B70AB] hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Book Your Free Demo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="w-full py-16 sm:py-24 bg-white border-t border-[#D0E2F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B2A4A]">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-slate-600">Everything you need to know about Modliq for industry and education.</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="border border-[#D0E2F0] rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-[#1B2A4A] text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#2B70AB] transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <PublicFooter />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import PublicNavbar from "@/components/layout/PublicNavbar";
import PublicFooter from "@/components/layout/PublicFooter";
import IndiaBadge from "@/components/marketing/IndiaBadge";
import DisclaimerBox from "@/components/marketing/DisclaimerBox";
import FAQSection from "@/components/marketing/FAQSection";
import {
  BookOpen,
  Upload,
  Database,
  ShieldCheck,
  FileText,
  Sliders,
  BarChart3,
  Activity,
  Truck,
  Target,
  Award,
  Brain,
  Lock,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Info,
  Sparkles,
  Zap,
  Check,
  X,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Modliq Docs — Manufacturing Intelligence Platform Guide",
  description:
    "Learn how to use Modliq to upload manufacturing data, write optimization goals, run ML optimization, validate quality with SPC and Cp/Cpk, track operations, and generate Quality Passports.",
  alternates: {
    canonical: "https://modliq-io.vercel.app/docs",
  },
  openGraph: {
    title: "Modliq Docs — Manufacturing Intelligence Platform Guide",
    description:
      "Learn how to use Modliq to upload manufacturing data, write optimization goals, run ML optimization, validate quality with SPC and Cp/Cpk, track operations, and generate Quality Passports.",
    url: "https://modliq-io.vercel.app/docs",
    images: ["/og/modliq-og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modliq Docs — Manufacturing Intelligence Platform Guide",
    description:
      "Learn how to use Modliq to upload manufacturing data, write optimization goals, run ML optimization, validate quality with SPC and Cp/Cpk, track operations, and generate Quality Passports.",
    images: ["/og/modliq-og.png"],
  },
};

// Anchor navigation data
const navGuides = [
  { id: "getting-started", title: "Getting Started", icon: BookOpen, desc: "Project creation & workflow overview" },
  { id: "uploading-data", title: "Uploading Data", icon: Upload, desc: "CSV, Excel, & PDF table ingestion" },
  { id: "connecting-databases", title: "Connecting Databases", icon: Database, desc: "Supabase, Postgres, & MongoDB" },
  { id: "dataset-health", title: "Dataset Health", icon: ShieldCheck, desc: "Profiling & readiness scoring" },
  { id: "writing-good-goals", title: "Writing Good Goals", icon: FileText, desc: "Natural language goal formatting" },
  { id: "running-optimization", title: "Running Optimization", icon: Sliders, desc: "AutoML & safe parameter windows" },
  { id: "quality-studio", title: "Quality Studio", icon: BarChart3, desc: "SPC, I-MR charts, & Cp/Cpk metrics" },
  { id: "operations", title: "Operations", icon: Activity, desc: "OEE, downtime Pareto, & shifts" },
  { id: "supply-chain", title: "Supply Chain", icon: Truck, desc: "Supplier scorecards & lot traceability" },
  { id: "lean", title: "Lean", icon: Target, desc: "Waste tracking, 5S, & Kaizen boards" },
  { id: "quality-passport", title: "Quality Passport", icon: Award, desc: "Buyer-ready evidence reporting" },
  { id: "ai-copilot", title: "AI Copilot", icon: Brain, desc: "SOP drafts, CAPA, & insights" },
  { id: "security", title: "Security & Privacy", icon: Lock, desc: "Data protection & credential security" },
  { id: "faq", title: "FAQ", icon: HelpCircle, desc: "Common questions & answers" },
];

const columnDetectionData = [
  { name: "yield", detectedAs: "Target / Numeric Metric", notes: "Often used as optimization target" },
  { name: "yield_rate", detectedAs: "Target / Numeric Metric", notes: "Common yield column" },
  { name: "temperature", detectedAs: "Process Feature", notes: "Used as controllable input" },
  { name: "pressure", detectedAs: "Process Feature", notes: "Used as controllable input" },
  { name: "flow_rate", detectedAs: "Process Feature", notes: "Used as controllable input" },
  { name: "pH", detectedAs: "Process Feature", notes: "Used as controllable input" },
  { name: "batch_id", detectedAs: "Identifier", notes: "Treated as metadata, not controllable feature" },
  { name: "lot_id", detectedAs: "Identifier / Traceability", notes: "Used for traceability, not optimization control" },
  { name: "supplier", detectedAs: "Supply Chain Field", notes: "Used for supplier scorecard and risk analysis" },
  { name: "supplier_lot", detectedAs: "Traceability Field", notes: "Links material lots to batch outcomes" },
  { name: "operator_name", detectedAs: "Categorical Field", notes: "Useful for grouping/filtering" },
  { name: "timestamp", detectedAs: "Datetime Field", notes: "Useful for time-series analysis" },
  { name: "defect_count", detectedAs: "Quality Metric", notes: "Used for quality and defect analysis" },
  { name: "reject_count", detectedAs: "Quality Metric", notes: "Used for rejection and OEE quality rate" },
  { name: "good_count", detectedAs: "Operations Metric", notes: "Used for OEE quality rate" },
  { name: "downtime_minutes", detectedAs: "Operations Metric", notes: "Used for downtime Pareto" },
  { name: "downtime_reason", detectedAs: "Operations Category", notes: "Used for downtime Pareto" },
  { name: "shift", detectedAs: "Operations Category", notes: "Used for shift comparison" },
  { name: "machine", detectedAs: "Operations Category", notes: "Used for bottleneck analysis" },
  { name: "scrap_rate", detectedAs: "Lean / Quality Metric", notes: "Used for scrap and waste insights" },
];

const faqList = [
  {
    question: "Do I need a data scientist to use Modliq?",
    answer:
      "No. Modliq is designed for manufacturing teams that want to use machine learning and quality analytics without hiring a data scientist or ML engineer. The platform guides users through upload, health checks, goal setup, optimization, validation, and reporting.",
  },
  {
    question: "Do I need to know Python or statistics?",
    answer:
      "No coding is required. Modliq explains dataset health, optimization setup, and quality metrics in a guided interface. Engineers and quality teams remain in control of decisions.",
  },
  {
    question: "What is Modliq?",
    answer:
      "Modliq is a manufacturing intelligence platform that helps factories turn production data into process optimization insights, quality validation, operations visibility, supplier risk analysis, and buyer-ready Quality Passports.",
  },
  {
    question: "Who is Modliq for?",
    answer:
      "Modliq is for factory owners, plant heads, quality managers, process engineers, operations managers, supplier quality teams, and lean improvement teams.",
  },
  {
    question: "Can I start with Excel?",
    answer:
      "Yes. You can upload CSV or Excel files and start with dataset health checks, goal parsing, optimization, and Quality Studio.",
  },
  {
    question: "Do I need ERP or MES integration?",
    answer:
      "No. You can start with CSV or Excel. Database connectors are available for Supabase/Postgres and MongoDB.",
  },
  {
    question: "Does Modliq guarantee yield improvement?",
    answer:
      "No. Modliq provides decision-support recommendations. Any process changes must be validated through controlled engineering trials.",
  },
  {
    question: "What is a Quality Passport?",
    answer:
      "A Quality Passport is a buyer-ready report that summarizes dataset readiness, process capability, optimization discipline, traceability, and improvement evidence.",
  },
  {
    question: "Is Modliq made in India?",
    answer:
      "Yes. Modliq is a product by Qeltrava AI, built in Tamil Nadu, India.",
  },
];

export default function DocsPage() {
  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen">
      <PublicNavbar />

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-white via-[#F0F6FA] to-white pt-16 pb-14 border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <IndiaBadge />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1B2A4A] tracking-tight mb-4">
            Modliq Documentation
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            Practical, beginner-friendly guides for using Modliq. Learn how to upload data, connect databases, write goals, run optimization, validate quality, track operations, and generate buyer-ready Quality Passports.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-lg bg-[#2B70AB] hover:bg-[#225b8c] text-white font-semibold text-sm transition shadow-sm flex items-center gap-2"
            >
              Launch Demo
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact?interest=free-pilot"
              className="px-6 py-3 rounded-lg bg-white border border-[#D0E2F0] hover:border-[#2B70AB] text-[#1B2A4A] hover:text-[#2B70AB] font-semibold text-sm transition shadow-sm"
            >
              Apply for Free Pilot
            </Link>
            <Link
              href="/workflow"
              className="px-6 py-3 rounded-lg bg-[#F0F6FA] hover:bg-slate-200 text-[#1B2A4A] font-semibold text-sm transition border border-[#D0E2F0]"
            >
              Explore Workflow
            </Link>
            <Link
              href="/developer/doc"
              className="px-6 py-3 rounded-lg bg-[#1B2A4A] hover:bg-[#15213b] text-white font-semibold text-sm transition shadow-sm flex items-center gap-1.5"
            >
              Developer Architecture Docs →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. QUICK START WORKFLOW SECTION */}
      <section className="py-16 bg-white border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2B70AB] bg-[#F0F6FA] px-3 py-1 rounded-full border border-[#D0E2F0]">
              Workflow Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2A4A] mt-3">
              Start here: the 6-step Modliq workflow
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto mt-2">
              From raw data ingestion to buyer-ready quality documentation, follow this step-by-step path.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-[#F0F6FA] rounded-xl p-6 border border-[#D0E2F0] relative hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <span className="text-xs font-semibold text-[#2B70AB] bg-white px-2 py-1 rounded border border-[#D0E2F0]">
                  Project Setup
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">Create a Project</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Create a project for a plant, product line, process, or customer use case. Each project keeps its own datasets, goals, results, Quality Studio analysis, and Quality Passport.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F0F6FA] rounded-xl p-6 border border-[#D0E2F0] relative hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <span className="text-xs font-semibold text-[#2B70AB] bg-white px-2 py-1 rounded border border-[#D0E2F0]">
                  Data Ingestion
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">Upload or Connect Data</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Upload CSV or Excel files, extract tables from PDF/Word documents, or connect read-only databases such as Supabase/Postgres and MongoDB.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F0F6FA] rounded-xl p-6 border border-[#D0E2F0] relative hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <span className="text-xs font-semibold text-[#2B70AB] bg-white px-2 py-1 rounded border border-[#D0E2F0]">
                  Health Scoring
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">Review Dataset Health</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Modliq checks missing values, outliers, duplicates, identifier columns, target leakage risks, and sample size before optimization.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#F0F6FA] rounded-xl p-6 border border-[#D0E2F0] relative hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <span className="text-xs font-semibold text-[#2B70AB] bg-white px-2 py-1 rounded border border-[#D0E2F0]">
                  Goal Definition
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">Write a Goal</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Describe what you want in plain English, such as “maximize yield while keeping temperature below 90°C.”
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-[#F0F6FA] rounded-xl p-6 border border-[#D0E2F0] relative hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <span className="text-xs font-semibold text-[#2B70AB] bg-white px-2 py-1 rounded border border-[#D0E2F0]">
                  Safety Gate
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">Review and Confirm</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Before optimization, confirm the detected target, controllable variables, constraints, and safety acknowledgement.
              </p>
            </div>

            {/* Step 6 */}
            <div className="bg-[#F0F6FA] rounded-xl p-6 border border-[#D0E2F0] relative hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center font-bold text-sm">
                  6
                </span>
                <span className="text-xs font-semibold text-[#2B70AB] bg-white px-2 py-1 rounded border border-[#D0E2F0]">
                  Optimization & Reporting
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">Run, Validate, and Report</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Run optimization, validate stability in Quality Studio, review operations and supplier risks, and generate a Quality Passport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WRITING GOOD GOALS SECTION */}
      <section id="writing-good-goals" className="py-16 bg-[#F0F6FA]/50 border-b border-[#D0E2F0] scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-[#2B70AB] font-semibold text-xs uppercase tracking-wider mb-1">
              <FileText size={16} />
              Goal Formatting Guide
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2A4A]">Writing good goals</h2>
            <p className="text-slate-600 text-sm max-w-3xl mt-2 leading-relaxed">
              A good goal tells Modliq what metric to improve and what process limits must be respected. Good goals are specific, measurable, and connected to columns in your dataset.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Good Goal Card */}
            <div className="bg-white rounded-xl p-6 border-2 border-emerald-300 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Check size={14} className="stroke-[3]" />
                </span>
                <h3 className="font-bold text-emerald-900 text-base">Good Goal</h3>
              </div>
              <div className="bg-emerald-50/70 rounded-lg p-4 border border-emerald-200 mb-4 font-mono text-xs sm:text-sm text-emerald-950 font-semibold">
                “Maximize yield while keeping temperature below 90°C and pressure below 5 bar.”
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Why it works:</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Target is clear:</strong> yield</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Direction is clear:</strong> maximize</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Constraints are clear:</strong> temperature and pressure limits</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Columns match dataset:</strong> temperature, pressure, yield</span>
                </li>
              </ul>
            </div>

            {/* Bad Goal Card */}
            <div className="bg-white rounded-xl p-6 border-2 border-rose-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                  <X size={14} className="stroke-[3]" />
                </span>
                <h3 className="font-bold text-rose-900 text-base">Bad Goal</h3>
              </div>
              <div className="bg-rose-50/70 rounded-lg p-4 border border-rose-200 mb-4 font-mono text-xs sm:text-sm text-rose-950 font-semibold">
                “Make process better.”
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Why it is weak:</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>No target metric:</strong> unquantified intent</span>
                </li>
                <li className="flex items-start gap-2">
                  <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>No direction:</strong> missing maximize/minimize instruction</span>
                </li>
                <li className="flex items-start gap-2">
                  <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>No process constraints:</strong> no operating boundary checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>No measurable success condition:</strong> cannot validate with ML</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Goal Examples by Industry */}
          <div className="bg-white rounded-xl p-6 border border-[#D0E2F0]">
            <h3 className="text-base font-bold text-[#1B2A4A] mb-4">Goal Examples by Industry Domain</h3>
            <div className="space-y-3">
              <div className="p-3 bg-[#F0F6FA] rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#1B2A4A] w-48 shrink-0">Yield Optimization</span>
                <code className="text-xs font-mono text-[#2B70AB] bg-white px-3 py-1.5 rounded border border-slate-200 grow">
                  Maximize yield while keeping temperature below 90°C and pressure below 5 bar.
                </code>
              </div>

              <div className="p-3 bg-[#F0F6FA] rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#1B2A4A] w-48 shrink-0">Defect Reduction</span>
                <code className="text-xs font-mono text-[#2B70AB] bg-white px-3 py-1.5 rounded border border-slate-200 grow">
                  Minimize defect rate while keeping moisture between 8% and 12%.
                </code>
              </div>

              <div className="p-3 bg-[#F0F6FA] rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#1B2A4A] w-48 shrink-0">Pharma / Nutraceutical</span>
                <code className="text-xs font-mono text-[#2B70AB] bg-white px-3 py-1.5 rounded border border-slate-200 grow">
                  Maximize assay result while keeping pH between 6.5 and 7.2.
                </code>
              </div>

              <div className="p-3 bg-[#F0F6FA] rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#1B2A4A] w-48 shrink-0">Biomanufacturing</span>
                <code className="text-xs font-mono text-[#2B70AB] bg-white px-3 py-1.5 rounded border border-slate-200 grow">
                  Maximize fermentation yield while keeping pH between 6.8 and 7.2 and dissolved oxygen above 30%.
                </code>
              </div>

              <div className="p-3 bg-[#F0F6FA] rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#1B2A4A] w-48 shrink-0">Automotive Components</span>
                <code className="text-xs font-mono text-[#2B70AB] bg-white px-3 py-1.5 rounded border border-slate-200 grow">
                  Minimize rejection rate while maintaining dimension within specification limits.
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COLUMN DETECTION TABLE SECTION */}
      <section id="column-detection" className="py-16 bg-white border-b border-[#D0E2F0] scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2B70AB] bg-[#F0F6FA] px-3 py-1 rounded-full border border-[#D0E2F0]">
              Column Mapping Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2A4A] mt-2">
              Column name examples and what Modliq detects
            </h2>
            <p className="text-slate-600 text-sm max-w-3xl mt-2 leading-relaxed">
              Modliq reads your column names to identify targets, process variables, identifiers, traceability fields, quality metrics, and operations fields.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#D0E2F0] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F0F6FA] border-b border-[#D0E2F0] text-[#1B2A4A]">
                    <th className="px-4 py-3.5 font-bold">Column Name Example</th>
                    <th className="px-4 py-3.5 font-bold">Detected As</th>
                    <th className="px-4 py-3.5 font-bold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {columnDetectionData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-mono font-semibold text-[#1B2A4A]">{row.name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F0F6FA] text-[#2B70AB] border border-[#D0E2F0]">
                          {row.detectedAs}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GUIDE SECTIONS GRID */}
      <section className="py-16 bg-[#F0F6FA] border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2A4A]">Documentation Topics</h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto mt-2">
              Select a module below to jump directly to detailed instructions and recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {navGuides.map((guide) => {
              const IconComp = guide.icon;
              return (
                <a
                  key={guide.id}
                  href={`#${guide.id}`}
                  className="bg-white p-5 rounded-xl border border-[#D0E2F0] hover:border-[#2B70AB] hover:shadow-md transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#F0F6FA] text-[#2B70AB] flex items-center justify-center mb-3 group-hover:bg-[#2B70AB] group-hover:text-white transition">
                      <IconComp size={20} />
                    </div>
                    <h3 className="font-bold text-[#1B2A4A] text-sm group-hover:text-[#2B70AB] transition mb-1">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-500">{guide.desc}</p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-semibold text-[#2B70AB]">
                    Read Guide <ArrowUpRight size={14} className="ml-1" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. DETAILED DOCUMENTATION SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* GETTING STARTED */}
        <section id="getting-started" className="scroll-mt-16 bg-white rounded-2xl border border-[#D0E2F0] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[#2B70AB] text-white">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1B2A4A]">Getting started with Modliq</h2>
              <p className="text-xs text-[#2B70AB] font-semibold">Anchor: #getting-started</p>
            </div>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            Start by creating a project. A project represents one manufacturing use case, such as improving yield for a product line, analyzing defects for a batch process, or preparing a Quality Passport for a buyer.
          </p>

          <div className="bg-[#F0F6FA] rounded-xl p-5 border border-[#D0E2F0] mb-6">
            <h3 className="font-bold text-[#1B2A4A] text-sm mb-3">Quick Start Steps</h3>
            <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside">
              <li>Sign in to Modliq console.</li>
              <li>Create a new project.</li>
              <li>Load the demo dataset or upload your own factory data.</li>
              <li>Review the automated dataset health score.</li>
              <li>Define your optimization goal in plain English.</li>
              <li>Run optimization and validate results in Quality Studio.</li>
            </ol>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-900 flex items-start gap-2.5">
            <Info size={16} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Pro Tip:</strong> If you are new to Modliq, start with the pre-loaded demo manufacturing dataset before uploading live production data.
            </div>
          </div>
        </section>

        {/* UPLOADING DATA */}
        <section id="uploading-data" className="scroll-mt-16 bg-white rounded-2xl border border-[#D0E2F0] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[#2B70AB] text-white">
              <Upload size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1B2A4A]">Uploading data</h2>
              <p className="text-xs text-[#2B70AB] font-semibold">Anchor: #uploading-data</p>
            </div>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            Modliq supports multiple ways to bring manufacturing data into the platform for automated analysis and machine learning optimization.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#F0F6FA] p-5 rounded-xl border border-[#D0E2F0]">
              <h3 className="font-bold text-[#1B2A4A] text-sm mb-2">Supported Data Sources</h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> CSV files (.csv)</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Excel spreadsheets (.xlsx, .xls)</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> PDF or Word documents with tables</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Supabase/Postgres database tables</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> MongoDB collections</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Demo manufacturing datasets</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="font-bold text-[#1B2A4A] text-sm mb-2">File Format Guides</h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div>
                  <strong className="text-[#1B2A4A]">CSV Upload:</strong> Use CSV files when production logs are exported from Excel, ERP, MES, SCADA, or manual logbooks. First row must contain column names.
                </div>
                <div>
                  <strong className="text-[#1B2A4A]">Excel Upload:</strong> Use Excel files when data is stored in spreadsheets. Modliq reads the first sheet by default and detects headers automatically.
                </div>
                <div>
                  <strong className="text-[#1B2A4A]">PDF/Word Documents:</strong> Reference documents are processed with table extractors. Detected structured tables can be converted into analysis datasets.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-[#1B2A4A] text-sm mb-3">Best Practices for Data Upload</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#2B70AB]" /> Use clear column names</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#2B70AB]" /> Avoid merged cells in Excel</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#2B70AB]" /> Keep one row per batch, lot, or event</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#2B70AB]" /> Include target metrics (yield, defects)</li>
              <li className="flex items-center gap-2 sm:col-span-2"><CheckCircle2 size={14} className="text-[#2B70AB]" /> Include process variables (temperature, pressure, flow rate, pH, humidity, cycle time)</li>
            </ul>
          </div>
        </section>

        {/* CONNECTING DATABASES */}
        <section id="connecting-databases" className="scroll-mt-16 bg-white rounded-2xl border border-[#D0E2F0] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[#2B70AB] text-white">
              <Database size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1B2A4A]">Connecting databases</h2>
              <p className="text-xs text-[#2B70AB] font-semibold">Anchor: #connecting-databases</p>
            </div>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            Modliq supports read-only database connectors for engineering teams that store live production logs in databases.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-[#F0F6FA] rounded-xl border border-[#D0E2F0]">
              <span className="text-xs font-bold text-[#2B70AB] uppercase">Available Connector</span>
              <h3 className="font-bold text-[#1B2A4A] text-base mt-1">Supabase / Postgres</h3>
              <p className="text-xs text-slate-600 mt-1">Read-only connection via SSL string or parameters.</p>
            </div>
            <div className="p-4 bg-[#F0F6FA] rounded-xl border border-[#D0E2F0]">
              <span className="text-xs font-bold text-[#2B70AB] uppercase">Available Connector</span>
              <h3 className="font-bold text-[#1B2A4A] text-base mt-1">MongoDB</h3>
              <p className="text-xs text-slate-600 mt-1">Read-only collection snapshot ingestion.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase">Coming Soon</span>
              <h3 className="font-bold text-slate-500 text-base mt-1">MySQL & SQL Server</h3>
              <p className="text-xs text-slate-400 mt-1">Enterprise connectors in development.</p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-xs text-emerald-950 space-y-2">
            <h4 className="font-bold text-emerald-900 text-sm">Connector Safety & Guardrails:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Connectors operate strictly in <strong>read-only mode</strong> (SELECT operations only).</li>
              <li>Live preview is capped at 100 rows; snapshot import is capped at 10,000 rows.</li>
              <li>Credentials are encrypted server-side before storage.</li>
              <li>Raw database passwords are never returned to the browser client.</li>
            </ul>
          </div>
        </section>

        {/* DATASET HEALTH */}
        <section id="dataset-health" className="scroll-mt-16 bg-white rounded-2xl border border-[#D0E2F0] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[#2B70AB] text-white">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1B2A4A]">Dataset health check</h2>
              <p className="text-xs text-[#2B70AB] font-semibold">Anchor: #dataset-health</p>
            </div>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            Before running machine learning optimization, Modliq checks whether your dataset is reliable enough for valid statistical inference.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#F0F6FA] p-5 rounded-xl border border-[#D0E2F0]">
              <h3 className="font-bold text-[#1B2A4A] text-sm mb-3">Automated Health Checks</h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Missing values percentage</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Duplicate row count</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Sample size sufficiency</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Outliers via IQR and Z-score</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Zero-variance constant columns</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Suspicious identifier columns</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> High collinearity detection</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Target leakage risk warnings</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Automatic target column recommendation</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="font-bold text-[#1B2A4A] text-sm mb-3">Readiness Score Bands</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 rounded bg-emerald-50 border border-emerald-200">
                  <span className="font-bold text-emerald-900">90 – 100</span>
                  <span className="font-semibold text-emerald-700">Excellent Readiness</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-blue-50 border border-blue-200">
                  <span className="font-bold text-blue-900">75 – 89</span>
                  <span className="font-semibold text-blue-700">Good Quality</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-amber-50 border border-amber-200">
                  <span className="font-bold text-amber-900">60 – 74</span>
                  <span className="font-semibold text-amber-700">Needs Review</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-orange-50 border border-orange-200">
                  <span className="font-bold text-orange-900">40 – 59</span>
                  <span className="font-semibold text-orange-700">Risky Dataset</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-rose-50 border border-rose-200">
                  <span className="font-bold text-rose-900">0 – 39</span>
                  <span className="font-semibold text-rose-700">Not Recommended</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 italic">
            Note: A high health score means the dataset is structurally suitable for initial model training. It does not guarantee physical production performance without engineering trial validation.
          </p>
        </section>

        {/* RUNNING OPTIMIZATION */}
        <section id="running-optimization" className="scroll-mt-16 bg-white rounded-2xl border border-[#D0E2F0] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[#2B70AB] text-white">
              <Sliders size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1B2A4A]">Running optimization</h2>
              <p className="text-xs text-[#2B70AB] font-semibold">Anchor: #running-optimization</p>
            </div>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            Optimization uses historical production data to recommend process settings that may improve a target metric while respecting physical plant constraints.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#F0F6FA] p-5 rounded-xl border border-[#D0E2F0]">
              <h3 className="font-bold text-[#1B2A4A] text-sm mb-3">Optimization Execution Flow</h3>
              <ol className="space-y-1.5 text-xs text-slate-700 list-decimal list-inside">
                <li>Type your natural language goal.</li>
                <li>Modliq parses target, direction, features, and constraints.</li>
                <li>Review and confirm the setup wizard.</li>
                <li>Acknowledge controlled trial safety notice.</li>
                <li>Start optimization execution.</li>
                <li>Monitor training progress.</li>
                <li>Review results and safe trial ranges.</li>
              </ol>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="font-bold text-[#1B2A4A] text-sm mb-3">Optimization Engine Outputs</h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Recommended process settings</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Safe parameter trial ranges</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> SHAP feature driver rankings</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Model accuracy metrics (R², MAE, RMSE)</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Expected yield improvement delta</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Projected financial ROI estimate</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Actual vs predicted scatter plot</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Interactive optimization curve</li>
              </ul>
            </div>
          </div>
        </section>

        {/* QUALITY STUDIO GUIDE */}
        <section id="quality-studio" className="scroll-mt-16 bg-white rounded-2xl border border-[#D0E2F0] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[#2B70AB] text-white">
              <BarChart3 size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1B2A4A]">Quality Studio guide</h2>
              <p className="text-xs text-[#2B70AB] font-semibold">Anchor: #quality-studio</p>
            </div>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            Quality Studio helps quality teams analyze process stability, statistical process control (SPC), capability indices, and inspection readiness.
          </p>

          <div className="bg-[#F0F6FA] p-5 rounded-xl border border-[#D0E2F0] mb-6">
            <h3 className="font-bold text-[#1B2A4A] text-sm mb-3">Key Features in Quality Studio</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-700">
              <div className="bg-white p-3 rounded border border-slate-200 font-medium">Quality summary dashboard</div>
              <div className="bg-white p-3 rounded border border-slate-200 font-medium">Mean, median, & standard deviation</div>
              <div className="bg-white p-3 rounded border border-slate-200 font-medium">Outlier detection (Z-score & IQR)</div>
              <div className="bg-white p-3 rounded border border-slate-200 font-medium">I-MR control charts with Center Line</div>
              <div className="bg-white p-3 rounded border border-slate-200 font-medium">Upper (UCL) & Lower (LCL) Limits</div>
              <div className="bg-white p-3 rounded border border-slate-200 font-medium">SPC Western Electric violation alerts</div>
              <div className="bg-white p-3 rounded border border-slate-200 font-medium">Cp and Cpk process capability</div>
              <div className="bg-white p-3 rounded border border-slate-200 font-medium">AQL sampling plans</div>
              <div className="bg-white p-3 rounded border border-slate-200 font-medium">Automated CAPA suggestions</div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-900">
            <strong>When to Use:</strong> Use Quality Studio before applying optimization recommendations to establish whether your baseline process is statistically stable and capable (Cp/Cpk ≥ 1.33).
          </div>
        </section>

        {/* OPERATIONS GUIDE */}
        <section id="operations" className="scroll-mt-16 bg-white rounded-2xl border border-[#D0E2F0] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[#2B70AB] text-white">
              <Activity size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1B2A4A]">Operations guide</h2>
              <p className="text-xs text-[#2B70AB] font-semibold">Anchor: #operations</p>
            </div>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            Operations tools help production managers track Overall Equipment Effectiveness (OEE), analyze downtime causes, eliminate line bottlenecks, and compare shift performances.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#F0F6FA] p-5 rounded-xl border border-[#D0E2F0]">
              <h3 className="font-bold text-[#1B2A4A] text-sm mb-2">Operations Features</h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> OEE calculator (Availability, Performance, Quality)</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Downtime Pareto chart</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Production line comparison</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Shift performance comparison</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Machine bottleneck detection</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-center text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Standard OEE Formula</span>
              <div className="text-lg font-mono font-bold text-[#1B2A4A] bg-[#F0F6FA] py-3 px-4 rounded-lg border border-[#D0E2F0]">
                OEE = Availability × Performance × Quality
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Calculated deterministically from logged operating minutes, theoretical cycle times, and scrap counts.
              </p>
            </div>
          </div>
        </section>

        {/* SUPPLY CHAIN GUIDE */}
        <section id="supply-chain" className="scroll-mt-16 bg-white rounded-2xl border border-[#D0E2F0] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[#2B70AB] text-white">
              <Truck size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1B2A4A]">Supply Chain guide</h2>
              <p className="text-xs text-[#2B70AB] font-semibold">Anchor: #supply-chain</p>
            </div>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            Supply Chain tools help connect raw material vendor quality and batch lot numbers to plant yield outcomes.
          </p>

          <div className="bg-[#F0F6FA] p-5 rounded-xl border border-[#D0E2F0] mb-6">
            <h3 className="font-bold text-[#1B2A4A] text-sm mb-3">Supply Chain Capabilities</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Supplier scorecard rating</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Material lot end-to-end traceability</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Yield breakdown by vendor</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Defect rate breakdown by material lot</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Incoming raw material quality risk score</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Vendor anomaly alerts</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs text-slate-700">
            <strong>Example Insight:</strong> Modliq can flag if <em>Supplier B</em> material lots correlate with a 4.2% drop in final batch yield compared to <em>Supplier A</em>.
          </div>
        </section>

        {/* LEAN GUIDE */}
        <section id="lean" className="scroll-mt-16 bg-white rounded-2xl border border-[#D0E2F0] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[#2B70AB] text-white">
              <Target size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1B2A4A]">Lean guide</h2>
              <p className="text-xs text-[#2B70AB] font-semibold">Anchor: #lean</p>
            </div>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            Lean tools help manufacturing teams convert statistical findings into continuous improvement (Kaizen) actions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#F0F6FA] p-5 rounded-xl border border-[#D0E2F0]">
              <h3 className="font-bold text-[#1B2A4A] text-sm mb-2">Lean Tools</h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> 8 Waste tracker</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Kaizen action board</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> 5S workplace audit scorer</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Takt time calculator</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Kanban sizing calculator</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="font-bold text-[#1B2A4A] text-sm mb-2">Tracked Waste Categories</h3>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-medium">Defects</span>
                <span className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-medium">Overproduction</span>
                <span className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-medium">Waiting</span>
                <span className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-medium">Transportation</span>
                <span className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-medium">Inventory</span>
                <span className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-medium">Motion</span>
                <span className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-medium">Overprocessing</span>
              </div>
            </div>
          </div>
        </section>

        {/* QUALITY PASSPORT GUIDE */}
        <section id="quality-passport" className="scroll-mt-16 bg-white rounded-2xl border border-[#D0E2F0] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[#2B70AB] text-white">
              <Award size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1B2A4A]">Quality Passport guide</h2>
              <p className="text-xs text-[#2B70AB] font-semibold">Anchor: #quality-passport</p>
            </div>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            The Quality Passport is a buyer-ready evidence report summarizing dataset readiness, process stability, capability metrics, and continuous improvement steps.
          </p>

          <div className="bg-[#F0F6FA] p-5 rounded-xl border border-[#D0E2F0] mb-6">
            <h3 className="font-bold text-[#1B2A4A] text-sm mb-3">What standard Quality Passports include</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Dataset health & sample size</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Optimization summary & safe ranges</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> SPC control chart stability</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Cp / Cpk capability indices</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> OEE & scrap summary</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Supplier material lot traceability</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Kaizen & CAPA status</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Audit readiness score (0-100)</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Missing evidence warning list</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Recommended SOP next actions</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-900">
            <strong>Important Note:</strong> The Quality Passport is a decision-support evidence report compiled from user data and Modliq calculations. It is not a government regulatory certification or ISO accreditation certificate.
          </div>
        </section>

        {/* AI COPILOT GUIDE */}
        <section id="ai-copilot" className="scroll-mt-16 bg-white rounded-2xl border border-[#D0E2F0] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[#2B70AB] text-white">
              <Brain size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1B2A4A]">AI Copilot guide</h2>
              <p className="text-xs text-[#2B70AB] font-semibold">Anchor: #ai-copilot</p>
            </div>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            The AI Copilot helps explain optimization results, draft SOPs, summarize Quality Passports, suggest CAPA root-cause actions, and assist plant managers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#F0F6FA] p-5 rounded-xl border border-[#D0E2F0]">
              <h3 className="font-bold text-[#1B2A4A] text-sm mb-3">AI Copilot Use Cases</h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Goal wording improvement suggestions</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Dataset health warning explanations</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> SHAP process driver explanations</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> SPC out-of-control rule interpretation</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> CAPA action plan drafting</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Standard Operating Procedure (SOP) drafts</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Operations & downtime reviews</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Supplier quality risk explanations</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#2B70AB]" /> Quality Passport executive summaries</li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex flex-col justify-center">
              <h4 className="font-bold text-emerald-900 text-sm mb-2">Deterministic Guardrail Architecture</h4>
              <p className="leading-relaxed">
                <strong>AI assists. Engineers approve.</strong> Deterministic calculations such as OEE, Cp/Cpk, SPC limits, and dataset health scores are computed directly by Modliq's Python ML engine—never invented or hallucinated by AI models.
              </p>
            </div>
          </div>
        </section>

        {/* SECURITY & PRIVACY */}
        <section id="security" className="scroll-mt-16 bg-white rounded-2xl border border-[#D0E2F0] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[#2B70AB] text-white">
              <Lock size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1B2A4A]">Security and data privacy</h2>
              <p className="text-xs text-[#2B70AB] font-semibold">Anchor: #security</p>
            </div>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            Modliq is engineered with zero-trust principles. The frontend browser application communicates exclusively with the Express backend gateway.
          </p>

          <div className="bg-[#F0F6FA] p-5 rounded-xl border border-[#D0E2F0] mb-6">
            <h3 className="font-bold text-[#1B2A4A] text-sm mb-3">Security Principles</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#2B70AB]" /> JWT Authentication & Session tokens</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#2B70AB]" /> Project-level data access control</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#2B70AB]" /> Encrypted database credentials</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#2B70AB]" /> Service-key protected ML engine</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#2B70AB]" /> Backend-only AI provider keys</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#2B70AB]" /> Read-only database connectors</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#2B70AB]" /> Private user console isolation</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#2B70AB]" /> No public indexing of console pages</li>
            </ul>
          </div>

          <div className="bg-slate-100 p-4 rounded-lg text-xs text-slate-600">
            <strong>User Responsibility:</strong> Users should upload only production logs and data they are explicitly authorized to process and share.
          </div>
        </section>

        {/* 7. FAQ SECTION */}
        <section id="faq" className="scroll-mt-16 py-6">
          <FAQSection
            title="Frequently Asked Questions"
            subtitle="Find quick answers about Modliq data ingestion, optimization, and platform security."
            items={faqList}
          />
        </section>

        {/* 8. SAFETY DISCLAIMER BOX */}
        <div className="pt-4">
          <DisclaimerBox />
        </div>

        {/* 9. FINAL CTA SECTION */}
        <section className="bg-gradient-to-r from-[#1B2A4A] to-[#2B70AB] rounded-2xl p-8 sm:p-12 text-white text-center shadow-lg">
          <h2 className="text-2xl sm:text-4xl font-bold mb-3">Ready to try Modliq?</h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Launch the demo, upload a dataset, or apply for the free pilot program for selected manufacturing companies.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-lg bg-white text-[#1B2A4A] font-bold text-sm hover:bg-slate-100 transition shadow"
            >
              Launch Demo
            </Link>
            <Link
              href="/contact?interest=free-pilot"
              className="px-6 py-3 rounded-lg bg-[#2B70AB] text-white border border-white/30 font-bold text-sm hover:bg-[#235c8e] transition"
            >
              Apply for Free Pilot
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg bg-transparent text-white border border-white/40 font-semibold text-sm hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>

      <PublicFooter />
    </div>
  );
}
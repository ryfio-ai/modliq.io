import type { Metadata } from "next";
import PublicNavbar from "@/components/marketing/PublicNavbar";
import PublicFooter from "@/components/marketing/PublicFooter";
import IndiaBadge from "@/components/marketing/IndiaBadge";
import { BookOpen, FileText, Database, Upload, Settings, Shield, Brain, Key, Terminal, Table } from "lucide-react";

export const metadata: Metadata = {
  title: "Docs — Modliq Manufacturing Intelligence Platform",
  description: "Modliq documentation: Getting started, uploading data, dataset health, writing goals, optimization, Quality Studio, operations, supply chain, lean, Quality Passport, AI Copilot, and security.",
  openGraph: {
    title: "Modliq Documentation — Manufacturing Intelligence Platform",
    description: "Practical docs for uploading data, connecting databases, writing goals, running optimization, and generating Quality Passports.",
    type: "website",
    url: "https://modliq.io/docs",
  },
};

const docSections = [
  {
    icon: <BookOpen size={20} />,
    title: "Getting Started",
    items: [
      { name: "Create a Project", href: "/studio" },
      { name: "Upload Your First Dataset", href: "/studio" },
      { name: "Connect a Database", href: "/studio" },
    ],
  },
  {
    icon: <Upload size={20} />,
    title: "Uploading Data",
    items: [
      { name: "CSV Upload Guide", href: "/studio" },
      { name: "Excel Upload Guide", href: "/studio" },
      { name: "PDF/Word Reference Documents", href: "/studio" },
      { name: "Column Detection", href: "/studio" },
    ],
  },
  {
    icon: <Database size={20} />,
    title: "Connecting Databases",
    items: [
      { name: "Supabase/Postgres Connector", href: "/studio" },
      { name: "MongoDB Connector", href: "/studio" },
      { name: "Connection Best Practices", href: "/studio" },
    ],
  },
  {
    icon: <Shield size={20} />,
    title: "Dataset Health",
    items: [
      { name: "Readiness Score", href: "/studio" },
      { name: "Missing Values & Duplicates", href: "/studio" },
      { name: "Outlier Detection", href: "/studio" },
      { name: "Target Leakage Warnings", href: "/studio" },
    ],
  },
  {
    icon: <FileText size={20} />,
    title: "Writing Good Goals",
    items: [
      { name: "Goal Syntax Guide", href: "/studio" },
      { name: "Good vs Bad Goals", href: "/studio" },
      { name: "Target/Feature/Constraint Parsing", href: "/studio" },
      { name: "Review & Confirm Wizard", href: "/studio" },
    ],
  },
  {
    icon: <Settings size={20} />,
    title: "Running Optimization",
    items: [
      { name: "ML Optimization Engine", href: "/studio" },
      { name: "Safe Trial Ranges", href: "/studio" },
      { name: "Understanding Results", href: "/studio" },
      { name: "ROI Estimate", href: "/studio" },
    ],
  },
  {
    icon: <BarChart3 size={20} />,
    title: "Quality Studio Guide",
    items: [
      { name: "Quality Summary", href: "/studio" },
      { name: "I-MR Charts & SPC Limits", href: "/studio" },
      { name: "Cp/Cpk Capability", href: "/studio" },
      { name: "AQL Sampling", href: "/studio" },
      { name: "CAPA Suggestions", href: "/studio" },
    ],
  },
  {
    icon: <Settings size={20} />,
    title: "Operations Guide",
    items: [
      { name: "OEE Calculator", href: "/studio" },
      { name: "Downtime Pareto", href: "/studio" },
      { name: "Line/Shift Comparison", href: "/studio" },
      { name: "Bottleneck Insights", href: "/studio" },
    ],
  },
  {
    icon: <Package size={20} />,
    title: "Supply Chain Guide",
    items: [
      { name: "Supplier Scorecard", href: "/studio" },
      { name: "Material Lot Traceability", href: "/studio" },
      { name: "Yield by Supplier", href: "/studio" },
      { name: "Supplier Risk Alerts", href: "/studio" },
    ],
  },
  {
    icon: <Wrench size={20} />,
    title: "Lean Guide",
    items: [
      { name: "Waste Tracker", href: "/studio" },
      { name: "Kaizen Board", href: "/studio" },
      { name: "5S Audit", href: "/studio" },
      { name: "Takt Time Calculator", href: "/studio" },
      { name: "Kanban Calculator", href: "/studio" },
    ],
  },
  {
    icon: <FileText size={20} />,
    title: "Quality Passport Guide",
    items: [
      { name: "Buyer-Ready Report", href: "/studio" },
      { name: "Audit Readiness Score", href: "/studio" },
      { name: "Markdown Export", href: "/studio" },
      { name: "Shareable Link", href: "/studio" },
      { name: "Missing Evidence List", href: "/studio" },
    ],
  },
  {
    icon: <Brain size={20} />,
    title: "AI Copilot Guide",
    items: [
      { name: "Multi-Provider AI Gateway", href: "/studio" },
      { name: "Dashboard Summaries", href: "/studio" },
      { name: "Goal Coach", href: "/studio" },
      { name: "CAPA & SOP Drafts", href: "/studio" },
    ],
  },
  {
    icon: <Lock size={20} />,
    title: "Security & Data Privacy",
    items: [
      { name: "Data Encryption", href: "/studio" },
      { name: "API Key Management", href: "/studio" },
      { name: "Project Data Scoping", href: "/studio" },
      { name: "Connector Credential Security", href: "/studio" },
    ],
  },
  {
    icon: <QuestionMark size={20} />,
    title: "FAQ",
    items: [
      { name: "Common Questions", href: "/docs" },
    ],
  },
];

function QuestionMark(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>;
}

function BarChart3(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>;
}

function Package(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
}

function Wrench(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
}

function Lock(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
}

export default function DocsPage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      <PublicNavbar />

      <section className="bg-gradient-to-b from-white to-[#F0F6FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <IndiaBadge />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A] mt-4 mb-4">Documentation</h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">Practical, beginner-friendly guides for using Modliq. Learn how to upload data, write goals, run optimization, and generate Quality Passports.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Good Goal Example */}
          <div className="bg-[#F0F6FA] rounded-2xl p-6 border border-blue-100 mb-12">
            <h3 className="text-sm font-bold text-[#1B2A4A] mb-3">Writing Good Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <span className="text-xs font-mono text-emerald-700 font-bold uppercase">Good Goal</span>
                <p className="text-sm text-slate-700 mt-2 font-mono">"Maximize yield while keeping temperature below 90°C and pressure below 5 bar."</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <span className="text-xs font-mono text-red-700 font-bold uppercase">Bad Goal</span>
                <p className="text-sm text-slate-700 mt-2 font-mono">"Make process better."</p>
              </div>
            </div>
          </div>

          {/* Column Detection Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-12">
            <h3 className="text-sm font-bold text-[#1B2A4A] mb-4">Column Name Examples and What Modliq Detects</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-3 py-2 text-[#1B2A4A] font-bold">Column Name Example</th>
                    <th className="px-3 py-2 text-[#1B2A4A] font-bold">Detected As</th>
                    <th className="px-3 py-2 text-[#1B2A4A] font-bold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="px-3 py-2 text-slate-700">yield</td><td className="px-3 py-2 text-[#2B70AB]">Target (numeric)</td><td className="px-3 py-2 text-slate-500">Auto-detected as optimization target</td></tr>
                  <tr><td className="px-3 py-2 text-slate-700">temperature</td><td className="px-3 py-2 text-[#2B70AB]">Feature (numeric)</td><td className="px-3 py-2 text-slate-500">Used as optimization input</td></tr>
                  <tr><td className="px-3 py-2 text-slate-700">pressure</td><td className="px-3 py-2 text-[#2B70AB]">Feature (numeric)</td><td className="px-3 py-2 text-slate-500">Used as optimization input</td></tr>
                  <tr><td className="px-3 py-2 text-slate-700">batch_id</td><td className="px-3 py-2 text-slate-500">Identifier</td><td className="px-3 py-2 text-slate-500">Not used for optimization</td></tr>
                  <tr><td className="px-3 py-2 text-slate-700">operator_name</td><td className="px-3 py-2 text-slate-500">Categorical</td><td className="px-3 py-2 text-slate-500">Grouping / filtering</td></tr>
                  <tr><td className="px-3 py-2 text-slate-700">timestamp</td><td className="px-3 py-2 text-slate-500">Datetime</td><td className="px-3 py-2 text-slate-500">Time-series analysis</td></tr>
                  <tr><td className="px-3 py-2 text-slate-700">defect_count</td><td className="px-3 py-2 text-[#2B70AB]">Metric (numeric)</td><td className="px-3 py-2 text-slate-500">Quality metric</td></tr>
                  <tr><td className="px-3 py-2 text-slate-700">supplier_lot</td><td className="px-3 py-2 text-slate-500">Categorical</td><td className="px-3 py-2 text-slate-500">Traceability key</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Doc Sections */}
          <div className="space-y-8">
            {docSections.map((section) => (
              <div key={section.title}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#2B70AB] text-white flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="text-lg font-bold text-[#1B2A4A]">{section.title}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ml-11">
                  {section.items.map((item) => (
                    <a key={item.name} href={item.href} className="text-sm text-[#2B70AB] hover:underline font-medium">
                      {item.name} →
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
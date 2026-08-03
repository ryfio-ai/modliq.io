import type { Metadata } from "next";
import PublicNavbar from "@/components/marketing/PublicNavbar";
import PublicFooter from "@/components/marketing/PublicFooter";
import FeatureCard from "@/components/marketing/FeatureCard";
import IndiaBadge from "@/components/marketing/IndiaBadge";
import { Database, Shield, Target, BarChart3, Package, Beaker, Zap, FileText, Upload, CheckCircle, Settings, TrendingUp, Layers, GitBranch, Wrench, BookOpen, Brain, Scale, FileSpreadsheet } from "lucide-react";

export const metadata: Metadata = {
  title: "Features — Modliq AI Manufacturing Intelligence Platform",
  description: "Explore Modliq features: Data Ingestion, Dataset Health, Optimization, Quality Studio, Operations, Supply Chain, Lean, AI Copilot, and Quality Passport. Built for Indian manufacturers.",
  openGraph: {
    title: "Modliq Features — AI Manufacturing Intelligence Platform",
    description: "Data ingestion, dataset health, optimization, quality studio, operations, supply chain, lean, AI copilot, and Quality Passport.",
    type: "website",
    url: "https://modliq.io/features",
  },
};

const featureCategories = [
  {
    title: "Data Ingestion",
    icon: <Upload size={20} />,
    color: "#2B70AB",
    description: "Upload or connect your production data from any source.",
    features: ["CSV upload", "Excel upload", "PDF/Word reference documents", "Supabase/Postgres connector", "MongoDB connector", "Dataset preview", "Column detection"],
  },
  {
    title: "Dataset Health",
    icon: <Shield size={20} />,
    color: "#10B981",
    description: "Automatic data quality checks before analysis.",
    features: ["Readiness score", "Missing values", "Duplicates", "Outliers", "Constant columns", "Target leakage warnings", "Suggested target detection"],
  },
  {
    title: "Optimization",
    icon: <Target size={20} />,
    color: "#F59E0B",
    description: "Natural language goals and ML-driven process optimization.",
    features: ["Natural language goals", "Target/feature/constraint parsing", "Review & Confirm wizard", "ML optimization", "Safe trial ranges", "ROI estimate"],
  },
  {
    title: "Quality Studio",
    icon: <BarChart3 size={20} />,
    color: "#8B5CF6",
    description: "Statistical process control and capability analysis.",
    features: ["Quality summary", "I-MR charts", "SPC limits", "Cp/Cpk", "AQL sampling", "CAPA suggestions"],
  },
  {
    title: "Operations",
    icon: <Settings size={20} />,
    color: "#EC4899",
    description: "Track OEE, downtime, and line performance.",
    features: ["OEE calculator", "Downtime Pareto", "Line/shift comparison", "Bottleneck insights"],
  },
  {
    title: "Supply Chain",
    icon: <Package size={20} />,
    color: "#06B6D4",
    description: "Supplier scorecards and material lot traceability.",
    features: ["Supplier scorecard", "Material lot traceability", "Yield by supplier", "Supplier risk alerts"],
  },
  {
    title: "Lean",
    icon: <Wrench size={20} />,
    color: "#EF4444",
    description: "Waste tracking, Kaizen boards, and time calculations.",
    features: ["Waste tracker", "Kaizen board", "5S audit", "Takt time calculator", "Kanban calculator"],
  },
  {
    title: "AI Copilot",
    icon: <Brain size={20} />,
    color: "#6366F1",
    description: "Multi-provider AI gateway for manufacturing intelligence.",
    features: ["Multi-provider AI gateway", "Dashboard summaries", "Goal coach", "CAPA drafts", "SOP drafts", "Operations reviews", "Lean suggestions"],
  },
  {
    title: "Quality Passport",
    icon: <FileText size={20} />,
    color: "#14B8A6",
    description: "Buyer-ready reports with audit readiness scores.",
    features: ["Buyer-ready report", "Audit readiness score", "Markdown export", "Shareable link", "Missing evidence list"],
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      <PublicNavbar />

      <section className="bg-gradient-to-b from-white to-[#F0F6FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <IndiaBadge />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A] mt-4 mb-4">Features</h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">Everything you need to turn production data into optimized decisions, quality evidence, and buyer-ready reports.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          {featureCategories.map((cat) => (
            <div key={cat.title}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                  {cat.icon}
                </div>
                <h2 className="text-xl font-bold text-[#1B2A4A]">{cat.title}</h2>
              </div>
              <p className="text-sm text-slate-600 mb-4">{cat.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.features.map((f) => (
                  <div key={f} className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex items-start gap-3">
                    <span className="text-[#2B70AB] mt-0.5 flex-shrink-0">&#10003;</span>
                    <span className="text-sm text-slate-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
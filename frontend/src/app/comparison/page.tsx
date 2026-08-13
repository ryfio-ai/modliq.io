import type { Metadata } from "next";
import Link from "next/link";
import PublicNavbar from "@/components/layout/PublicNavbar";
import PublicFooter from "@/components/layout/PublicFooter";
import IndiaBadge from "@/components/marketing/IndiaBadge";
import { Table, X, Check, Sparkles, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: 'Modliq Comparison — Python Notebooks vs AutoML vs BI vs Modliq',
  description:
    'Compare Modliq with Python Jupyter Notebooks, generic AutoML tools, BI dashboards, and traditional spreadsheets for manufacturing and classroom data analysis.',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/comparison',
  },
  openGraph: {
    title: 'Modliq Comparison — Python Notebooks vs AutoML vs BI vs Modliq',
    description:
      'Compare Modliq with Python Jupyter Notebooks, generic AutoML tools, BI dashboards, and traditional spreadsheets for manufacturing and classroom data analysis.',
    url: 'https://modliq-io.vercel.app/comparison',
    images: ['/og/modliq-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modliq Comparison — Python Notebooks vs AutoML vs BI vs Modliq',
    description:
      'Compare Modliq with Python Jupyter Notebooks, generic AutoML tools, BI dashboards, and traditional spreadsheets for manufacturing and classroom data analysis.',
    images: ['/og/modliq-og.png'],
  },
};

export default function ComparisonPage() {
  const matrix = [
    { feature: "No-code EDA", notebooks: "Requires Code", automl: "Basic", bi: "Manual Setup", modliq: "Automated (0 Code)" },
    { feature: "No-code visualization", notebooks: "Requires Code", automl: "Basic", bi: "Manual Drag-Drop", modliq: "Auto-Recommended" },
    { feature: "Plain-English data questions", notebooks: "Requires Code", automl: "No", bi: "Limited", modliq: "Ask Your Dataset" },
    { feature: "Model comparison", notebooks: "Manual Pipeline", automl: "Yes (Generic)", bi: "No", modliq: "Leaderboard & SHAP" },
    { feature: "Manufacturing quality tools", notebooks: "Requires SciPy Code", automl: "No", bi: "Custom Calculations", modliq: "Built-in (SPC / Cpk)" },
    { feature: "SPC / Cp/Cpk math", notebooks: "Manual Script", automl: "No", bi: "Complex DAX/SQL", modliq: "Verified Python Engine" },
    { feature: "OEE / supplier traceability", notebooks: "No", automl: "No", bi: "Partial", modliq: "Built-in" },
    { feature: "Classroom-friendly workflows", notebooks: "Complex Setup", automl: "No", bi: "Heavy License", modliq: "No-code Guided" },
    { feature: "Professional report export", notebooks: "PDF Export", automl: "CSV/JSON Only", bi: "Dashboard Share", modliq: "Quality Passport / Markdown" },
    { feature: "Beginner-friendly UX", notebooks: "Steep Curve", automl: "Medium", bi: "Medium", modliq: "Guided (0 Friction)" },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen flex flex-col justify-between">
      <div>
        <PublicNavbar />

        <section className="bg-gradient-to-b from-white via-[#F0F6FA] to-white py-16 border-b border-[#D0E2F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <IndiaBadge />
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1B2A4A] tracking-tight">
              Why Modliq? Comparison Matrix
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-medium">
              See how Modliq compares to traditional Python notebooks, generic AutoML tools, and BI dashboards across manufacturing and educational workflows.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="overflow-x-auto rounded-2xl border border-[#D0E2F0] bg-white shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#1B2A4A] text-white">
                    <th className="px-5 py-4 font-bold">Capability / Feature</th>
                    <th className="px-5 py-4 font-bold text-slate-300">Python Notebooks</th>
                    <th className="px-5 py-4 font-bold text-slate-300">Generic AutoML</th>
                    <th className="px-5 py-4 font-bold text-slate-300">BI Dashboards</th>
                    <th className="px-5 py-4 font-bold text-blue-300 bg-blue-900/40">Modliq Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {matrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-5 py-4 font-bold text-[#1B2A4A]">{row.feature}</td>
                      <td className="px-5 py-4 text-slate-500">{row.notebooks}</td>
                      <td className="px-5 py-4 text-slate-500">{row.automl}</td>
                      <td className="px-5 py-4 text-slate-500">{row.bi}</td>
                      <td className="px-5 py-4 font-bold text-[#2B70AB] bg-blue-50/50 flex items-center gap-1.5">
                        <Check size={16} className="text-emerald-600 shrink-0" />
                        <span>{row.modliq}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-6 text-center">
              <Link
                href="/contact?interest=demo"
                className="px-7 py-3.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition shadow-md"
              >
                <Sparkles className="w-4 h-4 text-blue-200" />
                <span>Book Your Free Demo</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <PublicFooter />
    </div>
  );
}
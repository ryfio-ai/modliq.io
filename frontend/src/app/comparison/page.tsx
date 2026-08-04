import type { Metadata } from "next";
import PublicNavbar from "@/components/marketing/PublicNavbar";
import PublicFooter from "@/components/marketing/PublicFooter";
import IndiaBadge from "@/components/marketing/IndiaBadge";
import { Table, X, Check } from "lucide-react";

export const metadata: Metadata = {
  title: 'Modliq Comparison — Excel vs BI vs ERP vs Manufacturing Intelligence',
  description:
    'Compare Modliq with Excel, BI dashboards, ERP/MES, consultants, and generic AI tools for manufacturing data analysis and quality reporting.',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/comparison',
  },
  openGraph: {
    title: 'Modliq Comparison — Excel vs BI vs ERP vs Manufacturing Intelligence',
    description:
      'Compare Modliq with Excel, BI dashboards, ERP/MES, consultants, and generic AI tools for manufacturing data analysis and quality reporting.',
    url: 'https://modliq-io.vercel.app/comparison',
    images: ['/og/modliq-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modliq Comparison — Excel vs BI vs ERP vs Manufacturing Intelligence',
    description:
      'Compare Modliq with Excel, BI dashboards, ERP/MES, consultants, and generic AI tools for manufacturing data analysis and quality reporting.',
    images: ['/og/modliq-og.png'],
  },
};

const capabilities = [
  "CSV/Excel upload",
  "Dataset health",
  "Natural language manufacturing goals",
  "Process optimization",
  "SPC / Cp / Cpk",
  "OEE",
  "Supplier lot traceability",
  "Lean actions",
  "Quality Passport",
  "SOP / CAPA generation",
  "SME-friendly pricing",
  "Fast pilot setup",
];

const rows = [
  { name: "Excel / Manual QC", icon: <Table size={16} />, values: ["✓", "✗", "✗", "✗", "Manual", "✗", "✗", "✗", "✗", "✗", "✓", "✓"] },
  { name: "BI Dashboard", icon: <Table size={16} />, values: ["✓", "✗", "✗", "✗", "✗", "✓", "✗", "✗", "✗", "✗", "✗", "✓"] },
  { name: "ERP / MES", icon: <Table size={16} />, values: ["✗", "✗", "✗", "✗", "✗", "✓", "✗", "✗", "✗", "✗", "✗", "✗"] },
  { name: "Consultants", icon: <Table size={16} />, values: ["✗", "✗", "✗", "✗", "Manual", "✗", "✗", "✗", "✗", "✗", "✗", "✗"] },
  { name: "Generic AI Chatbot", icon: <Table size={16} />, values: ["✗", "✗", "✗", "✗", "✗", "✗", "✗", "✗", "✗", "✗", "✓", "✓"] },
  { name: "Traditional AutoML", icon: <Table size={16} />, values: ["✗", "✗", "✗", "✓", "✗", "✗", "✗", "✗", "✗", "✗", "✗", "✗"] },
  { name: "Modliq", icon: <Table size={16} />, values: ["✓", "✓", "✓", "✓", "✓", "✓", "✓", "✓", "✓", "✓", "✓", "✓"], highlight: true },
];

export default function ComparisonPage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      <PublicNavbar />

      <section className="bg-gradient-to-b from-white to-[#F0F6FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <IndiaBadge />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A] mt-4 mb-4">Comparison</h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">How Modliq compares to other approaches for manufacturing intelligence.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="bg-[#F0F6FA] text-[#1B2A4A] uppercase border-b border-slate-200">
                  <th className="px-3 py-3 text-left font-bold">Capability</th>
                  <th className="px-3 py-3 text-center font-bold">Excel</th>
                  <th className="px-3 py-3 text-center font-bold">BI Dashboard</th>
                  <th className="px-3 py-3 text-center font-bold">ERP/MES</th>
                  <th className="px-3 py-3 text-center font-bold">Consultants</th>
                  <th className="px-3 py-3 text-center font-bold">Generic AI</th>
                  <th className="px-3 py-3 text-center font-bold text-[#2B70AB]">Modliq</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {capabilities.map((cap, i) => (
                  <tr key={cap} className={rows[rows.length - 1].highlight ? "bg-blue-50/30" : ""}>
                    <td className="px-3 py-2.5 text-slate-700 font-medium">{cap}</td>
                    {rows.map((row, ri) => (
                      <td key={ri} className={`px-3 py-2.5 text-center ${row.highlight ? "text-[#2B70AB] font-bold" : row.values[i] === "✓" ? "text-emerald-600" : row.values[i] === "✗" ? "text-red-400" : "text-slate-500"}`}>
                        {row.values[i] === "✓" && <Check size={14} className="inline mx-auto" />}
                        {row.values[i] === "✗" && <X size={14} className="inline mx-auto" />}
                        {!["✓", "✗"].includes(row.values[i]) && <span className="text-slate-500">{row.values[i]}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">
            <h3 className="text-sm font-bold text-[#1B2A4A] mb-2">Strategic Positioning</h3>
            <p className="text-sm text-slate-700 leading-relaxed">Modliq does not replace ERP or MES. It sits on top of existing data and helps teams make better manufacturing decisions. Think of Modliq as an intelligence layer that works alongside your existing systems.</p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
import type { Metadata } from "next";
import PublicNavbar from "@/components/marketing/PublicNavbar";
import PublicFooter from "@/components/marketing/PublicFooter";
import WorkflowSteps from "@/components/marketing/WorkflowSteps";
import IndiaBadge from "@/components/marketing/IndiaBadge";

export const metadata: Metadata = {
  title: 'Modliq Workflow — From Factory Data to Quality Passport',
  description:
    'See the Modliq workflow from data ingestion and health scoring to optimization, quality validation, operations insight, and buyer-ready Quality Passport.',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/workflow',
  },
  openGraph: {
    title: 'Modliq Workflow — From Factory Data to Quality Passport',
    description:
      'See the Modliq workflow from data ingestion and health scoring to optimization, quality validation, operations insight, and buyer-ready Quality Passport.',
    url: 'https://modliq-io.vercel.app/workflow',
    images: ['/og/modliq-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modliq Workflow — From Factory Data to Quality Passport',
    description:
      'See the Modliq workflow from data ingestion and health scoring to optimization, quality validation, operations insight, and buyer-ready Quality Passport.',
    images: ['/og/modliq-og.png'],
  },
};

const steps = [
  { number: 1, title: "Create Project", description: "Set up a new project for your factory, line, or process.", icon: <FolderPlus size={18} /> },
  { number: 2, title: "Upload or Connect Data", description: "Upload CSV/Excel or connect your Supabase/Postgres or MongoDB database.", icon: <Upload size={18} /> },
  { number: 3, title: "Review Dataset Health", description: "Check readiness score, missing values, duplicates, outliers, and target leakage warnings.", icon: <ShieldCheck size={18} /> },
  { number: 4, title: "Select Template or Type Goal", description: "Choose a process template or describe your goal in natural language.", icon: <FileText size={18} /> },
  { number: 5, title: "Review & Confirm Setup", description: "Verify target, features, and constraints before running optimization.", icon: <CheckCircle size={18} /> },
  { number: 6, title: "Run Optimization", description: "Modliq's ML engine recommends optimal process settings within safe ranges.", icon: <Zap size={18} /> },
  { number: 7, title: "Validate with Quality Studio", description: "Check SPC stability, Cp/Cpk capability, and generate QC reports.", icon: <BarChart3 size={18} /> },
  { number: 8, title: "Track Operations / Supply / Lean Actions", description: "Monitor OEE, supplier risk, waste, and Kaizen actions.", icon: <Settings size={18} /> },
  { number: 9, title: "Generate Quality Passport", description: "Create a buyer-ready report with audit readiness score and traceability.", icon: <FileText size={18} /> },
  { number: 10, title: "Share with Buyer or Leadership", description: "Export Markdown report or share a link with stakeholders.", icon: <Share2 size={18} /> },
];

function FolderPlus(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.17 2H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"/><line x1="12" x2="12" y1="11" y2="17"/><line x1="9" x2="15" y1="14" y2="14"/></svg>; }
function Upload(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>; }
function ShieldCheck(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>; }
function FileText(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>; }
function CheckCircle(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>; }
function Zap(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>; }
function BarChart3(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>; }
function Settings(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>; }
function Share2(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>; }

export default function WorkflowPage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      <PublicNavbar />

      <section className="bg-gradient-to-b from-white to-[#F0F6FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <IndiaBadge />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A] mt-4 mb-4">Workflow</h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">A step-by-step guide to using Modliq for manufacturing intelligence.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <WorkflowSteps steps={steps} />
        </div>
      </section>

      {/* Example */}
      <section className="py-16 bg-[#F0F6FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-[#1B2A4A] mb-6 text-center">Example: Specialty Chemical Batch Yield Workflow</h2>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="font-mono text-sm text-slate-700 space-y-3">
              <p><span className="text-[#2B70AB] font-bold">1.</span> Upload 500 batch records</p>
              <p><span className="text-[#2B70AB] font-bold">→</span> Detect yield, temperature, pressure columns</p>
              <p><span className="text-[#2B70AB] font-bold">2.</span> Set goal: maximize yield under safe temperature</p>
              <p><span className="text-[#2B70AB] font-bold">→</span> Modliq recommends optimal setpoints</p>
              <p><span className="text-[#2B70AB] font-bold">3.</span> QC validates stability with SPC charts</p>
              <p><span className="text-[#2B70AB] font-bold">→</span> Trial SOP generated for controlled validation</p>
              <p><span className="text-[#2B70AB] font-bold">4.</span> Quality Passport exported for buyer</p>
              <p><span className="text-slate-400">All recommendations should be validated through controlled trials and responsible engineering review.</span></p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
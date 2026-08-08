import Link from "next/link";
import { ArrowRight, Play, Factory, ShieldCheck, BarChart3, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-white to-[#F0F6FA] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2B70AB] text-xs font-mono font-semibold uppercase tracking-wider mb-6">
            <Sparkles size={14} /> AI-Assisted Manufacturing Intelligence
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1B2A4A] tracking-tight leading-[1.1] mb-6">
            Engineered for Process Teams &amp; Manufacturers.
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            From factory data to better process decisions — in minutes. Modliq helps manufacturing teams upload or connect production data, check dataset health, optimize process settings, validate quality, and generate buyer-ready Quality Passports.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing" className="w-full sm:w-auto px-7 py-3.5 bg-[#2B70AB] hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 text-sm">
              Launch Demo <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-[#1B2A4A] font-semibold rounded-xl border border-slate-300 transition flex items-center justify-center gap-2 text-sm shadow-sm">
              Book a Pilot
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-xs font-mono">
            <span className="flex items-center gap-1.5"><Factory size={14} className="text-[#2B70AB]" /> AI-Assisted</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#2B70AB]" /> Quality Engineering</span>
            <span className="flex items-center gap-1.5"><BarChart3 size={14} className="text-[#2B70AB]" /> OEE &amp; Operations</span>
            <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-[#2B70AB]" /> Supply Chain Traceability</span>
            <span className="flex items-center gap-1.5"><Play size={14} className="text-[#2B70AB]" /> Buyer-Ready Reports</span>
          </div>
        </div>
      </div>
    </section>
  );
}

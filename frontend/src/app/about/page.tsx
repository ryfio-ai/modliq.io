import type { Metadata } from 'next';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import { Factory, MapPin, Users, Target, Lightbulb, Shield, Scale, Rocket, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Modliq — A Manufacturing Intelligence Product by Qeltrava AI',
  description:
    'Modliq is a manufacturing intelligence product built by Qeltrava AI from Tamil Nadu, India. We help manufacturers turn production data into better process decisions, quality evidence, and buyer-ready Quality Passports.',
  openGraph: {
    title: 'About Modliq — A Manufacturing Intelligence Product by Qeltrava AI',
    description:
      'Modliq is built by Qeltrava AI from Tamil Nadu for the manufacturing world. Helping manufacturers turn production data into better decisions.',
    type: 'website',
    url: 'https://modliq.io/about',
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      <PublicNavbar />

      <section className="bg-gradient-to-b from-white via-[#F0F6FA] to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-[#2B70AB]">
            <span>A Product by Qeltrava AI • Made in Tamil Nadu, India</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1B2A4A]">About Modliq</h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Modliq is built by Qeltrava AI to help manufacturing teams turn production data into optimized decisions, validated quality, and buyer-ready proof.
          </p>
        </div>
      </section>

      {/* Built by Qeltrava AI */}
      <section className="py-16 bg-[#F0F6FA] border-t border-b border-[#D0E2F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-mono text-[#2B70AB] uppercase tracking-widest font-bold">
            Parent Company
          </span>
          <h2 className="text-3xl font-extrabold text-[#1B2A4A]">Built by Qeltrava AI</h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto">
            Modliq is a product by Qeltrava AI, an AI-focused company building practical, industry-ready AI systems from Tamil Nadu, India.
            With Modliq, Qeltrava AI is focused on helping manufacturers turn production data into better process decisions, quality evidence, and buyer-ready reports.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://qeltravaai.vercel.app/en"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#2B70AB] text-white rounded-xl text-xs font-bold hover:bg-[#1B2A4A] transition shadow-sm inline-flex items-center gap-1.5"
            >
              <span>Visit Qeltrava AI</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/company/qeltravai/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white text-[#1B2A4A] border border-[#D0E2F0] rounded-xl text-xs font-bold hover:bg-slate-100 transition inline-flex items-center gap-1.5"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="https://www.instagram.com/qeltravaai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white text-[#1B2A4A] border border-[#D0E2F0] rounded-xl text-xs font-bold hover:bg-slate-100 transition inline-flex items-center gap-1.5"
            >
              <span>Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono text-[#2B70AB] uppercase tracking-widest font-bold">Our Mission</span>
              <h2 className="text-2xl font-bold text-[#1B2A4A] mt-2 mb-4">
                India is becoming one of the world's most important manufacturing hubs. Modliq is here to help factories make the most of their data.
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                Many factories still rely on spreadsheets, manual reports, and disconnected tools to make critical production and quality decisions. Modliq was created by Qeltrava AI to help manufacturers use their existing data to improve process decisions, reduce quality losses, and present stronger evidence to buyers and auditors.
              </p>
            </div>
            <div className="bg-[#F0F6FA] rounded-2xl p-8 border border-[#D0E2F0]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2B70AB] text-white flex items-center justify-center"><Target size={18} /></div>
                  <div><h4 className="text-sm font-bold text-[#1B2A4A]">Turn data into decisions</h4><p className="text-xs text-slate-500">AI-assisted recommendations for process improvement</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2B70AB] text-white flex items-center justify-center"><Shield size={18} /></div>
                  <div><h4 className="text-sm font-bold text-[#1B2A4A]">Quality evidence for buyers</h4><p className="text-xs text-slate-500">Buyer-ready Quality Passports with full traceability</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2B70AB] text-white flex items-center justify-center"><Scale size={18} /></div>
                  <div><h4 className="text-sm font-bold text-[#1B2A4A]">SME-friendly pricing</h4><p className="text-xs text-slate-500">Free launch pilot & transparent plant pricing</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Tamil Nadu */}
      <section className="py-16 bg-[#F0F6FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-[#2B70AB] uppercase tracking-widest font-bold">Why Tamil Nadu</span>
            <h2 className="text-2xl font-bold text-[#1B2A4A] mt-2">Built with a manufacturing-first mindset</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3"><MapPin size={20} className="text-[#2B70AB]" /><h3 className="text-base font-bold text-[#1B2A4A]">Tamil Nadu Manufacturing Clusters</h3></div>
              <p className="text-sm text-slate-600 leading-relaxed">Tamil Nadu is home to automotive, textile, engineering, chemical, electronics, and food manufacturing clusters. Modliq is built with this manufacturing-first mindset.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3"><Factory size={20} className="text-[#2B70AB]" /><h3 className="text-base font-bold text-[#1B2A4A]">Made in Tamil Nadu</h3></div>
              <p className="text-sm text-slate-600 leading-relaxed">Modliq is built from Tamil Nadu by Qeltrava AI for the manufacturing world. We understand the realities of Indian factory floors, export supply chains, and MSME operations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Manufacturing */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-[#2B70AB] uppercase tracking-widest font-bold">Why Manufacturing</span>
            <h2 className="text-2xl font-bold text-[#1B2A4A] mt-2">Manufacturing needs intelligence, not just automation</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Users size={18} />, title: "Indian MSME Manufacturers", desc: "Small and medium enterprises that need affordable, practical tools for data-driven decisions." },
              { icon: <Factory size={18} />, title: "SME Factory Owners", desc: "Owners who want to see yield, quality, and efficiency improvements without expensive consultants." },
              { icon: <Target size={18} />, title: "Plant Heads & Quality Heads", desc: "Leaders who need SPC, Cp/Cpk, and audit-ready evidence at their fingertips." },
              { icon: <Rocket size={18} />, title: "Export-Oriented Manufacturers", desc: "Companies that need buyer-ready Quality Passports and traceability for global customers." },
              { icon: <Scale size={18} />, title: "OEM Supplier Companies", desc: "Suppliers who must demonstrate quality discipline and process capability to their customers." },
              { icon: <Lightbulb size={18} />, title: "Process Engineers", desc: "Engineers who want AI-assisted recommendations validated through controlled trials." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-start gap-3">
                <span className="text-[#2B70AB] flex-shrink-0 mt-0.5">{item.icon}</span>
                <div><h4 className="text-sm font-bold text-[#1B2A4A] mb-1">{item.title}</h4><p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="py-16 bg-[#F0F6FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-[#2B70AB] uppercase tracking-widest font-bold">Our Principles</span>
            <h2 className="text-2xl font-bold text-[#1B2A4A] mt-2">How we build and operate</h2>
          </div>
          <div className="space-y-4">
            {[
              { title: "Simple before complex", desc: "We start with the simplest solution that works. Complexity is added only when necessary." },
              { title: "Evidence before hype", desc: "Every claim is backed by data. We show you the numbers, not the marketing." },
              { title: "Engineers stay in control", desc: "AI suggests, engineers decide. Humans remain in the loop for every critical decision." },
              { title: "AI assists, humans approve", desc: "All AI recommendations should be validated through controlled trials and responsible engineering review." },
              { title: "Made for factory reality", desc: "We design for the realities of Indian factory floors — intermittent connectivity, mixed data formats, and varied skill levels." },
            ].map((p) => (
              <div key={p.title} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#2B70AB] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">✓</div>
                <div><h4 className="text-sm font-bold text-[#1B2A4A] mb-1">{p.title}</h4><p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
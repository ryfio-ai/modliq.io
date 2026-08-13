import type { Metadata } from 'next';
import Link from 'next/link';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import PricingCard from '@/components/marketing/PricingCard';
import IndiaBadge from '@/components/marketing/IndiaBadge';
import DisclaimerBox from '@/components/marketing/DisclaimerBox';
import { Check, Sparkles, Factory, GraduationCap, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Modliq Pricing — No-Code ML for Manufacturing, Education & Research',
  description:
    'Modliq pricing and demo options for manufacturing plants, universities, educators, students, and research scholars. Book your free demo today.',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/pricing',
  },
  openGraph: {
    title: 'Modliq Pricing — No-Code ML for Manufacturing, Education & Research',
    description:
      'Modliq pricing and demo options for manufacturing plants, universities, educators, students, and research scholars. Book your free demo today.',
    url: 'https://modliq-io.vercel.app/pricing',
    images: ['/og/modliq-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modliq Pricing — No-Code ML for Manufacturing, Education & Research',
    description:
      'Modliq pricing and demo options for manufacturing plants, universities, educators, students, and research scholars. Book your free demo today.',
    images: ['/og/modliq-og.png'],
  },
};

export default function PricingPage() {
  const costRows = [
    { option: 'Data scientist hire', cost: 'Indicative ₹12L–₹30L/year', time: 'Months', specific: 'Depends' },
    { option: 'ML engineer hire', cost: 'Indicative ₹15L–₹40L/year', time: 'Months', specific: 'Depends' },
    { option: 'Consultant project', cost: 'Indicative ₹2L–₹20L/project', time: 'Weeks/months', specific: 'Yes' },
    { option: 'Generic AutoML', cost: 'High Monthly SaaS', time: 'Weeks', specific: 'No' },
    { option: 'Modliq Launch Demo', cost: 'Free Demo Access', time: 'Immediate', specific: 'Yes (Dual Audience)' },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen flex flex-col justify-between">
      <div>
        <PublicNavbar />

        {/* Hero Section with August 20 Launch Banner */}
        <section className="bg-gradient-to-b from-white via-[#F0F6FA] to-white py-16 border-b border-[#D0E2F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-100 text-blue-900 border border-blue-200 rounded-full text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5 text-[#2B70AB]" />
              <span>Launching August 20 — Book your free demo.</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1B2A4A] tracking-tight">
              Simple, transparent plans for industry &amp; academia.
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-medium">
              Start analyzing data, building models, and proving results without code — tailored for manufacturing plants, classrooms, and research teams.
            </p>
          </div>
        </section>

        {/* Section 1: Manufacturing Industry Pricing */}
        <section className="py-12 bg-white border-b border-[#D0E2F0]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-[#2B70AB] rounded-xl border border-blue-200">
                <Factory size={22} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#1B2A4A]">Manufacturing Industry Plans</h2>
                <p className="text-xs text-slate-500">For auto components, specialty chemicals, food, pharma, plastics, &amp; precision engineering plants.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
              
              <div className="p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-5 flex flex-col justify-between hover:border-[#2B70AB] transition shadow-xs">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Evaluation</span>
                  <h3 className="text-xl font-extrabold text-[#1B2A4A]">Launch Demo</h3>
                  <p className="text-2xl font-black text-slate-900">Free</p>
                  <p className="text-xs text-slate-500">Full platform evaluation &amp; sample datasets</p>
                  <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Interactive Demo Access</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Dataset Health Profiling</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Quality Passport Samples</li>
                  </ul>
                </div>
                <Link
                  href="/contact?interest=demo"
                  className="w-full py-2.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-xs font-bold text-center transition"
                >
                  Book Your Free Demo
                </Link>
              </div>

              <div className="p-6 bg-white border-2 border-blue-200 rounded-2xl space-y-5 flex flex-col justify-between hover:shadow-md transition shadow-xs">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded uppercase tracking-wider">30-Day Pilot</span>
                  <h3 className="text-xl font-extrabold text-[#1B2A4A]">Paid Pilot</h3>
                  <p className="text-2xl font-black text-slate-900">Contact us</p>
                  <p className="text-xs text-slate-500">30-day proof-of-value trial on 1 live line</p>
                  <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 1 Live Line Ingestion</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> AutoML Optimization</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> PPAP / ISIR Evidence Packs</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Dedicated Onboarding</li>
                  </ul>
                </div>
                <Link
                  href="/contact?interest=demo"
                  className="w-full py-2.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-xs font-bold text-center transition"
                >
                  Book Your Free Demo
                </Link>
              </div>

              <div className="p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-5 flex flex-col justify-between hover:border-[#2B70AB] transition shadow-xs">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#2B70AB] uppercase tracking-wider">Single Plant</span>
                  <h3 className="text-xl font-extrabold text-[#1B2A4A]">Pro Plan</h3>
                  <p className="text-2xl font-black text-slate-900">Contact us</p>
                  <p className="text-xs text-slate-500">Per plant monthly subscription</p>
                  <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Unlimited Datasets</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Full Quality Studio (Cp/Cpk)</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> OEE &amp; Supplier Risk</li>
                  </ul>
                </div>
                <Link
                  href="/contact?interest=demo"
                  className="w-full py-2.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-xs font-bold text-center transition"
                >
                  Book Your Free Demo
                </Link>
              </div>

              <div className="p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-5 flex flex-col justify-between hover:border-[#2B70AB] transition shadow-xs">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Multi-Plant</span>
                  <h3 className="text-xl font-extrabold text-[#1B2A4A]">Enterprise</h3>
                  <p className="text-2xl font-black text-slate-900">Custom</p>
                  <p className="text-xs text-slate-500">For enterprise group deployments</p>
                  <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Custom DB Mesh</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Offline / Air-Gapped Suite</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> SLA &amp; Admin Console</li>
                  </ul>
                </div>
                <Link
                  href="/contact?interest=demo"
                  className="w-full py-2.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-xs font-bold text-center transition"
                >
                  Book Your Free Demo
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Section 2: Education & Research Pricing */}
        <section className="py-12 bg-[#F0F6FA] border-b border-[#D0E2F0]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl border border-purple-200">
                <GraduationCap size={22} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#1B2A4A]">Education &amp; Research Plans</h2>
                <p className="text-xs text-slate-500">For students, educators, engineering colleges, universities, &amp; research scholars.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              
              <div className="p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-5 flex flex-col justify-between hover:border-purple-600 transition shadow-xs">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Students</span>
                  <h3 className="text-xl font-extrabold text-[#1B2A4A]">Student / Learning</h3>
                  <p className="text-2xl font-black text-slate-900">Free</p>
                  <p className="text-xs text-slate-500">Free demo access for learning &amp; coursework</p>
                  <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0" /> Interactive Demo Access</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0" /> No-code EDA &amp; Chart Studio</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0" /> AutoML Model Comparison</li>
                  </ul>
                </div>
                <Link
                  href="/contact?interest=demo"
                  className="w-full py-2.5 bg-purple-700 hover:bg-purple-900 text-white rounded-xl text-xs font-bold text-center transition"
                >
                  Book Your Free Demo
                </Link>
              </div>

              <div className="p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-5 flex flex-col justify-between hover:border-purple-600 transition shadow-xs">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Institutions</span>
                  <h3 className="text-xl font-extrabold text-[#1B2A4A]">Classroom / Institute</h3>
                  <p className="text-2xl font-black text-slate-900">Contact us</p>
                  <p className="text-xs text-slate-500">For faculty lab licensing &amp; student cohorts</p>
                  <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0" /> Multi-Student Workspaces</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0" /> Classroom Presets &amp; Assignments</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0" /> Faculty Onboarding Support</li>
                  </ul>
                </div>
                <Link
                  href="/contact?interest=demo"
                  className="w-full py-2.5 bg-purple-700 hover:bg-purple-900 text-white rounded-xl text-xs font-bold text-center transition"
                >
                  Book Your Free Demo
                </Link>
              </div>

              <div className="p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-5 flex flex-col justify-between hover:border-purple-600 transition shadow-xs">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Research</span>
                  <h3 className="text-xl font-extrabold text-[#1B2A4A]">Research Scholars</h3>
                  <p className="text-2xl font-black text-slate-900">Contact us</p>
                  <p className="text-xs text-slate-500">For PhD, Master's thesis, &amp; paper analysis</p>
                  <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0" /> Research Dataset Exploration</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0" /> SHAP Feature Driver Exports</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0" /> Markdown &amp; PDF Report Exports</li>
                  </ul>
                </div>
                <Link
                  href="/contact?interest=demo"
                  className="w-full py-2.5 bg-purple-700 hover:bg-purple-900 text-white rounded-xl text-xs font-bold text-center transition"
                >
                  Book Your Free Demo
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Cost Savings Comparison Section */}
        <section className="py-16 bg-white border-b border-[#D0E2F0]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2B70AB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Financial &amp; Setup Advantage
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B2A4A]">
                Avoid complex software setup &amp; custom coding friction.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether managing a manufacturing line or teaching a data science lab, Modliq provides a guided no-code workflow to get started immediately.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#D0E2F0] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#1B2A4A] text-white">
                      <th className="px-5 py-4 font-bold">Approach / Option</th>
                      <th className="px-5 py-4 font-bold">Estimated Cost</th>
                      <th className="px-5 py-4 font-bold">Time to Value</th>
                      <th className="px-5 py-4 font-bold">No-Code Guided?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {costRows.map((r, i) => (
                      <tr key={i} className={r.option.includes('Modliq') ? 'bg-blue-50/70 font-bold text-[#1B2A4A]' : 'hover:bg-slate-50'}>
                        <td className="px-5 py-3.5 flex items-center gap-2">
                          {r.option.includes('Modliq') && <Sparkles size={16} className="text-[#2B70AB] shrink-0" />}
                          <span>{r.option}</span>
                        </td>
                        <td className="px-5 py-3.5 font-mono">{r.cost}</td>
                        <td className="px-5 py-3.5">{r.time}</td>
                        <td className="px-5 py-3.5">
                          {r.specific.startsWith('Yes') ? (
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs font-semibold border border-emerald-200">
                              {r.specific}
                            </span>
                          ) : (
                            <span className="text-slate-500">{r.specific}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#F0F6FA]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <DisclaimerBox />
          </div>
        </section>
      </div>

      <PublicFooter />
    </div>
  );
}
import type { Metadata } from 'next';
import Link from 'next/link';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import PricingCard from '@/components/marketing/PricingCard';
import IndiaBadge from '@/components/marketing/IndiaBadge';
import DisclaimerBox from '@/components/marketing/DisclaimerBox';
import { Check, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Modliq Pricing — Avoid Data Science Hiring Costs with Guided ML',
  description:
    'Modliq pricing & pilot options. Avoid the cost of hiring data scientists or ML engineers. Use guided manufacturing intelligence directly on your existing factory data.',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/pricing',
  },
  openGraph: {
    title: 'Modliq Pricing — Avoid Data Science Hiring Costs with Guided ML',
    description:
      'Modliq pricing & pilot options. Avoid the cost of hiring data scientists or ML engineers. Use guided manufacturing intelligence directly on your existing factory data.',
    url: 'https://modliq-io.vercel.app/pricing',
    images: ['/og/modliq-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modliq Pricing — Avoid Data Science Hiring Costs with Guided ML',
    description:
      'Modliq pricing & pilot options. Avoid the cost of hiring data scientists or ML engineers. Use guided manufacturing intelligence directly on your existing factory data.',
    images: ['/og/modliq-og.png'],
  },
};

export default function PricingPage() {
  const costRows = [
    { option: 'Data scientist hire', cost: 'Indicative ₹12L–₹30L/year', time: 'Months', specific: 'Depends' },
    { option: 'ML engineer hire', cost: 'Indicative ₹15L–₹40L/year', time: 'Months', specific: 'Depends' },
    { option: 'Consultant project', cost: 'Indicative ₹2L–₹20L/project', time: 'Weeks/months', specific: 'Yes' },
    { option: 'Generic AutoML', cost: 'High Monthly SaaS', time: 'Weeks', specific: 'No' },
    { option: 'Modliq Launch Pilot', cost: 'Free for 10 selected companies / ₹99,000 pilot', time: 'Days/weeks', specific: 'Yes (Manufacturing-First)' },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen flex flex-col justify-between">
      <div>
        <PublicNavbar />

        <section className="bg-gradient-to-b from-white via-[#F0F6FA] to-white py-16 border-b border-[#D0E2F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-3">
            <IndiaBadge />
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1B2A4A] mt-2">Pricing & Pilot Plans</h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-medium">
              Start using your existing factory data without hiring data scientists, ML engineers, or building complex custom infrastructure.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 bg-white border-b border-[#D0E2F0]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <PricingCard
                name="Launch Pilot"
                price="₹0"
                period="10 Slots Open"
                description="Free for first 10 selected manufacturing companies"
                features={[
                  'Full platform access',
                  'CSV/Excel data ingestion',
                  'Dataset health scoring',
                  'Process optimization engine',
                  'Quality Studio (SPC, Cp/Cpk)',
                  'Buyer-ready Quality Passport exports',
                  '1-on-1 engineering onboarding',
                ]}
                cta="Apply for Launch Pilot"
                href="/contact?interest=free-pilot"
                highlight
              />
              <PricingCard
                name="Custom Enterprise"
                price="Custom"
                period="pricing"
                description="For multi-plant manufacturing teams & enterprise deployments"
                features={[
                  'Multi-plant deployment & mesh',
                  'Custom DB connectors (Supabase, Postgres, Mongo)',
                  'Admin observability console',
                  'Buyer share links & custom templates',
                  'Air-gapped offline suite options',
                  'Dedicated engineering SLAs',
                ]}
                cta="Contact Enterprise Team"
                href="/contact"
              />
            </div>
          </div>
        </section>

        {/* Cost Savings Comparison Section */}
        <section className="py-16 bg-[#F0F6FA] border-b border-[#D0E2F0]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2B70AB] bg-white px-3 py-1 rounded-full border border-[#D0E2F0]">
                Financial & Time Advantage
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B2A4A]">
                Avoid the cost of building an internal data science workflow.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hiring a data scientist, ML engineer, or consultant can be expensive and slow. Modliq gives manufacturing teams a guided platform to start using their existing production data immediately.
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
                      <th className="px-5 py-4 font-bold">Manufacturing-Specific?</th>
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

            <p className="text-[11px] text-slate-500 italic text-center">
              Note: Indicative costs vary by city, seniority, project complexity, and team size.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <DisclaimerBox />
          </div>
        </section>
      </div>

      <PublicFooter />
    </div>
  );
}
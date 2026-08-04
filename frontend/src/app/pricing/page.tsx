import type { Metadata } from 'next';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import PricingCard from '@/components/marketing/PricingCard';
import IndiaBadge from '@/components/marketing/IndiaBadge';
import DisclaimerBox from '@/components/marketing/DisclaimerBox';

export const metadata: Metadata = {
  title: 'Modliq Pricing — Launch Pilot & Custom Enterprise Plans',
  description:
    'View Modliq pricing options: Free Launch Pilot for selected manufacturing plants and Custom Enterprise plans.',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/pricing',
  },
  openGraph: {
    title: 'Modliq Pricing — Launch Pilot & Custom Enterprise Plans',
    description:
      'View Modliq pricing options: Free Launch Pilot for selected manufacturing plants and Custom Enterprise plans.',
    url: 'https://modliq-io.vercel.app/pricing',
    images: ['/og/modliq-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modliq Pricing — Launch Pilot & Custom Enterprise Plans',
    description:
      'View Modliq pricing options: Free Launch Pilot for selected manufacturing plants and Custom Enterprise plans.',
    images: ['/og/modliq-og.png'],
  },
};

export default function PricingPage() {
  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen flex flex-col justify-between">
      <div>
        <PublicNavbar />

        <section className="bg-gradient-to-b from-white via-[#F0F6FA] to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-3">
            <IndiaBadge />
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1B2A4A] mt-2">Pricing Plans</h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Early access pricing for manufacturing teams. Choose between our Launch Pilot program and Custom Enterprise deployment.
            </p>
          </div>
        </section>

        <section className="py-12">
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

            <div className="mt-12">
              <DisclaimerBox />
            </div>

            <div className="text-center mt-6">
              <p className="text-xs text-slate-500">
                Launch pilot slots are limited to 10 qualified manufacturing companies upon application review.
              </p>
            </div>
          </div>
        </section>
      </div>

      <PublicFooter />
    </div>
  );
}
import type { Metadata } from "next";
import PublicNavbar from "@/components/marketing/PublicNavbar";
import PublicFooter from "@/components/marketing/PublicFooter";
import PricingCard from "@/components/marketing/PricingCard";
import IndiaBadge from "@/components/marketing/IndiaBadge";
import DisclaimerBox from "@/components/marketing/DisclaimerBox";
import { Rocket, Shield, Crown, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: 'Modliq Pricing — Manufacturing Intelligence Pilot Plans in INR',
  description:
    'View Modliq pricing in INR, including free launch pilot slots, paid pilot plans, Pro plant pricing, and Enterprise options.',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/pricing',
  },
  openGraph: {
    title: 'Modliq Pricing — Manufacturing Intelligence Pilot Plans in INR',
    description:
      'View Modliq pricing in INR, including free launch pilot slots, paid pilot plans, Pro plant pricing, and Enterprise options.',
    url: 'https://modliq-io.vercel.app/pricing',
    images: ['/og/modliq-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modliq Pricing — Manufacturing Intelligence Pilot Plans in INR',
    description:
      'View Modliq pricing in INR, including free launch pilot slots, paid pilot plans, Pro plant pricing, and Enterprise options.',
    images: ['/og/modliq-og.png'],
  },
};

export default function PricingPage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      <PublicNavbar />

      <section className="bg-gradient-to-b from-white to-[#F0F6FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <IndiaBadge />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A] mt-4 mb-4">Pricing</h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">Early access pricing designed for Indian manufacturers. All plans are per plant or per organization.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            <PricingCard
              name="Demo"
              price="₹0"
              period="Free"
              description="Explore Modliq with sample data"
              features={[
                "Demo dataset included",
                "Limited projects",
                "Basic dataset health",
                "Limited AI usage",
              ]}
              cta="Get Started"
              href="/contact"
            />
            <PricingCard
              name="Pilot"
              price="₹99,000"
              period="/ 30-day pilot"
              description="For one plant or one process line"
              features={[
                "Data onboarding",
                "Dataset health report",
                "Optimization run",
                "Quality Studio report",
                "Quality Passport",
                "Trial SOP",
                "One review session",
              ]}
              cta="Book a Pilot"
              href="/contact"
              highlight
            />
            <PricingCard
              name="Pro"
              price="₹49,000"
              period="/ month / plant"
              description="For ongoing manufacturing operations"
              features={[
                "Multiple projects",
                "CSV/Excel ingestion",
                "Database connectors",
                "Optimization jobs",
                "Quality Studio",
                "Operations / Supply / Lean",
                "Quality Passport exports",
                "AI Copilot usage",
              ]}
              cta="Start Pro Trial"
              href="/contact"
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              period="pricing"
              description="For multi-plant manufacturing teams"
              features={[
                "Custom integrations",
                "Admin console",
                "Buyer share links",
                "Advanced support",
                "Custom templates",
                "Higher limits",
              ]}
              cta="Contact Us"
              href="/contact"
            />
          </div>

          <DisclaimerBox />

          <div className="text-center mt-8">
            <p className="text-xs text-slate-400">Prices are indicative for early access and may vary by plant size, data volume, and implementation requirements.</p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
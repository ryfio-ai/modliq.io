import type { Metadata } from "next";
import Link from "next/link";
import PublicNavbar from "@/components/marketing/PublicNavbar";
import PublicFooter from "@/components/marketing/PublicFooter";
import ROICalculator from "@/components/marketing/ROICalculator";
import IndiaBadge from "@/components/marketing/IndiaBadge";
import DisclaimerBox from "@/components/marketing/DisclaimerBox";

export const metadata: Metadata = {
  title: "ROI Calculator — Modliq Manufacturing Intelligence Platform",
  description: "Calculate your factory savings with Modliq ROI calculator in INR. Estimate yield savings, rejection savings, and downtime savings for your manufacturing operation.",
  openGraph: {
    title: "Modliq ROI Calculator — Estimate Your Factory Savings",
    description: "Calculate monthly and annual savings from yield improvement, rejection reduction, and downtime savings in Indian Rupees (₹).",
    type: "website",
    url: "https://modliq.io/roi",
  },
};

export default function ROIPage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      <PublicNavbar />

      <section className="bg-gradient-to-b from-white to-[#F0F6FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <IndiaBadge />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A] mt-4 mb-4">ROI Calculator</h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">Estimate your factory savings in ₹ INR. Calculate the financial impact of using Modliq for process optimization and quality improvement.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <ROICalculator />

          <div className="text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2B70AB] hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg shadow-blue-600/20 text-sm">
              Book ROI Review
            </Link>
          </div>

          <DisclaimerBox />
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
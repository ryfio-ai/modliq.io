import type { Metadata } from "next";
import PublicNavbar from "@/components/marketing/PublicNavbar";
import PublicFooter from "@/components/marketing/PublicFooter";
import DisclaimerBox from "@/components/marketing/DisclaimerBox";

export const metadata: Metadata = {
  title: "Disclaimer — Modliq Manufacturing Intelligence Platform",
  description: "Modliq disclaimer. The platform provides decision-support recommendations only. It does not guarantee production outcomes, regulatory compliance, buyer approval, or audit certification.",
  openGraph: {
    title: "Modliq Disclaimer",
    description: "Modliq provides decision-support recommendations based on user-provided data. It does not guarantee production outcomes or regulatory compliance.",
    type: "website",
    url: "https://modliq.io/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      <PublicNavbar />
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold text-[#1B2A4A] mb-8">Disclaimer</h1>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p><strong>Modliq provides decision-support recommendations based on user-provided data.</strong> It does not guarantee production outcomes, regulatory compliance, buyer approval, or audit certification.</p>
            <p>All process changes should be validated through controlled trials and responsible engineering review.</p>
            <p>Modliq is a manufacturing intelligence platform that helps factories analyze production data, optimize process settings, validate quality with SPC and Cp/Cpk, and generate buyer-ready Quality Passports. The platform does not replace the judgment of qualified engineers and quality professionals.</p>
            <p>AI-generated recommendations are based on statistical models trained on user-provided data. These models may not generalize to all production conditions. Users should validate recommendations through their own controlled experiments before implementing changes at scale.</p>
            <p>Modliq does not provide legal advice, regulatory certification, or guarantees of buyer acceptance. Quality Passports are informational documents and do not constitute certification or approval by any regulatory body.</p>
            <p>By using Modliq, you acknowledge that you have read and understood this disclaimer and accept full responsibility for how you use the platform and its recommendations.</p>
          </div>
          <DisclaimerBox />
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}
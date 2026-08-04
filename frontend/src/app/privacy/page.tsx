import type { Metadata } from "next";
import PublicNavbar from "@/components/marketing/PublicNavbar";
import PublicFooter from "@/components/marketing/PublicFooter";

export const metadata: Metadata = {
  title: 'Modliq Privacy Policy — Data Security & Privacy',
  description:
    'Modliq Privacy Policy detailing data security, encrypted connectors, and user data protection.',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/privacy',
  },
  openGraph: {
    title: 'Modliq Privacy Policy — Data Security & Privacy',
    description:
      'Modliq Privacy Policy detailing data security, encrypted connectors, and user data protection.',
    url: 'https://modliq-io.vercel.app/privacy',
    images: ['/og/modliq-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modliq Privacy Policy — Data Security & Privacy',
    description:
      'Modliq Privacy Policy detailing data security, encrypted connectors, and user data protection.',
    images: ['/og/modliq-og.png'],
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      <PublicNavbar />
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold text-[#1B2A4A] mb-8">Privacy Policy</h1>
          <div className="prose prose-sm text-slate-600 space-y-4">
            <p><strong>Last updated:</strong> {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
            <p>Modliq is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your data when you use our manufacturing intelligence platform.</p>
            <h2 className="text-lg font-bold text-[#1B2A4A]">Data Collection</h2>
            <p>We collect data that you upload or connect to Modliq, including CSV files, Excel spreadsheets, database connection details, and production records. We do not collect personal data beyond what is necessary for account operation.</p>
            <h2 className="text-lg font-bold text-[#1B2A4A]">How We Use Your Data</h2>
            <p>Your data is used solely to provide the Modliq service: dataset health checks, process optimization, quality analysis, and report generation. We do not sell your data to third parties.</p>
            <h2 className="text-lg font-bold text-[#1B2A4A]">Data Storage and Security</h2>
            <p>Data is stored encrypted at rest. API keys and connector credentials are encrypted and never exposed to the frontend. All data access is logged for audit purposes.</p>
            <h2 className="text-lg font-bold text-[#1B2A4A]">AI Providers</h2>
            <p>When using the AI Copilot, your data is sent to AI providers (Groq, Gemini, NVIDIA, Cohere, Cloudflare, OpenRouter) only for the purpose of generating summaries and suggestions. API keys remain server-side and are never exposed to the browser.</p>
            <h2 className="text-lg font-bold text-[#1B2A4A]">Data Retention</h2>
            <p>We retain your data for as long as your account is active. You can request deletion of your data at any time by contacting us.</p>
            <h2 className="text-lg font-bold text-[#1B2A4A]">Contact</h2>
            <p>For privacy-related questions, email <a href="mailto:hello@modliq.io" className="text-[#2B70AB]">hello@modliq.io</a>.</p>
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}
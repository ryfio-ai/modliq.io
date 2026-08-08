import { NextResponse } from 'next/server';
import { API_URL } from '@/lib/config';

const MOCK_PUBLIC_CONFIG = {
  navbar: {
    logoText: 'Modliq',
    parentText: 'A product by Qeltrava AI',
    badgeText: 'Manufacturing Intelligence Platform',
    links: [
      { label: 'Product', href: '#product', visible: true },
      { label: 'Features', href: '#features', visible: true },
      { label: 'Quality Passport', href: '#quality-passport', visible: true },
      { label: 'Pricing', href: '#pricing', visible: true },
      { label: 'Docs', href: '/docs', visible: true },
    ],
    ctas: [
      { label: 'Apply for Free Pilot', href: '/contact?interest=free-pilot', style: 'primary', visible: true },
      { label: 'Sign In', href: '/login', style: 'secondary', visible: true },
    ],
  },
  footer: {
    brandDescription: 'Modliq is a B2B SaaS manufacturing intelligence platform for process optimization, Quality Passports, and Lean operational excellence.',
    attributionText: 'Designed & Engineered by Qeltrava AI',
    copyrightText: '© 2026 Modliq Technologies. All rights reserved.',
  },
  seo: {
    title: 'Modliq — Manufacturing Intelligence & Quality Passport Platform',
    metaDescription: 'Empower plant engineers with AI-driven process optimization, Quality Passports, and zero-data-science AutoML for manufacturing excellence.',
    keywords: 'manufacturing AI, process optimization, quality passport, B2B SaaS, AutoML, lean manufacturing',
  },
  chatbot: {
    enabled: true,
    welcomeMessage: "Hi! I'm the Modliq Assistant. Ask me about features, pricing, Quality Passports, or how our free pilot works.",
    suggestedQuestions: [
      'What is Modliq?',
      'How does the free pilot work?',
      'What data formats can I upload?',
      'What is a Quality Passport?',
      'Do I need data science expertise?',
    ],
    position: 'bottom-right',
  },
  announcement: {
    enabled: true,
    message: '🚀 Free launch pilot open for the first 10 selected manufacturing companies.',
    type: 'info',
    ctaLabel: 'Apply Now',
    ctaHref: '/contact?interest=free-pilot',
  },
  contact: {
    headline: 'Accelerate Manufacturing Quality & Yield',
    subheadline: 'Apply for a 30-day free pilot program tailored to your plant operations.',
    supportEmail: 'support@modliq.io',
    locationText: 'Chennai / Coimbatore, India',
  },
  homeSections: [
    { sectionKey: 'hero', title: 'AI-Powered Manufacturing Intelligence', subtitle: 'Turn raw plant telemetry into peak batch yields & audit-ready Quality Passports.', visible: true, order: 1 },
    { sectionKey: 'freePilot', title: 'Exclusive 30-Day Plant Pilot Program', subtitle: 'Zero setup fee. Full access to AutoML optimization and Quality Passport exports.', visible: true, order: 2 },
    { sectionKey: 'problem', title: 'Why Traditional Plant Analytics Fails', subtitle: 'Siloed SCADA logs, Excel chaos, and delayed lab results drain yield and inflate scrap rate.', visible: true, order: 3 },
    { sectionKey: 'platformOverview', title: 'Universal Plant Intelligence Engine', subtitle: 'Connect telemetry, run constraint optimization, and enforce quality standards automatically.', visible: true, order: 4 },
    { sectionKey: 'noCodeML', title: 'No-Code Process Optimization', subtitle: 'Engineers input target variables; Modliq selects optimal ML models and delivers safe setpoints.', visible: true, order: 5 },
    { sectionKey: 'workflow', title: 'From Data Ingestion to Setpoint Control', subtitle: 'Simple 4-step workflow: Upload -> Goal Crosscheck -> Optimization -> Quality Passport.', visible: true, order: 6 },
    { sectionKey: 'qualityPassport', title: 'Certified Quality Passports', subtitle: 'Generate immutable, shareable audit reports for customers and compliance auditors.', visible: true, order: 7 },
    { sectionKey: 'algorithmTransparency', title: 'White-Box ML & Physics Constraints', subtitle: 'Every optimization recommendation includes feature importance, confidence bounds, and safety checks.', visible: true, order: 8 },
    { sectionKey: 'whyDifferent', title: 'Built Specifically for Process Engineers', subtitle: 'No Python required. Designed for chemical, pharma, packaging, and automotive plants.', visible: true, order: 9 },
    { sectionKey: 'useCases', title: 'Proven Across Specialty Manufacturing', subtitle: 'Specialty Chemicals, Pharma Batching, Extrusion Lines, and Food Processing.', visible: true, order: 10 },
    { sectionKey: 'roiPreview', title: 'Instant ROI & Scrap Reduction', subtitle: 'Average 14% yield improvement and 22% reduction in quality defect scrap rates.', visible: true, order: 11 },
    { sectionKey: 'architecturePreview', title: 'Enterprise-Grade Security & Isolation', subtitle: 'Multi-tenant database isolation, AES-256 data encryption, and role-based access control.', visible: true, order: 12 },
    { sectionKey: 'pricingPreview', title: 'Transparent Enterprise Tiering', subtitle: 'From Demo to Pilot, Pro, and Enterprise Dedicated Infrastructure.', visible: true, order: 13 },
    { sectionKey: 'faq', title: 'Frequently Asked Questions', subtitle: 'Everything you need to know about integrating Modliq into your plant.', visible: true, order: 14 },
    { sectionKey: 'finalCta', title: 'Ready to Upgrade Your Plant Operations?', subtitle: 'Join leading manufacturers using Modliq for data-driven quality control.', visible: true, order: 15 },
  ],
};

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/v1/public/website-config`);
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    }
  } catch {}

  return NextResponse.json({
    success: true,
    data: MOCK_PUBLIC_CONFIG,
  });
}

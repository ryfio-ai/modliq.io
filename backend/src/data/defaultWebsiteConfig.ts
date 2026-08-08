export const DEFAULT_NAVBAR_CONFIG = {
  logoText: 'Modliq',
  parentText: 'A product by Qeltrava AI',
  badgeText: 'Made in Tamil Nadu, India',
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
};

export const DEFAULT_FOOTER_CONFIG = {
  brandDescription: 'Modliq is a B2B SaaS manufacturing intelligence platform for process optimization, Quality Passports, and Lean operational excellence.',
  attributionText: 'Designed & Engineered by Qeltrava AI',
  copyrightText: `© ${new Date().getFullYear()} Modliq Technologies. All rights reserved.`,
  columns: [
    {
      title: 'Platform',
      links: [
        { label: 'No-Code AutoML', href: '/#no-code-ml' },
        { label: 'Quality Passport', href: '/#quality-passport' },
        { label: 'Universal Ingestion', href: '/#ingestion' },
        { label: 'AI Copilot', href: '/#copilot' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Specialty Chemicals', href: '/#industries' },
        { label: 'Pharma & Biotech', href: '/#industries' },
        { label: 'Automotive & Plastics', href: '/#industries' },
        { label: 'Food Processing', href: '/#industries' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Free Pilot', href: '/contact' },
        { label: 'Documentation', href: '/docs' },
        { label: 'Privacy Policy', href: '/privacy' },
      ],
    },
  ],
};

export const DEFAULT_SEO_CONFIG = {
  title: 'Modliq — Manufacturing Intelligence & Quality Passport Platform',
  metaDescription: 'Empower plant engineers with AI-driven process optimization, Quality Passports, and zero-data-science AutoML for manufacturing excellence.',
  keywords: 'manufacturing AI, process optimization, quality passport, B2B SaaS, AutoML, lean manufacturing',
  ogTitle: 'Modliq — AI Manufacturing Intelligence',
  ogDescription: 'Production-ready B2B SaaS platform for manufacturing process optimization.',
  canonicalUrl: 'https://modliq.io',
  ogImagePath: '/og-image.png',
  llmsTxtContent: 'Modliq is an enterprise manufacturing intelligence platform that turns raw plant telemetry into optimized process setpoints and certified Quality Passports.',
};

export const DEFAULT_CHATBOT_CONFIG = {
  enabled: true,
  showOnHome: true,
  showOnDocs: true,
  showOnPricing: true,
  welcomeMessage: "Hi! I'm the Modliq Assistant. Ask me about features, pricing, Quality Passports, or how our free pilot works.",
  placeholderText: 'Ask a question about Modliq...',
  suggestedQuestions: [
    'What is Modliq?',
    'How does the free pilot work?',
    'What data formats can I upload?',
    'What is a Quality Passport?',
    'Do I need data science expertise?',
  ],
  position: 'bottom-right',
};

export const DEFAULT_ANNOUNCEMENT_CONFIG = {
  enabled: true,
  message: '🚀 Free launch pilot open for the first 10 selected manufacturing companies.',
  type: 'info', // info | success | warning
  ctaLabel: 'Apply Now',
  ctaHref: '/contact?interest=free-pilot',
};

export const DEFAULT_CONTACT_CONFIG = {
  headline: 'Accelerate Manufacturing Quality & Yield',
  subheadline: 'Apply for a 30-day free pilot program tailored to your plant operations.',
  supportEmail: 'support@modliq.io',
  locationText: 'Chennai / Coimbatore, Tamil Nadu, India',
  formSuccessMessage: 'Thank you! Our engineering team will reach out within 24 hours.',
  interestOptions: [
    'Free 30-Day Pilot Application',
    'Enterprise Platform Demo',
    'Custom Data Connector Integration',
    'Quality Passport Compliance Audit',
    'General Inquiry',
  ],
};

export const DEFAULT_HOME_SECTIONS = [
  { sectionKey: 'hero', title: 'AI-Powered Manufacturing Intelligence', subtitle: 'Turn raw plant telemetry into peak batch yields & audit-ready Quality Passports.', order: 1, visible: true, contentJson: JSON.stringify({ ctaPrimary: 'Apply for Free Pilot', ctaSecondary: 'Explore Platform Docs' }) },
  { sectionKey: 'freePilot', title: 'Exclusive 30-Day Plant Pilot Program', subtitle: 'Zero setup fee. Full access to AutoML optimization and Quality Passport exports.', order: 2, visible: true, contentJson: JSON.stringify({ slotsTotal: 10, slotsRemaining: 4 }) },
  { sectionKey: 'problem', title: 'Why Traditional Plant Analytics Fails', subtitle: 'Siloed SCADA logs, Excel chaos, and delayed lab results drain yield and inflate scrap rate.', order: 3, visible: true, contentJson: JSON.stringify({}) },
  { sectionKey: 'platformOverview', title: 'Universal Plant Intelligence Engine', subtitle: 'Connect telemetry, run constraint optimization, and enforce quality standards automatically.', order: 4, visible: true, contentJson: JSON.stringify({}) },
  { sectionKey: 'noCodeML', title: 'No-Code Process Optimization', subtitle: 'Engineers input target variables; Modliq selects optimal ML models and delivers safe setpoints.', order: 5, visible: true, contentJson: JSON.stringify({}) },
  { sectionKey: 'workflow', title: 'From Data Ingestion to Setpoint Control', subtitle: 'Simple 4-step workflow: Upload -> Goal Crosscheck -> Optimization -> Quality Passport.', order: 6, visible: true, contentJson: JSON.stringify({}) },
  { sectionKey: 'qualityPassport', title: 'Certified Quality Passports', subtitle: 'Generate immutable, shareable audit reports for customers and compliance auditors.', order: 7, visible: true, contentJson: JSON.stringify({}) },
  { sectionKey: 'algorithmTransparency', title: 'White-Box ML & Physics Constraints', subtitle: 'Every optimization recommendation includes feature importance, confidence bounds, and safety checks.', order: 8, visible: true, contentJson: JSON.stringify({}) },
  { sectionKey: 'whyDifferent', title: 'Built Specifically for Process Engineers', subtitle: 'No Python required. Designed for chemical, pharma, packaging, and automotive plants.', order: 9, visible: true, contentJson: JSON.stringify({}) },
  { sectionKey: 'useCases', title: 'Proven Across Specialty Manufacturing', subtitle: 'Specialty Chemicals, Pharma Batching, Extrusion Lines, and Food Processing.', order: 10, visible: true, contentJson: JSON.stringify({}) },
  { sectionKey: 'roiPreview', title: 'Instant ROI & Scrap Reduction', subtitle: 'Average 14% yield improvement and 22% reduction in quality defect scrap rates.', order: 11, visible: true, contentJson: JSON.stringify({}) },
  { sectionKey: 'architecturePreview', title: 'Enterprise-Grade Security & Isolation', subtitle: 'Multi-tenant database isolation, AES-256 data encryption, and role-based access control.', order: 12, visible: true, contentJson: JSON.stringify({}) },
  { sectionKey: 'pricingPreview', title: 'Transparent Enterprise Tiering', subtitle: 'From Demo to Pilot, Pro, and Enterprise Dedicated Infrastructure.', order: 13, visible: true, contentJson: JSON.stringify({}) },
  { sectionKey: 'faq', title: 'Frequently Asked Questions', subtitle: 'Everything you need to know about integrating Modliq into your plant.', order: 14, visible: true, contentJson: JSON.stringify({}) },
  { sectionKey: 'finalCta', title: 'Ready to Upgrade Your Plant Operations?', subtitle: 'Join leading manufacturers using Modliq for data-driven quality control.', order: 15, visible: true, contentJson: JSON.stringify({ ctaLabel: 'Get Started with Free Pilot' }) },
];

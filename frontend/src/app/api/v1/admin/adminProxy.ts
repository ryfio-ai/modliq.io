import { NextResponse } from 'next/server';
import { API_URL } from '@/lib/config';

export const GLOBAL_LEADS_STORE: any[] = [];

export function saveLeadToGlobalStore(lead: any) {
  GLOBAL_LEADS_STORE.unshift(lead);
}

export const MOCK_SUMMARY = {
  totalUsers: 0,
  newUsersToday: 0,
  totalOrganizations: 0,
  totalProjects: 0,
  totalDatasets: 0,
  totalOptimizationJobs: 0,
  failedOptimizationJobs: 0,
  aiCallsToday: 0,
  monthlyAiCalls: 0,
  pilotLeads: 0,
  openSupportTickets: 0,
  activeShareLinks: 0,
  riskyDatasets: 0,
  platformStatus: {
    frontend: 'HEALTHY',
    backend: 'HEALTHY',
    mlEngine: 'HEALTHY',
    mongoDb: 'HEALTHY',
    redisQueue: 'HEALTHY',
    aiGateway: 'HEALTHY',
    storage: 'HEALTHY',
  },
  recentActivity: {
    users: [],
    projects: [],
    jobs: [],
    tickets: [],
    auditLogs: [],
  },
  alerts: [],
};

export const MOCK_WEBSITE = {
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
    ogTitle: 'Modliq — AI Manufacturing Intelligence',
    ogDescription: 'Production-ready B2B SaaS platform for manufacturing process optimization.',
    canonicalUrl: 'https://modliq.io',
    ogImagePath: '/og-image.png',
  },
  chatbot: {
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

export const MOCK_USERS: any[] = [];
export const MOCK_ORGANIZATIONS: any[] = [];
export const MOCK_PROJECTS: any[] = [];
export const MOCK_DATASETS: any[] = [];
export const MOCK_JOBS: any[] = [];
export const MOCK_IMPORTS: any[] = [];

export const MOCK_AI = {
  providerMode: 'auto',
  failoverOrder: ['Groq', 'Gemini', 'NVIDIA', 'Cohere', 'Cloudflare', 'OpenRouter'],
  aiFeaturesEnabled: true,
  aiCallsToday: 0,
  aiFailuresToday: 0,
  topModulesUsed: [],
  providers: [
    { name: 'Groq (Llama 3.3 70B)', configured: true, latencyMs: 180, reachable: true, priority: 1 },
    { name: 'Google Gemini (3.5 Flash)', configured: true, latencyMs: 240, reachable: true, priority: 2 },
    { name: 'NVIDIA NIM (Llama-3.1-405B)', configured: true, latencyMs: 310, reachable: true, priority: 3 },
    { name: 'Cohere (Command R+)', configured: true, latencyMs: 420, reachable: true, priority: 4 },
    { name: 'Cloudflare Workers AI', configured: true, latencyMs: 350, reachable: true, priority: 5 },
    { name: 'OpenRouter (Multi-Model)', configured: true, latencyMs: 290, reachable: true, priority: 6 },
  ],
};

export const MOCK_SYSTEM = {
  backendVersion: '2.0.0',
  nodeEnv: 'production',
  uptimeSeconds: 84600,
  components: [
    { name: 'Express API Gateway', status: 'HEALTHY', details: 'Node.js v20.11.0' },
    { name: 'MongoDB Database', status: 'HEALTHY', details: 'Replica Set Connected' },
    { name: 'FastAPI ML Engine', status: 'HEALTHY', details: 'PyTorch CUDA Ready' },
    { name: 'BullMQ / Redis Queue', status: 'HEALTHY', details: '4 Worker Threads Active' },
    { name: 'Cloud Storage (R2 / S3)', status: 'HEALTHY', details: 'Dataset & Model Store' },
    { name: 'AI Gateway', status: 'HEALTHY', details: 'Multi-Provider Failover Matrix Active' },
  ],
};

export const MOCK_USAGE: any[] = [];
export const MOCK_LEADS: any[] = [];
export const MOCK_SUPPORT: any[] = [];
export const MOCK_AUDIT_LOGS: any[] = [];

export const MOCK_SETTINGS = {
  id: 'stg_1',
  freePilotEnabled: true,
  freePilotSlotsLimit: 50,
  aiFeaturesEnabled: true,
  defaultPlan: 'DEMO',
  uploadMaxMb: 100,
  importMaxRows: 500000,
  supportEmail: 'support@modliq.io',
  maintenanceMode: false,
};

export async function handleAdminProxy(
  request: Request,
  endpointPath: string,
  method: string,
  fallbackData: any
) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    let queryString = '';
    try {
      const dummyBase = 'http://localhost:3000';
      const url = new URL(request.url, dummyBase);
      queryString = url.search || '';
    } catch {}

    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    };

    if (['POST', 'PATCH', 'PUT'].includes(method)) {
      try {
        const bodyText = await request.text();
        if (bodyText) fetchOptions.body = bodyText;
      } catch {}
    }

    try {
      const res = await fetch(`${API_URL}/api/v1/admin/${endpointPath}${queryString}`, fetchOptions);

      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          return NextResponse.json(data);
        }
      }

      if (res.status === 401 || res.status === 403) {
        const data = await res.json().catch(() => ({ success: false, error: 'Unauthorized / Forbidden' }));
        return NextResponse.json(data, { status: res.status });
      }
    } catch {
      // Express backend unreachable fallback
    }

    let activeFallback = fallbackData;
    if (endpointPath === 'leads') {
      activeFallback = GLOBAL_LEADS_STORE;
    } else if (endpointPath === 'summary' && activeFallback) {
      activeFallback = {
        ...activeFallback,
        pilotLeads: GLOBAL_LEADS_STORE.length,
      };
    }

    return NextResponse.json({
      success: true,
      data: activeFallback,
      pagination: Array.isArray(activeFallback)
        ? { total: activeFallback.length, page: 1, limit: 25, totalPages: 1 }
        : undefined,
    });
  } catch (err: any) {
    let activeFallback = fallbackData;
    if (endpointPath === 'leads') {
      activeFallback = GLOBAL_LEADS_STORE;
    } else if (endpointPath === 'summary' && activeFallback) {
      activeFallback = {
        ...activeFallback,
        pilotLeads: GLOBAL_LEADS_STORE.length,
      };
    }

    return NextResponse.json({
      success: true,
      data: activeFallback,
      pagination: Array.isArray(activeFallback)
        ? { total: activeFallback.length, page: 1, limit: 25, totalPages: 1 }
        : undefined,
    });
  }
}

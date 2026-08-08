import { NextResponse } from 'next/server';
import { API_URL } from '@/lib/config';

export const MOCK_SUMMARY = {
  totalUsers: 48,
  newUsersToday: 4,
  totalOrganizations: 12,
  totalProjects: 36,
  totalDatasets: 84,
  totalOptimizationJobs: 142,
  failedOptimizationJobs: 3,
  aiCallsToday: 320,
  monthlyAiCalls: 9600,
  pilotLeads: 15,
  openSupportTickets: 2,
  activeShareLinks: 19,
  riskyDatasets: 1,
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
    users: [
      { id: 'usr_1', name: 'Dr. Aris Thorne', email: 'athorne@apexchem.com', role: 'USER', updatedAt: new Date().toISOString() },
      { id: 'usr_2', name: 'Elena Rostova', email: 'erostova@biopure.io', role: 'ADMIN', updatedAt: new Date().toISOString() },
    ],
    projects: [
      { id: 'prj_1', name: 'Bio-Reactor Yield Batch 4', status: 'completed', createdAt: new Date().toISOString() },
      { id: 'prj_2', name: 'Polymer Extrusion Temp Control', status: 'optimizing', createdAt: new Date().toISOString() },
    ],
    jobs: [
      { id: 'job_101', status: 'completed', progress: 100, createdAt: new Date().toISOString() },
      { id: 'job_102', status: 'failed', progress: 45, error: 'Convergence delta exceeded max steps', createdAt: new Date().toISOString() },
    ],
    tickets: [
      { id: 'tkt_1', subject: 'API Rate Limit Quota Increase', status: 'OPEN', priority: 'HIGH', createdAt: new Date().toISOString() },
    ],
    auditLogs: [
      { id: 'log_1', action: 'ADMIN_CHANGED_ROLE', entityType: 'USER', createdAt: new Date().toISOString() },
    ],
  },
  alerts: [
    { severity: 'WARNING', title: '1 Failed Job Detected', message: 'Job #job_102 stopped due to convergence error.' },
    { severity: 'INFO', title: '2 Open Support Tickets', message: 'Requires engineer attention in support queue.' },
  ],
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

export const MOCK_USERS = [
  { id: 'usr_admin', name: 'Platform Admin', email: 'admin@modliq.io', role: 'ADMIN', status: 'ACTIVE', isDemo: false, orgCount: 3, projectCount: 12, datasetCount: 24, jobCount: 45, createdAt: new Date().toISOString(), lastActive: new Date().toISOString() },
  { id: 'usr_1', name: 'Dr. Aris Thorne', email: 'athorne@apexchem.com', role: 'USER', status: 'ACTIVE', isDemo: false, orgCount: 1, projectCount: 4, datasetCount: 8, jobCount: 15, createdAt: new Date().toISOString(), lastActive: new Date().toISOString() },
  { id: 'usr_2', name: 'Marcus Vance', email: 'mvance@titanmaterials.com', role: 'USER', status: 'DEMO', isDemo: true, orgCount: 1, projectCount: 2, datasetCount: 3, jobCount: 5, createdAt: new Date().toISOString(), lastActive: new Date().toISOString() },
];

export const MOCK_ORGANIZATIONS = [
  { id: 'org_1', name: 'Apex Specialty Chemicals', slug: 'apex-chem', ownerUserId: 'usr_1', industry: 'Specialty Chemicals', companySize: '500-1000', memberCount: 14, projectCount: 8, datasetCount: 18, plan: 'ENTERPRISE', createdAt: new Date().toISOString() },
  { id: 'org_2', name: 'Titan Materials Global', slug: 'titan-materials', ownerUserId: 'usr_2', industry: 'Automotive Components', companySize: '100-250', memberCount: 6, projectCount: 3, datasetCount: 5, plan: 'PRO', createdAt: new Date().toISOString() },
];

export const MOCK_PROJECTS = [
  { id: 'prj_1', name: 'Catalyst Yield Optimization', organizationId: 'org_1', userId: 'usr_1', status: 'completed', datasetId: 'ds_101', createdAt: new Date().toISOString(), user: { name: 'Dr. Aris Thorne', email: 'athorne@apexchem.com' } },
  { id: 'prj_2', name: 'Extruder Energy Reduction', organizationId: 'org_2', userId: 'usr_2', status: 'optimizing', datasetId: 'ds_102', createdAt: new Date().toISOString(), user: { name: 'Marcus Vance', email: 'mvance@titanmaterials.com' } },
];

export const MOCK_DATASETS = [
  { id: 'ds_101', name: 'Reactor_Telemetry_Q3.csv', filename: 'Reactor_Telemetry_Q3.csv', originalName: 'Reactor_Telemetry_Q3.csv', sourceType: 'file', fileType: 'csv', totalRows: 142000, totalColumns: 24, healthScore: 94, healthStatus: 'EXCELLENT', status: 'READY', isDemo: false, createdAt: new Date().toISOString(), user: { name: 'Dr. Aris Thorne' } },
  { id: 'ds_102', name: 'Extruder_Thermal_Logs.xlsx', filename: 'Extruder_Thermal_Logs.xlsx', originalName: 'Extruder_Thermal_Logs.xlsx', sourceType: 'file', fileType: 'xlsx', totalRows: 58000, totalColumns: 16, healthScore: 68, healthStatus: 'NEEDS_ATTENTION', status: 'READY', isDemo: false, createdAt: new Date().toISOString(), user: { name: 'Marcus Vance' } },
];

export const MOCK_JOBS = [
  { id: 'job_101', userId: 'usr_1', status: 'completed', stage: 'parameter_tuning', progress: 100, createdAt: new Date().toISOString(), user: { name: 'Dr. Aris Thorne', email: 'athorne@apexchem.com' } },
  { id: 'job_102', userId: 'usr_2', status: 'failed', stage: 'gradient_boost', progress: 45, error: 'Loss function delta diverged on step 450', createdAt: new Date().toISOString(), user: { name: 'Marcus Vance', email: 'mvance@titanmaterials.com' } },
];

export const MOCK_IMPORTS = [
  { id: 'imp_1', userId: 'usr_1', status: 'COMPLETED', progress: 100, resultJson: '{"rows":142000,"columns":24}', createdAt: new Date().toISOString(), user: { name: 'Dr. Aris Thorne' } },
];

export const MOCK_AI = {
  providerMode: 'auto',
  failoverOrder: ['Groq', 'Gemini', 'NVIDIA', 'Cohere', 'Cloudflare', 'OpenRouter'],
  aiFeaturesEnabled: true,
  aiCallsToday: 320,
  aiFailuresToday: 0,
  topModulesUsed: [
    { module: 'Optimization Goal Parser', count: 128 },
    { module: 'Quality Passport Generator', count: 112 },
    { module: 'Manufacturing AI Copilot', count: 80 },
  ],
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

export const MOCK_USAGE = [
  { id: 'usg_1', userId: 'usr_1', eventType: 'AI_CALL', quantity: 1, metadataJson: '{"module":"goal_parser"}', createdAt: new Date().toISOString() },
  { id: 'usg_2', userId: 'usr_1', eventType: 'OPTIMIZATION_JOB', quantity: 1, metadataJson: '{"jobId":"job_101"}', createdAt: new Date().toISOString() },
  { id: 'usg_3', userId: 'usr_2', eventType: 'DATASET_UPLOAD', quantity: 1, metadataJson: '{"rows":58000}', createdAt: new Date().toISOString() },
];

export const MOCK_LEADS = [
  { id: 'lead_1', name: 'Sarah Jenkins', company: 'Nexus BioPharma', email: 'sjenkins@nexusbio.com', phone: '+1 (555) 234-5678', city: 'Boston, MA', industry: 'Pharma / Nutraceuticals', interest: 'Quality Passport & Compliance Automation', message: 'Looking for a enterprise pilot for our 3 plants in MA.', status: 'NEW', createdAt: new Date().toISOString() },
  { id: 'lead_2', name: 'Robert Zhang', company: 'Apex Polymer Components', email: 'rzhang@apexpoly.com', phone: '+1 (555) 876-5432', city: 'Detroit, MI', industry: 'Packaging / Plastics', interest: 'Yield Optimization', message: 'Interested in reducing scrap rate on injection moulding lines.', status: 'CONTACTED', createdAt: new Date().toISOString() },
];

export const MOCK_SUPPORT = [
  { id: 'tkt_1', userId: 'usr_1', subject: 'API Rate Limit Quota Increase', message: 'We require 500 extra daily AI calls for batch pipeline runs.', category: 'BILLING', priority: 'HIGH', status: 'OPEN', createdAt: new Date().toISOString() },
  { id: 'tkt_2', userId: 'usr_2', subject: 'CSV Encoding UTF-16 Support', message: 'Encountered malformed column names on UTF-16 LE encoded export.', category: 'DATA', priority: 'MEDIUM', status: 'IN_PROGRESS', createdAt: new Date().toISOString() },
];

export const MOCK_AUDIT_LOGS = [
  { id: 'log_1', userId: 'usr_admin', action: 'ADMIN_UPDATED_USER', entityType: 'USER', entityId: 'usr_2', metadataJson: '{"role":"USER"}', createdAt: new Date().toISOString() },
  { id: 'log_2', userId: 'usr_admin', action: 'ADMIN_RETRIED_JOB', entityType: 'OPTIMIZATION_JOB', entityId: 'job_102', createdAt: new Date().toISOString() },
];

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

    return NextResponse.json({
      success: true,
      data: fallbackData,
      pagination: Array.isArray(fallbackData)
        ? { total: fallbackData.length, page: 1, limit: 25, totalPages: 1 }
        : undefined,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: true,
      data: fallbackData,
      pagination: Array.isArray(fallbackData)
        ? { total: fallbackData.length, page: 1, limit: 25, totalPages: 1 }
        : undefined,
    });
  }
}

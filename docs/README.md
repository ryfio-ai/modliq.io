# Modliq Platform Launch Documentation Pack Index

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 📌 What Modliq Is

**Modliq** is a universal no-code AI Process Optimization Copilot powered by AutoML, purpose-built for manufacturing and process engineering teams. Developed in **Tamil Nadu, India** as a flagship manufacturing intelligence product by **Qeltrava AI**, Modliq translates complex industrial process data into plain-English operating targets, safe parameter windows, statistical quality controls, root-cause driver rankings, and standardized operating procedure (SOP) action plans.

Modliq features a modern aesthetic inspired by Notion × Figma × Vercel, bridging deep machine learning algorithms with an intuitive, role-gated UI across public marketing, user console, and enterprise admin tiers.

---

## 🧭 Documentation Map & Organization

The documentation is organized into 12 dedicated functional domains:

```
/docs
├── 00-overview/             # Product vision, feature catalog, launch status, domain glossary
├── 01-architecture/         # System topology, service boundaries, data flows, multi-tenancy, AI & ML design
├── 02-frontend/             # Next.js App Router, routes, UI components, state management, design system
├── 03-backend/              # Express API gateway, route handlers, RBAC authorization, jobs, Quality Passport
├── 04-ml-engine/            # FastAPI ML microservice, AutoML pipelines, goal parser, optimizer, QC stats
├── 05-database/             # MongoDB Atlas + Prisma ORM schema, models, relationships, sync protocols
├── 06-ai/                   # Multi-provider AI Gateway, provider fallbacks, prompt guardrails, kill switch
├── 07-security/             # Zero-trust security model, auth, tenant isolation, file/SSRF protection, incident response
├── 08-deployment/           # Production deployment topology (Vercel + Render + MongoDB Atlas + Redis), env vars
├── 09-testing/              # Build verification, type checks, pytest suite, E2E integration tests, QA checklist
├── 10-launch/               # Go-live readiness, audit signoff, 10-client pilot terms, SEO/AEO/GEO strategy
├── 11-developer-onboarding/ # Local development setup, codebase tour, common developer recipes, troubleshooting
└── archive/                 # Historical system blueprints and implementation guides
```

---

## 🚀 Role-Based Onboarding Paths

Follow the tailored path below based on your role to get productive quickly:

### 🎨 For Frontend Developers
1. Start with [PRODUCT_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/PRODUCT_OVERVIEW.md) to understand the domain.
2. Read [FRONTEND_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/FRONTEND_OVERVIEW.md) & [ROUTES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/ROUTES.md).
3. Review [UI_THEME.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/UI_THEME.md) and [COMPONENTS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/COMPONENTS.md).
4. Setup environment: [SETUP_LOCAL.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/11-developer-onboarding/SETUP_LOCAL.md).

### ⚙️ For Backend Engineers
1. Read [SYSTEM_ARCHITECTURE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/01-architecture/SYSTEM_ARCHITECTURE.md).
2. Review [BACKEND_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/BACKEND_OVERVIEW.md) & [API_ROUTES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/API_ROUTES.md).
3. Inspect Database models: [PRISMA_SCHEMA.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/PRISMA_SCHEMA.md) & [MODELS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/MODELS.md).
4. Review authorization policies: [AUTHORIZATION.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/AUTHORIZATION.md).

### 🧪 For ML / Data Engineers
1. Read [ML_ENGINE_ARCHITECTURE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/01-architecture/ML_ENGINE_ARCHITECTURE.md).
2. Review [ML_ENGINE_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/ML_ENGINE_OVERVIEW.md) & [ENDPOINTS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/ENDPOINTS.md).
3. Deep-dive into algorithms: [PIPELINES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/PIPELINES.md), [GOAL_PARSER.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/GOAL_PARSER.md), and [OPTIMIZER.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/OPTIMIZER.md).

### 🛡️ For Security Reviewers
1. Read [SECURITY_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/SECURITY_OVERVIEW.md).
2. Inspect [TENANT_ISOLATION.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/TENANT_ISOLATION.md) & [AUTH_SECURITY.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/AUTH_SECURITY.md).
3. Check pre-launch checklist: [SECURITY_CHECKLIST.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/SECURITY_CHECKLIST.md) & [INCIDENT_RESPONSE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/INCIDENT_RESPONSE.md).

### 🚢 For DevOps / SRE Engineers
1. Review [DEPLOYMENT_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/DEPLOYMENT_OVERVIEW.md).
2. Verify environment configuration: [ENVIRONMENT_VARIABLES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/ENVIRONMENT_VARIABLES.md).
3. Review rollback protocols: [ROLLBACK_PLAN.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/ROLLBACK_PLAN.md).

### 🧪 For QA Engineers
1. Start with [TESTING_STRATEGY.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/09-testing/TESTING_STRATEGY.md).
2. Run end-to-end suite: [E2E_TEST_FLOWS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/09-testing/E2E_TEST_FLOWS.md).
3. Execute pre-flight verification: [QA_CHECKLIST.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/09-testing/QA_CHECKLIST.md).

### 📈 For Product / Business Stakeholders
1. Read [PRODUCT_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/PRODUCT_OVERVIEW.md) & [PLATFORM_FEATURES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/PLATFORM_FEATURES.md).
2. Inspect launch readiness: [LAUNCH_SIGNOFF.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/10-launch/LAUNCH_SIGNOFF.md).
3. Review pilot terms: [PILOT_PROCESS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/10-launch/PILOT_PROCESS.md) & [FREE_PILOT_TERMS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/10-launch/FREE_PILOT_TERMS.md).

---

## 📜 Documentation Maintenance Rule

> [!IMPORTANT]
> **Mandatory Policy for All Maintainers & Contributors:**
> Whenever routes, API endpoints, Prisma database models, environment variables, service boundaries, AI gateway fallbacks, deployment settings, or launch status change in code, the corresponding documentation files in `/docs` **must be updated in the very same pull request**. Code is the source of truth, and documentation drift is treated as a build blocker.

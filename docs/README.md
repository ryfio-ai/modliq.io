# MODLIQER Platform Launch Documentation Pack Index

> **Last verified:** 17/08/2026
> **Source of truth:** Current Codebase Inspection & Platform Specification  
> **Status:** Live & Launch-Ready  

---

## 📌 What MODLIQER Is

> **Analyze what happened. Optimize what happens next. Prove it with a Quality Passport.**

**MODLIQER** (Models, Operations, Data, Learning, Intelligence, Quality, Engineering & Research) is a no-code manufacturing intelligence, machine learning, and AI Labs platform by **Qeltrava AI** (built in Tamil Nadu, India) that helps factory teams analyze what happened, optimize what happens next, and prove decisions with buyer-ready Quality Passports — without needing a data analyst, data scientist, or ML engineer to get started.

MODLIQER combines six core manufacturing roles (Data Analyst, ML Engineer, Quality Engineer, Operations Analyst, Supply Chain Analyst, and Lean / Kaizen Coordinator) alongside an experimental **MODLIQER AI Labs (Beta)** suite (DocuMind RAG, Agent Task Pilot, Voice AI Coach, Browser AutoQA, and SpendLens) into a single unified platform.

---

## 🧭 Documentation Map & Organization

The documentation is organized into 12 dedicated functional domains:

```
/docs
├── 00-overview/             # Product vision, 45-module feature catalog, launch status, domain glossary
├── 01-architecture/         # System topology, service boundaries, data flows, multi-tenancy, AI & ML design
├── 02-frontend/             # Next.js App Router, routes, user console, admin console, AI Labs UI, state management
├── 03-backend/              # Express API gateway, route handlers, RBAC authorization, jobs, AI Labs APIs
├── 04-ml-engine/            # FastAPI ML microservice, AutoML pipelines, goal parser, RAG service, QC stats
├── 05-database/             # MongoDB Atlas + Prisma ORM schema, models, relationships, Public IDs, AI Labs models
├── 06-ai/                   # Multi-provider AI Gateway, AI Labs (DocuMind, Agent Task Pilot, Voice Coach, AutoQA, SpendLens)
├── 07-security/             # Zero-trust security model, auth, tenant isolation, AI Labs safety guardrails, incident response
├── 08-deployment/           # Production deployment topology (Vercel + Render + MongoDB Atlas + Redis), env vars
├── 09-testing/              # Build verification, type checks, pytest suite, E2E integration tests, QA checklist
├── 10-launch/               # Go-live readiness, audit signoff, 10-client pilot terms, SEO/AEO/GEO strategy
├── 11-developer-onboarding/ # Local development setup, codebase tour, common developer recipes, troubleshooting
└── archive/                 # Historical system blueprints and implementation guides
```

---

## 🚀 Role-Based Onboarding Paths

### 📈 For Product & Business Stakeholders
1. Start with [PRODUCT_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/PRODUCT_OVERVIEW.md) to understand core positioning and role combinations.
2. Read [PLATFORM_FEATURES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/PLATFORM_FEATURES.md) for the full 45-module capabilities matrix + AI Labs directory.
3. Inspect launch readiness: [LAUNCH_SIGNOFF.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/10-launch/LAUNCH_SIGNOFF.md) & [LAUNCH_STATUS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/LAUNCH_STATUS.md).

### 🎨 For Frontend Developers
1. Read [FRONTEND_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/FRONTEND_OVERVIEW.md) & [ROUTES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/ROUTES.md).
2. Inspect console guides: [USER_CONSOLE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/USER_CONSOLE.md) & [ADMIN_CONSOLE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/ADMIN_CONSOLE.md).
3. Review UI design & components: [UI_THEME.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/UI_THEME.md) and [COMPONENTS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/COMPONENTS.md).
4. Local setup: [SETUP_LOCAL.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/11-developer-onboarding/SETUP_LOCAL.md).

### ⚙️ For Backend Engineers
1. Read [SYSTEM_ARCHITECTURE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/01-architecture/SYSTEM_ARCHITECTURE.md).
2. Review [BACKEND_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/BACKEND_OVERVIEW.md) & [API_ROUTES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/API_ROUTES.md).
3. Inspect database schema & Public IDs: [PRISMA_SCHEMA.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/PRISMA_SCHEMA.md) & [PUBLIC_IDS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/PUBLIC_IDS.md).

### 🧪 For ML / Data Engineers
1. Read [ML_ENGINE_ARCHITECTURE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/01-architecture/ML_ENGINE_ARCHITECTURE.md).
2. Review [ML_ENGINE_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/ML_ENGINE_OVERVIEW.md) & [ENDPOINTS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/ENDPOINTS.md).
3. Deep-dive into algorithms: [PIPELINES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/PIPELINES.md), [GOAL_PARSER.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/GOAL_PARSER.md), and [OPTIMIZER.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/OPTIMIZER.md).

---

## 📜 Documentation Maintenance Rule

> [!IMPORTANT]
> **Mandatory Policy for All Maintainers & Contributors:**
> Whenever routes, API endpoints, Prisma database models, environment variables, service boundaries, AI gateway fallbacks, deployment settings, or launch status change in code, the corresponding documentation files in `/docs` **must be updated in the very same pull request**. Code is the source of truth, and documentation drift is treated as a build blocker.

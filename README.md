# Modliq — No-Code Manufacturing Intelligence & Machine Learning Platform

> **Analyze what happened. Optimize what happens next. Prove it with a Quality Passport.**

**Modliq** is a no-code manufacturing intelligence and machine learning platform that helps factory teams analyze what happened, optimize what happens next, and prove decisions with buyer-ready Quality Passports — without needing a data analyst, data scientist, or ML engineer to get started.

Made in Tamil Nadu, India by **Qeltrava AI**.

---

## 🎯 Unified Workflow Combination

Modliq combines six specialized manufacturing roles into one guided, no-code platform:
- 📊 **Data Analyst** — Natural language queries, automatic KPI mapping, and automated dataset health diagnostics.
- 🤖 **ML Engineer** — AutoML benchmark leaderboard, constrained optimization, setpoint recommendation, and drift monitoring.
- 📐 **Quality Engineer** — Deterministic Quality Studio with SPC I-MR charts, Cp / Cpk capability math, and CAPA suggestions.
- 🏭 **Operations Analyst** — OEE calculators, downtime Pareto analysis, bottleneck insights, and shift/machine comparisons.
- 🔗 **Supply Chain Analyst** — Material lot yield traceability, supplier risk scorecards, and incoming quality alerts.
- ⚡ **Lean / Kaizen Coordinator** — Waste tracking, 5S audits, Takt/Kanban calculators, and action item tracking.

---

## 🚀 Key Platform Capability Summary (45 Modules)

1. **Public Website** — Marketing site with ROI calculator (in ₹ INR), algorithm transparency, SEO/AEO/GEO optimization, and free launch pilot offer for the first 10 selected manufacturing companies.
2. **Role Routing & Auth** — Tenant-isolated JWT auth; normal users route to `/[userId]/modliq-console/dashboard`, admins route to `/admin`.
3. **User Console** — Full suite covering Dashboard, Projects, EDA, Goal Parser, AutoML, SPC Quality Studio, Operations, Supply Chain, Lean, and Quality Passports.
4. **Project System** — Human-readable public IDs (e.g. `MODLIQ-PROJECT-20260808-1000`) with project-isolated datasets and jobs.
5. **Universal Ingestion** — Supports CSV, Excel, PDF, and Word table extraction; database connectors (Supabase, Postgres, MongoDB) and roadmap for OPC-UA, MQTT, Modbus, SCADA, MES & ERP APIs.
6. **Dataset Health Check** — Scores data readiness across 5 status bands (*Excellent, Good, Needs Review, Risky, Not Recommended*) checking for leakage, outliers, and constant columns.
7. **No-Code EDA Studio** — 8 analysis tabs for industrial distributions, correlations, and distributions before training ML models.
8. **Ask Your Factory Data** — Deterministic natural language query engine with zero raw code execution.
9. **Data Cleaning Advisor** — Safe versioned dataset cleaning recommendations requiring explicit user confirmation.
10. **Smart Chart Suggestions** — Automated chart picker tailored to manufacturing context.
11. **KPI Auto-Mapping** — Automatic recognition of Yield, Defects, Downtime, OEE, Scrap, and Supplier fields.
12. **Insight Narratives** — Plain-language summaries translating math & ML into factory action points.
13. **Feature Engineering** — Derived industrial feature recommendations (e.g. Temp × Pressure, Downtime per unit).
14. **Natural Language Goal Parser** — Extracts target metrics, direction, limits, and controllable plant variables from plain English.
15. **Goal Crosscheck Wizard** — Interactive pre-flight safety check confirming targets and safety constraints prior to optimization.
16. **No-Code ML Optimization** — Trains predictive models, calculates feature importance, and provides safe operating setpoints & trial ranges.
17. **AutoML Benchmark Leaderboard** — Benchmarks Random Forest, Gradient Boosting, Extra Trees, and Linear Baselines.
18. **Model Trust & Drift Monitor** — Detects schema shift, input distribution drift, and target drift to flag retraining needs.
19. **Async Job Progress** — Real-time progress polling across Queued → Parsing → Training → Optimization → Completion stages.
20. **Results Page** — Complete MLOps evidence hub displaying R², RMSE, MAE, confidence scores, yield improvement, and actual vs predicted charts.
21. **Explainability Engine** — Top driver analysis and constraint extrapolation warnings.
22. **Quality Studio (SPC)** — Deterministic SPC control charts (CL/UCL/LCL), Cp/Cpk capability metrics, and AQL sampling.
23. **Operations Intelligence** — OEE calculators, downtime Pareto analysis, and line/machine/shift bottleneck comparisons.
24. **Supply Chain Traceability** — Links raw material lot numbers and supplier scorecards to final batch yields.
25. **Lean & Kaizen** — Waste Pareto, 5S audit tracking, Takt/Kanban calculators, and action board.
26. **Quality Passport** — Buyer-ready audit evidence reports with unique certificate IDs (`MODLIQ-PASSPORT-20260808-1000`).
27. **Buyer Share Links** — Sanitized, read-only public passport verification links with dataset privacy protection.
28. **Modliq Agent** — Agentic assistant with approval requirements before executing critical operations.
29. **AI Copilot** — Context-aware explanation layer supporting Groq, Gemini, NVIDIA, Cohere, Cloudflare, and OpenRouter LLMs.
30. **Public Chatbot** — Website assistant for pricing, features, and pilot application support.
31. **Admin Console** — Comprehensive SaaS management panel for users, orgs, datasets, jobs, AI providers, pilot leads, and audit logs.
32. **Website Control Center** — Admin panel to update public landing page hero copy, CTAs, SEO metadata, and banners dynamically.
33. **Notification System** — Event alerts for completed jobs, data quality risks, trial batch reminders, and admin broadcasts.
34. **Support Ticket System** — Human-readable support tracking (`MODLIQ-TICKET-20260808-1000`).
35. **Organization & Team Management** — Role-based access control (`OWNER`, `ADMIN`, `MANAGER`, `ENGINEER`, `VIEWER`).
36. **User Settings** — Module preferences, public IDs (`MODLIQ-USER-20260808-1000`), and profile management.
37. **Public Human-Readable ID System** — Standardized identifier format across all entity types.
38. **Data Lineage** — Immutable event history from raw ingestion to Quality Passport generation.
39. **Industrial Data Readiness** — Time-series profiling, timestamp gap detection, unit detection, and sensor flatline alerts.
40. **Security Capabilities** — JWT, SSRF protection, strict CORS, formula injection defense, zero raw SQL/code execution.
41. **SEO / AEO / GEO Optimization** — Structured data (Schema.org), canonical links, OpenGraph, `llms.txt`, and `llms-full.txt`.
42. **Public Marketing Engine** — Complete high-converting web presence highlighting Qeltrava AI attribution and Tamil Nadu roots.
43. **Launch Pilot Management** — Free pilot offer for first 10 selected manufacturing companies (Paid Tier: ₹99,000 / 30 days; Pro Tier: ₹49,000 / mo).
44. **Legal & Governance** — Privacy policy, terms, free pilot terms, decision-support disclaimer, and non-certification disclaimers.
45. **Platform Positioning** — Guided decision-support platform maintaining human engineering control while eliminating technical friction.

---

## 📚 Documentation Pack

- 📖 **[Documentation Index & Onboarding Paths](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/README.md)** — Main documentation hub and persona onboarding guides
- 📌 **[Product Overview](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/PRODUCT_OVERVIEW.md)** — Platform vision, problem statement, Qeltrava AI & Tamil Nadu positioning
- 🏗️ **[System Architecture Blueprint](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/01-architecture/SYSTEM_ARCHITECTURE.md)** — 3-tier microservice architecture, Mermaid topology & data flows
- 🎨 **[Frontend Architecture Overview](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/FRONTEND_OVERVIEW.md)** — Next.js App Router, UI components, & theme system
- ⚙️ **[Backend API Gateway Overview](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/BACKEND_OVERVIEW.md)** — Express API gateway, Prisma ORM, & middleware stack
- 🐍 **[ML Engine Architecture](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/ML_ENGINE_OVERVIEW.md)** — FastAPI Python microservice, AutoML zoo, & SPC quality stats
- 🚢 **[Production Deployment Overview](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/DEPLOYMENT_OVERVIEW.md)** — Vercel + Render + MongoDB Atlas + Redis topology
- 💻 **[Local Development Setup Guide](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/11-developer-onboarding/SETUP_LOCAL.md)** — Step-by-step local environment setup
- 🚀 **[Public Launch Signoff Report](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/10-launch/LAUNCH_SIGNOFF.md)** — 10-phase audit signoff & final verdict

---

## ⚡ Quick Start Guide

```bash
# 1. Run Automated E2E Platform Test
python demo/test_e2e_platform.py

# 2. Run Python ML Engine (Port 8000)
cd ml-engine && python main.py

# 3. Run Node.js Backend API (Port 3001)
cd backend && npm run dev

# 4. Run Next.js Frontend App (Port 3000)
cd frontend && npm run dev
```

---

## 🧪 Verification Status Across Tiers

- **Python ML Engine**: `python -m py_compile main.py ...` **(0 ERRORS)**
- **Node.js Backend**: `npx tsc --noEmit` **(0 ERRORS)**
- **Next.js Frontend**: `npx next build` **(0 ERRORS)**
- **E2E Integration Test**: `python demo/test_e2e_platform.py` **(7/7 STEPS PASSED 100%)**

---

*Modliq is a manufacturing intelligence product by Qeltrava AI, built in Tamil Nadu, India.*

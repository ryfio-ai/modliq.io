# Modliq — No-Code Manufacturing Intelligence & Machine Learning Platform

> **Analyze what happened. Optimize what happens next. Prove it with a Quality Passport.**

**Modliq** is a no-code manufacturing intelligence and machine learning platform that helps factory teams analyze what happened, optimize what happens next, and prove decisions with buyer-ready Quality Passports — without needing a data analyst, data scientist, or ML engineer to get started.

Made in **Tamil Nadu, India** by **Qeltrava AI**.

---

## 🎯 Core Positioning

Modliq brings together the repetitive workflows traditionally handled by multiple data and manufacturing roles into one guided, no-code platform:

- 📊 **Data Analyst Workflows** — EDA, dataset health checks, KPI auto-mapping, trend analysis, OEE summaries, supplier risk, and insight narratives.
- 🤖 **ML Engineer Workflows** — No-code goal parsing, feature validation, AutoML benchmarking, constrained optimization, setpoint recommendation, drift monitoring, and retraining advisory.
- 📐 **Quality Engineer Workflows** — Quality Studio, SPC I-MR control charts, $C_p$ / $C_{pk}$ capability math, AQL sampling, CAPA suggestions, and control plan support.
- 🏭 **Operations Workflows** — OEE calculators, downtime Pareto analysis, bottleneck insights, and shift/machine/line comparisons.
- 🔗 **Supply Chain Workflows** — Supplier scorecards, material lot yield traceability, yield by supplier, and incoming quality risk badges.
- ⚡ **Lean / Kaizen Workflows** — Waste tracking, 5S audits, Takt/Kanban calculators, and continuous improvement action boards.

> **Human Engineering Control:** The platform keeps manufacturing teams in full control while eliminating technical friction, manual spreadsheets, and custom coding.

---

## 📚 Platform Documentation

- 📋 **[Full 45-Module Capabilities Catalog](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/PLATFORM_FEATURES.md)** — Complete deep-dive breakdown across all 45 capabilities, routes, security rules, and module status
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

## 🧪 Verification Status

- **Python ML Engine**: `python -m py_compile main.py ...` **(PASSED 0 ERRORS)**
- **Node.js Backend**: `npx tsc --noEmit` **(PASSED 0 ERRORS)**
- **Next.js Frontend**: `npx next build` **(PASSED 0 ERRORS)**
- **E2E Integration Test**: `python demo/test_e2e_platform.py` **(PASSED 100%)**

---

*Modliq is a manufacturing intelligence product by Qeltrava AI, built in Tamil Nadu, India.*

# Modliq — AI Process Optimization Copilot

**Modliq** is a universal no-code AI Process Optimization Copilot powered by AutoML. Designed with a Notion × Figma × Vercel aesthetic, Modliq translates complex machine learning data into plain-English operating targets, safe parameter ranges, SHAP process drivers, and SOP action plans.

---

## 📚 Launch Documentation Pack

Modliq features a launch-ready documentation pack located in [`/docs`](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/README.md):

- 📖 **[Documentation Index & Onboarding Paths](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/README.md)** — Main documentation hub and persona onboarding guides
- 📌 **[Product Overview](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/PRODUCT_OVERVIEW.md)** — Platform vision, problem statement, Qeltrava AI & Tamil Nadu positioning
- 🏗️ **[System Architecture Blueprint](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/01-architecture/SYSTEM_ARCHITECTURE.md)** — 3-tier microservice architecture, Mermaid topology & data flows
- 🎨 **[Frontend Architecture Overview](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/FRONTEND_OVERVIEW.md)** — Next.js 15 App Router, UI components, & theme system
- ⚙️ **[Backend API Gateway Overview](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/BACKEND_OVERVIEW.md)** — Express API gateway, Prisma ORM, & middleware stack
- 🐍 **[ML Engine Architecture](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/ML_ENGINE_OVERVIEW.md)** — FastAPI Python microservice, AutoML zoo, & SPC quality stats
- 🚢 **[Production Deployment Overview](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/DEPLOYMENT_OVERVIEW.md)** — Vercel + Render + MongoDB Atlas + Redis topology
- 💻 **[Local Development Setup Guide](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/11-developer-onboarding/SETUP_LOCAL.md)** — Step-by-step local environment setup
- 🚀 **[Public Launch Signoff Report](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/10-launch/LAUNCH_SIGNOFF.md)** — 10-phase audit signoff & final verdict

> 📜 **Documentation Maintenance Rule:**  
> Whenever routes, database models, environment variables, service boundaries, deployment settings, or launch status change, update the relevant documentation files in `/docs` in the same pull request.

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
- **Next.js Frontend**: `npx next build` **(0 ERRORS, 52 pages generated)**
- **E2E Integration Test**: `python demo/test_e2e_platform.py` **(7/7 STEPS PASSED 100%)**

---

*Modliq is a manufacturing intelligence product by Qeltrava AI, built in Tamil Nadu, India.*

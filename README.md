# Modliq — AI Process Optimization Copilot

**Modliq** is a universal no-code AI Process Optimization Copilot powered by AutoML. Designed with a Notion × Figma × Vercel aesthetic, Modliq translates complex machine learning data into plain-English operating targets, safe parameter ranges, SHAP process drivers, and SOP action plans.

---

## 📚 Documentation & System Blueprint

- 🏗️ **[System Architecture Blueprint](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/SYSTEM_ARCHITECTURE.md)** — Complete 3-tier microservice architecture, Mermaid topology diagrams, folder responsibilities, and scalability guidelines.
- 📋 **[Development Roadmap & Launch Checklist](file:///c:/Users/sathish/Desktop/Modliq/Modliq/TODO.md)** — Core platform features status, P0 launch blockers, and P1 polish tasks.
- 📖 **[Phase 2 Features Implementation Guide](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/PHASE_2_IMPLEMENTATION_GUIDE.md)** — MinIO S3 storage, OAuth 2.0, RBAC, PyTest/Jest/Playwright test suites, Sentry tracking, and Slack webhook alerts.

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

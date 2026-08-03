# Modliq Platform — Action Items & Development Roadmap

**Version:** 2.0.0 | **Last Updated:** 2026-07-27

---

## 🎯 Executive Summary & Current Platform Status

| Component | Status | Verification Command | Notes |
|---|---|---|---|
| **Python ML Engine** | ✅ Completed | `python -m py_compile main.py ...` | FastAPI on Port 8000, MinIO S3 Storage, 16-Model Zoo |
| **Node.js Backend API** | ✅ Completed | `npx tsc --noEmit` | Express + Prisma on Port 3001, BullMQ Queue |
| **Next.js Frontend** | ✅ Completed | `npx next build` | Next.js 15 App Router on Port 3000, Google & GitHub OAuth |
| **DevOps / CI/CD** | ✅ Completed | GitHub Actions | Docker Compose & `.github/workflows/ci-cd.yml` |
| **E2E Integration** | ✅ 100% Passed | `python demo/test_e2e_platform.py` | 7/7 Core Feature Steps Verified Cleanly |

---

## 🔴 P0 — Launch Blockers (Must Complete Before Public Launch)

- [ ] **1. MongoDB Atlas Auth & Schema Push**:
  - Verify credentials in `DATABASE_URL` (`backend/.env`).
  - Add deployment IP to MongoDB Atlas Network Access whitelist.
  - Run `npx prisma db push` to sync updated `OptimizationJob`, `OptimizationRun`, and `Project` models (with `sopContent` and `capaContent`).
- [ ] **2. Render Web & Worker Deployment**:
  - Deploy `modliq-ml-engine` (Python web service).
  - Deploy `modliq-backend` (Node.js web service).
  - Deploy `modliq-worker` (Node.js background worker process).
  - Provision `modliq-redis` key-value store.
- [ ] **3. Vercel `NEXT_PUBLIC_API_URL` Clean Value**:
  - Update `NEXT_PUBLIC_API_URL` in Vercel project environment settings to remove trailing spaces.
  - Trigger production redeployment on Vercel.
- [ ] **4. Production E2E Demo Flow Verification**:
  - Test live flow in browser: Upload Dataset → Goal Input → Real-time Optimization Progress → Business Results → SOP/CAPA Download.

---

## 🟠 P1 — Pre-Launch Polish & Enhancements

- [x] **Google & GitHub OAuth Integration**: Configured NextAuth.js v5 route handler with verified Google Client ID & GitHub OAuth App credentials ([route.ts](file:///c:/Users/sathish/Desktop/Modliq/Modliq/frontend/src/app/api/auth/%5B...nextauth%5D/route.ts)).
- [x] **MinIO / S3 Binary Model Storage**: Integrated MinIO license key & `boto3` object storage support with local disk fallback ([storage.py](file:///c:/Users/sathish/Desktop/Modliq/Modliq/ml-engine/services/storage.py)).
- [x] **Role-Based Access Control (RBAC)**: Created `requireRole(['ADMIN', 'EDITOR'])` guard middleware ([rbac.ts](file:///c:/Users/sathish/Desktop/Modliq/Modliq/backend/src/middleware/rbac.ts)).
- [x] **PSI Data Drift Slack Webhook Alerts**: Added Slack Webhook alert trigger when PSI > 0.20 ([drift_detector.py](file:///c:/Users/sathish/Desktop/Modliq/Modliq/ml-engine/services/drift_detector.py)).
- [x] **Persist AI SOPs + CAPA Plans**: Added `sopContent` and `capaContent` fields to Prisma `OptimizationJob`, `OptimizationRun`, and `Project` schemas.
- [x] **Render Worker Process Split**: Created `render.yaml` with explicit `web` (Express API) and `worker` (BullMQ worker) service declarations.
- [ ] **Frontend Direct Prisma Import Proxying**: Route remaining page direct database queries through `/api/v1/...` Express endpoints.
- [ ] **Render Cold Start Mitigation**: Ping `/health` endpoints 2 minutes prior to live client demonstrations.
- [ ] **Landing Page**: Build hero, feature breakdown, pricing, and comparison sections.
- [ ] **Demo Video**: Record 2–3 minute screen recording of end-to-end user workflow.

---

## ⏭ Phase 2 Features (Fully Built & Configured)

- [x] MinIO S3 Binary Model Storage (`services/storage.py`)
- [x] Google & GitHub OAuth 2.0 Auth (`route.ts`)
- [x] Role-Based Access Control (`middleware/rbac.ts`)
- [x] PyTest & Jest Test Suites (`tests/test_automl.py`, `tests/api.test.ts`)
- [x] PSI Data Drift Slack Webhook Alerts (`services/drift_detector.py`)

---

## 🚀 Quick Command Reference

```bash
# 1. Run Automated E2E Feature Integration Test
python demo/test_e2e_platform.py

# 2. Run Python ML Engine (Port 8000)
cd ml-engine && python main.py

# 3. Run Node.js Backend API (Port 3001)
cd backend && npm run dev

# 4. Run Next.js Frontend App (Port 3000)
cd frontend && npm run dev
```

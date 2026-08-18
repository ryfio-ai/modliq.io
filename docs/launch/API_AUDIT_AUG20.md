# MODLIQER August 20 Launch — Backend & ML Engine API Audit

> **Last verified:** 17/08/2026


**Audit Date**: August 8, 2026  
**Target Launch Date**: August 20, 2026  
**Audit Scope**: Express API Gateway (`backend/src/routes`), FastAPI ML Engine (`ml-engine`), Next.js Proxy Endpoints (`frontend/src/app/api`).

---

## 1. System Health & Public APIs

| Endpoint | Method | Service | Auth Required | Expected Behavior | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/health` | GET | Express Backend | None | Returns `{ status: 'UP', service: 'modliq-backend' }` | **PASS** | Working |
| `/health` | GET | FastAPI ML Engine | None | Returns `{ status: 'ok', engine: 'PyTorch/scikit-learn' }` | **PASS** | Working |
| `/warmup` | GET | FastAPI ML Engine | None | Pre-warms ML model dependencies and libraries | **PASS** | Working |
| `/api/v1/public/website-config` | GET | Express Backend | None | Returns active marketing website configuration | **PASS** | Working |
| `/api/v1/public/contact` | POST | Express Backend | None | Submits & validates pilot lead form submission | **PASS** | Stores in DB |
| `/api/v1/public/chatbot` | POST | Express Backend | None | Answers public product questions | **PASS** | Working |

---

## 2. Authentication & Authorization APIs

| Endpoint | Method | Service | Auth Required | Expected Behavior | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/v1/auth/signup` | POST | Express Backend | None | Registers new user, hashes password, returns JWT token | **PASS** | Working |
| `/api/v1/auth/login` | POST | Express Backend | None | Authenticates user credentials, returns JWT token | **PASS** | Working |
| `/api/v1/auth/me` | GET | Express Backend | Bearer Token | Returns current authenticated user profile & permissions | **PASS** | Working |
| `/api/v1/auth/logout` | POST | Express Backend | Bearer Token | Invalidates session token / clears cookie | **PASS** | Working |

---

## 3. Project & Dataset Operations APIs

| Endpoint | Method | Service | Auth Required | Expected Behavior | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/v1/projects` | GET / POST | Express Backend | Bearer Token | Lists or creates user projects | **PASS** | Tenant isolated |
| `/api/v1/datasets/upload` | POST | Express Backend | Bearer Token | Uploads CSV/Excel datasets and stores metadata | **PASS** | Validation active |
| `/api/v1/datasets/:id` | GET | Express Backend | Bearer Token | Fetches dataset details and preview rows | **PASS** | Tenant isolated |
| `/api/v1/datasets/:id/health` | GET | Express Backend | Bearer Token | Calculates 100-point data quality score | **PASS** | Calls ML engine |

---

## 4. ML Engine & Goal Optimization APIs

| Endpoint | Method | Service | Auth Required | Expected Behavior | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/v1/goals/parse` | POST | Express Backend | Bearer Token | Parses natural-language optimization goals | **PASS** | AI Gateway backed |
| `/parse-goal` | POST | FastAPI ML Engine | Service Key | Direct ML goal structure extractor | **PASS** | Service Key protected |
| `/dataset-health` | POST | FastAPI ML Engine | Service Key | Runs statistical health & outlier detection | **PASS** | Service Key protected |
| `/optimize-yield` | POST | FastAPI ML Engine | Service Key | Runs constrained multi-objective optimization | **PASS** | Service Key protected |
| `/api/v1/optimization/jobs` | POST | Express Backend | Bearer Token | Creates optimization job & dispatches queue task | **PASS** | Working |
| `/api/v1/optimization/jobs/:id` | GET | Express Backend | Bearer Token | Polls optimization status & progress bar | **PASS** | Working |
| `/api/v1/optimization/jobs/:id/results` | GET | Express Backend | Bearer Token | Returns setpoint recommendations & SHAP weights | **PASS** | Working |

---

## 5. Quality Studio, Operations, & Quality Passport APIs

| Endpoint | Method | Service | Auth Required | Expected Behavior | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/v1/qc/spc` | POST | Express Backend | Bearer Token | Calculates X-bar/R control limits & Nelson rules | **PASS** | Working |
| `/api/v1/operations/oee` | GET | Express Backend | Bearer Token | Calculates Availability, Performance, Quality OEE | **PASS** | Working |
| `/api/v1/supply-chain/traceability` | GET | Express Backend | Bearer Token | Returns raw material lot risk correlations | **PASS** | Working |
| `/api/v1/quality-passport/generate` | POST | Express Backend | Bearer Token | Compiles audit-ready Quality Passport PDF/Markdown | **PASS** | Working |

---

## 6. Platform Admin APIs (`/api/v1/admin/*`)

| Endpoint | Method | Service | Auth Required | Expected Behavior | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/v1/admin/summary` | GET | Express Backend | ADMIN Role | Returns platform overview metrics & component statuses | **PASS** | Role gated |
| `/api/v1/admin/users` | GET / PATCH | Express Backend | ADMIN Role | Manages user accounts & security roles | **PASS** | Role gated |
| `/api/v1/admin/organizations` | GET | Express Backend | ADMIN Role | Lists platform organizations | **PASS** | Role gated |
| `/api/v1/admin/projects` | GET | Express Backend | ADMIN Role | Lists all platform projects | **PASS** | Role gated |
| `/api/v1/admin/datasets` | GET | Express Backend | ADMIN Role | Lists all datasets & health scores | **PASS** | Role gated |
| `/api/v1/admin/jobs` | GET | Express Backend | ADMIN Role | Monitors optimization jobs & retries failed runs | **PASS** | Role gated |
| `/api/v1/admin/ai/provider-health` | GET | Express Backend | ADMIN Role | Monitors AI Gateway multi-provider status | **PASS** | Role gated |
| `/api/v1/admin/system` | GET | Express Backend | ADMIN Role | Monitors system microservice health | **PASS** | Role gated |
| `/api/v1/admin/leads` | GET / PATCH | Express Backend | ADMIN Role | Manages pilot leads & status notes | **PASS** | Role gated |
| `/api/v1/admin/website` | GET / PATCH | Express Backend | ADMIN Role | Configures marketing website settings | **PASS** | Role gated |

---

## Security & Protection Verification
- **Unauthenticated Protection**: All non-public endpoints return `401 Unauthorized`.
- **Role Gate Protection**: All `/api/v1/admin/*` endpoints return `403 Forbidden` for non-admin users.
- **Service Key Protection**: ML Engine endpoints verify `x-service-key` headers for internal gateway requests.
- **Sensitive Data Safety**: Password hashes, JWT secrets, and AI API keys are strictly excluded from API outputs.

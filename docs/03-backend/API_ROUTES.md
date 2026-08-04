# Modliq Backend API Routes Specification Table

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 📡 Complete Backend Endpoint Table (`/api/v1/*`)

| Method | Path | Auth Required | Role | Purpose | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/health` | No | Public | Service health check & uptime probe | Implemented |
| `POST` | `/api/v1/public/contact` | No | Public | Public lead submission & contact form | Implemented |
| `POST` | `/api/v1/auth/register` | No | Public | Register new user account | Implemented |
| `POST` | `/api/v1/auth/login` | No | Public | Authenticate user & issue JWT token | Implemented |
| `GET` | `/api/v1/auth/me` | Yes | USER | Fetch authenticated user profile & active state | Implemented |
| `GET` | `/api/v1/account` | Yes | USER | Retrieve current user account details | Implemented |
| `PUT` | `/api/v1/account` | Yes | USER | Update user account details | Implemented |
| `GET` | `/api/v1/organizations/me` | Yes | USER | Get active organization & membership details | Implemented |
| `GET` | `/api/v1/projects` | Yes | USER | List projects scoped to user/org | Implemented |
| `POST` | `/api/v1/projects` | Yes | USER | Create a new project | Implemented |
| `POST` | `/api/v1/ingestion/upload` | Yes | USER | Upload & parse CSV/Excel dataset file | Implemented |
| `POST` | `/api/v1/ingestion/upload-doc`| Yes | USER | Upload & extract PDF/Word spec documents | Implemented |
| `POST` | `/api/v1/ingestion/health-check`| Yes | USER | Execute dataset quality & health profile check | Implemented |
| `GET` | `/api/v1/connectors` | Yes | USER | List database connectors (Postgres, MongoDB, etc.) | Implemented |
| `POST` | `/api/v1/connectors` | Yes | USER | Create encrypted database connector | Implemented |
| `POST` | `/api/v1/goal/parse` | Yes | USER | Parse natural language optimization goal | Implemented |
| `POST` | `/api/v1/goal/confirm` | Yes | USER | Confirm safety boundaries for parsed goal | Implemented |
| `POST` | `/api/v1/jobs/submit` | Yes | USER | Submit AutoML optimization job to BullMQ queue | Implemented |
| `GET` | `/api/v1/jobs/:jobId` | Yes | USER | Poll optimization job status & results | Implemented |
| `GET` | `/api/v1/jobs/:jobId/stream`| Yes | USER | Stream real-time job progress via SSE | Implemented |
| `POST` | `/api/v1/quality-passport/generate`| Yes | USER | Generate Quality Passport document & audit score | Implemented |
| `GET` | `/api/v1/quality-passport/:id` | Yes | USER | Get Quality Passport details | Implemented |
| `POST` | `/api/v1/share-links` | Yes | USER | Create public share token for Quality Passport | Implemented |
| `GET` | `/api/v1/share-links/:token` | No | Public | Access non-authenticated shared Quality Passport | Implemented |
| `POST` | `/api/v1/ai/chat` | Yes | USER | Multi-provider AI Copilot conversation endpoint | Implemented |
| `GET` | `/api/v1/operations` | Yes | USER | Fetch operations & equipment downtime records | Implemented |
| `POST` | `/api/v1/operations` | Yes | USER | Create operations record | Implemented |
| `GET` | `/api/v1/supply-chain/suppliers`| Yes | USER | List suppliers & incoming material lots | Implemented |
| `GET` | `/api/v1/lean/waste-events`| Yes | USER | List 8-waste events & Kaizen actions | Implemented |
| `GET` | `/api/v1/templates` | Yes | USER | Fetch SOP & control plan templates | Implemented |
| `GET` | `/api/v1/notifications` | Yes | USER | Get system notifications | Implemented |
| `POST` | `/api/v1/support/tickets` | Yes | USER | Create support ticket | Implemented |
| `GET` | `/api/v1/admin/users` | Yes | ADMIN | List all platform users & active state | Implemented |
| `GET` | `/api/v1/admin/organizations`| Yes | ADMIN | List platform organizations & entitlement plans | Implemented |
| `GET` | `/api/v1/admin/metrics` | Yes | ADMIN | Fetch system observability & usage metrics | Implemented |

---

## 🔗 Related Documentation

- [BACKEND_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/BACKEND_OVERVIEW.md) — Backend overview
- [AUTHORIZATION.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/AUTHORIZATION.md) — Auth & RBAC rules
- [ADMIN_APIS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/ADMIN_APIS.md) — Admin APIs

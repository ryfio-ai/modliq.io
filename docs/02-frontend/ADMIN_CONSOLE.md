# Modliq Enterprise Admin Console Specification

> **Last updated:** 2026-08-05  
> **Status:** Implemented / Production-Ready  
> **Theme:** Modliq Light Design System (`#FFFFFF`, `#F0F6FA`, `#1B2A4A`, `#2B70AB`, `#D0E2F0`)

---

## 🛡️ Executive Summary & Role Requirements

The **Modliq Enterprise Admin Console** is located in `frontend/src/app/admin/` and serves platform operators, system administrators, and executive managers. It provides centralized observability, user role management, organization scoping, ML compute queue tracking, AI provider failover matrix monitoring, pilot lead capture, support ticket handling, website CMS control center, and security audit trail compliance.

### Security & Role Gates
- **Role Enforcement**: Requires `user.role === 'ADMIN'` (or `email === 'admin@modliq.io'`).
- **Middleware Guard**: `frontend/src/middleware.ts` intercepts all `/admin/*` routes:
  - If unauthenticated $\to$ Redirect to `/login?next=/admin` (401 Unauthorized).
  - If authenticated but `role !== 'ADMIN'` $\to$ Redirect to `/[userId]/modliq-console/dashboard` (403 Forbidden).
  - If authenticated Admin $\to$ Allowed.
- **Admin Seeding**: Seeded via `npm run seed:admin` (`backend/src/scripts/seedAdmin.ts`) using `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables.

---

## 🗺️ Page Hierarchy, Features & Frontend Routes

| Subpage | Route | Description & Key Features | Icons & UI Components |
| :--- | :--- | :--- | :--- |
| **Overview** | `/admin` | Live platform metrics: total users, organizations, ML executions, monthly AI calls, open support queue, system status. | Key metric cards, direct navigation links |
| **User Directory** | `/admin/users` | Platform user master table. View accounts, demo vs standard status, toggle roles (`ADMIN` $\leftrightarrow$ `USER`), inspect user projects/datasets. | User table, Role badge toggles |
| **Organizations** | `/admin/organizations` | Multi-tenant organization & plant workspace directory. View company size, industry, slug, creation date, and entitlement plans. | Organization table, Tenant filters |
| **Projects** | `/admin/projects` | Active platform projects directory across workspaces. Filter by status, organization, and dataset links. | Project table, Status badges |
| **Datasets** | `/admin/datasets` | Ingested datasets & telemetry directory. Track health scores, file types, and dimensions (raw rows masked for privacy). | Dataset table, Health badges |
| **ML Job Queue** | `/admin/jobs` | Monitor AutoML training executions, job stages, progress %, error tracebacks, and retry/cancel actions. | Progress bars, Retry/Cancel buttons |
| **Imports** | `/admin/imports` | Data connector & document ingestion job history (CSV, Excel, PDF, Word, MongoDB, Postgres, Supabase). | Ingestion table, Progress trackers |
| **AI Providers** | `/admin/ai` | Real-time status of Groq, Gemini, NVIDIA NIM, Cohere, Cloudflare, and OpenRouter AI models and failover sequence. | Provider health cards, Failover chain |
| **System Status** | `/admin/system` | Service health of Express Gateway (v2.0), MongoDB Atlas, FastAPI ML Engine, BullMQ/Redis, and R2 storage. | System architecture grid, Memory & Uptime |
| **Usage Metering** | `/admin/usage` | Metered event trail: AI calls, dataset ingestion events, optimization job runs, and Quality Passport exports. | Usage metering log table |
| **Pilot Leads** | `/admin/leads` | Contact & free 30-day pilot lead management table. Update lead status (`NEW` $\to$ `CONVERTED`), internal notes, email launcher. | Lead table, Status dropdowns, Notes drawer |
| **Support Queue** | `/admin/support` | Engineer support queue. Inspect user support tickets, respond with resolution notes, update priority & status. | Ticket inspection list & Response panel |
| **Website Control** | `/admin/website` | CMS Website Control Center. Manage public homepage section visibility, copy, navbar, footer, contact page, SEO, chatbot, and announcements. | Section visibility toggles, Tabbed CMS forms |
| **Audit Logs** | `/admin/audit-logs` | Immutable security audit trail logging user authentication, role changes, dataset deletions, and setting updates. | Compliance log table (Read-only) |
| **Settings** | `/admin/settings` | Platform global settings & feature flags: free pilot slots limit, AI feature toggle, upload max MB, maintenance mode. | Quota inputs, Feature flag toggles |

---

## 📡 Backend APIs & Next.js Proxy Endpoints

The frontend uses Next.js server-side API proxy routes located at `frontend/src/app/api/v1/admin/` to proxy calls to the Express backend (`backend/src/routes/admin.routes.ts` & `backend/src/routes/websiteAdmin.routes.ts`).

---

## 🎨 Theme & Visual Standards

The Admin Console follows the official **Modliq Light Design System**:
- **Backgrounds**: Pure White (`#FFFFFF`) and Soft Blue (`#F0F6FA`).
- **Headings**: Deep Navy (`#1B2A4A`).
- **Primary Accents**: Signal Blue (`#2B70AB`).
- **Borders & Dividers**: Crisp Blue (`#D0E2F0`).
- **Typography**: Poppins font family.

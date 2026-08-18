# MODLIQER Route Audit — Final Pre-Launch Inventory

> **Last verified:** 17/08/2026


## Summary
Audit of all frontend UI routes, backend Express API routes, and ML Engine FastAPI endpoints.

---

## 1. Public Website & Legal Routes

| Route | Type | Auth Required | Expected Behavior | Result | Status |
|---|---|---|---|---|---|
| `/` | Public | No | Render homepage with hero CTA | 200 OK | PASS |
| `/about` | Public | No | Company & platform overview | 200 OK | PASS |
| `/features` | Public | No | Interactive feature highlights | 200 OK | PASS |
| `/docs` | Public | No | Technical architecture & user docs | 200 OK | PASS |
| `/comparison` | Public | No | Competitor & traditional tool comparison | 200 OK | PASS |
| `/workflow` | Public | No | Core value chain explanation | 200 OK | PASS |
| `/system-architecture` | Public | No | Interactive node diagram | 200 OK | PASS |
| `/pricing` | Public | No | Tiered SaaS pricing & Enterprise custom quote | 200 OK | PASS |
| `/contact` | Public | No | Lead capture & free pilot application form | 200 OK | PASS |
| `/roi` | Public | No | Interactive manufacturing ROI calculator | 200 OK | PASS |
| `/privacy` | Public | No | Privacy policy | 200 OK | PASS |
| `/terms` | Public | No | Terms of service | 200 OK | PASS |
| `/disclaimer` | Public | No | Industrial engineering disclaimer | 200 OK | PASS |
| `/sitemap.xml` | SEO | No | Dynamic XML sitemap | 200 OK | PASS |
| `/robots.txt` | SEO | No | Robots crawling policy | 200 OK | PASS |
| `/llms.txt` | AEO | No | AI agent documentation feed | 200 OK | PASS |
| `/llms-full.txt` | AEO | No | Full AI agent context feed | 200 OK | PASS |

---

## 2. User Console Routes (`/[userId]/modliq-console`)

| Route | Type | Auth Required | Expected Behavior | Result | Status |
|---|---|---|---|---|---|
| `.../dashboard` | User | Yes | Executive KPIs, active project cards | 200 OK | PASS |
| `.../agent` | User | Yes | MODLIQER Agent (Beta) multi-mode workspace | 200 OK | PASS (BETA) |
| `.../projects` | User | Yes | Project registry & project creation | 200 OK | PASS |
| `.../projects/[id]/data-upload` | User | Yes | File ingestion, drag-and-drop, database connectors | 200 OK | PASS |
| `.../projects/[id]/eda` | User | Yes | EDA Studio 6-tab statistical report | 200 OK | PASS |
| `.../projects/[id]/goal` | User | Yes | Natural language goal parser & safety wizard | 200 OK | PASS |
| `.../projects/[id]/optimization-progress` | User | Yes | Real-time job polling & progress bar | 200 OK | PASS |
| `.../projects/[id]/results` | User | Yes | Setpoint recommendations & ROI summary | 200 OK | PASS |
| `.../projects/[id]/studio/quality` | User | Yes | SPC control charts, Cpk analysis & CAPA generator | 200 OK | PASS |
| `.../projects/[id]/operations` | User | Yes | OEE, downtime Pareto & bottleneck insights | 200 OK | PASS |
| `.../projects/[id]/supply-chain` | User | Yes | Supplier scorecard & lot traceability | 200 OK | PASS |
| `.../projects/[id]/lean` | User | Yes | Waste tracker, Kaizen board & 5S audit | 200 OK | PASS |
| `.../projects/[id]/quality-passport` | User | Yes | Buyer-ready Quality Passport certificate | 200 OK | PASS |
| `.../projects/[id]/agent` | User | Yes | Project-scoped MODLIQER Agent (Beta) workspace | 200 OK | PASS (BETA) |
| `.../profile` | User | Yes | User public ID, profile info & preferences | 200 OK | PASS |
| `.../settings` | User | Yes | Project & organization settings | 200 OK | PASS |

---

## 3. Admin Console Routes (`/admin`)

| Route | Type | Auth Required | Expected Behavior | Result | Status |
|---|---|---|---|---|---|
| `/admin` | Admin | Yes (ADMIN) | Admin system dashboard | 200 OK | PASS |
| `/admin/users` | Admin | Yes (ADMIN) | User management table | 200 OK | PASS |
| `/admin/organizations` | Admin | Yes (ADMIN) | Organization list & settings | 200 OK | PASS |
| `/admin/projects` | Admin | Yes (ADMIN) | Project audit view | 200 OK | PASS |
| `/admin/datasets` | Admin | Yes (ADMIN) | Global dataset health logs | 200 OK | PASS |
| `/admin/jobs` | Admin | Yes (ADMIN) | Optimization job queue status | 200 OK | PASS |
| `/admin/leads` | Admin | Yes (ADMIN) | Contact & pilot lead submissions | 200 OK | PASS |
| `/admin/website` | Admin | Yes (ADMIN) | Dynamic website control center | 200 OK | PASS |
| `/admin/audit-logs` | Admin | Yes (ADMIN) | Immutable system audit event logs | 200 OK | PASS |

---

## 4. Backend API Endpoints (`/api/v1`)

| Endpoint | Method | Auth Required | Result | Status |
|---|---|---|---|---|
| `/api/v1/projects` | GET / POST | Yes | 200 / 201 | PASS |
| `/api/v1/projects/:id/datasets/upload` | POST | Yes | 200 OK | PASS |
| `/api/v1/projects/:id/goal/crosscheck` | POST | Yes | 200 OK | PASS |
| `/api/v1/optimization/jobs` | POST | Yes | 200 OK | PASS |
| `/api/v1/optimization/jobs/:id` | GET | Yes | 200 OK | PASS |
| `/api/v1/agent/run` | POST | Yes | 200 OK | PASS (BETA) |
| `/api/v1/agent/approvals/:id/approve` | POST | Yes | 200 OK | PASS (BETA) |
| `/api/v1/agent/approvals/:id/reject` | POST | Yes | 200 OK | PASS (BETA) |

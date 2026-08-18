# MODLIQER Admin API Endpoints & Contracts

> **Last verified:** 17/08/2026


> **Last updated:** 2026-08-05  
> **Source of truth:** `backend/src/routes/admin.routes.ts`, `backend/src/routes/websiteAdmin.routes.ts`, `backend/src/routes/publicWebsite.routes.ts`  
> **Status:** Implemented / Production-Ready  

---

## 🛡️ Admin API Endpoint Reference

All admin API endpoints require JWT authentication (`Authorization: Bearer <token>`) with `role === 'ADMIN'`.

| Method | Endpoint Path | Purpose | Query / Request Payload | Response Schema |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/admin/summary` | Platform observability & metrics | N/A | `{ success: true, data: { totalUsers, totalOrganizations, totalProjects, totalDatasets, totalJobs, failedJobs, aiCallsToday, platformStatus, alerts } }` |
| `GET` | `/api/v1/admin/users` | List platform users (Paginated) | `?page=1&limit=25&search=name&role=ADMIN` | `{ success: true, data: [ { id, name, email, role, status, isDemo, orgCount, projectCount } ], pagination }` |
| `GET` | `/api/v1/admin/users/:userId` | Detailed user profile & activity | N/A | `{ success: true, data: { profile, projects, datasets, jobs, auditLogs, tickets } }` |
| `PATCH` | `/api/v1/admin/users/:userId` | Update user role or demo status | `{ role: "ADMIN", isDemo: false }` | `{ success: true, data: { user } }` |
| `GET` | `/api/v1/admin/organizations` | List tenant organizations | `?page=1&limit=25&search=plant&industry=Chemicals` | `{ success: true, data: [ { id, name, slug, ownerUserId, memberCount, plan } ], pagination }` |
| `GET` | `/api/v1/admin/organizations/:orgId` | Detailed organization view | N/A | `{ success: true, data: { organization, members, projects, entitlement, tickets } }` |
| `GET` | `/api/v1/admin/projects` | List platform projects | `?page=1&limit=25&status=completed` | `{ success: true, data: [ { id, name, status, user, dataset, optimizationJob } ], pagination }` |
| `GET` | `/api/v1/admin/datasets` | List datasets & health scores | `?page=1&limit=25&sourceType=file` | `{ success: true, data: [ { id, name, filename, totalRows, totalColumns, healthScore } ], pagination }` |
| `GET` | `/api/v1/admin/jobs` | Monitor ML compute queue | `?page=1&limit=25&status=failed` | `{ success: true, data: [ { id, userId, status, stage, progress, error } ], pagination }` |
| `POST` | `/api/v1/admin/jobs/:jobId/retry` | Safe retry for failed job | N/A | `{ success: true, message: "Job re-queued successfully" }` |
| `POST` | `/api/v1/admin/jobs/:jobId/cancel` | Cancel running job | N/A | `{ success: true, message: "Job cancelled" }` |
| `GET` | `/api/v1/admin/imports` | Data & document import jobs | `?page=1&limit=25` | `{ success: true, data: [ { id, userId, status, progress } ], pagination }` |
| `GET` | `/api/v1/admin/ai/provider-health` | Multi-provider AI health matrix | N/A | `{ success: true, data: { providerMode, failoverOrder, aiCallsToday, providers } }` |
| `GET` | `/api/v1/admin/system` | System infrastructure health | N/A | `{ success: true, data: { backendVersion, nodeEnv, uptimeSeconds, components } }` |
| `GET` | `/api/v1/admin/usage` | Metered usage events | `?page=1&limit=25&type=AI_CALL` | `{ success: true, data: [ { id, userId, eventType, quantity } ], pagination }` |
| `GET` | `/api/v1/admin/leads` | Contact & free pilot leads | `?page=1&limit=25&status=NEW` | `{ success: true, data: [ { id, name, company, email, phone, status, notes } ], pagination }` |
| `PATCH` | `/api/v1/admin/leads/:leadId` | Update lead status or notes | `{ status: "CONTACTED", notes: "Called applicant" }` | `{ success: true, data: { lead } }` |
| `GET` | `/api/v1/admin/support/tickets` | Support ticket queue | `?page=1&limit=25&status=OPEN` | `{ success: true, data: [ { id, userId, subject, category, priority, status } ], pagination }` |
| `PATCH` | `/api/v1/admin/support/tickets/:id` | Update ticket & response | `{ status: "RESOLVED", adminResponse }` | `{ success: true, data: { ticket } }` |
| `GET` | `/api/v1/admin/website` | Full CMS website settings | N/A | `{ success: true, data: { navbar, footer, seo, chatbot, announcement, contact, homeSections } }` |
| `PATCH` | `/api/v1/admin/website/settings/:key` | Update website setting key | `{ logoText: "MODLIQER" }` | `{ success: true, data: { setting } }` |
| `GET` | `/api/v1/admin/website/home-sections` | Homepage sections config | N/A | `{ success: true, data: [ { sectionKey, title, subtitle, visible, order } ] }` |
| `PATCH` | `/api/v1/admin/website/home-sections/:key` | Update section visibility/copy | `{ visible: false, title: "New Title" }` | `{ success: true, data: { section } }` |
| `POST` | `/api/v1/admin/website/home-sections/reorder` | Reorder homepage sections | `{ sectionKeys: ["hero", "freePilot"] }` | `{ success: true, message: "Sections reordered" }` |
| `GET` | `/api/v1/admin/audit-logs` | Security audit trail | `?page=1&limit=25&action=USER_LOGIN` | `{ success: true, data: [ { id, userId, action, entityType, createdAt } ], pagination }` |
| `GET` | `/api/v1/admin/settings` | Platform global settings | N/A | `{ success: true, data: { freePilotEnabled, freePilotSlotsLimit, aiFeaturesEnabled, maintenanceMode } }` |
| `PATCH` | `/api/v1/admin/settings` | Update platform settings | `{ freePilotEnabled: true }` | `{ success: true, data: { settings } }` |

---

## 🌐 Public Website Endpoints

No authentication required for public website configuration:

| Method | Endpoint Path | Purpose | Request Payload | Response Schema |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/public/website-config` | Public marketing site configuration | N/A | `{ success: true, data: { navbar, footer, seo, chatbot, announcement, contact, homeSections } }` |
| `POST` | `/api/v1/public/chatbot` | Public FAQ marketing chatbot | `{ message: "What is MODLIQER?" }` | `{ success: true, answer: "...", source: "faq" }` |

---

## 🔗 Related Documentation

- [ADMIN_CONSOLE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/ADMIN_CONSOLE.md) — Admin console UI specification
- [AUTHORIZATION.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/AUTHORIZATION.md) — Auth & RBAC rules

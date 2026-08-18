# MODLIQER Admin Console Documentation

> **Last verified:** 17/08/2026
> **Source of truth:** Active Codebase & Specification  
> **Status:** Implemented / Live  

---

## 📌 Executive Overview

The **MODLIQER Admin Console** (`/admin/*`) is the B2B SaaS management control center. Restricted strictly to platform administrators (`user.role === 'ADMIN'`), it provides cross-tenant monitoring, SaaS operational metrics, website CMS controls, AI provider health monitoring, pilot lead management, and audit log analysis.

---

## 🚀 Complete Admin Console Capabilities

1. **Overview & SaaS Telemetry** (`/admin`): Cross-tenant analytics, active users, total projects, dataset ingestion metrics, job queue counts, and monthly token usage.
2. **User Account Management** (`/admin/users`): Paginated user directory with role assignments (`ADMIN`, `USER`), account status toggles, organization associations, and Public User ID (`MODLIQER-USER-20260808-1000`) search.
3. **Organization Management** (`/admin/organizations`): Company accounts, member management, subscription entitlement controls, and industry tagging.
4. **Project Monitoring** (`/admin/projects`): Cross-organization project oversight, dataset counts, optimization job counts, and Public Project ID search.
5. **Dataset Metadata Inspector** (`/admin/datasets`): Dataset health scores, row/column counts, file sizes, and storage provider metadata.
6. **Job Queue Monitoring** (`/admin/jobs`): Optimization job status tracking (*Queued, Training, Optimization, Completed, Failed*), execution times, and failure log inspection.
7. **Document Import Logs** (`/admin/imports`): Universal document ingestion log tracker for PDF and DOCX table extraction jobs.
8. **AI Provider Health & Metrics** (`/admin/ai-prompts` & AI Provider page): Health status, response latency, token consumption, and failover status across Groq, Gemini, NVIDIA, Cohere, Cloudflare, and OpenRouter.
9. **System Health & Infrastructure** (`/admin/system`): Microservice status (Frontend Next.js, Backend Express Gateway, Python ML Engine, Redis, MongoDB Atlas).
10. **Usage & Analytics** (`/admin/analytics`): API request volume, token usage breakdown by tenant, and storage capacity metrics.
11. **Pilot Lead Management** (`/admin/leads`): Capture, review, and manage incoming applications for the Free 10-Company Launch Pilot.
12. **Support Ticket Center** (`/admin/support`): Customer support ticket inbox, priority handling, ticket timeline, and staff response editor (`MODLIQER-TICKET-20260808-1000`).
13. **Website Control Center** (`/admin/website`): CMS control panel allowing live updates to public landing hero copy, CTAs, navbar/footer links, contact details, SEO metadata, chatbot visibility, and announcement banners.
14. **Immutable Audit Logs** (`/admin/logs`): Compliance logging recording admin mutations, security events, authentication logs, and data exports.
15. **Platform Settings** (`/admin/settings`): Global system parameters, default thresholds, security rate limits, and feature flags.

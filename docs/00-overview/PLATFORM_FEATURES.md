# Modliq Platform Features Catalog

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 📋 Comprehensive Feature Matrix

| Feature | Status | Frontend Route | Backend API | Database Model | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Public Landing Page** | Implemented | `/` | `/api/v1/public/*` | N/A | High-impact hero, interactive demo, Qeltrava AI branding |
| **Solutions & Use Cases** | Implemented | `/solutions`, `/solutions/*` | `/api/v1/public/*` | N/A | Industry-tailored pages (Chemicals, Automotive, Pharma, Textiles, Plastics) |
| **ROI Calculator Page** | Implemented | `/roi` | N/A | N/A | Interactive yield gain and cost savings estimator |
| **System Architecture Page** | Implemented | `/system-architecture` | N/A | N/A | Live visual system architecture blueprint |
| **Contact & Lead Capture** | Implemented | `/contact` | `/api/v1/public/contact` | `ContactLead` | Free pilot application & sales lead capture |
| **User Sign In / Registration** | Implemented | `/login` | `/api/v1/auth/*` | `User`, `Account` | Credentials auth & OAuth 2.0 (Google, GitHub) |
| **Universal File Upload** | Implemented | `/(studio)` | `/api/v1/ingestion/upload` | `Dataset` | CSV, XLSX, XLS parsing with preview & health score |
| **Document Ingestion (PDF/Word)**| Implemented | `/(studio)` | `/api/v1/ingestion/upload-doc`| `IngestedDocument` | Extracts text preview & tables from PDF/DOCX |
| **Database Connectors** | Implemented | `/(studio)` | `/api/v1/connectors` | `DataConnector` | Postgres, Supabase, MongoDB, MySQL, SQL Server connectors |
| **Dataset Health Check** | Implemented | `/(studio)` | `/api/v1/ingestion/health-check`| `Dataset` | Correlation matrix, missing rows, health score (0-100) |
| **Natural Language Goal Parser**| Implemented | `/(studio)` | `/api/v1/goal/parse` | `Project`, `GoalReview` | Rule-based & LLM extraction of targets/features |
| **Interactive Goal Crosscheck** | Implemented | `/(studio)` | `/api/v1/goal/confirm` | `GoalReview` | Safety boundary verification wizard |
| **AutoML Process Optimization** | Implemented | `/(studio)/optimization-progress` | `/api/v1/jobs/submit` | `OptimizationJob` | 16-algorithm model zoo + Optuna tuning + BullMQ queue |
| **Results & Safe Parameter Windows**| Implemented | `/(studio)/results` | `/api/v1/jobs/:id` | `OptimizationJob`, `OptimizationRun` | Safe bounds, optimal targets, SHAP process drivers |
| **EDA Studio & Data Profiling** | Implemented | `/[userId]/modliq-console/eda` | `/api/v1/projects/:projectId/datasets/:datasetId/eda` | `EdaReport` | 8-tab no-code profiling, IQR outliers, Pearson heatmap, export |
| **No-Code Analytics + AutoML Workflows** | Implemented | `/[userId]/modliq-console/*` | `/api/v1/projects/:projectId/analytics/*` | `Dataset`, `EdaReport` | Ask Your Factory Data, Data Cleaning Advisor, Smart Charts, Insight Narratives, KPI Mapping, AutoML Leaderboard (Beta), Model Trust Monitor (Beta) |
| **Quality Studio & Passport** | Implemented | `/[userId]/modliq-console` | `/api/v1/quality-passport/*` | `QualityPassport` | Audit score, readiness status, MLOps evidence, Markdown export |
| **Public Quality Passport Share** | Implemented | `/share/quality-passport/[token]` | `/api/v1/share-links/*` | `ShareLink` | Token-hashed, non-auth shareable compliance report |
| **Operations Management** | Implemented | `/[userId]/modliq-console` | `/api/v1/operations/*` | `OperationsRecord` | Shift tracking, machine downtime, yield & scrap rates |
| **Supplier & Material Traceability**| Implemented | `/[userId]/modliq-console` | `/api/v1/supply-chain/*` | `Supplier`, `MaterialLot` | Defect rate by lot code, incoming inspection |
| **Lean Manufacturing & Kaizen** | Implemented | `/[userId]/modliq-console` | `/api/v1/lean/*` | `LeanWasteEvent`, `KaizenAction`, `FiveSAudit` | 8 waste tracking, 5S audit scoring, Kaizen Kanban |
| **Multi-Provider AI Copilot** | Implemented | `/(studio)`, `/[userId]/modliq-console` | `/api/v1/ai/chat` | `AiConversation`, `AiMessage`, `AiInsight` | Groq, Gemini, NVIDIA, Cohere, Cloudflare, OpenRouter |
| **SOP & Control Plan Templates** | Implemented | `/[userId]/modliq-console` | `/api/v1/templates` | `Template` | Pre-built templates for 6 manufacturing industries |
| **Notifications & System Alerts**| Implemented | `/[userId]/modliq-console` | `/api/v1/notifications` | `Notification` | System notifications bell with severity levels |
| **Support & Ticket System** | Implemented | `/[userId]/modliq-console` | `/api/v1/support` | `SupportTicket` | User issue reporting with admin response tracking |
| **Admin Console & Tenant Scoping**| Implemented | `/admin` | `/api/v1/admin/*` | `User`, `Organization`, `AuditLog` | User management, organization entitlements, system logs |
| **Admin Observability & Metrics** | Implemented | `/admin` | `/api/v1/admin/metrics` | `UsageEvent`, `AuditLog` | System usage events, storage stats, AI token tracking |
| **SEO / AEO / GEO Engine** | Implemented | Public Pages | N/A | N/A | Dynamic sitemap, robots.txt, Schema.org JSON-LD |

---

## 🤖 No-Code Analytics + AutoML Workflows Status

| Module / Feature | Rollout Status | Security & Execution Rule |
| :--- | :--- | :--- |
| **Ask Your Factory Data** | **Live** | Deterministic query planner (`groupBy`, `filter`, `sort`, `mean`, `sum`, `count`, `min`, `max`, `correlation`). Zero arbitrary code/SQL execution. |
| **Data Cleaning Advisor** | **Live** | Advisory by default. Confirmed actions create versioned Dataset Version 2. Original dataset remains unchanged. |
| **Smart Chart Suggestions** | **Live** | Recommends histograms, bar charts, scatter plots, heatmaps, and Pareto charts based on feature types. |
| **Insight Narratives** | **Live** | Plain-language executive summary compiled from computed EDA, quality math, and operations data. |
| **KPI Auto-Mapping** | **Live** | Auto-detects Yield, Defects, Quality Rate, Downtime, Availability, Performance, Traceability, and Scrap. |
| **Feature Engineering Suggestions** | **Beta** | Tailored manufacturing ratio & interaction terms. Enabled by explicit user toggle. |
| **AutoML Benchmark Leaderboard** | **Beta** | Candidate benchmark suite (Random Forest, Gradient Boosting, Extra Trees, Linear). Resource limits: $10,000$ max rows, $4$ models, $120\text{s}$ timeout. Evaluates $R^2$, RMSE, MAE. |
| **Model Trust & Drift Monitor** | **Beta** | Monitors Kolmogorov-Smirnov distribution drift & schema shifts. Displays Trust Score (0-100%). |
| **Retraining Recommendations** | **Beta** | Advisory status. Requires explicit user confirmation to create a new optimization run. |
| **Quality Passport MLOps Evidence** | **Live** | Audit-ready documentation of model algorithm, $R^2$ accuracy, features, and drift status in Section 7. |

> **Security & Execution Rule**: Modliq does not execute arbitrary user code or arbitrary SQL. Natural language questions are converted into safe deterministic query plans.

---

## 🔗 Related Documentation

- [PRODUCT_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/PRODUCT_OVERVIEW.md) — Product vision & problem statement
- [LAUNCH_STATUS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/LAUNCH_STATUS.md) — Launch readiness score
- [ROUTES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/ROUTES.md) — Comprehensive route table

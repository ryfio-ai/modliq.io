# Modliq Platform Features & 45 Capabilities Directory

> **Last verified:** 2026-08-09  
> **Source of truth:** Active Codebase Inspection & Specification  
> **Status:** Live & Launch-Ready  

---

## 📌 Executive Product Positioning

**Modliq** is a no-code manufacturing intelligence and machine learning platform that helps factory teams **analyze what happened**, **optimize what happens next**, and **prove decisions with buyer-ready Quality Passports** — without needing a data analyst, data scientist, or ML engineer to get started.

Made in **Tamil Nadu, India** by **Qeltrava AI**.

---

## 📋 Full 45-Module Capabilities Breakdown

### 1. Public Marketing Website
- **Status:** Live
- Marketing site featuring no-code positioning, Qeltrava AI attribution, Tamil Nadu roots, ROI calculator in ₹ INR, Quality Passport preview, algorithm transparency, free launch pilot offer for the first 10 selected manufacturing companies, and SEO/AEO/GEO optimization.

### 2. Authentication and Role Routing
- **Status:** Live
- Tenant-isolated authentication. Normal users route to `/[userId]/modliq-console/dashboard`; platform admins route to `/admin`. Protected user, admin, and project routes enforce role-aware access controls.

### 3. User Console
- **Status:** Live
- Comprehensive workspace containing Dashboard, Projects, Data Upload, EDA Studio, Goal Parser, Goal Crosscheck Wizard, Optimization Progress, Results, Quality Studio, Operations, Supply Chain, Lean, Quality Passport, Templates, Support, Help, and User Settings.

### 4. Universal Data Ingestion
- **Status:** Live / Beta by source
- Supports CSV, Excel, PDF table extraction, and Word document ingestion. Database connectors for Supabase/Postgres and MongoDB. Roadmap for MySQL, SQL Server, OPC-UA, MQTT, Modbus, SCADA, MES API, and ERP API.

### 5. Dataset Health Check
- **Status:** Live
- Scores data readiness across 5 status bands (*Excellent, Good, Needs Review, Risky, Not Recommended*). Diagnostic checks analyze missing values, duplicate rows, outliers, constant columns, identifier columns, target leakage, and sample size adequacy.

### 6. No-Code EDA Studio
- **Status:** Live
- 8-tab exploratory analysis studio: *Overview, Columns, Missing Data, Distributions, Correlations, Outliers, Target Analysis, Recommendations, and Industrial Profile*.

### 7. Ask Your Factory Data
- **Status:** Live
- Natural language query interface allowing queries like *"Which supplier has the lowest average yield?"* or *"Which shift had the highest downtime?"*. Powered by safe deterministic query execution plans (`groupBy`, `filter`, `sort`, `mean`, etc.) with zero raw code or SQL execution.

### 8. Data Cleaning Advisor
- **Status:** Live
- Suggests missing value imputation, outlier handling, and type corrections. Execution requires user confirmation and creates a versioned dataset (Version 2) without mutating the original raw data.

### 9. Smart Chart Suggestions
- **Status:** Live
- Automatically recommends histograms, bar charts, scatter plots, heatmaps, Pareto charts, and line charts based on feature types and query results.

### 10. KPI Auto-Mapping
- **Status:** Live
- Detects manufacturing KPIs automatically (Yield, Defects, Quality Rate, Downtime, Availability, Performance, Traceability, Scrap, OEE, and Supplier fields) with manual override support.

### 11. Natural Language Goal Parser
- **Status:** Live
- Parses natural language objectives (e.g. *"Maximize yield while keeping temperature below 90°C"*) into structured target metrics, directions, thresholds, feature sets, and operational constraints.

### 12. Goal Crosscheck Wizard
- **Status:** Live
- Interactive pre-flight wizard requiring user verification of target metrics, controllable variables, plant limits, dataset health context, and safety rules before optimization runs.

### 13. No-Code ML Optimization
- **Status:** Live
- Trains predictive models, calculates feature importance, executes constrained optimization, recommends safe process setpoints, generates 7-batch trial ranges, and projects business financial impact.

### 14. AutoML Benchmark Leaderboard
- **Status:** Beta
- Benchmarks Random Forest, Gradient Boosting, Extra Trees, and Linear Baselines evaluating $R^2$, RMSE, MAE, and training latency ($10,000$ row limit, 4 models max, $120\text{s}$ timeout).

### 15. Model Trust and Drift Monitor
- **Status:** Beta
- Tracks schema shifts, missing feature changes, input distribution drift, and target distribution drift. Displays advisory retraining recommendations.

### 16. Quality Studio (SPC & Capability)
- **Status:** Live
- Deterministic SPC quality suite providing statistical summary, outlier detection, I-MR control charts (CL/UCL/LCL), SPC rule violations, $C_p$ / $C_{pk}$ capability metrics, LSL/USL inputs, AQL sampling, and CAPA suggestions.

### 17. Operations Intelligence
- **Status:** Live
- OEE calculation engine (Availability, Performance, Quality Rate), downtime Pareto analysis, line/machine/shift comparisons, and bottleneck insights.

### 18. Supply Chain Traceability
- **Status:** Live
- Links raw material lot numbers and supplier scorecards to batch yield, defect rates by supplier, incoming quality status, and risk badges.

### 19. Lean and Kaizen Engine
- **Status:** Live
- 8-waste tracking, waste Pareto, 5S audit scoring, Takt time calculator, Kanban sizing calculator, estimated monthly financial loss, and Kaizen action status board.

### 20. Quality Passport
- **Status:** Live
- Buyer-ready audit evidence document compiling audit readiness score, certificate ID (e.g. `MODLIQ-PASSPORT-20260808-1000`), dataset health, EDA summary, optimization results, SPC capability, OEE, supplier risk, MLOps evidence, data lineage, and recommended SOP actions.

### 21. Buyer Share Links
- **Status:** Live
- Generates sanitized, token-hashed, read-only public verification URLs for Quality Passports with automatic data privacy filtering (raw rows, credentials, internal notes, and admin data remain strictly private).

### 22. Modliq Agent
- **Status:** Beta
- Agentic manufacturing assistant capable of project inspection, tool execution, CAPA/SOP drafting, and evidence preparation. Enforces approval checkpoints for critical mutations.

### 23. AI Copilot
- **Status:** Live
- Explanation layer translating math and ML into natural language explanations. Integrates with Groq, Gemini, NVIDIA, Cohere, Cloudflare, and OpenRouter LLMs.

### 24. Admin Console
- **Status:** Live
- Complete B2B SaaS administration panel managing users, organizations, projects, datasets, job queues, AI provider health, system status, usage metrics, pilot leads, support tickets, audit logs, and global settings.

### 25. Website Control Center
- **Status:** Live
- Admin interface for dynamic editing of homepage hero copy, CTAs, navigation links, contact details, SEO metadata, public chatbot toggles, and announcement banners.

### 26. Security Capabilities
- **Status:** Live
- JWT authentication, RBAC, tenant isolation, encrypted connector credentials, strict CORS, SSRF protection, upload validation, formula injection defense, rate limiting, and zero arbitrary SQL/code execution.

### 27. SEO / AEO / GEO Engine
- **Status:** Live
- Schema.org JSON-LD (Organization, SoftwareApplication, FAQ), OpenGraph, Twitter cards, dynamic sitemaps, robots.txt, `llms.txt`, `llms-full.txt`, and canonical URL enforcement.

### 28. Project Management & Human-Readable IDs
- **Status:** Live
- Project creation, renaming, status badges, and human-readable IDs (`MODLIQ-PROJECT-20260808-1000`, `MODLIQ-PASSPORT-20260808-1000`, `MODLIQ-USER-20260808-1000`).

### 29. Data Cleaning Advisor
- **Status:** Live
- Recommends non-destructive data cleaning steps with full version control.

### 30. KPI Auto-Mapping Engine
- **Status:** Live
- Maps sensor and production data headers to standard manufacturing metrics automatically.

### 31. Feature Engineering Engine
- **Status:** Beta
- Suggests domain-specific interaction features (e.g. Temperature × Pressure ratio, downtime per unit).

### 32. Goal Crosscheck Pre-Flight Safety
- **Status:** Live
- Validates constraints, controllable features, and target limits prior to submitting ML jobs.

### 33. Explainability Engine
- **Status:** Live
- Provides SHAP process drivers, top feature importance metrics, and extrapolation boundary warnings.

### 34. AQL Sampling & CAPA Generator
- **Status:** Live
- ISO 2859-1 AQL sampling tables and automated Corrective Action Preventive Action (CAPA) drafting.

### 35. Machine & Shift Downtime Pareto
- **Status:** Live
- Identifies major plant downtime contributors by machine, shift, and cause code.

### 36. Material Lot Quality Traceability
- **Status:** Live
- Correlates incoming raw material lot numbers with finished product quality and defect rates.

### 37. 5S Audit & Continuous Improvement
- **Status:** Live
- Digital 5S audit scoring, Takt time calculators, and Kaizen Kanban tracking.

### 38. Quality Passport Public Verification Link
- **Status:** Live
- Read-only public validation links for OEM buyer audits with automatic data masking.

### 39. Multi-LLM Provider Failover
- **Status:** Live
- Dynamic fallback routing between Groq, Gemini, NVIDIA, Cohere, Cloudflare, and OpenRouter.

### 40. Public Website Chatbot
- **Status:** Live
- Public AI assistant helping buyers explore product capabilities, pilot options, and pricing tiers.

### 41. B2B SaaS Organization & Team Management
- **Status:** Live
- Tenant organizations with role hierarchy: `OWNER`, `ADMIN`, `MANAGER`, `ENGINEER`, `VIEWER`.

### 42. Automated Notification System
- **Status:** Live
- Real-time in-app alerts for completed ML jobs, data quality flags, trial due dates, and system updates.

### 43. Support Ticket System
- **Status:** Live
- Integrated ticket tracking (`MODLIQ-TICKET-20260808-1000`) for enterprise user support.

### 44. Audit Lineage & MLOps Evidence
- **Status:** Live
- Immutable event logging from raw data upload through model training to final Quality Passport issuance.

### 45. Industrial Data Readiness & Time-Series Profiling
- **Status:** Live
- Time-series profiling, timestamp gap detection, unit detection, and sensor flatline alerts.

---

## 🔗 Related Architecture & Documentation

- [PRODUCT_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/PRODUCT_OVERVIEW.md) — Product vision & problem statement
- [SYSTEM_ARCHITECTURE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/01-architecture/SYSTEM_ARCHITECTURE.md) — System blueprint & topology
- [LAUNCH_STATUS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/LAUNCH_STATUS.md) — Launch audit signoff

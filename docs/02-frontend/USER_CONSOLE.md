# Modliq User Console Architecture & Features

> **Last verified:** 2026-08-09  
> **Source of truth:** Active Codebase & Specification  
> **Status:** Implemented / Live  

---

## 📌 Executive Overview

The **Modliq User Console** (`/[userId]/modliq-console/*`) is the central workspace where plant operators, process engineers, and quality heads analyze datasets, run ML optimizations, monitor SPC quality statistics, manage operations, track supply chain risks, and generate buyer-ready Quality Passports.

---

## 🚀 Complete User Console Modules

1. **Dashboard** (`/[userId]/modliq-console/dashboard`): Real-time plant summary, recent optimization jobs, quick dataset health indicators, active project metrics, and quick action launcher.
2. **Projects & Project Switcher** (`/[userId]/modliq-console/projects`): Project management supporting creation, deletion, renaming, project status badges, and human-readable project IDs (e.g. `MODLIQ-PROJECT-20260808-1000`).
3. **Data Upload & Universal Ingestion** (`/[userId]/modliq-console/data-upload`): Drag-and-drop ingestion for CSV, Excel, PDF/Word table extraction, and database connectors (Supabase, Postgres, MongoDB).
4. **EDA Studio** (`/[userId]/modliq-console/eda`): 8-tab exploratory data analysis profiling distributions, missing values, outliers, correlations, and industrial target insights.
5. **Goal Parser** (`/[userId]/modliq-console/goal`): Natural language manufacturing goal input extracting metrics, directions, limits, and controllable plant variables.
6. **Goal Crosscheck Wizard**: Interactive safety pre-flight wizard confirming targets, limits, dataset health, and plant safety boundaries before submitting ML jobs.
7. **Optimization Progress** (`/[userId]/modliq-console/optimization-progress`): Real-time polling across Queued, Parsing, Training, Optimization, and Result stages.
8. **Results & MLOps Evidence** (`/[userId]/modliq-console/results`): Performance metrics ($R^2$, RMSE, MAE), safe operating bounds, recommended setpoints, 7-batch trial SOPs, and actual vs predicted charts.
9. **Quality Studio (SPC)** (`/[userId]/modliq-console/spc`): Deterministic statistical process control suite with I-MR charts (CL/UCL/LCL), SPC rule violations, $C_p$ / $C_{pk}$ capability math, LSL/USL inputs, AQL sampling, and CAPA recommendations.
10. **Operations Intelligence** (`/[userId]/modliq-console/operations`): OEE calculation (Availability, Performance, Quality), downtime Pareto charts, machine comparison, line comparison, shift comparison, and bottleneck insights.
11. **Supply Chain Traceability** (`/[userId]/modliq-console/supply-chain`): Material lot yield traceability, supplier risk scorecards, defect rates by vendor, and incoming quality alerts.
12. **Lean & Kaizen Engine** (`/[userId]/modliq-console/lean`): 8-waste tracker, waste Pareto analysis, 5S audit scoring, Takt/Kanban calculators, and continuous improvement Kanban action board.
13. **Quality Passport** (`/[userId]/modliq-console/quality-passport`): Buyer-ready evidence reports with audit scores, certificate IDs (`MODLIQ-PASSPORT-20260808-1000`), data lineage, Markdown export, and token-hashed public verification links.
14. **Modliq Agent (Beta)** (`/[userId]/modliq-console/agent`): Autonomous manufacturing assistant operating across 6 specialized modes (Data Analyst, ML Engineer, Quality Engineer, Operations, Supply Chain, Quality Passport) with human-in-the-loop approval cards for critical actions.
15. **Industrial AI Copilot**: Slide-over explanation layer translating math, SPC, and ML results into plain-English factory actions with multi-LLM failover (Groq, Gemini, NVIDIA, Cohere, Cloudflare, OpenRouter).
16. **Templates & Industry Bundles**: Pre-configured templates for 6 manufacturing sectors (Chemicals, Automotive, Pharma, Plastics, Textiles, Food & Beverage).
17. **Support & Tickets**: Human-readable support ticket tracking (`MODLIQ-TICKET-20260808-1000`).
18. **User Profile & Settings**: Module preferences, profile management, organization details, and public User ID (`MODLIQ-USER-20260808-1000`).

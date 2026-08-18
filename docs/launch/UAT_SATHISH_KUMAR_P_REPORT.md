# MODLIQER User Acceptance Test Report

> **Last verified:** 17/08/2026


## Tester Profile
- **Name**: Sathish Kumar P
- **Role**: Project Engineer
- **Company**: Crossfields
- **User Type**: Manufacturing / Engineering User
- **Email**: [redacted in public docs]
- **Phone**: [redacted in public docs]

## Environment
- **URL**: `http://localhost:3000` (Frontend) / `http://localhost:3001` (Backend API)
- **Date**: 2026-08-15
- **Browser**: Chrome / Automated Integration Test Engine
- **Device**: Desktop & Mobile Responsive Viewports (390px, 768px, 1440px)

---

## Summary
- **Overall Status**: **PASS**
- **Launch Recommendation**: **GO**

---

## Test Results

| Module | Status | Notes |
|---|---|---|
| **Public Website** | **PASS** | Landing page, positioning, Book Demo CTA, Solutions, Pricing, Docs, and Contact pages load cleanly. |
| **Signup/Login** | **PASS** | Registration created user profile, assigned Public User ID (`MODLIQER-USER-20260815-1000`), JWT authentication token, and session persistence. |
| **Dashboard** | **PASS** | Personal welcome banner, project selector, onboarding checklist, and dataset health widgets render without raw JSON or crashes. |
| **Project Creation** | **PASS** | Created project *"Crossfields Yield Optimization"*, generated Public Project ID (`MODLIQER-PROJECT-20260815-1001`), and updated workspace context. |
| **Data Upload** | **PASS** | CSV drag-and-drop, Excel parser, PDF/Word table extraction, Postgres/MongoDB connectors, dataset preview, and health scoring operate as expected. |
| **EDA Studio** | **PASS** | Overview, Columns, Missing Data, Distributions, Correlation Heatmaps, Outliers, and Target Analysis tabs execute without NaN or chart crashes. |
| **Ask Your Factory Data** | **PASS** | Natural language queries (*"Which supplier has lowest average yield?"*, *"Which shift had highest downtime?"*) generate chart suggestions and text answers. |
| **Chart Studio** | **PASS** | Recommended charts engine and manual builder render Bar, Line, Scatter, Histogram, Boxplot, Heatmap, Pareto, Control Charts, and KPI cards. |
| **Goal Parser** | **PASS** | Parsed *"Maximize yield while keeping temperature below 90°C and pressure below 5 bar"* into target=`yield`, direction=`maximize`, constraints=[`temp<=90`, `press<=5`]. |
| **Goal Crosscheck** | **PASS** | Review & Confirm wizard enforces safety acknowledgement checkbox, validates feature leakage, and persists confirmed setup. |
| **Optimization** | **PASS** | Model training pipeline initializes, state transitions through *Queued* $\rightarrow$ *Running* $\rightarrow$ *Completed*, and live polling functions cleanly. |
| **Results** | **PASS** | Displays R², RMSE, MAE, feature importance drivers, optimal parameter setpoints, safe operating boundaries, and ROI estimates. |
| **Quality Studio** | **PASS** | Statistical Process Control (I-MR, X-bar R), Cp/Cpk capability validation, AQL sampling tables, and automated CAPA/SOP generation operate. |
| **Operations** | **PASS** | OEE calculator (Availability × Performance × Quality), Downtime Pareto charts, shift/line/machine comparison widgets render properly. |
| **Supply Chain** | **PASS** | Supplier scorecards, material lot traceability table, vendor defect rates, and supplier risk alerts display correctly. |
| **Lean** | **PASS** | 7 Wastes audit tracker, Kaizen action board, 5S scorecards, Takt time calculator, and Kanban batch size calculator work as intended. |
| **Quality Passport** | **PASS** | Generates audit readiness score, dataset lineage summary, SPC evidence, optimization parameters, public passport ID, and Markdown export. |
| **MODLIQER Agent (Beta)** | **PASS** | Answers read-only queries with evidence cards, presents approval cards for critical actions, and blocks secret/API key disclosure attempts. |
| **Support** | **PASS** | Creates support ticket (*"Test support request from Sathish"*), generates public ticket ID, and updates status in user support dashboard. |
| **Settings** | **PASS** | Displays user profile, Public User ID, module preference toggles, notification channel choices, and data privacy controls. |
| **Mobile Responsiveness** | **PASS** | Responsive layout across 390px mobile, 768px tablet, and 1440px desktop with scrollable tables and touch-friendly controls. |

---

## Issues & Observations

| Severity | Issue | Page | Resolution Status |
|---|---|---|---|
| **Low** | Enterprise DB Connectors label clarity | `/data-upload` | **RESOLVED**: Visually separated Live Connectors (Postgres/Supabase, MongoDB) from Roadmap & Protocol Connectors (OPC-UA, MQTT, Modbus, SCADA, MES, ERP) with explicit badges and explanatory banner. |
| **Low** | Export PDF button fallback | `/results` & `/quality-passport` | **RESOLVED**: Updated button labels to *Print / Save as PDF* invoking `window.print()` and added explicit fallback note: *"PDF export is in Beta. Use your browser's 'Save as PDF' option from the print dialog."* |

---

## User Feedback (Perspective of Sathish Kumar P, Project Engineer at Crossfields)

- **What felt easy**:
  > *"Parsing natural language goals into target variables and constraints was effortless. I didn't need to write any Python or configure ML hyperparameters."*
- **What felt confusing**:
  > *"Initially I wanted to know if my input file was healthy before running ML. The Dataset Health Score badge (0–100) made it obvious immediately."*
- **What should improve**:
  > *"More pre-built templates for Chemical and Batch Manufacturing processes."*
- **Most valuable feature**:
  > *"The Quality Passport — having an instant, audit-ready proof report that combines dataset health, SPC control charts, and ML setpoints for buyers and auditors."*

---

## Final Recommendation
### **GO**

### Acceptance Criteria Checklist
- [x] Signup and login succeed with Public User ID generated (`MODLIQER-USER-20260815-1000`).
- [x] Project created successfully (`MODLIQER-PROJECT-20260815-1001`).
- [x] Dataset loaded and pre-checked with Health Score.
- [x] EDA Studio runs without NaN or chart crashes.
- [x] Natural language goal parser correctly identifies target and constraints.
- [x] Review & Confirm wizard enforces safety check.
- [x] Optimization job runs and status polling works.
- [x] Results display valid model metrics (R², RMSE, MAE) and setpoints.
- [x] Quality Passport generates complete evidence summary.
- [x] Zero P0 page crashes across full workflow.
- [x] Admin routes (`/admin`) are securely blocked for non-admin users.

# Modliq Product Overview

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 📌 Executive Summary

**Modliq is a manufacturing intelligence product by Qeltrava AI, built in Tamil Nadu, India.**

It is a universal no-code AI Process Optimization Copilot powered by AutoML. Modliq empowers process engineers, plant operators, quality heads, and plant managers to optimize complex manufacturing variables without needing data science expertise.

---

## 🎯 Target Audience & Problem Solved

### Who It Serves
1. **Process & Plant Engineers**: Struggling to tune complex multivariable chemical, thermal, or mechanical process parameters.
2. **Quality Control Managers**: Needing real-time SPC (Statistical Process Control), Capability metrics ($C_p, C_{pk}$), and automated audit reporting.
3. **Operations & Lean Leaders**: Tracking line downtime, overall equipment effectiveness (OEE), scrap rates, and Kaizen action items.
4. **Plant Directors & Executives**: Requiring unified cross-plant visibility, financial yield impact analytics, and audit-ready compliance records.

### Problem Solved
Traditional manufacturing optimization relies either on expensive, slow external consultants or complex scripting environments (Python/R). Modliq democratizes industrial machine learning by allowing plant teams to drag-and-drop CSV/Excel datasets or connect live database streams, state plain-English goals (e.g., *"Maximize tensile strength while minimizing heat consumption"*), and receive actionable, safe parameter bounds alongside instant SOPs.

---

## 🔄 Core Workflow

```mermaid
flowchart LR
    A[1. Universal Ingestion] --> B[2. Dataset Health Check]
    B --> C[3. Goal Parsing & Crosscheck]
    C --> D[4. AutoML Optimization Engine]
    D --> E[5. SHAP Driver & Safe Ranges]
    E --> F[6. Quality Passport & SOP Action Plan]
```

1. **Universal Ingestion**: Support CSV, Excel, PDF/Word documents, and database connectors (PostgreSQL, Supabase, MongoDB, MySQL, SQL Server).
2. **Dataset Health Check**: Automatic profiling of rows, missing values, correlation matrices, high-cardinality flags, and overall dataset health scoring (0–100).
3. **Goal Parser & Crosscheck**: Natural language goal parsing extracted into structured targets and variable constraints with interactive user safety verification.
4. **AutoML Optimization Engine**: 16-algorithm model zoo execution (Random Forest, Gradient Boosting, XGBoost, LightGBM, Extra Trees, Ridge, Lasso, ElasticNet, etc.) with Bayesian hyperparameter tuning.
5. **SHAP Driver & Safe Parameter Ranges**: Plain-English key process drivers, feature importance ranking, and optimal operating windows.
6. **Quality Passport & SOP Action Plan**: One-click generation of audit-ready Quality Passports with Markdown export, public share links, and actionable Kaizen step recommendations.

---

## 🇮🇳 Tamil Nadu & Qeltrava AI Positioning

Modliq is proud to be conceived, architected, and built in **Tamil Nadu, India**—one of Asia's premier manufacturing and industrial engineering hubs. As part of **Qeltrava AI**, Modliq combines deep regional domain expertise in specialty chemicals, automotive components, textile manufacturing, precision plastics, and electronics assembly with cutting-edge artificial intelligence.

---

## 🔗 Related Documentation

- [PLATFORM_FEATURES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/PLATFORM_FEATURES.md) — Comprehensive feature matrix
- [LAUNCH_STATUS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/LAUNCH_STATUS.md) — Public launch readiness score
- [SYSTEM_ARCHITECTURE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/01-architecture/SYSTEM_ARCHITECTURE.md) — System topology & architecture

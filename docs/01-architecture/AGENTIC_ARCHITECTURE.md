# Modliq Agentic Manufacturing Architecture

## Executive Summary
Modliq is an **agentic manufacturing intelligence system** that automates the repetitive workflows of data analysts, data scientists, and ML engineers for factory teams.

```
Tell Modliq what you need. It analyzes, optimizes, validates, and documents the answer.
```

---

## Agentic System Flow

```
[ User Request / Prompt ]
         │
         ▼
[ Modliq Agent Orchestrator ]
         │
         ├──> [ 1. Intent Classifier ] (Data Analyst | ML Engineer | Quality | Operations | Supply Chain | Quality Passport)
         ├──> [ 2. Context Builder ] (Dataset, Health Score, Project, User Preference Memory)
         ├──> [ 3. Task Planner ] (Step-by-Step Tool Pipeline)
         ├──> [ 4. Tool Registry ] (Authorized Read-Only Manufacturing Tools)
         ├──> [ 5. Guardrails & Approval Manager ] (Level 0–3 Autonomy Bounds)
         │           └─> Requires Human Approval for Critical Actions:
         │               - RUN_OPTIMIZATION
         │               - APPLY_CLEANING
         │               - RETRAIN_MODEL
         │               - CREATE_SHARE_LINK
         │               - EXPORT_QUALITY_PASSPORT
         │               - CREATE_TRIAL_PLAN
         │
         └──> [ 6. Result Synthesizer ]
                     ├─ What I checked
                     ├─ What I found
                     ├─ What I recommend
                     ├─ What needs your approval
                     └─ Evidence used
```

---

## Autonomy Levels

| Level | Description | Launch Status |
|---|---|---|
| **Level 0** | Explain only (EDA summaries, correlation drivers) | **LIVE** |
| **Level 1** | Recommend action (Suggest setpoints, recommend cleaning) | **LIVE** |
| **Level 2** | Prepare action for approval (Draft CAPA, prepare optimization payload) | **LIVE** |
| **Level 3** | Execute approved workflow (Trigger job after user clicks Approve) | **LIVE** |
| **Level 4** | Autonomous execution without human approval | **DISABLED BY POLICY** |

---

## Product Positioning
- **Modliq Agent** is released in **Beta** alongside core deterministic workflows.
- Public Positioning: *"Modliq Agent assists, orchestrates, prepares, recommends, and executes workflows after human approval."*

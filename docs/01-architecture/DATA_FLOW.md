# MODLIQER Data Flow Architecture

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🔄 Core End-to-End Sequence Diagrams

### 1. Dataset Upload & Ingestion Flow

```mermaid
sequenceDiagram
  autonumber
  actor User
  participant FE as Frontend (Next.js)
  participant BE as Backend API Gateway
  participant DB as MongoDB Atlas
  participant ML as ML Engine (FastAPI)

  User->>FE: Upload CSV / Excel / PDF File
  FE->>BE: POST /api/v1/ingestion/upload
  BE->>BE: Validate JWT & Scoping
  BE->>ML: POST /api/v1/qc/health-check (Service Key)
  ML-->>BE: Dataset Health Score (0-100) & Warnings
  BE->>DB: Save Dataset Record (Prisma)
  BE-->>FE: Return Dataset ID + Health Report JSON
  FE-->>User: Display Dataset Health Dashboard
```

---

### 2. Goal Parsing & Interactive Safety Confirmation Flow

```mermaid
sequenceDiagram
  autonumber
  actor User
  participant FE as Frontend (Next.js)
  participant BE as Backend API Gateway
  participant AI as Multi-Provider AI Gateway
  participant DB as MongoDB Atlas

  User->>FE: Input Natural Language Goal (e.g. "Maximize Yield")
  FE->>BE: POST /api/v1/goal/parse
  BE->>AI: Prompt LLM with Guardrails
  AI-->>BE: Return Extracted Target & Feature Constraints
  BE->>DB: Create GoalReview Record (Status: DRAFT)
  BE-->>FE: Return Goal Review JSON
  User->>FE: Review & Confirm Safety Constraints
  FE->>BE: POST /api/v1/goal/confirm
  BE->>DB: Update GoalReview (Status: CONFIRMED)
  BE-->>FE: Return Confirmation Status
```

---

### 3. AutoML Optimization & Queue Flow

```mermaid
sequenceDiagram
  autonumber
  actor User
  participant FE as Frontend (Next.js)
  participant BE as Backend API Gateway
  participant Queue as Redis / BullMQ Queue
  participant ML as ML Engine (FastAPI)
  participant DB as MongoDB Atlas

  User->>FE: Click "Run Process Optimization"
  FE->>BE: POST /api/v1/jobs/submit
  BE->>DB: Create OptimizationJob (Status: QUEUED)
  BE->>Queue: Push Job Payload to BullMQ
  Queue->>ML: Dispatch AutoML Training Job
  ML->>ML: 16-Algorithm Training + Optuna Tuning + SHAP Drivers
  ML-->>Queue: Return Optimization Results JSON
  Queue->>BE: Update OptimizationJob (Status: COMPLETED)
  BE->>DB: Persist Results to MongoDB Atlas
  FE->>BE: GET /api/v1/jobs/:jobId (Polling/SSE)
  BE-->>FE: Return Complete Optimization Result
```

---

### 4. Quality Passport Generation & Public Share Link Flow

```mermaid
sequenceDiagram
  autonumber
  actor User
  participant FE as Frontend (Next.js)
  participant BE as Backend API Gateway
  participant DB as MongoDB Atlas

  User->>FE: Click "Generate Quality Passport"
  FE->>BE: POST /api/v1/quality-passport/generate
  BE->>DB: Aggregate Dataset + Optimization + Operations Data
  BE->>BE: Compute Audit Readiness Score (0-100)
  BE->>DB: Save QualityPassport Record
  BE-->>FE: Return Quality Passport JSON + Markdown Export
  User->>FE: Click "Create Public Share Link"
  FE->>BE: POST /api/v1/share-links
  BE->>BE: Generate Crypto Token Hash
  BE->>DB: Save ShareLink Record
  BE-->>FE: Return Shareable URL (/share/quality-passport/:token)
```

---

## 🔗 Related Documentation

- [SYSTEM_ARCHITECTURE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/01-architecture/SYSTEM_ARCHITECTURE.md) — System topology
- [QUALITY_PASSPORT.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/QUALITY_PASSPORT.md) — Backend Quality Passport specifications

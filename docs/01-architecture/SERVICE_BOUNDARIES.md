# MODLIQER Service Boundaries & System Contracts

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🛡️ Service Responsibility Boundaries

```mermaid
flowchart TD
  subgraph Frontend ["Next.js Frontend (Port 3000)"]
    F1[UI Rendering & Design System]
    F2[User Input & Form State]
    F3[Client-side Auth Context]
  end

  subgraph Backend ["Express API Gateway (Port 3001)"]
    B1[JWT Authentication & RBAC]
    B2[MongoDB Persistence & Prisma ORM]
    B3[BullMQ Job Queue & Webhooks]
    B4[Multi-Provider AI Gateway & Fallbacks]
  end

  subgraph MLEngine ["FastAPI ML Engine (Port 8000)"]
    M1[AutoML Model Zoo & Optuna HPO]
    M2[Dataset Profiling & Quality Scoring]
    M3[SHAP Driver Extraction]
    M4[Statistical Process Control (SPC)]
  end

  subgraph Database ["MongoDB Atlas Database"]
    D1[Application Data Models]
    D2[User & Org Entitlements]
  end

  Frontend -->|REST APIs| Backend
  Backend -->|Prisma Client| Database
  Backend -->|X-MODLIQER-Service-Key HTTP| MLEngine
```

---

## 📑 Service Contracts Summary

### 1. Frontend (`frontend/`)
- **Strictly Responsible For**: User interaction, responsive Tailwind rendering, state synchronization, client-side route protection.
- **Forbidden From**: Direct MongoDB access, direct Python ML Engine execution, direct LLM API invocation.

### 2. Backend API Gateway (`backend/`)
- **Strictly Responsible For**: Authentication middleware, authorization gating (`requireAuth`, `requireRole`, `requireProjectAccess`), database CRUD operations via Prisma, proxying requests to ML Engine and AI providers, queuing background tasks via BullMQ.
- **Forbidden From**: Heavy blocking machine learning training on the main event loop thread.

### 3. ML Engine (`ml-engine/`)
- **Strictly Responsible For**: Fast, stateless CPU/GPU machine learning compute, dataset parsing, model training, SHAP feature importance calculation, SPC capability index calculation.
- **Forbidden From**: Storing application state, directly issuing user auth tokens, directly communicating with browser clients.

### 4. Application Database (MongoDB Atlas)
- **Strictly Responsible For**: Storing all persistent entities (User, Organization, Project, Dataset, OptimizationJob, QualityPassport, AuditLog).
- **External Connectors**: External databases (Postgres, Supabase, MySQL) are external sources for data ingestion; they are never used as MODLIQER's primary app database.

---

## 🔗 Related Documentation

- [SYSTEM_ARCHITECTURE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/01-architecture/SYSTEM_ARCHITECTURE.md) — 3-Tier topology overview
- [DATA_FLOW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/01-architecture/DATA_FLOW.md) — End-to-end data sequence diagrams

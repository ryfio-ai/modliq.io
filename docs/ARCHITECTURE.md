# Modliq System Architecture & Restructure Documentation

## Overview

Modliq is organized into a standardized three-service architecture:

```
                          ┌──────────────────────────┐
                          │   Frontend (Next.js)     │
                          │   App Router Console     │
                          └─────────────┬────────────┘
                                        │
                                        ▼ REST / JSON API (JWT Auth)
                          ┌──────────────────────────┐
                          │   Backend (Express/TS)   │
                          │   Single Entrypoint      │
                          └──────┬─────────────┬─────┘
                                 │             │
                    Prisma ORM   │             │ Service-to-Service HTTP
                    MongoDB      │             │ (X-Modliq-Service-Key)
                                 ▼             ▼
                          ┌──────────┐  ┌──────────────────────────┐
                          │ Database │  │   ML Engine (FastAPI)    │
                          │ MongoDB  │  │   ProcessPool Queue      │
                          └──────────┘  └──────────────────────────┘
```

---

## Service Contracts & Target Directory Layouts

### 1. `ml-engine` (Python / FastAPI)
- **Config**: `config/local.yaml` & `config/prod.yaml`.
- **Bundled Data**: `data/01-raw/demo_dataset.csv` resolved strictly relative to service root.
- **Entrypoint**: `entrypoint/main.py` is the single application startup entrypoint.
- **Pipelines**: `src/pipelines/` (`goal_parser.py`, `optimizer.py`, `qc_statistics.py`, `qc_insights.py`).
- **Schemas**: `src/schemas/` (`goal.py`, `optimization.py`, `qc.py`).
- **Tests**: `src/tests/` (`test_qc_statistics.py`, `test_optimizer.py`, `test_goal_parser.py`, `test_queue.py`).

### 2. `backend` (Express / TypeScript)
- **Config**: `config/local.ts` & `config/prod.ts`.
- **Entrypoint**: `src/entrypoint/server.ts` is THE single entrypoint for the backend.
- **Database Schema**: `src/db/prisma/schema.prisma` is the single authoritative Prisma schema in the repository.
- **Routes**: `src/routes/` (`auth.routes.ts`, `projects.routes.ts`, `datasets.routes.ts`, `optimization.routes.ts`, `qc.routes.ts`, `ai.routes.ts`, `supply-chain.routes.ts`, `operations.routes.ts`, `lean.routes.ts`).

### 3. `frontend` (Next.js)
- **Centralized Env**: `src/lib/config/env.ts` is the single source of truth for `NEXT_PUBLIC_API_URL`.
- **Navigation & Gating**: `src/app/[userId]/modliq-console/layout.tsx` gates navigation dynamically based on feature flags and per-user enabled modules.
- **Tests**: `tests/unit/` and `tests/e2e/`.

---

## Deployment & CI Verification
- GitHub Actions CI workflow in `.github/workflows/ci.yml` runs linting, typechecking, Prisma schema validation, and Next.js production build tests on every push.

# Modliq Architecture & Codebase Tour

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🗺️ Complete Workspace Code Map

```
Modliq/
├── docs/                         # Exhaustive launch documentation pack
├── frontend/                     # Next.js 15 App Router Frontend
│   └── src/
│       ├── app/                  # App Router routes (public, studio, console, admin)
│       ├── components/           # UI Component library (Public, Studio, Admin)
│       └── lib/                  # Centralized API client & env configs
├── backend/                      # Node.js Express API Gateway
│   └── src/
│       ├── entrypoint/           # Application entrypoint (server.ts)
│       ├── routes/               # Modular Express API routes (22 route files)
│       ├── middleware/           # Auth, RBAC, Rate Limiting, Error handling
│       ├── workers/              # BullMQ background job consumer
│       ├── ai/                   # Multi-provider AI Gateway (Groq, Gemini, NVIDIA, etc.)
│       └── db/prisma/            # Single authoritative Prisma schema (schema.prisma)
├── ml-engine/                    # Python 3.11 FastAPI Microservice
│   ├── main.py                   # FastAPI entrypoint
│   ├── routers/                  # API routers (automl.py, qc.py, goal.py, monitor.py)
│   ├── services/                 # Domain ML logic (preprocessor, trainer, tuner, optimizer)
│   └── src/pipelines/            # AutoML & SHAP pipelines
├── demo/                         # Demo CSV datasets & automated E2E test script
└── render.yaml                   # Production Render infrastructure manifest
```

---

## 🔗 Related Documentation

- [SYSTEM_ARCHITECTURE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/01-architecture/SYSTEM_ARCHITECTURE.md) — System topology
- [SETUP_LOCAL.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/11-developer-onboarding/SETUP_LOCAL.md) — Local setup

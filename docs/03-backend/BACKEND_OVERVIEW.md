# Modliq Backend Gateway Architecture Overview

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## ⚙️ Node.js Express API Gateway

The Modliq backend is a modular Express application written in TypeScript, located in `backend/`. It acts as the single API gateway and orchestration server for the platform.

```mermaid
flowchart TD
  Client[Client Browser / Next.js] --> Express[Express API Gateway (server.ts)]
  Express --> AuthMW[JWT & Auth Middleware]
  Express --> Routers[Modular Routers (src/routes/)]
  Routers --> Prisma[Prisma ORM Client]
  Routers --> BullMQ[BullMQ Job Queue]
  Routers --> MLProxy[ML Engine HTTP Client]
  Routers --> AIGateway[Multi-Provider AI Gateway]
  Prisma --> DB[(MongoDB Atlas Database)]
  BullMQ --> Redis[(Redis Queue Store)]
```

---

## 📁 Backend Folder Layout

- [`backend/src/entrypoint/server.ts`](file:///c:/Users/sathish/Desktop/Modliq/Modliq/backend/src/entrypoint/server.ts): Single application startup entrypoint establishing database connections, middleware stack, and router mounts.
- [`backend/src/routes/`](file:///c:/Users/sathish/Desktop/Modliq/Modliq/backend/src/routes): 22 modular API router files (auth, projects, dataset, ingestion, jobs, qualityPassport, ai, admin, etc.).
- [`backend/src/middleware/`](file:///c:/Users/sathish/Desktop/Modliq/Modliq/backend/src/middleware): Authentication, RBAC authorization, rate limiting, and error handling middleware.
- [`backend/src/workers/jobs.worker.ts`](file:///c:/Users/sathish/Desktop/Modliq/Modliq/backend/src/workers/jobs.worker.ts): BullMQ background job consumer processing AutoML training tasks.
- [`backend/src/db/prisma/schema.prisma`](file:///c:/Users/sathish/Desktop/Modliq/Modliq/backend/src/db/prisma/schema.prisma): Single authoritative Prisma schema definition.

---

## 🔒 Security & Middleware Stack

1. **Helmet**: HTTP header hardening.
2. **CORS**: Strict origin whitelist configured via `CORS_ORIGIN`.
3. **Body Parser**: Json/Urlencoded parsing with 50MB payload limits for file uploads.
4. **JWT Verification**: `requireAuth` middleware validating Bearer tokens.
5. **RBAC Guard**: `requireRole('ADMIN')` blocking unauthorized endpoint access.

---

## 🔗 Related Documentation

- [API_ROUTES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/API_ROUTES.md) — Endpoint reference table
- [AUTHORIZATION.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/AUTHORIZATION.md) — Auth & RBAC rules
- [PRISMA_SCHEMA.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/PRISMA_SCHEMA.md) — Database schema definition

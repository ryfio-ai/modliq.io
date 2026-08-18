# MODLIQER Database Architecture Overview

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🗄️ Primary Application Database

**MongoDB Atlas** accessed exclusively via **Prisma ORM** is the single primary database for the MODLIQER platform.

```mermaid
flowchart TD
  Backend[Express API Gateway] --> PrismaClient[Prisma Client (PrismaClient)]
  PrismaClient --> Schema[backend/src/db/prisma/schema.prisma]
  Schema --> MongoDB[(MongoDB Atlas Cluster)]
```

---

## ⚙️ Configuration & Connection

- **Schema Location**: [`backend/src/db/prisma/schema.prisma`](file:///c:/Users/sathish/Desktop/Modliq/Modliq/backend/src/db/prisma/schema.prisma)
- **Database Provider**: `mongodb`
- **Primary Keys**: Custom string IDs or MongoDB ObjectId mapping (`@id @map("_id") @db.ObjectId`).
- **Connection Variable**: `DATABASE_URL` (configured in `backend/.env`).

---

## 🔗 External Data Connectors vs App Database

> [!NOTE]
> **Important Architectural distinction:**
> - **MongoDB Atlas**: Primary MODLIQER application database storing Users, Datasets, Projects, Jobs, Quality Passports, Audit Logs.
> - **External Databases (Supabase, PostgreSQL, MySQL, SQL Server)**: Optional external data sources connected via `DataConnector` for data ingestion into MODLIQER. They are **never** used as MODLIQER's primary database.

---

## 🧪 MODLIQER AI Labs (Beta) Schema Models & Vector Store

The **MODLIQER AI Labs (Beta)** suite stores structured metadata in MongoDB Atlas via Prisma and vector embeddings in Qdrant:
- **DocuMind Document & Chunk Models:** Stores PDF document metadata, page counts, and Qdrant vector embedding references with page citations.
- **Agent Task Pilot Runs & Approvals:** Tracks LangGraph execution states, step trajectories, and pending human approval gate records.
- **Voice Coach Session Records:** Persists audio practice session metadata, STT transcripts, and evaluation metrics.
- **Browser AutoQA Runs:** Stores Playwright execution logs, pass/fail assertions, and video recording URLs (strictly bounded to `localhost`, `modliq-io.vercel.app`).
- **SpendLens Receipts:** Stores OCR receipt extractions, line items, user verification gate status, and spend breakdown analytics.

---

## 🔗 Related Documentation

- [PRISMA_SCHEMA.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/PRISMA_SCHEMA.md) — Prisma schema details
- [MODELS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/MODELS.md) — Complete data model definitions
- [MIGRATION_AND_SYNC.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/MIGRATION_AND_SYNC.md) — DB sync commands

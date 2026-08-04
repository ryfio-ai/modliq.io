# Modliq Database Architecture Overview

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🗄️ Primary Application Database

**MongoDB Atlas** accessed exclusively via **Prisma ORM** is the single primary database for the Modliq platform.

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
> - **MongoDB Atlas**: Primary Modliq application database storing Users, Datasets, Projects, Jobs, Quality Passports, Audit Logs.
> - **External Databases (Supabase, PostgreSQL, MySQL, SQL Server)**: Optional external data sources connected via `DataConnector` for data ingestion into Modliq. They are **never** used as Modliq's primary database.

---

## 🔗 Related Documentation

- [PRISMA_SCHEMA.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/PRISMA_SCHEMA.md) — Prisma schema details
- [MODELS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/MODELS.md) — Complete data model definitions
- [MIGRATION_AND_SYNC.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/MIGRATION_AND_SYNC.md) — DB sync commands

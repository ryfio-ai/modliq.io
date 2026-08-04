# Modliq Database Migration & Sync Protocol

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🔄 MongoDB Prisma Synchronization Commands

Because MongoDB Atlas is a document database, traditional SQL schema migrations (`prisma migrate dev`) do not apply. Database synchronizations are performed using `prisma db push`.

### 1. Regenerate Prisma Client
Run whenever schema changes are made to update TypeScript client bindings:
```bash
npx prisma generate --schema=backend/src/db/prisma/schema.prisma
```

### 2. Push Schema Changes to MongoDB Atlas
Sync new models, fields, and indexes directly to MongoDB Atlas:
```bash
npx prisma db push --schema=backend/src/db/prisma/schema.prisma
```

---

## 🔗 Related Documentation

- [DATABASE_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/DATABASE_OVERVIEW.md) — Overview
- [PRISMA_SCHEMA.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/PRISMA_SCHEMA.md) — Schema definition

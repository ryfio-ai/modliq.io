# Modliq Developer Troubleshooting Guide

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## ❓ Common Issues & Solutions

### 1. Prisma Client Generation Fails
- **Symptom**: `Error: Could not find schema.prisma`
- **Fix**: Always specify the schema path explicitly:
  ```bash
  npx prisma generate --schema=backend/src/db/prisma/schema.prisma
  ```

### 2. MongoDB Connection Error
- **Symptom**: `MongoServerSelectionError: connect ECONNREFUSED`
- **Fix**: Verify `DATABASE_URL` in `backend/.env`. Ensure local MongoDB daemon is running (`mongod`) or IP whitelist is enabled on MongoDB Atlas.

### 3. ML Service Key Mismatch
- **Symptom**: Backend requests to ML Engine fail with `401 Unauthorized` or `Invalid Service Key`.
- **Fix**: Ensure `ML_SERVICE_KEY` in `backend/.env` exactly matches `ML_SERVICE_KEY` in `ml-engine/.env`.

### 4. CORS Issue on Local Development
- **Symptom**: Browser blocks fetch requests with `Cross-Origin Request Blocked`.
- **Fix**: Ensure `CORS_ORIGIN` in `backend/.env` includes `http://localhost:3000`.

### 5. Optimization Job Stuck in `QUEUED`
- **Symptom**: Job remains queued without updating progress.
- **Fix**: Check if Redis is running locally (`redis-cli ping` returns `PONG`). If Redis is omitted, verify backend fallback synchronous job execution.

---

## 🔗 Related Documentation

- [SETUP_LOCAL.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/11-developer-onboarding/SETUP_LOCAL.md) — Local setup
- [COMMON_TASKS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/11-developer-onboarding/COMMON_TASKS.md) — Common developer tasks

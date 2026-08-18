# MODLIQER Backend Render Deployment

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection (`render.yaml`)  
> **Status:** Implemented / Launch-Ready  

---

## ⚙️ Render Web Service Configuration

Configured via `render.yaml`:

### Service Specs
- **Service Name**: `modliq-backend`
- **Environment**: Node.js
- **Build Command**: `cd backend && npm install && npx prisma generate --schema=src/db/prisma/schema.prisma && npm run build`
- **Start Command**: `cd backend && npm start`
- **Health Check Path**: `/health`

---

## 🔗 Related Documentation

- [DEPLOYMENT_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/DEPLOYMENT_OVERVIEW.md) — Deployment overview
- [ENVIRONMENT_VARIABLES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/ENVIRONMENT_VARIABLES.md) — Env reference

# MODLIQER Frontend Vercel Deployment

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection (`vercel.json`)  
> **Status:** Implemented / Launch-Ready  

---

## ⚡ Vercel Deployment Configuration

Configured via `vercel.json` and root package scripts:

### Build Settings
- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### Environment Configuration
- `NEXT_PUBLIC_API_URL`: Points to live Express Backend API (`https://modliq-backend.onrender.com`).

---

## 🔗 Related Documentation

- [DEPLOYMENT_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/DEPLOYMENT_OVERVIEW.md) — Deployment overview
- [ENVIRONMENT_VARIABLES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/ENVIRONMENT_VARIABLES.md) — Env reference

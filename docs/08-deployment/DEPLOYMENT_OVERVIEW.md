# Modliq Production Deployment Architecture

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🚢 Production Infrastructure Topology

Modliq utilizes a cloud-native microservice deployment stack across Vercel, Render, MongoDB Atlas, and Redis.

```mermaid
flowchart TD
  Client[Web Browser Client] --> Vercel[Vercel (Next.js Frontend)]
  Vercel -->|HTTPS API Requests| RenderBE[Render (Express API Gateway)]
  RenderBE --> Atlas[(MongoDB Atlas Cloud Cluster)]
  RenderBE --> Upstash[(Redis / BullMQ Queue)]
  RenderBE -->|HTTP X-Modliq-Service-Key| RenderML[Render (FastAPI ML Engine)]
```

---

## 🏢 Platform Hosting Providers

- **Frontend (`frontend/`)**: Deployed on **Vercel** (`vercel.json` configured).
- **Backend Gateway (`backend/`)**: Deployed on **Render** as a Node.js Web Service (`render.yaml` configured).
- **ML Engine (`ml-engine/`)**: Deployed on **Render** as a Docker Python Web Service (`ml-engine/Dockerfile` & `render.yaml` configured).
- **Database**: **MongoDB Atlas** M10+ Cluster.
- **Task Queue**: Managed **Redis** (Upstash or Redis Cloud).

---

## 🔗 Related Documentation

- [FRONTEND_DEPLOYMENT.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/FRONTEND_DEPLOYMENT.md) — Vercel setup
- [BACKEND_DEPLOYMENT.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/BACKEND_DEPLOYMENT.md) — Render API setup
- [ML_ENGINE_DEPLOYMENT.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/ML_ENGINE_DEPLOYMENT.md) — Python ML setup
- [ENVIRONMENT_VARIABLES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/ENVIRONMENT_VARIABLES.md) — Environment reference

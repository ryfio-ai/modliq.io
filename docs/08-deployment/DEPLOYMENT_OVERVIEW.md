# Deployment & Infrastructure Overview

> **Last verified: 17/08/2026**
> **Brand: MODLIQER**
> **Tagline: Analyze data. Build models. Prove results — without code.**

MODLIQER is deployed as a decoupled 3-tier microservice architecture across Vercel, Render/Cloud Run, and MongoDB Atlas.

---

## Service Topologies & Deployment Targets

| Service | Hosting Platform | Tech Stack | Health Endpoint |
|---|---|---|---|
| Frontend Web Console | Vercel | Next.js 15 App Router | `GET /` |
| Express API Gateway | Render / Render Web Service | Node.js / Express / Prisma | `GET /api/v1/health` |
| Python ML Engine | Render / Google Cloud Run | FastAPI / Scikit-Learn | `GET /health` |
| Vector Database | Qdrant Cloud / Self-Hosted | Qdrant Vector Engine | `GET /collections` |
| Primary Database | MongoDB Atlas | MongoDB | Prisma Connection |
| Asynchronous Queue | Redis Labs / Upstash | Redis / BullMQ | Worker Heartbeat |

---

## Environment Variables Reference
- `ML_ENGINE_URL`: Internal URL pointing to FastAPI compute instance.
- `ML_INTERNAL_API_KEY`: Service key for compute authorization.
- `QDRANT_URL`: Qdrant vector database URL.
- `GROQ_API_KEY`, `GEMINI_API_KEY`, `NVIDIA_API_KEY`, `COHERE_API_KEY`: Server-side LLM provider keys.

---

## Related Documentation
- `docs/08-deployment/MLOPS_AND_EDGE_ROADMAP.md`
- `docs/01-architecture/EDGE_REALTIME_ROADMAP.md`
- `docs/08-deployment/ENVIRONMENT_VARIABLES.md`

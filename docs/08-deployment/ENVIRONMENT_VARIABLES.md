# MODLIQER Environment Variables Reference Table

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 📋 Comprehensive Environment Variable Matrix

> [!IMPORTANT]
> **Zero Real Secrets Policy:** All values below are purely illustrative placeholders. Never commit actual production credentials to source control or documentation.

| Variable | Service | Required | Secret? | Purpose | Example Placeholder |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Frontend | Yes | No (Public) | Points to live Express Backend API URL | `https://api.modliq.io` |
| `NEXTAUTH_SECRET` | Frontend | Yes | Yes (Secret) | Secret key for signing NextAuth cookies | `your_nextauth_secret_32_chars` |
| `NEXTAUTH_URL` | Frontend | Yes | No (Public) | Base URL of frontend application | `https://modliq.io` |
| `PORT` | Backend | Optional | No (Public) | Port for Express API gateway | `3001` |
| `DATABASE_URL` | Backend | Yes | Yes (Secret) | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/modliq_db` |
| `JWT_SECRET` | Backend | Yes | Yes (Secret) | Secret key for signing backend JWT tokens | `your_jwt_signing_secret_key` |
| `ML_ENGINE_URL` | Backend | Yes | No (Public) | Base URL of Python ML Engine microservice | `http://localhost:8000` |
| `ML_SERVICE_KEY` | Backend/ML | Yes | Yes (Secret) | Internal header key for microservice auth | `your_internal_service_key_phrase` |
| `REDIS_URL` | Backend | Optional | Yes (Secret) | Redis connection URL for BullMQ job queue | `redis://localhost:6379` |
| `CORS_ORIGIN` | Backend | Yes | No (Public) | Allowed CORS origins for frontend client | `https://modliq.io,http://localhost:3000` |
| `AI_FEATURES_ENABLED` | Backend | Yes | No (Public) | Emergency AI Kill Switch (`true`/`false`) | `true` |
| `GROQ_API_KEY` | Backend | Optional | Yes (Secret) | Groq Llama 3.3 70B API key | `gsk_your_groq_api_key_placeholder` |
| `GEMINI_API_KEY` | Backend | Optional | Yes (Secret) | Google Gemini 2.0 Flash API key | `AIzaSy_your_gemini_key_placeholder` |
| `NVIDIA_API_KEY` | Backend | Optional | Yes (Secret) | NVIDIA Nim API key | `nvapi-your_nvidia_key_placeholder` |
| `COHERE_API_KEY` | Backend | Optional | Yes (Secret) | Cohere API key | `your_cohere_api_key_placeholder` |
| `CLOUDFLARE_API_KEY` | Backend | Optional | Yes (Secret) | Cloudflare Workers AI key | `your_cloudflare_api_key_placeholder` |
| `OPENROUTER_API_KEY` | Backend | Optional | Yes (Secret) | OpenRouter multi-LLM key | `sk-or-v1-your_openrouter_key_placeholder` |

---

## 🔗 Related Documentation

- [DEPLOYMENT_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/DEPLOYMENT_OVERVIEW.md) — Deployment overview
- [SECURITY_CHECKLIST.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/SECURITY_CHECKLIST.md) — Security checklist

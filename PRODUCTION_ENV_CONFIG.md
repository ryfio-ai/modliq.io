# Modliq Production Environment Variables (.env) Master Sheet
**Target Launch Date: August 20, 2026**

Copy and paste these exact environment variables into your **Vercel** and **Render** service dashboards.

---

## 1. Vercel Frontend (`https://modliq-io.vercel.app` & `https://modliq.io`)

Copy-paste into **Vercel Dashboard** → **Project Settings** → **Environment Variables**:

```env
# Database
DATABASE_URL="mongodb+srv://modliq_user:YOUR_DB_PASSWORD@cluster0.xxx.mongodb.net/modliq?retryWrites=true&w=majority"
DIRECT_URL="mongodb+srv://modliq_user:YOUR_DB_PASSWORD@cluster0.xxx.mongodb.net/modliq?retryWrites=true&w=majority"

# Authentication & Domain Routing
NEXTAUTH_URL="https://modliq.io"
NEXTAUTH_SECRET="b8f9e2a4c6d8e0f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9"

# Backend Express API Service Target
NEXT_PUBLIC_API_URL="https://modliq-backend.onrender.com"

# AI Core Engine (NVIDIA NIM)
LLM_PROVIDER="nvidia"
NVIDIA_API_KEY="YOUR_NVIDIA_API_KEY"
NVIDIA_BASE_URL="https://integrate.api.nvidia.com/v1"
AI_MODEL_FAST="meta/llama-3.1-8b-instruct"
AI_MODEL_REASONING="nvidia/llama-3.1-nemotron-70b-instruct"
AI_FEATURES_ENABLED="true"

# Fallback AI Providers (Optional)
GROQ_API_KEY="YOUR_GROQ_API_KEY"
OPENROUTER_API_KEY="YOUR_OPENROUTER_API_KEY"
```

---

## 2. Render Node.js Express Backend (`https://modliq-backend.onrender.com`)

Copy-paste into **Render Dashboard** → `modliq-backend` → **Environment**:

```env
NODE_ENV="production"
PORT="10000"

# Database Connection
DATABASE_URL="mongodb+srv://modliq_user:YOUR_DB_PASSWORD@cluster0.xxx.mongodb.net/modliq?retryWrites=true&w=majority"

# ML Engine & Frontend URLs
ML_ENGINE_URL="https://modliq-ml-engine.onrender.com"
CLIENT_ORIGIN="https://modliq.io"
FRONTEND_ORIGIN="https://modliq.io"

# Internal Security & JWT Secrets
ML_INTERNAL_API_KEY="e4d3c2b1a0988776655443322110ffeeddccbbaa99887766554433221100fef"
JWT_SECRET="c7a8b9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8"
CONNECTOR_ENCRYPTION_KEY="8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e"
ADMIN_PASSWORD="ModliqAdmin2026!"

# Server Performance & Rate Limiting
REQUEST_TIMEOUT_MS="30000"
JOB_TIMEOUT_MS="180000"
RATE_LIMIT_WINDOW_MS="60000"
RATE_LIMIT_MAX_REQUESTS="120"
LOG_LEVEL="info"
```

---

## 3. Render Python ML Engine (`https://modliq-ml-engine.onrender.com`)

Copy-paste into **Render Dashboard** → `modliq-ml-engine` → **Environment**:

```env
ENVIRONMENT="production"
LOG_LEVEL="INFO"

# Allowed Cross-Origin Origins
CLIENT_ORIGIN="https://modliq.io"
BACKEND_ORIGIN="https://modliq-backend.onrender.com"

# Internal Service Auth Key (Must match Backend ML_INTERNAL_API_KEY)
ML_INTERNAL_API_KEY="e4d3c2b1a0988776655443322110ffeeddccbbaa99887766554433221100fef"

# AI Goal Parser Engine
LLM_PROVIDER="nvidia"
NVIDIA_API_KEY="YOUR_NVIDIA_API_KEY"
NVIDIA_BASE_URL="https://integrate.api.nvidia.com/v1"
```

---

## 4. Render Backup Frontend (`https://modliq-frontend.onrender.com`)

Copy-paste into **Render Dashboard** → `modliq-frontend` → **Environment**:

```env
NODE_ENV="production"
PORT="3000"
NEXT_PUBLIC_API_URL="https://modliq-backend.onrender.com"
NEXTAUTH_URL="https://modliq-frontend.onrender.com"
NEXTAUTH_SECRET="b8f9e2a4c6d8e0f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9"
```

---

## Quick Reference Summary of Service URLs

- **Vercel Frontend**: `https://modliq-io.vercel.app`
- **Custom Domain**: `https://modliq.io`
- **Render Backend API**: `https://modliq-backend.onrender.com`
- **Render ML Engine**: `https://modliq-ml-engine.onrender.com`
- **Render Backup Frontend**: `https://modliq-frontend.onrender.com`

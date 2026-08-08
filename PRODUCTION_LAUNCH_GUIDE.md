# Modliq Production Hosting & Launch Guide 🚀
**Target Launch Date: August 20, 2026**

This step-by-step guide will walk you through hosting the entire Modliq platform online using **100% Free Cloud Tiers**, setting up your custom domain `modliq.io`, and keeping all services running fast with auto-keepalives.

---

## 🌐 Target Production URLs

| Service | Primary Host | Production URL | Free Tier Plan |
|---|---|---|---|
| **Custom Domain** | Domain Registrar | `https://modliq.io` | Custom Domain |
| **Frontend App** | **Vercel** (Primary) | `https://modliq-io.vercel.app` → `https://modliq.io` | Vercel Hobby Free |
| **Frontend Backup** | **Render** (Backup) | `https://modliq-frontend.onrender.com` | Render Free Web Service |
| **Backend API** | **Render** | `https://modliq-backend.onrender.com` | Render Free Web Service |
| **Python ML Engine** | **Render** | `https://modliq-ml-engine.onrender.com` | Render Free Web Service |
| **Database** | **MongoDB Atlas** | `mongodb+srv://...` | M0 Free Shared (512MB) |

---

## Step 1: Set Up Free Database (MongoDB Atlas)

1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Click **Create Cluster** → Choose **M0 Free Shared Cluster**.
3. Select Region (e.g. AWS / N. Virginia `us-east-1` or Frankfurt `eu-central-1`).
4. Under **Database Access**:
   - Create Database User: `modliq_user`
   - Set a strong password (save password for environment variables).
5. Under **Network Access**:
   - Click **Add IP Address** → Select **Allow Access from Anywhere** (`0.0.0.0/0`).
6. Click **Connect** → Choose **Drivers (Node.js)**:
   - Connection String Format:
     ```text
     mongodb+srv://modliq_user:<YOUR_PASSWORD>@cluster0.xxx.mongodb.net/modliq?retryWrites=true&w=majority
     ```

---

## Step 2: Deploy Python ML Engine on Render

1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** → **Web Service**.
3. Connect your GitHub Repository: `Modliq`.
4. Configure Service Settings:
   - **Name**: `modliq-ml-engine`
   - **Region**: Oregon (US West) or Frankfurt (EU)
   - **Branch**: `main`
   - **Root Directory**: `ml-engine`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: **Free**
5. Add **Environment Variables**:
   | Key | Value |
   |---|---|
   | `ENVIRONMENT` | `production` |
   | `LOG_LEVEL` | `INFO` |
   | `CLIENT_ORIGIN` | `https://modliq.io` |
   | `BACKEND_ORIGIN` | `https://modliq-backend.onrender.com` |
   | `ML_INTERNAL_API_KEY` | *(Generate a 64-char random hex key, e.g. `9f8e7d6c5b4a3...`)* |
6. Click **Create Web Service**. Wait for build to complete.
7. Service URL will be: `https://modliq-ml-engine.onrender.com`

---

## Step 3: Deploy Node.js Express Backend on Render

1. On [Render Dashboard](https://dashboard.render.com), click **New +** → **Web Service**.
2. Select your GitHub Repository: `Modliq`.
3. Configure Service Settings:
   - **Name**: `modliq-backend`
   - **Region**: Same region as ML engine (e.g. Oregon)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: **Free**
4. Add **Environment Variables**:
   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `DATABASE_URL` | `<MongoDB Connection String from Step 1>` |
   | `ML_ENGINE_URL` | `https://modliq-ml-engine.onrender.com` |
   | `CLIENT_ORIGIN` | `https://modliq.io` |
   | `FRONTEND_ORIGIN` | `https://modliq.io` |
   | `ML_INTERNAL_API_KEY` | *(Same key as in Step 2)* |
   | `JWT_SECRET` | *(Generate a 32-char random secret)* |
   | `ADMIN_PASSWORD` | *(Your admin login password)* |
   | `REQUEST_TIMEOUT_MS` | `30000` |
   | `JOB_TIMEOUT_MS` | `180000` |
   | `RATE_LIMIT_WINDOW_MS` | `60000` |
   | `RATE_LIMIT_MAX_REQUESTS` | `120` |
5. Click **Create Web Service**.
6. Service URL will be: `https://modliq-backend.onrender.com`

---

## Step 4: Deploy Next.js Frontend on Vercel (Primary)

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** → **Project** → Import `Modliq` repository.
3. Configure Project Settings:
   - **Project Name**: `modliq-io`
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click **Edit** → Select `frontend`
4. Expand **Environment Variables** and add:
   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | `https://modliq-backend.onrender.com` |
   | `NEXTAUTH_URL` | `https://modliq.io` |
   | `NEXTAUTH_SECRET` | *(Random 32-byte secret)* |
   | `DATABASE_URL` | `<MongoDB Connection String from Step 1>` |
   | `LLM_PROVIDER` | `nvidia` *(or groq / openrouter)* |
   | `NVIDIA_API_KEY` | `<Your NVIDIA API Key>` |
   | `NVIDIA_BASE_URL` | `https://integrate.api.nvidia.com/v1` |
   | `AI_MODEL_FAST` | `meta/llama-3.1-8b-instruct` |
   | `AI_MODEL_REASONING` | `nvidia/llama-3.1-nemotron-70b-instruct` |
   | `AI_FEATURES_ENABLED` | `true` |
5. Click **Deploy**.
6. Default Vercel URL will be: `https://modliq-io.vercel.app`

---

## Step 5: Deploy Backup Frontend on Render (Optional Backup)

1. In Render Dashboard, click **New +** → **Web Service**.
2. Settings:
   - **Name**: `modliq-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**: `NEXT_PUBLIC_API_URL = https://modliq-backend.onrender.com`
3. Backup URL will be: `https://modliq-frontend.onrender.com`

---

## Step 6: Connect Custom Domain `modliq.io`

When you purchase `modliq.io` (from Namecheap, GoDaddy, Cloudflare, Porkbun, etc.):

1. Go to your **Vercel Dashboard** → `modliq-io` project → **Settings** → **Domains**.
2. Enter `modliq.io` and click **Add**.
3. Also enter `www.modliq.io` and click **Add** (redirects www to apex).
4. Vercel will display the required DNS Records:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
5. Open your Domain Registrar's DNS Manager (e.g. Namecheap / GoDaddy) and add these records.
6. SSL certificate (HTTPS) will be automatically generated within 5 minutes.

---

## Step 7: Keepalive Strategy for Render Free Tier (Prevent Cold Starts)

Render free web services sleep after 15 minutes of inactivity. To ensure 100% fast responses when visitors arrive:

1. Sign up for a free account at [UptimeRobot](https://uptimerobot.com) or [Cron-Job.org](https://cron-job.org).
2. Create two HTTP Monitors with 5-minute intervals:
   - **Monitor 1 (Backend Warmup)**:
     - URL: `https://modliq-backend.onrender.com/warmup`
     - Interval: Every 5 minutes
   - **Monitor 2 (ML Engine Warmup)**:
     - URL: `https://modliq-ml-engine.onrender.com/warmup`
     - Interval: Every 5 minutes

This ensures your backend and ML services stay awake 24/7 with zero cost!

---

## Step 8: Pre-Launch Checklist (Before Aug 20)

Before announcing the platform on August 20, 2026:

- [ ] **Run Live Health Checks**:
  ```bash
  curl -i https://modliq-backend.onrender.com/warmup
  curl -i https://modliq-ml-engine.onrender.com/warmup
  curl -i https://modliq.io
  ```
- [ ] **Test Sign Up & Sign In**:
  - Register a new user account on `https://modliq.io/signup`.
  - Sign in with user credentials on `https://modliq.io/login`.
- [ ] **Test End-to-End Demo Flow**:
  - Load demo dataset, execute AI goal parsing, start optimization job, and verify Quality Passport generation.
- [ ] **Verify SSL & HTTPS**:
  - Confirm green lock / valid SSL certificate on `https://modliq.io`.

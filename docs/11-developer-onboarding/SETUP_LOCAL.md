# MODLIQER Local Developer Setup Guide

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 💻 Prerequisites

Ensure you have installed:
- **Node.js**: v18+ or v20+
- **Python**: v3.11+
- **Git**: v2+
- **MongoDB**: Local instance or MongoDB Atlas URI
- **Redis**: Local instance or Redis Cloud URI (Optional for BullMQ)

---

## ⚡ Step-by-Step Local Environment Setup

### 1. Clone Repository & Setup Environments
```bash
# Clone repo
git clone https://github.com/qeltrava-ai/modliq.git
cd MODLIQER

# Copy example environment files
cp .env.example .env
cp backend/.env.example backend/.env
cp ml-engine/.env.example ml-engine/.env
cp frontend/.env.example frontend/.env.local
```

---

### 2. Install Dependencies & Generate Database Client

```bash
# Install root & script dependencies
npm install

# Install Frontend dependencies
cd frontend && npm install && cd ..

# Install Backend dependencies & generate Prisma client
cd backend && npm install
npx prisma generate --schema=src/db/prisma/schema.prisma
npx prisma db push --schema=src/db/prisma/schema.prisma
cd ..

# Install Python ML Engine dependencies
cd ml-engine
python -m venv venv
# Windows: venv\Scripts\activate | Linux/macOS: source venv/bin/activate
pip install -r requirements.txt
cd ..
```

---

### 3. Launch Local Microservices

Open 3 terminal windows to run all 3 tiers concurrently:

```bash
# Terminal 1: Python ML Engine (Port 8000)
cd ml-engine && python main.py

# Terminal 2: Node.js Express Backend API Gateway (Port 3001)
cd backend && npm run dev

# Terminal 3: Next.js Frontend Console (Port 3000)
cd frontend && npm run dev
```

---

## 🌐 Local Endpoint URLs

- **Frontend App**: `http://localhost:3000`
- **Backend API Gateway**: `http://localhost:3001` (`/health` probe)
- **FastAPI ML Engine**: `http://localhost:8000` (`/health` probe)
- **FastAPI Swagger Docs**: `http://localhost:8000/docs`

---

## 🧪 Automated End-to-End Verification

With all 3 services running, execute the automated 7-step E2E integration test:
```bash
python demo/test_e2e_platform.py
```

---

## 🔗 Related Documentation

- [CODEBASE_TOUR.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/11-developer-onboarding/CODEBASE_TOUR.md) — Folder layout
- [COMMON_TASKS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/11-developer-onboarding/COMMON_TASKS.md) — Developer recipes
- [TROUBLESHOOTING.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/11-developer-onboarding/TROUBLESHOOTING.md) — Troubleshooting

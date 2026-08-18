# MODLIQER Common Developer Recipes & Tasks

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🛠️ Step-by-Step Developer Recipes

### 1. How to Add a New Frontend Page
1. Create new directory under `frontend/src/app/[your-route]/page.tsx`.
2. Add navigation link to `PublicNavbar` or `AdminSidebar` if appropriate.
3. Update route catalog in `docs/02-frontend/ROUTES.md`.

### 2. How to Add a New Backend API Route
1. Create router file in `backend/src/routes/[name].routes.ts`.
2. Mount router in `backend/src/entrypoint/server.ts` under `/api/v1/[name]`.
3. Add authentication/RBAC middleware (`requireAuth`, `requireRole`).
4. Update API documentation table in `docs/03-backend/API_ROUTES.md`.

### 3. How to Add or Modify a Prisma Database Model
1. Modify `backend/src/db/prisma/schema.prisma`.
2. Run `npx prisma generate --schema=backend/src/db/prisma/schema.prisma`.
3. Push changes to MongoDB Atlas: `npx prisma db push --schema=backend/src/db/prisma/schema.prisma`.
4. Update model specification table in `docs/05-database/MODELS.md`.

### 4. How to Add a New ML Engine Endpoint
1. Add route handler in `ml-engine/routers/[module].py`.
2. Define Pydantic request/response schemas in `ml-engine/schemas.py`.
3. Enforce service key auth dependency: `Depends(verify_service_key)`.
4. Update ML endpoint table in `docs/04-ml-engine/ENDPOINTS.md`.

---

## 🔗 Related Documentation

- [SETUP_LOCAL.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/11-developer-onboarding/SETUP_LOCAL.md) — Local setup
- [CONTRIBUTING.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/11-developer-onboarding/CONTRIBUTING.md) — Contributing rules

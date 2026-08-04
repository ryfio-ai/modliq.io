# Modliq Admin API Endpoints

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🛡️ Admin API Endpoint Reference

Located in `backend/src/routes/admin.routes.ts`. All endpoints require JWT authentication and `requireRole('ADMIN')`.

| Method | Endpoint Path | Purpose | Query / Request Payload | Status |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/admin/users` | List all platform users & active status | `?page=1&limit=50&role=USER` | Implemented |
| `PUT` | `/api/v1/admin/users/:id` | Update user role or enabled modules | `{ role: "ADMIN", enabledModules: [...] }` | Implemented |
| `GET` | `/api/v1/admin/organizations`| List organizations & entitlements | `?search=qeltrava` | Implemented |
| `POST` | `/api/v1/admin/organizations`| Create new tenant organization | `{ name: "Org", slug: "org-slug" }` | Implemented |
| `GET` | `/api/v1/admin/metrics` | System observability & token stats | N/A | Implemented |
| `GET` | `/api/v1/admin/audit-logs` | Filter tenant security audit logs | `?action=LOGIN&userId=123` | Implemented |

---

## 🔗 Related Documentation

- [ADMIN_CONSOLE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/ADMIN_CONSOLE.md) — Admin console UI
- [AUTHORIZATION.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/AUTHORIZATION.md) — Auth & RBAC rules

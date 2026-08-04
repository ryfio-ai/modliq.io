# Modliq Enterprise Admin Console

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🛡️ Admin Console Specifications

Located in `frontend/src/app/admin/`, the Admin Console provides enterprise administrators and platform operators with centralized management, tenant scoping, and system observability.

```mermaid
flowchart TD
  Admin[Admin Console (/admin)] --> Users[User Management]
  Admin --> Orgs[Organization & Entitlements]
  Admin --> Metrics[Usage & Storage Analytics]
  Admin --> Logs[Audit Logs & Security Events]
  Admin --> Support[Support Ticket Queue]
```

---

## 🔑 Key Features & Role Requirements

- **Role Gate**: Requires `user.role === 'ADMIN'` verified by `backend/src/middleware/auth.ts`.
- **User Management**: View user list, change user roles (`ADMIN` / `USER`), manage active dataset assignments, and toggle enabled modules.
- **Organization & Entitlement Control**: View organizations, set plan tiers (`DEMO`, `PILOT`, `PRO`, `ENTERPRISE`), and adjust quota limits.
- **System Observability & Usage Analytics**: Monitor system-wide usage events (`UsageEvent`), storage footprint, optimization job counts, and AI token utilization.
- **Audit Logging**: Search and filter security audit logs (`AuditLog`) by actor ID, organization, and action type.

---

## 🔗 Related Documentation

- [ADMIN_APIS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/ADMIN_APIS.md) — Backend Admin APIs
- [AUTHORIZATION.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/AUTHORIZATION.md) — Auth & RBAC rules

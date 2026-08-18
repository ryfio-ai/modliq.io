# MODLIQER Multi-Tenant Security & Isolation

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🔒 Data Segregation & RBAC Enforcers

1. **Logical Scoping**: Multi-tenancy enforced at the software layer via explicit `organizationId`, `userId`, and `projectId` conditions in every Prisma database query.
2. **Access Control**: Role hierarchy (`OWNER`, `ADMIN`, `MANAGER`, `ENGINEER`, `VIEWER`) verified before permitting mutation operations.
3. **Cross-Tenant Prevention**: Any attempt to supply a dataset or job ID belonging to another organization yields an immediate `403 Forbidden` error and logs an alert to `AuditLog`.

---

## 🔗 Related Documentation

- [MULTI_TENANCY.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/01-architecture/MULTI_TENANCY.md) — Multi-tenancy blueprint
- [AUTHORIZATION.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/AUTHORIZATION.md) — Auth middleware rules

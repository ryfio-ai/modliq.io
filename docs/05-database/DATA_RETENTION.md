# MODLIQER Data Retention & Purging Policies

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🔒 Data Retention Guidelines

1. **Demo Datasets**: Retained indefinitely as static reference data (`isDemo = true`).
2. **User Uploaded Datasets**: Stored until deleted by user or organization admin.
3. **Audit Logs & Usage Events**: Retained for 365 days for security compliance and billing verification.
4. **Temporary Job Artifacts**: Intermediate ML training files cleaned up automatically after 7 days.
5. **Share Links**: Revokable on-demand via `ShareLink.revoked = true` or automatic expiration via `expiresAt`.

---

## 🔗 Related Documentation

- [SECURITY_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/SECURITY_OVERVIEW.md) — Security policies
- [MODELS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/MODELS.md) — Model specs

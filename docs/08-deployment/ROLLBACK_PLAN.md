# Modliq Production Rollback Plan

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🚨 Rollback Protocol & Recovery Steps

In the event of a critical production deployment regression:

1. **Vercel Frontend Rollback**: Revert deployment instantly via Vercel dashboard to previous deployment hash.
2. **Render Backend / ML Engine Rollback**: Redeploy previous successful git commit SHA in Render console.
3. **MongoDB Atlas Point-in-Time Restore**: Trigger MongoDB Atlas Continuous Backup restore if schema corruptions occur.

---

## 🔗 Related Documentation

- [DEPLOYMENT_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/DEPLOYMENT_OVERVIEW.md) — Overview
- [INCIDENT_RESPONSE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/INCIDENT_RESPONSE.md) — Security incident response

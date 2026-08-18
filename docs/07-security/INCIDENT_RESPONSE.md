# MODLIQER Emergency Security Incident Response Plan

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🚨 Emergency Protocol Steps

In the event of a suspected security breach, credential leakage, or abnormal data access pattern, follow this sequence:

```mermaid
flowchart TD
  Alert[1. Incident Detected] --> RotateKeys[2. Rotate System Secrets & API Keys]
  RotateKeys --> KillAI[3. Toggle AI Kill Switch (AI_FEATURES_ENABLED=false)]
  KillAI --> RevokeLinks[4. Revoke Active Public Share Links]
  RevokeLinks --> Suspend[5. Suspend Compromised User Accounts]
  Suspend --> Audit[6. Audit Security Logs (AuditLog & UsageEvent)]
  Audit --> Restore[7. Restore Database Backup if Needed]
  Restore --> Notify[8. Issue Security Disclosure to Affected Users]
```

---

## 🛠️ Step-by-Step Incident Execution Guide

### 1. Rotate System Credentials & Keys
Immediately rotate exposed secrets in hosting environment (Vercel / Render / Atlas):
- `JWT_SECRET`
- `ML_SERVICE_KEY`
- AI Provider Keys (`GROQ_API_KEY`, `GEMINI_API_KEY`, etc.)
- Database `DATABASE_URL`

### 2. Disable AI Layer
Set `AI_FEATURES_ENABLED=false` in Render environment configuration to sever external LLM provider network requests instantly.

### 3. Revoke Share Tokens
Run administrative database command to invalidate all public share links:
```typescript
await prisma.shareLink.updateMany({ data: { revoked: true } });
```

### 4. Suspend Compromised Accounts
Set target user status to disabled or reset passwords via Admin Console (`/admin`).

### 5. Inspect Audit Trails
Filter `AuditLog` records by `actorId` and `timestamp` to identify accessed datasets and mutated records.

---

## 🔗 Related Documentation

- [SECURITY_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/SECURITY_OVERVIEW.md) — Security overview
- [SECURITY_CHECKLIST.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/SECURITY_CHECKLIST.md) — Pre-launch checklist

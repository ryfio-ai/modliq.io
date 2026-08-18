# MODLIQER File Upload Security Specifications

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🛡️ File Processing Defense Controls

1. **Size Capping**: Upload size capped at 50MB per file in Express body-parser configuration (`backend/src/entrypoint/server.ts`).
2. **MIME Type Validation**: Rejects unrecognized binary or executable extensions; strictly permitting `.csv`, `.xlsx`, `.xls`, `.pdf`, `.docx`.
3. **CSV Formula Injection Shield**: Strips leading `=`, `+`, `-`, `@` characters from incoming text cells to prevent DDE/Formula injection when exports are opened in Microsoft Excel.

---

## 🔗 Related Documentation

- [DATASET_INGESTION.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/DATASET_INGESTION.md) — Ingestion rules
- [SECURITY_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/SECURITY_OVERVIEW.md) — Security overview

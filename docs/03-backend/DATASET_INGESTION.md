# MODLIQER Universal Data Ingestion Specifications

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 📥 Ingestion Pipeline Architecture

Located in `backend/src/routes/ingestion.routes.ts` and `backend/src/ingestion/`:

```mermaid
flowchart LR
  Source[CSV / XLSX / PDF / Connector] --> Upload[Ingestion Endpoint]
  Upload --> Validation[MIME & Format Validation]
  Validation --> Parser[Parser Engine]
  Parser --> HealthCheck[ML Engine Health Check (/qc/health-check)]
  HealthCheck --> Save[Prisma Dataset Record]
  Save --> Client[Return Dataset ID & Health Report]
```

---

## 📄 Ingestion Modes & Capabilities

1. **Structured File Ingestion (`/api/v1/ingestion/upload`)**:
   - **Supported Formats**: CSV (`text/csv`), Excel (`.xlsx`, `.xls`).
   - **Validation**: Strict file size cap (50MB), CSV formula injection shield (`=`, `+`, `-`, `@` stripping).
   - **Output**: Generates initial preview JSON, column type detection, and overall dataset health score (0–100).

2. **Unstructured Document Ingestion (`/api/v1/ingestion/upload-doc`)**:
   - **Supported Formats**: PDF (`application/pdf`), Word (`.docx`, `.doc`).
   - **Extractor**: Calls Python ML Engine document extractor to detect embedded tables and raw text summaries.

3. **Database Connectors (`/api/v1/connectors`)**:
   - **Supported Engines**: PostgreSQL, Supabase, MongoDB, MySQL, SQL Server.
   - **Security**: AES-256 encrypted connection strings, connection dry-run testing, SSRF IP range restriction.

---

## 🔗 Related Documentation

- [FILE_UPLOAD_SECURITY.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/FILE_UPLOAD_SECURITY.md) — Upload security rules
- [CONNECTOR_SECURITY.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/CONNECTOR_SECURITY.md) — Connector SSRF defense

# MODLIQER Database Connector Security & SSRF Defense

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🔒 Connector Protection & SSRF Prevention

1. **Credential Encryption**: Connection strings and credentials stored in `DataConnector.encryptedConfig` are encrypted at rest using AES-256-GCM.
2. **SSRF Prevention**: Connector test connection requests validate target host IPs against private CIDR ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `127.0.0.0/8`), blocking attempts to scan internal cloud metadata endpoints (`169.254.169.254`).

---

## 🔗 Related Documentation

- [DATASET_INGESTION.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/DATASET_INGESTION.md) — Connectors overview
- [SECURITY_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/SECURITY_OVERVIEW.md) — Security overview

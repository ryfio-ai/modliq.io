# MODLIQER Production Smoke Testing Guide

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection (`ml-engine/smoke_test.py`)  
> **Status:** Implemented / Launch-Ready  

---

## ⚡ Production Health Smoke Probes

Quick HTTP verification commands to execute against live production endpoints:

### 1. ML Engine Smoke Test
```bash
python ml-engine/smoke_test.py
```
Or directly:
```bash
curl -I https://modliq-ml.onrender.com/health
```
*Expected: HTTP 200 OK `{ "status": "ok" }`*

### 2. Express Backend API Smoke Test
```bash
curl -I https://modliq-backend.onrender.com/health
```
*Expected: HTTP 200 OK `{ "status": "ok" }`*

---

## 🔗 Related Documentation

- [TESTING_STRATEGY.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/09-testing/TESTING_STRATEGY.md) — Strategy overview
- [BUILD_VERIFICATION.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/09-testing/BUILD_VERIFICATION.md) — Build verification

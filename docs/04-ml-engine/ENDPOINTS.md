# MODLIQER ML Engine Endpoints Specification

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 📡 Complete ML Engine Endpoint Table

| Path | Method | Auth Required | Request Payload | Response Payload | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/health` | `GET` | No | None | `{ status: "ok", service: "ml-engine" }` | Implemented |
| `/api/v1/qc/health-check` | `POST` | Service Key | `{ filepath, datasetId }` | Health score, warnings, column types | Implemented |
| `/api/v1/qc/spc-stats` | `POST` | Service Key | `{ dataJson, targetCol }` | $C_p, C_{pk}$, mean, std_dev, histogram | Implemented |
| `/api/v1/goal/parse` | `POST` | Service Key | `{ textGoal, columns }` | Parsed target, intent, feature bounds | Implemented |
| `/api/v1/automl/train` | `POST` | Service Key | `{ datasetPath, targetCol, intent }` | Best model, metrics, SHAP drivers | Implemented |
| `/api/v1/automl/predict` | `POST` | Service Key | `{ modelId, features }` | Predicted target value & confidence | Implemented |
| `/api/v1/automl/extract-doc`| `POST` | Service Key | `{ docPath, fileType }` | Extracted text & embedded tables JSON | Implemented |
| `/api/v1/monitor/metrics` | `GET` | Service Key | None | CPU, RAM footprint, model count | Implemented |

---

## 🔗 Related Documentation

- [ML_ENGINE_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/ML_ENGINE_OVERVIEW.md) — Overview
- [PIPELINES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/PIPELINES.md) — Pipelines

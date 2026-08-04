# Modliq ML Engine Overview

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🐍 Python FastAPI Microservice Architecture

The Modliq ML Engine is an autonomous Python 3.11 microservice situated in `ml-engine/`. It provides machine learning training, hyperparameter optimization, natural language goal parsing, SHAP driver extraction, and statistical quality control.

```mermaid
flowchart TD
  FastAPI[main.py (FastAPI App)] --> Auth[Service Key Middleware]
  Auth --> Routers[routers/ (automl.py, qc.py, goal.py, monitor.py)]
  Routers --> Services[services/ (preprocessor, trainer, tuner, optimizer)]
  Services --> Artifacts[model_artifacts/ (.joblib storage)]
```

---

## 🛠️ Python Technology Stack

- **Framework**: FastAPI + Uvicorn.
- **Data Manipulation**: Pandas, NumPy.
- **Machine Learning Zoo**: Scikit-Learn, XGBoost, LightGBM, Extra Trees.
- **Hyperparameter Optimization**: Optuna Bayesian Tuning.
- **Explainability**: SHAP (SHapley Additive exPlanations).
- **Document Parsing**: PyPDF2 / python-docx table extractors.
- **Validation**: Pydantic schema validation (`ml-engine/schemas.py`).

---

## 🔑 Service Key Security

All non-health endpoints require the header `X-Modliq-Service-Key`. Enforced via dependency injection in `ml-engine/dependencies.py`.

---

## 🔗 Related Documentation

- [ENDPOINTS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/ENDPOINTS.md) — Endpoint reference table
- [PIPELINES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/PIPELINES.md) — AutoML pipelines
- [OPTIMIZER.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/OPTIMIZER.md) — Parameter optimization engine

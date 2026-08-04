# Modliq ML Engine Architecture

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## ⚙️ FastAPI Python Microservice Topology

The Modliq ML Engine is an independent FastAPI microservice situated in `ml-engine/`. It serves as the computational engine for data profiling, AutoML, process optimization, and statistical quality control.

```mermaid
flowchart LR
  BE[Express Backend Gateway] -->|X-Modliq-Service-Key| API[FastAPI Entrypoint (main.py)]
  API --> Routers[Router Modules]
  Routers --> Profiler[Data Profiler]
  Routers --> GoalParser[Goal Parser]
  Routers --> Optimizer[AutoML & Optuna Optimizer]
  Routers --> QC[SPC Statistics & Quality Insights]
  Routers --> DocExtract[PDF/Word Document Extractor]
```

---

## 🛡️ Service Security & Auth Contract

All HTTP requests to the ML Engine must present an internal service authentication key in the request header:

```http
X-Modliq-Service-Key: <ML_SERVICE_KEY_SECRET>
```

Requests lacking a valid service key receive an immediate `401 Unauthorized` status response.

---

## 🔬 Core Python Components

- **FastAPI Application (`ml-engine/main.py`)**: Microservice entrypoint configuring CORS, router registration, health probes (`/health`), and warm-up routines.
- **Routers (`ml-engine/routers/`)**:
  - `automl.py`: Model training, hyperparameter optimization, and prediction endpoints.
  - `qc.py`: SPC capability indices ($C_p, C_{pk}$), histogram generation, and quality health scoring.
  - `goal.py`: Natural language target and variable constraint parsing.
  - `monitor.py`: Model health, memory footprint, and engine metrics.
- **Pipelines (`ml-engine/src/pipelines/`)**: Modular Python logic for AutoML grid searches, SHAP feature importance calculation, and document table extraction.

---

## 🔗 Related Documentation

- [ML_ENGINE_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/ML_ENGINE_OVERVIEW.md) — Comprehensive ML Engine overview
- [ENDPOINTS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/ENDPOINTS.md) — Complete ML API endpoint reference
- [PIPELINES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/PIPELINES.md) — AutoML & optimization pipelines

# MODLIQER Optimization Job Queue & Execution

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## ⚡ Job Lifecycle & Architecture

Located in `backend/src/routes/jobs.routes.ts` and `backend/src/workers/jobs.worker.ts`:

```mermaid
flowchart TD
  Client[POST /api/v1/jobs/submit] --> CreateDB[Create OptimizationJob Record (Status: QUEUED)]
  CreateDB --> Enqueue[Enqueue in BullMQ / Redis]
  Enqueue --> Worker[BullMQ Worker (jobs.worker.ts)]
  Worker --> MLCall[POST /api/v1/automl/train (ML Engine)]
  MLCall --> Process[16-Algorithm Training + Optuna Tuning]
  Process --> Complete[Update OptimizationJob (Status: COMPLETED)]
  Complete --> SaveResult[Persist Result JSON in MongoDB Atlas]
  Client --> Poll[GET /api/v1/jobs/:jobId or SSE Stream]
```

---

## ⚙️ Job Status Transitions

- `QUEUED`: Job received and waiting for worker dispatch.
- `RUNNING`: Worker actively executing ML Engine model training.
- `COMPLETED`: Training successful, safe parameter ranges & SHAP drivers persisted.
- `FAILED`: Training error encountered; error payload stored in `OptimizationJob.error`.

---

## 🔗 Related Documentation

- [ML_ENGINE_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/ML_ENGINE_OVERVIEW.md) — ML Engine execution
- [PIPELINES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/PIPELINES.md) — AutoML pipelines
